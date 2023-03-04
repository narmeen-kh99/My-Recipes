const apiManager = new APIManager();
const render = new Renderer();

$("#Search").on("click", () => {
  let gluten = $("#glutenB").is(":checked");
  let dairy = $("#dairyB").is(":checked");
  if (gluten == true && dairy == false) {
    apiManager.getRecipesWithoutGluten();
  }
  if (gluten == false && dairy == true) {
    apiManager.getRecipesWithoutDairy();
  }
  if (dairy == true && gluten == true) {
    apiManager.getRecipesWithoutDG();
  }
  if (dairy == false && gluten == false) {
    apiManager.getRecipes();
  }
});
$(document).on("click", "img", function () {
  let firstIngredient = $(this)
    .closest(".Recipes")
    .find("ul li")
    .first()
    .text();
  alert("The first ingredient in the recipe is: " + firstIngredient);
});
