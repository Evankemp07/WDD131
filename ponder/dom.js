const title = document.querySelector("h1");
console.log("title (h1 element):", title);
title.textContent = "Web Page Components";

const lede = document.querySelector("p");
lede.textContent =
  "The foundational technologies that power websites and Web applications";

// document.querySelector("#topics").style.color = "red";
document.getElementById("topics").style.color = "purple";

const list = document.querySelector(".list");
list.style.border = "2px solid #000";

// document.body.classList.add("background");

const image = document.querySelector("img");
image.setAttribute("src", "images/th.jpg");
image.setAttribute(
  "alt",
  "HTML5, JavaScript, and CSS3 shield logos"
);

const selectElement = document.querySelector("#webdev-list");
selectElement.addEventListener("change", (event) => {
  const codeValue = event.target.value;
  console.log(codeValue);
  if (codeValue) {
    document.getElementById(codeValue).style.color = "red";
  }
});
