import { hideAll, hideInnerLoading, showInnerLoading } from "./utils.module.js";

export const showMealDetails = async (id) => {
  hideAll();
  showInnerLoading();
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const result = await res.json();

    displayMealDetails(result.meals[0]);
  } catch (error) {
    console.log(error);
  } finally {
    hideInnerLoading();
    $("#detailsPage").fadeIn(0);
  }
};

const displayMealDetails = (meal) => {
  let tags = meal.strTags && meal.strTags.split(",");

  if (!tags) tags = [];

  let strTags = "";
  for (let i = 0; i < tags.length; i++) {
    strTags += `
        <span class="rec alert alert-danger m-2 py-1 px-2">${tags[i]}</span>`;
  }

  let ingredients = "";

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<span class="rec alert alert-info m-2 py-1 px-2">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</span>`;
    }
  }

  $("#detailsData").html(`
        <div class="col-md-4">
            <div class="cover">
              <div class="img">
                <img
                  class="w-100"
                  src=${meal.strMealThumb}
                  alt=${meal.strMeal}
                />
              </div>
              <h1>${meal.strMeal}</h1>
            </div>
          </div>
          <div class="col-md-8">
            <ul class="info">
              <li>
                <h2>Instructions</h2>
                <p>
                  ${meal.strInstructions}
                </p>
              </li>
              <li><span>Area: </span> ${meal.strArea}</li>
              <li><span>Category: </span> ${meal.strCategory}</li>
              <li>
                <span>Recipes: </span>
                <div class="recipes">
                   ${ingredients}
                </div>
              </li>
              ${
                tags.length > 1
                  ? `<li>
                <span>Tags: </span>
                <div class="tags recipes">
                ${strTags}
                </div>
              </li>`
                  : ""
              }
              <li>
                <a href="${
                  meal.strSource
                }" class="tag-btn btn btn-success" target="_blank">Source</a>
                <a href="${
                  meal.strYoutube
                }" class="tag-btn btn btn-danger" target="_blank">Youtube</a>
              </li>
            </ul>
          </div>
        `);
};
