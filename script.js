const quotes = [
  {
    quote:
      "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
  },

  {
    quote: "You become responsible, forever, for what you have tamed.",
  },

  {
    quote:
      "All grown-ups were once children... but only few of them remember it.",
  },

  {
    quote: "The stars are beautiful because of a flower that cannot be seen.",
  },

  {
    quote:
      "The most beautiful things in the world cannot be seen or touched, they are felt with the heart.",
  },

  {
    quote: "What makes the desert beautiful is that somewhere it hides a well.",
  },

  {
    quote:
      "To me, you are still nothing more than a little boy just like a hundred thousand other little boys.",
  },

  {
    quote: "One sees clearly only with the heart.",
  },
];

const stars = document.querySelector(".stars");
for (let i = 0; i < 120; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  const size = Math.random() * 3 + 1;
  star.style.width = size + "px";
  star.style.height = size + "px";
  const blinkTime = Math.random() * 3 + 2; // от 2 до 5 сек
  const floatTime = Math.random() * 5 + 4; // от 4 до 9 сек
  const delay = Math.random() * 5;
  star.style.animation = `blink ${blinkTime}s ease-in-out ${delay}s infinite,
         float ${floatTime}s ease-in-out infinite`;
  stars.appendChild(star);
}

const quoteElement = document.getElementById("quote");
const newQuoteButton = document.getElementById("newQuote");

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex].quote;
}

newQuoteButton.addEventListener("click", showRandomQuote);

showRandomQuote();
