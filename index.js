const button = document.querySelector(".btn");
const message = document.querySelector(".message");
const card = document.querySelectorAll(".card");

button.textContent = "Click";
let currentIndex = 0;

window.addEventListener("DOMContentLoaded", () => {
  const savedNumbers = JSON.parse(localStorage.getItem("cardNumbers"));
  const savedIndex = parseInt(localStorage.getItem("currentIndex"), 10);

  if (savedNumbers && savedNumbers.length === card.length) {
    card.forEach((el, i) => {
      el.textContent = savedNumbers[i] || "";
    });
    currentIndex = savedIndex || 0;
    if (currentIndex === card.length) {
      button.textContent = "Reset";
    }
  }
});

function generateRandom() {
  let max = 9;
  let min = 1;

  if (button.textContent === "Reset") {
    message.classList.add("alert");
    message.innerHTML = "You have reached your limit";

    card.forEach((el) => {
      el.textContent = "";
    });

    button.textContent = "Click";
    currentIndex = 0;
    localStorage.removeItem("cardNumbers");
    localStorage.removeItem("currentIndex");

    return;
  }

  setTimeout(() => {
    message.classList.remove("alert");
    message.innerHTML = "";
  }, 3000);

  if (currentIndex < card.length) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    card[currentIndex].textContent = randomNumber;

    const cardNumbers = Array.from(card).map((el) => el.textContent);
    localStorage.setItem("cardNumbers", JSON.stringify(cardNumbers));

    currentIndex++;
    localStorage.setItem("currentIndex", currentIndex);
  }

  if (currentIndex === card.length) {
    console.log("Congratulations");
    button.textContent = "Reset";
  }
}

button.addEventListener("click", generateRandom);
