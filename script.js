const contactForm = document.getElementById("contactForm");
const name = document.getElementById("name");
const nameError = document.getElementById("nameError");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const message = document.getElementById("message");
const messageError = document.getElementById("messageError");

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

name.addEventListener("blur", () =>
  validateField(name, nameError, { required: true, minLength: 2 })
);
email.addEventListener("blur", () =>
  validateField(email, emailError, { required: true, type: "email" })
);
message.addEventListener("blur", () =>
  validateField(message, messageError, { required: true, minLength: 5 })
);

contactForm.addEventListener("submit", function (e) {
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
    const params = new URLSearchParams({
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
    }).toString();

    fetch(`http://localhost:5500/contact?${params}`, { method: "GET" })
      .then(() => {
        alert("Форма успішно відправлена!");
        contactForm.reset();
      })
      .catch(() => alert("Сталася помилка при відправці форми."));
  }
});

const ticketForm = document.getElementById("ticketForm");
const ticketButtons = document.querySelectorAll(".btn, .btn.small, .hero .btn");
const modal = document.getElementById("ticketModal");
const closeBtn = modal.querySelector(".close");
const cityInput = document.getElementById("city");
const dateInput = document.getElementById("date");
const ticketName = document.getElementById("ticketName");
const ticketEmail = document.getElementById("ticketEmail");

ticketButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (row) {
      cityInput.value = row.cells[0].textContent;
      dateInput.value = row.cells[2].textContent;
    } else {
      const rows = document.querySelectorAll("#concerts tbody tr");
      const randomRow = rows[Math.floor(Math.random() * rows.length)];
      cityInput.value = randomRow.cells[0].textContent;
      dateInput.value = randomRow.cells[2].textContent;
    }
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

ticketForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const validCity = cityInput.value.trim() !== "";
  const validDate = dateInput.value.trim() !== "";
  const validName = ticketName.value.trim().length >= 2;
  const validEmail = ticketEmail.checkValidity();

  if (validCity && validDate && validName && validEmail) {
    const params = new URLSearchParams({
      city: cityInput.value.trim(),
      date: dateInput.value.trim(),
      name: ticketName.value.trim(),
      email: ticketEmail.value.trim(),
    }).toString();

    fetch(`http://localhost:5500/ticket?${params}`, { method: "GET" })
      .then(() => {
        alert("Дякуємо! Ваше замовлення прийнято ✅");
        ticketForm.reset();
        modal.style.display = "none";
      })
      .catch(() => alert("Сталася помилка при відправці замовлення."));
  } else {
    alert("Заповніть всі поля!");
  }
});
