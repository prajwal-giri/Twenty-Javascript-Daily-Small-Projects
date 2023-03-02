const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const twitterButton = document.getElementById("twitter-btn");
const newQuoteButton = document.getElementById("new-quote-btn");
const loader = document.querySelector(".loader");

function loading() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

let newQuote = function () {
  loading();
  let singleQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  if (singleQuote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = singleQuote.text;
  quoteAuthor.textContent = singleQuote.author;
  complete();
};

let apiQuotes = [];

async function getQuote() {
  try {
    const response = await fetch(
      "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    );
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {}
}

//Tweet online fucntion

function tweetOnline() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetOnline);

getQuote();
