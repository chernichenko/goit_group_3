//favorites

const favoritesList = document.querySelector(".favorites-list");
const noFavoritesMsg = document.querySelector("#no-favorites-msg");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
  noFavoritesMsg.classList.remove("hidden");
} else {
  noFavoritesMsg.classList.add("hidden");

  favorites.forEach((exercise) => {
    const exerciseCard = createExerciseCard(exercise);

    favoritesList.appendChild(exerciseCard);
  });
}

function removeFromFavorites(exercise) {
  const updatedFavorites = favorites.filter(
    (fav) => fav.name !== exercise.name,
  );
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

  window.location.reload();
}
