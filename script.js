import quotes from "./quotes.js";

const stars = document.querySelector(".stars");

for (let i = 0; i < 120; i++) {
  const star = document.createElement("div");

  star.classList.add("star");

  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";

  const size = Math.random() * 3 + 1;

  star.style.width = size + "px";
  star.style.height = size + "px";

  const blinkTime = Math.random() * 3 + 2;
  const floatTime = Math.random() * 5 + 4;
  const delay = Math.random() * 5;

  star.style.animation = `
    blink ${blinkTime}s ease-in-out ${delay}s infinite,
    float ${floatTime}s ease-in-out ${delay}s infinite
  `;

  stars.appendChild(star);
}

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuote");
const favoriteQuoteButton = document.getElementById("favoriteQuote");
const showFavoritesButton = document.getElementById("showFavorites");
const favoritesModal = document.getElementById("favoritesModal");
const closeModalButton = document.getElementById("closeModal");
const favoritesList = document.getElementById("favoritesList");

let currentQuote;
let previousIndex = -1;

function showRandomQuote() {
  quoteElement.style.opacity = 0;
  authorElement.style.opacity = 0;
  favoriteQuoteButton.hidden = false;

  setTimeout(() => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === previousIndex);

    previousIndex = randomIndex;
    currentQuote = quotes[randomIndex];

    quoteElement.textContent = currentQuote.quote;
    authorElement.textContent = "— " + currentQuote.author;

    updateFavoriteButton();

    quoteElement.style.opacity = 1;
    authorElement.style.opacity = 1;
  }, 300);
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite() {
  return getFavorites().some((item) => item.quote === currentQuote.quote);
}

function updateFavoriteButton() {
  if (!currentQuote) return;

  if (isFavorite()) {
    favoriteQuoteButton.textContent = "❤";
    favoriteQuoteButton.classList.add("active");
  } else {
    favoriteQuoteButton.textContent = "♡";
    favoriteQuoteButton.classList.remove("active");
  }
}

function toggleFavorite() {
  if (!currentQuote) return;

  let favorites = getFavorites();

  if (isFavorite()) {
    favorites = favorites.filter((item) => item.quote !== currentQuote.quote);
  } else {
    favorites.push(currentQuote);
  }

  saveFavorites(favorites);
  updateFavoriteButton();
}

function showFavorites() {
  const favorites = getFavorites();

  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>No favorite quotes yet.</p>";
  } else {
    favorites.forEach((quote, index) => {
      const item = document.createElement("div");
      item.classList.add("favorite-item");

      item.innerHTML = `
        <p>"${quote.quote}"</p>
        <small>— ${quote.author}</small>
        <button class="remove-btn">🗑 Remove</button>
      `;

      const removeButton = item.querySelector(".remove-btn");

      removeButton.addEventListener("click", () => {
        removeFavorite(index);
      });

      favoritesList.appendChild(item);
    });
  }

  favoritesModal.classList.remove("hidden");
}

function removeFavorite(index) {
  let favorites = getFavorites();

  favorites.splice(index, 1);

  saveFavorites(favorites);

  showFavorites();
  updateFavoriteButton();
}

function closeFavorites() {
  favoritesModal.classList.add("hidden");
}

newQuoteButton.addEventListener("click", showRandomQuote);
favoriteQuoteButton.addEventListener("click", toggleFavorite);
showFavoritesButton.addEventListener("click", showFavorites);
closeModalButton.addEventListener("click", closeFavorites);
newQuoteButton.addEventListener("click", showRandomQuote);
favoriteQuoteButton.addEventListener("click", toggleFavorite);

favoritesModal.addEventListener("click", (event) => {
  if (event.target === favoritesModal) {
    closeFavorites();
  }
});

showRandomQuote();
