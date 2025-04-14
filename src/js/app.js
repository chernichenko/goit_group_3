import Api from "./api.js";
import "./header.js";
import "./footer-subscribe.js";
import "./rating-modal.js";
import Exercises from "./exercises.js";
import {
  FILTERS_MUSCLES,
  FILTERS_BODY_PARTS,
  FILTERS_EQUIPMENT,
} from "./model.js";
import { openModal } from "./exercises-modal.js";

const api = new Api({});

const tabLinks = document.querySelectorAll(".exercises .tab-link");
const musclesTab = document.querySelector(".exercises .muscles-tab");
const bodyPartsTab = document.querySelector(".exercises .body-parts-tab");
const equipmentTab = document.querySelector(".exercises .equipment-tab");
const searchContainer = document.querySelector(".exercises .search-container");
const quoteAuthor = document.querySelector(".quote-author");
const quoteText = document.querySelector(".quote-text");
const modal = document.getElementById("rating-backdrop");
const closeBtn = document.getElementById("close-modal");
const ratingInputs = document.querySelectorAll('.stars input[type="radio"]');
const ratingValue = document.getElementById("rating-value");

export function openRatingModal(exerciseId) {
  modal.classList.remove("is-hidden");
  modal.dataset.exerciseId = exerciseId;
}

closeBtn.addEventListener("click", () => modal.classList.add("is-hidden"));

ratingInputs.forEach((input) => {
  input.addEventListener("change", () => {
    ratingValue.textContent = `${parseFloat(input.value).toFixed(1)}`;
  });
});

tabLinks.forEach((link) => {
  link.addEventListener("click", async function (e) {
    e.preventDefault();

    tabLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
    searchContainer.style.display = "none";

    const selectedTab = this.getAttribute("data-tab");

    switch (selectedTab) {
      case "muscles":
        await musclesExercises.resetToFilters();
        musclesTab.style.display = "block";
        bodyPartsTab.style.display = "none";
        equipmentTab.style.display = "none";
        break;
      case "body-parts":
        await bodyPartsExercises.resetToFilters();
        musclesTab.style.display = "none";
        bodyPartsTab.style.display = "block";
        equipmentTab.style.display = "none";
        break;
      case "equipment":
        await equipmentExercises.resetToFilters();
        musclesTab.style.display = "none";
        bodyPartsTab.style.display = "none";
        equipmentTab.style.display = "block";
        break;
    }
  });
});

const quoteOfTheDay = await api.getQuoteOfTheDay();

quoteAuthor.textContent = quoteOfTheDay.author;
quoteText.textContent = quoteOfTheDay.quote;

const musclesExercises = new Exercises(
  api,
  FILTERS_MUSCLES,
  musclesTab,
  {
    limit: 12,
    startCallback: (exercise) => {
      openModal(exercise._id);
    },
  },
);

const bodyPartsExercises = new Exercises(
  api,
  FILTERS_BODY_PARTS,
  bodyPartsTab,
  {
    limit: 12,
    startCallback: (exercise) => {
      openModal(exercise._id);
    },
  },
);

const equipmentExercises = new Exercises(
  api,
  FILTERS_EQUIPMENT,
  equipmentTab,
  {
    limit: 12,
    startCallback: (exercise) => {
      openModal(exercise._id);
    },
  },
);

await musclesExercises.resetToFilters();
