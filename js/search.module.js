import { displayMeals, hideAll } from "./utils.module.js";

const searchByNameInput = $("#searchByNameInput");
const searchByFirstLetterInput = $("#searchByFirstLetterInput");
const dataContainer = $("#searchResult");

searchByNameInput.on("input", async function () {
  dataContainer.html(
    `<div class="text-center public-loading"><i class="fa-solid fa-spinner fa-spin fa-2x"></i></div>`
  );

  const meals = await searchByName($(this).val());
  displayMeals(meals, dataContainer);
});

searchByFirstLetterInput.on("input", async function () {
  dataContainer.html(
    `<div class="text-center public-loading"><i class="fa-solid fa-spinner fa-spin fa-2x"></i></div>`
  );
  const meals = await searchByFirstLetter($(this).val());
  displayMeals(meals, dataContainer);
});

export const showSearchPage = () => {
  hideAll();
  $("#searchPage").fadeIn(0);
};

export const searchByName = async (name = "") => {
  disableInput();
  try {
    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      ),
      result = await res.json();

    return result.meals;
  } catch (error) {
    return false;
  } finally {
    unDesableInput("name");
  }
};

export const searchByFirstLetter = async (firstLetter) => {
  disableInput();
  try {
    const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
      ),
      result = await res.json();

    return result.meals;
  } catch (error) {
    return false;
  } finally {
    unDesableInput("first");
  }
};

const disableInput = () => {
  $("#searchPage input").attr("disabled", true);
};

const unDesableInput = (input) => {
  $("#searchPage input").attr("disabled", false);
  switch (input) {
    case "name":
      $("#searchPage input[name='search-by-name']").focus();
      break;

    case "first":
      $("#searchPage input[name='search-by-first-letter']").focus();
      break;
  }
};
