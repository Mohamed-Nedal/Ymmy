import {
  hideAll,
  hideInnerLoading,
  showInnerLoading,
  showMealsGallery,
} from "./utils.module.js";

export const getIngredients = async () => {
  hideAll();
  $("#ingredientsPage").fadeIn(0);
  showInnerLoading();
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    const result = await res.json();

    displayIngredients(result.meals.slice(0, 20));
  } catch (error) {
    return false;
  } finally {
    hideInnerLoading();
  }
};

const displayIngredients = (ingredients) => {
  const dataContainer = $("#ingredientsContainer");

  if (!ingredients) {
    dataContainer.html(
      `<div class="alert alert-danger text-center">Faild Get Area!!!</div>`
    );
    return;
  }

  if (ingredients.length < 1) {
    dataContainer.html(
      `<div class="alert alert-warning text-center">Not Found Data!!!</div>`
    );
  }

  let content = "";

  for (let i = 0; i < ingredients.length; i++) {
    content += `
      <div class="col-md-3">
            <div class="ingredients-item" data-ingredient="${ingredients[i].strIngredient}">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3>${ingredients[i].strIngredient}</h3>
              <p>
                ${ingredients[i].strDescription}
              </p>
            </div>
          </div>
      `;
  }

  dataContainer.html(content);

  $(".ingredients-item").on("click", function () {
    getIngredientsMeals($(this).data("ingredient"));
  });
};

const getIngredientsMeals = async (ind) => {
  showInnerLoading();
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ind}`
    );
    const result = await res.json();

    showMealsGallery(result.meals);
  } catch (error) {
    showMealsGallery(false);
  } finally {
    hideInnerLoading();
  }
};
