import icons from "/images/icons.svg";
import { openModal } from "./exercises-modal.js";

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


function displayFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorite')) || [];
  const container = document.querySelector('#favorites-list');
  const noFavoritesMsg = document.querySelector('#no-favorites-msg');

  if (!container) return;
  container.innerHTML = '';

  if (favorites.length === 0) {
    noFavoritesMsg?.classList.add('hidden');
    return;
  }

  const list = document.createElement("ul");
  list.classList.add("exercises-list");
  favorites.forEach((exercise) => {
    const { rating, name, burnedCalories, time, bodyPart, target } = exercise;
    const li = document.createElement("li");
    li.classList.add("exercise-item");
    li.innerHTML = `
  <div class="header">
    <div class="workout">WORKOUT</div>
    <div class="rating">
      ${rating.toFixed(1)}
      <div class="icon">
        <svg width="2rem" height="2rem">
            <use href="${icons}#star"></use>
        </svg>
      </div>
    </div>
    <button type="button" class="start">
      Start
      <div class="icon">
        <svg>
            <use href="${icons}#arrow"></use>
        </svg>
      </div>
    </button>
  </div>
  <div class="name">
    <div class="icon">
      <svg width="2rem" height="2rem">
          <use href="${icons}#run"></use>
      </svg>
    </div>
    ${name}
  </div>
  <div class="info">
    <div class="burned-calories">Burned calories: <span class="value">${burnedCalories} / ${time} min</span></div>
    <div class="body-part">Body part: <span class="value">${bodyPart}</span></div>
    <div class="target">Target: <span class="value">${target}</span></div>
  </div>
  `;
    list.appendChild(li);

    const start = li.querySelector(".start");
    start.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(exercise._id);
    });
  });
  container.appendChild(list);
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
  if (event.target?.classList.contains('remove-btn')) {
    const id = event.target.getAttribute('data-id');
    removeExerciseFromFavorites(id);
  }
});
