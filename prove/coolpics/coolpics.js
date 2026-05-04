const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("#primary-nav");

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  nav.classList.toggle("hide");
  const open = !nav.classList.contains("hide");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
}

const gallery = document.querySelector(".gallery-grid");
const modal = document.querySelector("dialog");
const modalImage = modal.querySelector("img");
const closeButton = modal.querySelector(".close-viewer");

gallery.addEventListener("click", openModal);

function openModal(e) {
  if (e.target.tagName !== "IMG") return;

  const img = e.target;
  const src = img.getAttribute("src");
  const altText = img.getAttribute("alt");
  const fullSrc = src.replace("-sm", "-full");

  modalImage.src = fullSrc;
  modalImage.alt = altText;
  modal.showModal();
}

closeButton.addEventListener("click", () => {
  modal.close();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.close();
  }
});
