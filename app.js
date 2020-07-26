const form = document.getElementById("submit-form");
const searchBox = document.getElementById("search-box");

const showData = (data) => {
  // console.log(data);
  const imgContainer = document.querySelector(".img-container");
  document.querySelector(".show-meal-container").style.display = "flex";
  document.getElementById("searched-keyword").innerText = searchBox.value;
  // data.meals.forEach(item => {
  //   imgContainer.innerHTML = `<img src=${item.strMealThumb} alt=${item.strMeal} >`

  // })
  imgContainer.innerHTML = data.meals
    .map(
      (item) =>
        ` 
        <a href="#go-bot" class="img-div-container">
    <img src=${item.strMealThumb} alt=${item.strMeal} class="img-id" meal-id=${item.idMeal} ">
    <div class="meal-info" meal-id=${item.idMeal} >
        <h2 class="meal-info-title">${item.strMeal}</h2>
    </div>
    </a>
`
    )
    .join("");
};

const showError = (msg) => {
  console.log(msg);
};

const searchTheMeal = (e) => {
  e.preventDefault();
  searchBoxinput = searchBox.value;
  // fetching Data
  if (searchBoxinput.trim()) {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBoxinput}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.meals !== null) {
          showData(data);
        } else {
          showError("Unfortunetly we don't know about this food yet");
        }
      });
  } else {
    // showError : no Data entered
    showError("Please Enter The Food Name First");
  }
};
const showChoosenItem = (item) => {
  //console.log(item)
  const meal = item.meals[0];
  const ingredients = [];
  console.log(meal);
  document.querySelector(".single-meal-container").style.display = "flex";
  document.querySelector(".single-meal-title").innerText = meal.strMeal;
  document.querySelector(".category-item").innerText = meal.strCategory;
  document.querySelector(".category-nationality").innerText = meal.strArea;
  document.querySelector(
    ".single-img-container"
  ).innerHTML = `<img src=${meal.strMealThumb} alt=${meal.strMeal}>`;
  document.querySelector(".instructon-data").innerText = meal.strInstructions;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`
        ${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}
      `);
    } else {
      
    }
  }
  document.querySelector(".ingredients").innerHTML = 
  ingredients.map(item => 
    `<div class="ingredient-item">${item}</div>`
  ).join("")
  console.log(ingredients)
  console.log(document.querySelector(".ingredients"))
//ingredients.map(item => console.log(item))
};
const choosenItem = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => showChoosenItem(data));
};
const imgContainerClicked = (e) => {
  try {
    data = e.path.find(
      (item) =>
        item.classList.contains("meal-info") ||
        item.classList.contains("img-id")
    );
    mealId = data.getAttribute("meal-id");
    // show data
    choosenItem(mealId);
  } catch (err) {
    //got to solve this some other time
  }
};
const showRandomFood = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => showChoosenItem(data));
};
//! what the fuck
form.addEventListener("submit", searchTheMeal);
document
  .querySelector(".img-container")
  .addEventListener("click", imgContainerClicked);
document.getElementById("random-btn").addEventListener("click", showRandomFood);
