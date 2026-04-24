let selectElem = document.querySelector("select");
let logo = document.querySelector("img");

const LOGO_LIGHT = "images/byui-logo-blue.webp";
const LOGO_DARK = "images/byui-logo-white.png";

selectElem.addEventListener("change", changeTheme);

function changeTheme() {
  let current = selectElem.value;
  if (current === "dark") {
    document.body.classList.add("theme-dark");
    logo.src = LOGO_DARK;
  } else {
    document.body.classList.remove("theme-dark");
    logo.src = LOGO_LIGHT;
  }
}
