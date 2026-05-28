const steps = ["one", "two", "three"];

steps.forEach(showSteps);

function showSteps(item) {
  console.log(item);
}

const myList = document.querySelector("#myList");
const stepsHTML = steps.map(listTemplate);

function listTemplate(item) {
  return `<li>${item}</li>`;
}

myList.innerHTML = stepsHTML.join("");

let points;

function convert(grade) {
  switch (grade) {
    case "A":
      points = 4;
      break;
    case "B":
      points = 3;
      break;
    case "C":
      points = 2;
      break;
    case "D":
      points = 1;
      break;
    case "F":
      points = 0;
      break;
    default:
      alert("not a valid grade");
  }
  return points;
}

const grades = ["A", "B", "C"];
const gpaPoints = grades.map(convert);
console.log(gpaPoints);

function getTotal(total, item) {
  return total + item;
}

const totalPoints = gpaPoints.reduce(getTotal);
console.log(totalPoints);

const gpaAverage = totalPoints / gpaPoints.length;
console.log(gpaAverage);

const words = ["watermelon", "peach", "apple", "tomato", "grape"];
const shortWords = words.filter((word) => word.length < 6);
console.log(shortWords);

const myArray = [7, 3, 21, 54];
const luckyNumber = 21;
const luckyIndex = myArray.indexOf(luckyNumber);
console.log(luckyIndex);

// dynamic content
const studentContainer = document.querySelector("#studentContainer");

const students = [
  { last: "Andrus", first: "Aaron" },
  { last: "Masa", first: "Manny" },
  { last: "Tanda", first: "Tamanda" },
];

students.forEach((item) => {
  const name = document.createElement("div");
  name.classList.add("format");
  name.innerHTML = `
    <span>${item.first}</span>
    <span>${item.last}</span>
    <hr>
  `;
  studentContainer.appendChild(name);
});
