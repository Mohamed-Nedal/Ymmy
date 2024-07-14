import { getArea } from "./area.module.js";
import { getCategories } from "./categories.module.js";
import { showContactUs } from "./contact.module.js";
import { showMealDetails } from "./details.module.js";
import { getIngredients } from "./ingredients.module.js";
import { showSearchPage } from "./search.module.js";

export const hideAll = () => {
  $(".page").fadeOut(0);
};

export const showMealsGallery = (meals) => {
  hideAll();
  $("#showMealsPage").fadeIn(0);
  displayMeals(meals);
};

export const displayMeals = (meals, pos = $("#mealsGallery")) => {
  if (!meals) {
    pos.html(
      `<div class="text-center alert alert-danger">Faild Get Meals!!!</div>`
    );
    return;
  }

  if (meals.length == 0) {
    pos.html(
      `<div class="text-center alert alert-warning">Not Found Meals!!!</div>`
    );
    return;
  }

  let content = "";
  for (let i = 0; i < meals.length; i++) {
    content += `<div class="col-md-3">
                  <div class="meal-item show-meal-details" data-id="${meals[i].idMeal}" >
                    <img src=${meals[i].strMealThumb} alt="${meals[i].strMeal}" />
                    <div class="meal-overlay">
                       <h3>${meals[i].strMeal}</h3>
                    </div>
                  </div>
                </div>`;
  }

  pos.html(content);
  $(".show-meal-details").on("click", function () {
    showMealDetails($(this).data("id"));
  });
};

export const showInnerLoading = () => {
  $("#innerLoading").css("display", "flex");
  $("html").css("overflow", "hidden");
};

export const hideInnerLoading = () => {
  $("#innerLoading").css("display", "none");
  $("html").css("overflow", "visible");
};

export const convertPage = (id) => {
  hideAll();

  switch (id) {
    case "#searchPage":
      showSearchPage();
      break;
    case "#catigoriesPage":
      getCategories();
      break;
    case "#areaPage":
      getArea();
      break;
    case "#ingredientsPage":
      getIngredients();
      break;
    case "#contactUs":
      showContactUs();
      break;
  }

  $(".open-close-navbar").click();
};
