let favoriteQuoteButton;
let showFavoritesButton;
let favoritesModal;
let favoritesList;
let closeModalButton;
let getCurrentQuote;

export function initFavorites(config) {
  favoriteQuoteButton = config.favoriteQuoteButton;
  showFavoritesButton = config.showFavoritesButton;
  favoritesModal = config.favoritesModal;
  favoritesList = config.favoritesList;
  closeModalButton = config.closeModalButton;

  getCurrentQuote = config.getCurrentQuote;

  favoriteQuoteButton.addEventListener("click", () => {
    toggleFavorite(getCurrentQuote());
  });

  showFavoritesButton.addEventListener("click", showFavorites);
  closeModalButton.addEventListener("click", closeFavorites);
  favoritesModal.addEventListener("click", (event) => {
    if (event.target === favoritesModal) {
      closeFavorites();
    }
  });
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function isFavorite(currentQuote) {
  return getFavorites().some((item) => item.quote === currentQuote.quote);
}

export function updateFavoriteButton(currentQuote) {
  if (!currentQuote) return;

  if (isFavorite(currentQuote)) {
    favoriteQuoteButton.textContent = "❤";
    favoriteQuoteButton.classList.add("active");
  } else {
    favoriteQuoteButton.textContent = "♡";
    favoriteQuoteButton.classList.remove("active");
  }
}

function toggleFavorite(currentQuote) {
  let favorites = getFavorites();

  if (isFavorite(currentQuote)) {
    favorites = favorites.filter((item) => item.quote !== currentQuote.quote);
  } else {
    favorites.push(currentQuote);
  }

  saveFavorites(favorites);
  updateFavoriteButton(currentQuote);
}

function showFavorites() {
  favoritesList.innerHTML = "";

  const favorites = getFavorites();

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

      item.querySelector(".remove-btn").addEventListener("click", () => {
        removeFavorite(index);
      });

      favoritesList.appendChild(item);
    });
  }

  favoritesModal.classList.remove("hidden");
}

function removeFavorite(index) {
  const favorites = getFavorites();

  favorites.splice(index, 1);

  saveFavorites(favorites);
  showFavorites();
  updateFavoriteButton(getCurrentQuote());
}

function closeFavorites() {
  favoritesModal.classList.add("hidden");
}
