const express = require("express");
const router = express();
const axios = require("axios");
const bodyParser = require("body-parser");

dairyIngredients = [
  "Cream",
  "Cheese",
  "Milk",
  "Butter",
  "Creme",
  "Ricotta",
  "Mozzarella",
  "Custard",
  "Cream Cheese",
];
glutenIngredients = ["Flour", "Bread", "spaghetti", "Biscuits", "Beer"];
let dairyGlutenIngredients = [].concat(glutenIngredients, dairyIngredients);
checkCommonsItems = function (arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (
        arr1[i] == arr2[j] ||
        arr1[i] == arr2[j].toLowerCase() ||
        arr1[i].search(arr2[j]) != -1 ||
        arr1[i].search(arr2[j].toLowerCase()) != -1
      ) {
        return true;
      }
    }
  }
  return false;
};

router.get("/recipes/:ingredientName", (req, res) => {
  let Gluten = req.query.gluten;
  let Dairy = req.query.dairy;
  axios
    .get(
      `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/${req.params.ingredientName}`
    )
    .then((recipe) => {
      let Recipes = initDataRecipes(recipe);
      let RecipesWithoutGluten = [];
      let RecipesWithoutDairy = [];
      let bothGletenDairyR = [];
      for (let recipeData of Recipes) {
        if (!checkCommonsItems(recipeData.ingredients, glutenIngredients)) {
          RecipesWithoutGluten.push(recipeData);
        }
        if (!checkCommonsItems(recipeData.ingredients, dairyIngredients)) {
          RecipesWithoutDairy.push(recipeData);
        }
        if (
          !checkCommonsItems(recipeData.ingredients, dairyGlutenIngredients)
        ) {
          bothGletenDairyR.push(recipeData);
        }
      }
      if (Gluten == "true" && Dairy == "false") {
        res.send(RecipesWithoutGluten);
      } else if (Dairy == "true" && Gluten == "false") {
        console.log(RecipesWithoutDairy);
        res.send(RecipesWithoutDairy);
      } else if (Gluten == "true" && Dairy == "true") {
        res.send(bothGletenDairyR);
      } else {
        res.send(recipe.data.results);
      }
    });
});

initDataRecipes = function (recipe) {
  let filterDataRecipes = [];
  let newRecipe = {};
  for (let i = 0; i < recipe.data.results.length; i++) {
    newRecipe = {};
    newRecipe["idMeal"] = recipe.data.results[i].idMeal;
    newRecipe["ingredients"] = recipe.data.results[i].ingredients;
    newRecipe["title"] = recipe.data.results[i].title;
    newRecipe["thumbnail"] = recipe.data.results[i].thumbnail;
    newRecipe["href"] = recipe.data.results[i].href;
    filterDataRecipes.push(newRecipe);
  }
  return filterDataRecipes;
};

module.exports = router;
