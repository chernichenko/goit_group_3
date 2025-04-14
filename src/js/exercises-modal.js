import Api from "./api.js";

const api = new Api({});

const info = {
  name: " bike",
  target: "Abs",
  bodyPart: "Waist",
  equipment: "Body weight",
  popular: 150,
  burnedCalories: " 323 / 3 min",
  info: "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They’re essential for maintaining posture, stability, and generating force in many movements.",
  rating: 4,
  id: 6,
};

// export function updateModal(info) {
//   console.log("workout");
//   document.querySelector(".title").textContent = info.name;
//   document.querySelector(".target").innerHTML =
//     `<span>Target:</span> ${info.target}`;
//   document.querySelector(".body-part)").innerHTML =
//     `<span>Body Part:</span> ${info.bodyPart}`;
//   document.querySelector(".equipment").innerHTML =
//     `<span>Equipment:</span> ${info.equipment}`;
//   document.querySelector(".popular").innerHTML =
//     `<span>Popular:</span> ${info.popular}`;
//   document.querySelector(".calories").innerHTML =
//     `<span>Burned calories:</span> ${info.burnedCalories}`;
//   document.querySelector(".info").textContent = info.info;

//   const stars = "★".repeat(info.rating) + "☆".repeat(5 - info.rating);
//   document.querySelector(".stars").textContent = stars;

// // }

// export default class ExModal {
//     constructor (id) {
//       console.log("modal opende");
//       document.querySelector("#ex-modal").innerHTML =
//       ` <div class="overlay" id="overlay"></div>
//         <div class="ex-modal">
//           <img src="https://s3-alpha-sig.figma.com/img/0da6/2836/fb5d01e60d847487f4c4a4def5ccb8b1?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iP9qdlDTD30MGHMCsmB0UosJQ-jmHhzd5VRRAr9UR6gLKjekEjF4i6-D2YO90804n290sqNygdhGdooDvw4Jin1Iz-bjt4C9d-UWSccKF30AoTraYbEdl83baGN4o-SnYvVwBUSzJ5WAR7Z67xiC0XnctYf0HaU04AEMM5CoEpYvyiM2jD1nOosctCi~xKXOJfDP19Q04xDpecoofQ5tsOl4--brN4g58U3w-~8Kt7ERtHNp4cyxhEPy0bWrGeBzBZ4AjBc9N5gwoa1nafMUyxDkORXbdnJbemIWI-BEizp~rxIq8X4aUkvyKVYQFKXMbZUJP6GKjPk2WXcWiL0ytA__" alt="Exercise Image" />
//           <div class="title"> bake</div>
//           <div class="stars">★★★★☆</div>
//           <div class="info" id="">Target: Abs</div>
//           <div class="info "><span>Body Part:</span> Waist</div>
//           <div class="info"><span>Equipment:</span> Body weight</div>
//           <div class="info"><span>Popular:</span> 150</div>
//           <div class="info"><span>Burned calories:</span> 323 / 3 min</div>
//           <p class="info">
//             This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They’re
//             essential for maintaining posture, stability, and generating force in many movements.
//           </p>
//           <div class="buttons">
//             <button class = "btn btn-secondary" id="ex-mod-fav">
//               Add to favourites
//               <svg class="icon" width="1.75rem" height="1.75rem" fill="black" fill-opacity="0.5">
//                 <use href="./images/heart.svg"></use>
//               </svg>
//             </button>
//             <button class = "btn btn-primaryy" onclick="alert('Rating sent')">Give a rating</button>
//         </div>
//       </div>`
//       this.id = is;
//       this.title = "";
//       this.target = "";
//       this.bodyPart = "";
//       this.equipment = "";
//       this.popular = "";
//       this.calories = "";
//       this.info = "";
//       this.rating = "";
//     }

//     // function open () {
//     //   console.log('hi');
//     // }

//     // // let addFav = document.querySelector("#ex-mod-fav");
//     // addFav.addEventListener("click", () => {
//     // localStorage.setItem("favorite", info.id);
//     // console.log("fav button");
//     // updateModal(info);
// });
// }

// function openModal = {
//   let newExModal = new ExModal(5);
// }

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
