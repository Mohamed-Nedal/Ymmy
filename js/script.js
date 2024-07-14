import { searchByName } from "./search.module.js";
import { convertPage, hideAll, showMealsGallery } from "./utils.module.js";

$(document).ready(async () => {
  await searchByName("").then((meals) => {
    hideAll();
    $(".main-loading").fadeOut(200);
    showMealsGallery(meals);
  });
});

$(".open-close-navbar").on("click", function (e) {
  const nav = $("#navbar");
  nav.toggleClass("open-menu");
  nav.hasClass("open-menu")
    ? $(this).attr("class", "fa-solid fa-xmark open-close-navbar")
    : $(this).attr("class", "fa-solid fa-bars open-close-navbar");
});

$(".nav-link").on("click", function (e) {
  e.preventDefault();
  convertPage($(this).attr("href"));
});
