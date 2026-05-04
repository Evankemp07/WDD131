const gallery = document.querySelector(".gallery");
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
