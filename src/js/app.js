import Api from "./api.js";
import "./header.js";
import { updateModal } from "./exercises-modal.js";

import Exercises from "./exercises.js";
import {
  FILTERS_MUSCLES,
  FILTERS_BODY_PARTS,
  FILTERS_EQUIPMENT,
} from "./model.js";

const api = new Api({});

const tabLinks = document.querySelectorAll(".exercises .tab-link");
const tabContent = document.querySelector(".exercises .tab-content");
const musclesTab = document.querySelector(".exercises .muscles-tab");
const bodyPartsTab = document.querySelector(".exercises .body-parts-tab");
const equipmentTab = document.querySelector(".exercises .equipment-tab");
const searchContainer = document.querySelector(".exercises .search-container");
const bodyPartsTitle = document.querySelector(".exercises .body-parts-title");
const quoteAuthor = document.querySelector(".quote-author");
const quoteText = document.querySelector(".quote-text");
const modal = document.getElementById("rating-backdrop");
const closeBtn = document.getElementById("close-modal");
const ratingInputs = document.querySelectorAll('.stars input[type="radio"]');
const ratingValue = document.getElementById("rating-value");

export function openRatingModal() {
  modal.classList.remove("is-hidden");
}

closeBtn.addEventListener("click", () => modal.classList.add("is-hidden"));

ratingInputs.forEach((input) => {
  input.addEventListener("change", () => {
    ratingValue.textContent = `${parseFloat(input.value).toFixed(1)}`;
  });
});

tabLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    tabLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");

    const selectedTab = this.getAttribute("data-tab");

    if (selectedTab === "body-parts") {
      searchContainer.style.display = "block";
      bodyPartsTitle.style.display = "inline-block";
    } else {
      searchContainer.style.display = "none";
      bodyPartsTitle.style.display = "none";
    }

    switch (selectedTab) {
      case "muscles":
        musclesTab.style.display = "block";
        bodyPartsTab.style.display = "none";
        equipmentTab.style.display = "none";
        break;
      case "body-parts":
        musclesTab.style.display = "none";
        bodyPartsTab.style.display = "block";
        equipmentTab.style.display = "none";
        break;
      case "equipment":
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

const musclesExercises = new Exercises(api, FILTERS_MUSCLES, musclesTab, {
  limit: 12,
  startCallback: (exercise) => {
    alert(`Exercise ${exercise.name} has been started!`);
  },
});

const bodyPartsExercises = new Exercises(
  api,
  FILTERS_BODY_PARTS,
  bodyPartsTab,
  { limit: 12 },
);

const equipmentExercises = new Exercises(api, FILTERS_EQUIPMENT, equipmentTab, {
  limit: 12,
});

await musclesExercises.resetToFilters();
await bodyPartsExercises.resetToFilters();
await equipmentExercises.resetToFilters();
