import Api from "./api.js";

const api = new Api({});

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
      localStorage.setItem("favorite", JSON.stringify(JSON.stringify([id])));
    }
    console.log("fav button");
  });
}

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

export function openModal(id) {
  document.querySelector(".ex-modal").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
  updateModal(id);
}

document.querySelector(".overlay").addEventListener("click", () => {
  document.querySelector(".ex-modal").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
});
