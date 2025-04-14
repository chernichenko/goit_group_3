import Api from "./api.js";
import icons from "/images/icons.svg";
import iziToast from "izitoast";

const api = new Api({});

let giveRatingHandler;
const ratingModal = document.getElementById("rating-backdrop");

function openRatingModal(exerciseId) {
  ratingModal.classList.remove("is-hidden");
  ratingModal.dataset.exerciseId = exerciseId;
}

async function updateModal(id) {
  const info = await api.getExrciseById(id);
  const modal = document.querySelector(".ex-modal");
  modal.querySelector(".title").textContent = info.name;
  renderStars(info.rating);
  modal.querySelector("#mod-img").src = info.gifUrl;
  modal.querySelectorAll(".info, span")[0].innerHTML = `${info.target}`;
  modal.querySelectorAll(".info")[1].innerHTML = `${info.bodyPart}`;
  modal.querySelectorAll(".info")[2].innerHTML = `${info.equipment}`;
  modal.querySelectorAll(".info")[3].innerHTML = `${info.popularity}`;
  modal.querySelectorAll(".info")[4].innerHTML = `${info.burnedCalories}`;
  modal.querySelectorAll(".info")[5].textContent = info.description;
  let addFav = document.querySelector("#ex-mod-fav");

  const favorites = JSON.parse(localStorage.getItem('favorite')) || [];
  const isFavorite = !!favorites.find((item) => item._id === id);

  if (isFavorite) {
    addFav.innerHTML = `
      Remove
      <svg width="20px" height="18px">
        <use href="${icons}#trash"></use>
      </svg>
    `
  } else {
    addFav.innerHTML = `
      Add to favorites
      <svg width="20px" height="18px">
        <use href="${icons}#heart"></use>
      </svg>
    `
  }

  addFav.addEventListener("click", () => {
    const favorites = JSON.parse(localStorage.getItem('favorite')) || [];
    const isFavorite = !!favorites.find((item) => item._id === id);

    if (isFavorite) {
      const updated = favorites.filter(item => item._id !== id);
      if (updated?.length) {
        localStorage.setItem("favorite", JSON.stringify(updated));
      } else {
        localStorage.removeItem("favorite");
      }
    } else {
      if (favorites.length) {
        const newFavoritesArray = [...favorites, info];
        const uniqueFavorites = Array.from(
          new Map(newFavoritesArray.map(item => [item._id, item])).values()
        );
        localStorage.setItem("favorite", JSON.stringify(uniqueFavorites));
      } else {
        localStorage.setItem("favorite", JSON.stringify([info]));
      }
    }

    if (!isFavorite) {
      iziToast.success({
        title: "",
        message: "Added to favorites",
        position: "topRight",
        timeout: 3000,
        backgroundColor: "#64B880",
        messageColor: "#fff",
      });
      addFav.innerHTML = `
        Remove
        <svg width="20px" height="18px">
          <use href="${icons}#trash"></use>
        </svg>
      `
    } else {
      iziToast.error({
        title: "Error",
        message: "Removed from favorites",
        position: "topRight",
        timeout: 3000,
        backgroundColor: "#EF4040",
        messageColor: "#fff",
      });
      addFav.innerHTML = `
        Add to favorites
        <svg width="20px" height="18px">
          <use href="${icons}#heart"></use>
        </svg>
      `
    }
  });

  const giveRatingBtn = document.querySelector("#giveARatingButton");
  if (!giveRatingBtn) return;

  if (giveRatingHandler) {
    giveRatingBtn.removeEventListener("click", giveRatingHandler);
  }

  giveRatingHandler = () => {
    document.querySelector(".mod-n-over").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    
    openRatingModal(info._id);
  };

  giveRatingBtn.addEventListener("click", giveRatingHandler);
}

function renderStars(rating) {
  const starContainer = document.querySelector(".stars");
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

export function openModal(id) {
  document.querySelector(".mod-n-over").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
  updateModal(id);
}

document.querySelector(".overlay")?.addEventListener("click", () => {
  document.querySelector(".mod-n-over").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
});
