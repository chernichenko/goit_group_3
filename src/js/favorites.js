// favorite exercises
const noFavoritesMsg = document.querySelector("#no-favorites-msg");
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
  noFavoritesMsg.classList.remove("hidden");
} else {
  noFavoritesMsg.classList.add("hidden");
}

// quote of the day


async function fetchQuote() {
  try {
    const response = await fetch('https://your-energy.b.goit.study/api/quote');
    if (!response.ok) {
      throw new Error('Error fetching quote');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch quote:', error);
  }
}

function saveQuoteToLocalStorage(quote) {
  const today = new Date().toISOString().split('T')[0];
  const quoteData = {
    date: today,
    quote: quote, 
  };
  localStorage.setItem('quoteOfTheDay', JSON.stringify(quoteData));
}


function getQuoteFromLocalStorage() {
  const storedQuote = localStorage.getItem('quoteOfTheDay');
  return storedQuote ? JSON.parse(storedQuote) : null;
}

function displayQuote(text, author) {
  const quoteTextElement = document.querySelector('.quote-text');
  const quoteAuthorElement = document.querySelector('.quote-author');

  if (quoteTextElement && quoteAuthorElement) {
    quoteTextElement.textContent = text;
    quoteAuthorElement.textContent = author;
  } else {
    const quoteContainer = document.querySelector('.quote-container');

    const quoteText = document.createElement('p');
    quoteText.classList.add('quote-text');
    quoteText.textContent = text;

    const quoteAuthor = document.createElement('p');
    quoteAuthor.classList.add('quote-author');
    quoteAuthor.textContent = author;

    if (quoteContainer) {
      const quoteTitle = quoteContainer.querySelector('.quote-title');
      if (quoteTitle) {
        quoteContainer.insertBefore(quoteText, quoteTitle.nextSibling);
      } else {
        quoteContainer.appendChild(quoteText);
      }
      quoteContainer.appendChild(quoteAuthor);
    }
  }
}


async function checkAndDisplayQuote() {
  const today = new Date().toISOString().split('T')[0];
  const storedQuote = getQuoteFromLocalStorage();

  if (storedQuote && storedQuote.date === today) {
    displayQuote(storedQuote.quote.quote, storedQuote.quote.author);
  } else {
    const newQuote = await fetchQuote();
    if (newQuote) {
      saveQuoteToLocalStorage(newQuote);
      displayQuote(newQuote.quote, newQuote.author);
    }
  }
}


checkAndDisplayQuote();
