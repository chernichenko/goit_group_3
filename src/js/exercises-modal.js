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

export function updateModal(info) {
  console.log("workout");
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

// }

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
