import {
  displayMeals,
  hideAll,
  hideInnerLoading,
  showInnerLoading,
  showMealsGallery,
} from "./utils.module.js";

export const getCategories = async () => {
  hideAll();
  $("#categoriesPage").fadeIn(0);
  showInnerLoading();
  try {
    const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      ),
      result = await res.json();
    displayCategories(result.categories);
  } catch (error) {
    displayCategories(false);
  } finally {
    hideInnerLoading();
  }
};

export const displayCategories = (categories) => {
  const dataContainer = $("#categoriesContainer");

  if (!categories) {
    dataContainer.html(
      `<div class="alert alert-danger text-center">Faild Get Categories!!!</div>`
    );
    return;
  }

  if (categories.length < 1) {
    dataContainer.html(
      `<div class="alert alert-warning text-center">Not Found Data!!!</div>`
    );
  }

  let content = "";

  for (let i = 0; i < categories.length; i++) {
    content += `
    <div class="col-md-3">
            <div class="meal-item show-category-item" data-category="${categories[i].strCategory}">
              <img src="${categories[i].strCategoryThumb}" alt="${categories[i].strCategory}" />

              <div class="meal-overlay">
                <h3>${categories[i].strCategory}</h3>
                <p>
                ${categories[i].strCategoryDescription}
                </p>
              </div>
            </div>
          </div>
    `;
  }

  dataContainer.html(content);

  $(".show-category-item").on("click", function () {
    getCategoryMeals($(this).data("category"));
  });
};

const getCategoryMeals = async (cat) => {
  showInnerLoading();
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    );
    const result = await res.json();
    showMealsGallery(result.meals);
  } catch (error) {
    console.log("Error");
  } finally {
    hideInnerLoading();
  }
};
