document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Ваше повідомлення відправлено!");
  this.reset();
});
