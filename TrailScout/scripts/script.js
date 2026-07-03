const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#mainNavigation");
const currentYear = document.querySelector("#currentYear");

function toggleMenu() {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "Close" : "Menu";
}


function setCurrentYear() {
  currentYear.textContent = new Date().getFullYear();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", toggleMenu);
}


if (currentYear) {
  setCurrentYear();
}

function showFavoriteToast(hikeName) {
  let toast = document.querySelector(".favorite-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "favorite-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="favorite-toast-text">
      <span class="favorite-toast-label">Added to Favorited Hikes</span>
      <strong>${hikeName}</strong>
    </span>
  `;
  toast.classList.add("show");

  window.clearTimeout(showFavoriteToast.hideTimeout);
  showFavoriteToast.hideTimeout = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".favorite-button");
  if (!button || button.dataset.hikeId) {
    return;
  }

  const isSaved = button.classList.toggle("is-saved");
  button.setAttribute("aria-pressed", String(isSaved));
});
