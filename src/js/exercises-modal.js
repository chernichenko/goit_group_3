export function updateModal(info) {
  document.querySelector(".title").textContent = info.name;
  document.querySelector(".target").innerHTML =
    `<span>Target:</span> ${info.target}`;
  document.querySelector(".body-part)").innerHTML =
    `<span>Body Part:</span> ${info.bodyPart}`;
  document.querySelector(".equipment").innerHTML =
    `<span>Equipment:</span> ${info.equipment}`;
  document.querySelector(".popular").innerHTML =
    `<span>Popular:</span> ${info.popular}`;
  document.querySelector(".calories").innerHTML =
    `<span>Burned calories:</span> ${info.burnedCalories}`;
  document.querySelector(".info").textContent = info.info;

  const stars = "★".repeat(info.rating) + "☆".repeat(5 - info.rating);
  document.querySelector(".stars").textContent = stars;
}
