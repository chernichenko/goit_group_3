const noFavoritesMsg = document.querySelector(".tab-content .no-content");
const favorites = JSON.parse(localStorage.getItem("favorite")) || [];

if (favorites?.length === 0) {
  noFavoritesMsg.classList.remove("hidden");

  
} else {
  noFavoritesMsg.classList.add("hidden");
}

function saveQuoteToLocalStorage(quote) {
  const today = new Date().toISOString().split('T')[0];
  localStorage.setItem('quoteOfTheDay', JSON.stringify({ date: today, quote }));
}

function getQuoteFromLocalStorage() {
  const stored = localStorage.getItem('quoteOfTheDay');
  return stored ? JSON.parse(stored) : null;
}

function displayQuote(text, author) {
  const quoteText = document.querySelector('.quote-text');
  const quoteAuthor = document.querySelector('.quote-author');

  if (quoteText && quoteAuthor) {
    quoteText.textContent = text;
    quoteAuthor.textContent = author;
    return;
  }

  const quoteContainer = document.querySelector('.quote-container');
  if (!quoteContainer) return;

  const pText = document.createElement('p');
  pText.classList.add('quote-text');
  pText.textContent = text;

  const pAuthor = document.createElement('p');
  pAuthor.classList.add('quote-author');
  pAuthor.textContent = author;

  const title = quoteContainer.querySelector('.quote-title');
  if (title) {
    quoteContainer.insertBefore(pText, title.nextSibling);
  } else {
    quoteContainer.appendChild(pText);
  }
  quoteContainer.appendChild(pAuthor);
}

async function checkAndDisplayQuote() {
  const today = new Date().toISOString().split('T')[0];
  const storedQuote = getQuoteFromLocalStorage();

  if (storedQuote?.date === today) {
    displayQuote(storedQuote.quote.quote, storedQuote.quote.author);
  } else {
    const newQuote = await fetchQuote();
    if (newQuote) {
      saveQuoteToLocalStorage(newQuote);
      displayQuote(newQuote.quote, newQuote.author);
    }
  }
}


// УЛЮБЛЕНІ ВПРАВИ 
function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const container = document.querySelector('#favorites-list');
  const noFavoritesMsg = document.querySelector('#no-favorites-msg');
  if (!container) return;

  container.innerHTML = '';

  if (favorites.length === 0) {
    noFavoritesMsg?.classList.remove('hidden');
    return;
  }

  noFavoritesMsg?.classList.add('hidden');

  favorites.forEach(exercise => {
    const card = document.createElement('div');
    card.classList.add('exercise-card');
    card.innerHTML = `
      <img src="${exercise.gifUrl}" alt="${exercise.name}" />
      <h3>${exercise.name}</h3>
      <p>Body Part: ${exercise.bodyPart}</p>
      <p>Equipment: ${exercise.equipment}</p>
      <p>Target: ${exercise.target}</p>
      <p>${exercise.description}</p>
      <button class="remove-btn" data-id="${exercise._id}">Remove</button>
    `;
    container.appendChild(card);
  });
}

function removeExerciseFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(exercise => exercise._id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  displayFavorites();
}


document.addEventListener('DOMContentLoaded', () => {
  
  const searchIcon = document.querySelector(".exercises .search-container-icon-wrap");
  const searchInput = document.querySelector(".exercises .search-container input");
  const searchContainer = document.querySelector(".exercises .search-container");
  if (searchIcon && searchInput && searchContainer && typeof searchSubmitHandler === 'function') {
    searchIcon.addEventListener("click", searchSubmitHandler);
  }

 
  displayFavorites();
  checkAndDisplayQuote();
});


document.addEventListener('click', event => {
  if (event.target.classList.contains('remove-btn')) {
    const id = event.target.getAttribute('data-id');
    removeExerciseFromFavorites(id);
  }
});
