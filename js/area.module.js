import {
  hideAll,
  hideInnerLoading,
  showInnerLoading,
  showMealsGallery,
} from "./utils.module.js";

export const getArea = async () => {
  hideAll();
  $("#areaPage").fadeIn(0);
  showInnerLoading();
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const result = await res.json();

    displayArea(result.meals);
  } catch (error) {
    return false;
  } finally {
    hideInnerLoading();
  }
};

const displayArea = (areas) => {
  const dataContainer = $("#areaContainer");

  if (!areas) {
    dataContainer.html(
      `<div class="alert alert-danger text-center">Faild Get Area!!!</div>`
    );
    return;
  }

  if (areas.length < 1) {
    dataContainer.html(
      `<div class="alert alert-warning text-center">Not Found Data!!!</div>`
    );
  }

  let content = "";

  for (let i = 0; i < areas.length; i++) {
    content += `
    <div class="col-md-3 col-6">
            <div class="area-item area-item-action" data-area="${areas[i].strArea}">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${areas[i].strArea}</h3>
            </div>
          </div>
    `;
  }

  dataContainer.html(content);

  $(".area-item-action").on("click", function () {
    getAreaMeals($(this).data("area"));
  });
};
const getAreaMeals = async (area) => {
  showInnerLoading();
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    const result = await res.json();

    showMealsGallery(result.meals);
  } catch (error) {
    showMealsGallery(false);
  } finally {
    hideInnerLoading();
  }
};
