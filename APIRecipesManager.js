class APIManager {
  constructor() {
    this.data = [];
  }

  getRecipesWithoutGluten() {
    const ingredient = $("#ingredient-input").val();
    return $.get(
      `http://localhost:3000/recipes/${ingredient}?gluten=${true}&dairy=${false}`
    ).then((result) => {
      render.RenderRecipesOfIngredent(result);
    });
  }

  getRecipesWithoutDairy() {
    const ingredient = $("#ingredient-input").val();
    return $.get(
      `http://localhost:3000/recipes/${ingredient}?gluten=${false}&dairy=${true}`
    ).then((result) => {
      render.RenderRecipesOfIngredent(result);
    });
  }
  getRecipesWithoutDG() {
    const ingredient = $("#ingredient-input").val();
    return $.get(
      `http://localhost:3000/recipes/${ingredient}?gluten=${true}&dairy=${true}`
    ).then((result) => {
      render.RenderRecipesOfIngredent(result);
    });
  }
  getRecipes() {
    const ingredient = $("#ingredient-input").val();
    return $.get(`http://localhost:3000/recipes/${ingredient}`).then(
      (result) => {
        render.RenderRecipesOfIngredent(result);
      }
    );
  }
}
