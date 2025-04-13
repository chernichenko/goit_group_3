import Api from "./api.js";
import "./header.js";
// import { updateModal } from "./exercises-modal.js";
import Exercises from "./exercises.js";
import {
  FILTERS_MUSCLES,
  FILTERS_BODY_PARTS,
  FILTERS_EQUIPMENT,
} from "./model.js";

const api = new Api({});

const tabLinks = document.querySelectorAll(".exercises .tab-link");
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
  { limit: 12 }
);

const equipmentExercises = new Exercises(api, FILTERS_EQUIPMENT, equipmentTab, {
  limit: 12,
});

await musclesExercises.resetToFilters();
await bodyPartsExercises.resetToFilters();
await equipmentExercises.resetToFilters();

const testInfo = {
  name: " bike",
  target: "Abs",
  bodyPart: "Waist",
  equipment: "Body weight",
  popular: 150,
  burnedCalories: "323 / 3 min",
  info: "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They’re essential for maintaining posture, stability, and generating force in many movements.",
  rating: 4,
  id: "64f389465ae26083f39b17a3",
};

function renderStars(rating) {
  const starContainer = document.getElementById("starRating");
  starContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    star.setAttribute("viewBox", "0 0 24 24");
    star.innerHTML = `
      <path d="M12 .587l3.668 7.568L24 9.423l-6 5.854L19.335 24 12 20.013 4.665 24 6 15.277 0 9.423l8.332-1.268z"/>
    `;
    star.style.fill = i <= rating ? "gold" : "#444";
    starContainer.appendChild(star);
  }
}

async function updateModal(id) {
  const info = await api.getExrciseById(id);
  console.log(info);
  const modal = document.querySelector(".ex-modal");
  modal.querySelector(".title").textContent = info.name;
  // renderStars(info.rating);
  modal.querySelector(".mod-img").src = info.gifUrl;
  modal.querySelectorAll(".info")[0].innerHTML =
    `<span>Target:</span> ${info.target}`;
  modal.querySelectorAll(".info")[1].innerHTML =
    `<span>Body Part:</span> ${info.bodyPart}`;
  modal.querySelectorAll(".info")[2].innerHTML =
    `<span>Equipment:</span> ${info.equipment}`;
  modal.querySelectorAll(".info")[3].innerHTML =
    `<span>Popular:</span> ${info.popular}`;
  modal.querySelectorAll(".info")[4].innerHTML =
    `<span>Burned calories:</span> ${info.burnedCalories}`;
  modal.querySelectorAll(".info")[5].textContent = info.description;
  let addFav = document.querySelector("#ex-mod-fav");
  addFav.addEventListener("click", () => {
    let favorites = localStorage.getItem("favorite");

    if (favorites) {
      let arr = JSON.parse(favorites);
      let set = new Set(arr);
      set.add(id);
      localStorage.setItem("favorite", JSON.stringify(Array.from(set)));
    } else {
      localStorage.setItem("favorite", JSON.stringify([info.id]));
    }
    console.log("fav button");
  });
}

document.querySelector(".test").addEventListener("click", () => {
  document.querySelector(".ex-modal").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
  updateModal("64f389465ae26083f39b17a3");
});

document.querySelector(".overlay").addEventListener("click", () => {
  document.querySelector(".ex-modal").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
});
