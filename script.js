const quotes = [
  {
    quote:
      "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
    author: "Antoine de Saint-Exupéry",
  },

  {
    quote: "You become responsible, forever, for what you have tamed.",
    author: "Antoine de Saint-Exupéry",
  },

  {
    quote:
      "All grown-ups were once children... but only few of them remember it.",
    author: "Antoine de Saint-Exupéry",
  },

  {
    quote: "The stars are beautiful because of a flower that cannot be seen.",
    author: "Antoine de Saint-Exupéry",
  },

  {
    quote:
      "The most beautiful things in the world cannot be seen or touched, they are felt with the heart.",
    author: "Antoine de Saint-Exupéry",
  },

  {
    quote: "What makes the desert beautiful is that somewhere it hides a well.",
    author: "Antoine de Saint-Exupéry",
  },

  {
    quote:
      "To me, you are still nothing more than a little boy just like a hundred thousand other little boys.",
    author: "Antoine de Saint-Exupéry",
  },

  {
    quote: "One sees clearly only with the heart.",
    author: "Antoine de Saint-Exupéry",
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
  const blinkTime = Math.random() * 3 + 2;
  const floatTime = Math.random() * 5 + 4;
  const delay = Math.random() * 5;
  star.style.animation = `blink ${blinkTime}s ease-in-out ${delay}s infinite,
         float ${floatTime}s ease-in-out infinite`;
  stars.appendChild(star);
}

const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("newQuote");

function showRandomQuote() {
  quoteElement.style.opacity = 0;
  authorElement.style.opacity = 0;

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex].quote;
    authorElement.textContent = "— " + quotes[randomIndex].author;
    quoteElement.style.opacity = 1;
    authorElement.style.opacity = 1;
  }, 300);
}

newQuoteButton.addEventListener("click", showRandomQuote);

showRandomQuote();
