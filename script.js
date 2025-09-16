const form = document.getElementById("contactForm");

function validateField(input, errorElement, rules) {
  let errorMessage = "";

  if (rules.required && !input.value.trim()) {
    errorMessage = "Це поле є обов'язковим";
  } else if (rules.minLength && input.value.trim().length < rules.minLength) {
    errorMessage = `Мінімум ${rules.minLength} символів`;
  } else if (rules.type === "email" && !input.checkValidity()) {
    errorMessage = "Введіть коректний email";
  }

  errorElement.textContent = errorMessage;
  return errorMessage === "";
}

const name = document.getElementById("name");
const nameError = document.getElementById("nameError");
name.addEventListener("blur", () =>
  validateField(name, nameError, { required: true, minLength: 2 })
);

const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
email.addEventListener("blur", () =>
  validateField(email, emailError, { required: true, type: "email" })
);

const message = document.getElementById("message");
const messageError = document.getElementById("messageError");
message.addEventListener("blur", () =>
  validateField(message, messageError, { required: true, minLength: 5 })
);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const validName = validateField(name, nameError, {
    required: true,
    minLength: 2,
  });
  const validEmail = validateField(email, emailError, {
    required: true,
    type: "email",
  });
  const validMessage = validateField(message, messageError, {
    required: true,
    minLength: 5,
  });

  if (validName && validEmail && validMessage) {
    alert("Форма успішно відправлена!");
    form.reset();
  }
});

const ticketButtons = document.querySelectorAll(".btn, .btn.small, .hero .btn");

const modal = document.getElementById("ticketModal");
const closeBtn = modal.querySelector(".close");
const cityInput = document.getElementById("city");
const dateInput = document.getElementById("date");

ticketButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    const cityInput = document.getElementById("city");
    const dateInput = document.getElementById("date");

    if (row) {
      cityInput.value = row.cells[0].textContent;
      dateInput.value = row.cells[2].textContent;
    } else {
      const rows = document.querySelectorAll("#concerts tbody tr");
      const randomRow = rows[Math.floor(Math.random() * rows.length)];
      cityInput.value = randomRow.cells[0].textContent;
      dateInput.value = randomRow.cells[2].textContent;
    }

    document.getElementById("ticketModal").style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const ticketForm = document.getElementById("ticketForm");
ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Дякуємо! Ваше замовлення прийнято ✅");
  modal.style.display = "none";
  ticketForm.reset();
});
