import Api from "./api";
import {
  FILTERS_BODY_PARTS,
  FILTERS_MUSCLES,
  FILTERS_EQUIPMENT,
} from "./model.js";
import icons from "/images/icons.svg";

const searchContainer = document.querySelector(".exercises .search-container");
const searchContainerInput = document.querySelector(".exercises .search-container input");
const searchContainerIcon = document.querySelector(".exercises .search-container-icon-wrap");
let searchSubmitHandler;
let handleEnterKey;
let activeCategory;

export default class Exercises {
  /**
   * @param {Api} api - API client instance.
   * @param {HTMLElement} container - Container element for the exercises.
   * */
  constructor(api, filter, container, { limit = 10, startCallback } = {}) {
    this.api = api;
    this.filter = filter;
    this.container = container;
    this.limit = limit;
    this.startCallback = startCallback;
    if (!this.startCallback) {
      this.startCallback = (exercise) => {
        console.log("Start button clicked", exercise);
      };
    }
  }

  /**
   * Reset the compoent to the initial state.
   * @param {Object} options - Options for initialization.
   * @param {number} options.page - The page number to display.
   * @returns {Promise<void>} - A promise that resolves when the component is initialized.
   * */
  async resetToFilters({ page = 1 } = {}) {
    if (!this.container) return;

    this.container.innerHTML = "";
    const rs = await this.api.listFilters({
      filter: this.filter,
      page: page,
      limit: this.limit,
    });
    const { results: filters, totalPages } = rs;
    this.#renderFiltersCards(filters);
    this.#renderFiltersPagination(page, totalPages);
  }

  /**
   * a private method to render the filters cards.
   * */
  #renderFiltersCards(filters) {
    const list = document.createElement("ul");
    list.classList.add("filters-list");

    if (searchSubmitHandler) {
      searchContainerIcon.removeEventListener("click", searchSubmitHandler);
      searchContainerInput.removeEventListener("keydown", handleEnterKey);
    }
  
    searchSubmitHandler = (e) => {
      e.preventDefault();
      if (!activeCategory) return;

      const keyword = searchContainerInput.value;
      this.resetToExercises({ filter: activeCategory, keyword });
    };

    handleEnterKey = (e) => {
      if (e.key === "Enter") {
        searchSubmitHandler(e);
      }
    };
  
    searchContainerIcon.addEventListener("click", searchSubmitHandler);
    searchContainerInput.addEventListener("keydown", handleEnterKey);

    filters.forEach((filter) => {
      const { name, imgURL } = filter;
      const li = document.createElement("li");
      li.classList.add("filter-item");
      const a = document.createElement("a");
      a.classList.add("filter-link");
      a.href = "#";
      a.innerHTML = `
      <div class="filter-icon-wrap">
        <img src="${imgURL}" alt="${name}" class="filter-icon" />
      </div>
      <div class="filter-info">
        <span class="filter-name">${name}</span>
        <span class="filter-category">${this.filter}</span>
      </div>`;
      li.appendChild(a);
      list.appendChild(li);

      a.addEventListener("click", (e) => {
        e.preventDefault();
        activeCategory = name;
        document.querySelector('.exercises-title').innerHTML = `Exercises /<span class="body-parts-title">${name}</span>`;
        this.resetToExercises({ filter: name });
        searchContainerInput.value = '';
        searchContainer.style.display = "block";
      });
    });
    this.container.appendChild(list);
  }

  /**
   * a private method to render the filters pagination.
   * */
  #renderFiltersPagination(page, totalPages) {
    if (totalPages <= 1) {
      return;
    }

    let first = 1;
    let last = totalPages;
    if (totalPages > 3) {
      first = Math.max(1, page - 1);
      last = Math.min(totalPages, first + 2);
    }

    const pagination = document.createElement("ul");
    pagination.classList.add("pagination");
    for (let i = first; i <= last; i++) {
      const item = createPaginationItem({
        content: i,
        isActive: i === page,
        onClick: (page) => this.resetToFilters({ page }),
      });
      pagination.appendChild(item);
    }
    this.container.appendChild(pagination);
  }

  async resetToExercises({ filter, keyword, page = 1 } = {}) {
    this.container.innerHTML = "";
    const params = {
      keyword: keyword,
      page: page,
      limit: this.limit,
    };
    switch (this.filter) {
      case FILTERS_BODY_PARTS:
        params.bodypart = filter;
        break;
      case FILTERS_MUSCLES:
        params.muscles = filter;
        break;
      case FILTERS_EQUIPMENT:
        params.equipment = filter;
        break;
    }
    const rs = await this.api.listExercies(params);
    if (!!rs?.results?.length) {
      this.#renderExercisesCards(rs.results);
      this.#renderExercisesPagination({
        filter,
        keyword,
        page,
        totalPages: rs.totalPages,
      });
    } else {
      this.#renderNoResults();
    }
  }

  #renderNoResults() {
    const message = document.createElement("div");
    message.classList.add("no-results-message");
    message.textContent = "There is no result here";
    this.container.appendChild(message);
  }

  #renderExercisesCards(exercises) {
    const list = document.createElement("ul");
    list.classList.add("exercises-list");
    exercises.forEach((exercise) => {
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
        this.startCallback(exercise);
      });
    });
    this.container.appendChild(list);
  }

  #renderExercisesPagination({ filter, keyword, page, totalPages }) {
    if (totalPages <= 1) {
      return;
    }

    let first = 1;
    let last = totalPages;
    if (totalPages > 3) {
      first = Math.max(1, page - 1);
      last = Math.min(totalPages, first + 2);
    }

    const pagination = document.createElement("ul");
    pagination.classList.add("pagination");

    for (let i = first; i <= last; i++) {
      const item = createPaginationItem({
        content: i,
        isActive: i === page,
        onClick: (page) => this.resetToExercises({ filter, keyword, page }),
      });
      pagination.appendChild(item);
    }
    this.container.appendChild(pagination);
  }
}

const createPaginationItem = ({
  content = "",
  isActive = false,
  onClick,
} = {}) => {
  const item = document.createElement("li");
  item.classList.add("pagination-item");

  if (isActive) {
    item.classList.add("active");
  }

  const a = document.createElement("a");
  a.classList.add("pagination-link");
  a.href = "#";
  a.innerText = content;
  item.appendChild(a);

  if (onClick) {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      onClick(content);
    });
  }
  return item;
};
