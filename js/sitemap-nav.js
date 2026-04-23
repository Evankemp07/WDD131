/**
 * Fetches sitemap.xml and fills nav regions marked with [data-sitemap-nav].
 * Modes: hubs (home) | list (ponder / prove index pages).
 */
(function () {
  "use strict";

  const CHEVRON_SVG = `<span class="card__arrow" aria-hidden="true"><svg class="card__chevron" viewBox="0 0 24 24" fill="none" focusable="false">
<path d="M9 5.5L16 12l-7 6.5" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" /></svg></span>`;

  /**
   * @param {string} fromPageUrl
   * @param {string} targetPageUrl
   */
  function relativeHrefTo(fromPageUrl, targetPageUrl) {
    const u = new URL(fromPageUrl);
    const v = new URL(targetPageUrl);
    if (u.origin !== v.origin) return targetPageUrl;
    const a = u.pathname.split("/").filter(Boolean);
    const b = v.pathname.split("/").filter(Boolean);
    if (a.length && a[a.length - 1].includes(".")) a.pop();
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return "../".repeat(a.length - i) + b.slice(i).join("/") || "./";
  }

  function pathAfterRepo(pathname) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length < 2) return "";
    return parts.slice(1).join("/");
  }

  function parseSitemap(xmlText) {
    const doc = new DOMParser().parseFromString(xmlText, "text/xml");
    if (doc.querySelector("parsererror")) return [];
    const out = [];
    for (const urlEl of doc.getElementsByTagName("url")) {
      const loc = urlEl.getElementsByTagName("loc")[0]?.textContent?.trim();
      const lastmod = urlEl.getElementsByTagName("lastmod")[0]?.textContent?.trim() || "";
      if (!loc) continue;
      out.push({ loc, lastmod });
    }
    return out;
  }

  function sortByLastModDesc(items) {
    return [...items].sort((a, b) => {
      const ad = a.lastmod || "";
      const bd = b.lastmod || "";
      if (ad === bd) return a._rest.localeCompare(b._rest);
      return bd.localeCompare(ad);
    });
  }

  /**
   * @param {string} html
   * @returns {{ label: string, desc: string }}
   */
  function metaFromPageHtml(html) {
    const p = new DOMParser().parseFromString(html, "text/html");
    const title = p.querySelector("title")?.textContent?.trim() || "Untitled";
    let metaDesc = "";
    for (const m of p.querySelectorAll("meta")) {
      const name = m.getAttribute("name");
      if (name && name.toLowerCase() === "description") {
        metaDesc = m.getAttribute("content")?.trim() || "";
        break;
      }
    }
    const label = title.includes("|")
      ? title
          .split("|")[0]
          .trim()
      : title;
    return { label, desc: metaDesc || "" };
  }

  function statusEl(message, isError) {
    const p = document.createElement("p");
    p.className = "sitemap-nav__status" + (isError ? " sitemap-nav__status--error" : "");
    p.setAttribute("role", "status");
    p.textContent = message;
    return p;
  }

  function buildCard(href, label, desc) {
    const a = document.createElement("a");
    a.className = "card";
    a.href = href;

    const labelSpan = document.createElement("span");
    labelSpan.className = "card__label";
    labelSpan.textContent = label;
    a.appendChild(labelSpan);

    if (desc) {
      const d = document.createElement("span");
      d.className = "card__desc";
      d.textContent = desc;
      a.appendChild(d);
    }

    a.insertAdjacentHTML("beforeend", CHEVRON_SVG);
    return a;
  }

  function clearStatusAndAppend(container, nodes) {
    container
      .querySelectorAll(".sitemap-nav__status")
      .forEach((n) => n.remove());
    for (const n of nodes) container.appendChild(n);
  }

  function hubSuffixMatches(pathname, suffix) {
    const p = pathname.replace(/\/$/, "");
    const s = suffix.replace(/^\//, "");
    return p.endsWith("/" + s) || p === "/" + s;
  }

  /**
   * @param {HTMLElement} el
   * @param {string} sitemapPath
   */
  async function runHubs(el, sitemapPath) {
    const hubs = (el.getAttribute("data-sitemap-hubs") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const labels = (el.getAttribute("data-sitemap-labels") || "")
      .split(",")
      .map((s) => s.trim());
    if (!hubs.length) {
      el.querySelectorAll(".sitemap-nav__status").forEach((n) => n.remove());
      el.appendChild(
        statusEl("Set data-sitemap-hubs to match paths in the sitemap.", true)
      );
      return;
    }

    const r = await fetch(sitemapPath);
    if (!r.ok) throw new Error("Sitemap not found: " + r.status);
    const entries = parseSitemap(await r.text());
    const from = window.location.href;
    const cards = [];
    const missing = [];

    for (let h = 0; h < hubs.length; h++) {
      const suffix = hubs[h];
      const ent = entries.find((e) =>
        hubSuffixMatches(new URL(e.loc).pathname, suffix)
      );
      if (!ent) {
        missing.push(suffix);
        continue;
      }
      const rPage = await fetch(relativeHrefTo(from, ent.loc));
      let label = labels[h] || "";
      let desc = "";
      if (rPage.ok) {
        const m = metaFromPageHtml(await rPage.text());
        if (!label) label = m.label;
        desc = m.desc;
      } else {
        if (!label) label = suffix;
      }
      if (!label) label = suffix;
      cards.push(buildCard(relativeHrefTo(from, ent.loc), label, desc));
    }

    el.querySelectorAll(".sitemap-nav__status").forEach((n) => n.remove());
    if (missing.length) {
      el.appendChild(
        statusEl("Missing in sitemap: " + missing.join(", "), true)
      );
    }
    for (const c of cards) {
      el.appendChild(c);
    }
    if (!cards.length && !missing.length) {
      el.appendChild(statusEl("No hub links found.", true));
    }
  }

  function listPrefixMatches(rest, pfx) {
    const p = pfx.endsWith("/") ? pfx : pfx + "/";
    return rest === p ? false : (rest.startsWith(p) || rest + "/" === p);
  }

  /**
   * @param {HTMLElement} el
   * @param {string} sitemapPath
   */
  async function runList(el, sitemapPath) {
    const raw = (el.getAttribute("data-sitemap-prefix") || "").trim();
    const pfx = raw.endsWith("/") ? raw : raw + "/";
    if (!raw) {
      el.appendChild(statusEl("Set data-sitemap-prefix (e.g. ponder/ or prove/).", true));
      return;
    }
    const excludeRaw = el.getAttribute("data-sitemap-exclude") || "";
    const exclude = new Set(
      excludeRaw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    );

    const r = await fetch(sitemapPath);
    if (!r.ok) throw new Error("Sitemap not found: " + r.status);
    const entries = parseSitemap(await r.text());
    const from = window.location.href;
    const withRest = [];

    for (const e of entries) {
      const pathname = new URL(e.loc).pathname;
      const rest = pathAfterRepo(pathname);
      if (!rest) continue;
      if (exclude.has(rest)) continue;
      if (!listPrefixMatches(rest, pfx)) continue;
      withRest.push({ e, rest, lastmod: e.lastmod || "" });
    }

    const sorted = sortByLastModDesc(
      withRest.map((w) => ({
        e: w.e,
        _rest: w.rest,
        lastmod: w.lastmod,
      }))
    );

    if (!sorted.length) {
      el
        .querySelectorAll(".sitemap-nav__status")
        .forEach((n) => n.remove());
      el.appendChild(
        statusEl(
          "No project pages in this section yet. Run the sitemap action after adding HTML files.",
          true
        )
      );
      return;
    }

    const built = await Promise.all(
      sorted.map(async (w) => {
        const ent = w.e;
        const rPage = await fetch(relativeHrefTo(from, ent.loc));
        let label = "Project";
        let desc = "";
        if (rPage.ok) {
          const m = metaFromPageHtml(await rPage.text());
          label = m.label;
          desc = m.desc;
        } else {
          const parts = w._rest.split("/");
          label =
            parts[parts.length - 1].replace(/\.html?$/i, "") || w._rest;
        }
        return buildCard(relativeHrefTo(from, ent.loc), label, desc);
      })
    );
    clearStatusAndAppend(el, built);
  }

  function init() {
    const navs = document.querySelectorAll("[data-sitemap-nav]");
    for (const el of navs) {
      if (!(el instanceof HTMLElement)) continue;
      const sitemapPath = el.getAttribute("data-sitemap-href");
      if (!sitemapPath) {
        el.appendChild(statusEl("Missing data-sitemap-href.", true));
        continue;
      }
      const mode = (el.getAttribute("data-sitemap-mode") || "list").toLowerCase();
      const p =
        mode === "hubs"
          ? runHubs(el, sitemapPath)
          : runList(el, sitemapPath);
      p.catch((err) => {
        el
          .querySelectorAll(".sitemap-nav__status")
          .forEach((n) => n.remove());
        el.appendChild(
          statusEl("Could not load project list. Open DevTools (F12) and check the Console, or use the sitemap on the deployed site. " + (err && err.message ? "(" + err.message + ")" : ""), true)
        );
        console.error(err);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
