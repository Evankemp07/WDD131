const form = document.querySelector("#eventForm");
const typeSelect = document.querySelector("#type");
const extraField = document.querySelector("#extraField");
const extraLabel = document.querySelector("#extraLabel");
const extraInput = document.querySelector("#extraInput");
const errorsBox = document.querySelector("#errors");
const ticketBox = document.querySelector("#ticket");

function updateExtraField() {
  const value = typeSelect.value;

  if (value === "student") {
    extraField.hidden = false;
    extraLabel.textContent = "Student I#";
    extraInput.placeholder = "9 digit number";
    extraInput.required = true;
  } else if (value === "guest") {
    extraField.hidden = false;
    extraLabel.textContent = "Access Code";
    extraInput.placeholder = "EVENT131";
    extraInput.required = true;
  } else {
    extraField.hidden = true;
    extraInput.required = false;
    extraInput.value = "";
  }
}

typeSelect.addEventListener("change", updateExtraField);
updateExtraField();

function isFutureDate(value) {
  if (!value) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(value + "T00:00:00");
  return chosen > today;
}

function isValidStudentId(value) {
  return /^\d{9}$/.test(value);
}

function isValidAccessCode(value) {
  return value === "EVENT131";
}

function showErrors(messages) {
  errorsBox.innerHTML =
    "<ul>" + messages.map(m => `<li>${m}</li>`).join("") + "</ul>";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  errorsBox.innerHTML = "";
  ticketBox.innerHTML = "";

  const firstName = form.firstName.value.trim();
  const lastName = form.lastName.value.trim();
  const email = form.email.value.trim();
  const eventDate = form.eventDate.value;
  const type = form.type.value;
  const extra = form.extraInput.value.trim();

  const errors = [];

  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");
  if (!email) errors.push("Email is required.");

  if (!eventDate) {
    errors.push("Please choose an event date.");
  } else if (!isFutureDate(eventDate)) {
    errors.push("Event date must be later than today.");
  }

  if (!type) {
    errors.push("Please choose a type.");
  } else if (type === "student" && !isValidStudentId(extra)) {
    errors.push("Student I# must be exactly 9 digits.");
  } else if (type === "guest" && !isValidAccessCode(extra)) {
    errors.push("Access code is incorrect.");
  }

  if (errors.length > 0) {
    showErrors(errors);
    return;
  }

  ticketBox.innerHTML = `
    <h2>Ticket Confirmed</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Event Date:</strong> ${eventDate}</p>
    <p><strong>Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
    <p><strong>${type === "student" ? "Student I#" : "Access Code"}:</strong> ${extra}</p>
  `;

  form.reset();
  updateExtraField();
});