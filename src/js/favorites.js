const noFavoritesMsg = document.querySelector("#no-favorites-msg");


const favorites = JSON.parse(localStorage.getItem("favorites")) || [];


if (favorites.length === 0) {
  
  noFavoritesMsg.classList.remove("hidden");
} else {
  
  noFavoritesMsg.classList.add("hidden");
}
