// get elements
const recipesContainer = document.getElementById("recipes-container");
const newRecipeFormContainer = document.getElementById("new-recipe-form");

// API URL
const API_URL = "http://localhost:8080/api/demo/recipes";

// fetch recipes
const fetchAllRecipes = async () => {
  try {
    const response = await fetch(API_URL);
    const recipes = await response.json();
    console.log(recipes);
    return recipes;
  } catch (error) {
    console.log(error);
  }
};

// fetch single recipe
const fetchSingleRecipe = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const recipe = await response.json();
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe");
    recipeElement.innerHTML = `
            <h4>${recipe.title}</h4>
            <p>${recipe.instructions}</p>
        `;
    recipesContainer.appendChild(recipeElement);
  } catch (error) {
    console.log(error);
  }
};

// create new recipe
const createNewRecipe = async (title, image_url, instructions) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ title, image_url, instructions }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const recipe = await response.json();
    console.log(recipe);
    fetchAllRecipes();
  } catch (error) {
    console.log(error);
  }
};

// remove recipe
const removeRecipe = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    const recipe = await response.json();
    console.log(recipe);
    fetchAllRecipes();

    // reload the window
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

// // render all recipes
const renderAllRecipes = (recipeList) => {
  if (!recipeList || recipeList.length === 0) {
    recipesContainer.innerHTML = "<h3>No recipes found</h3>";
    return;
  }

  recipesContainer.innerHTML = "";

  recipeList.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("recipe-card");
    recipeElement.innerHTML = `
            <h4>${recipe.title}</h4>
            <img src="${recipe.image_url}" alt="${recipe.title}">
            <p>${recipe.instructions}</p>
            <button class="delete-button" data-id="${recipe.id}">Remove</button>
            <button class="detail-button" data-id="${recipe.id}">See Details</button>
        `;
    recipesContainer.appendChild(recipeElement);

    let deleteButton = recipeElement.querySelector(".delete-button");
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      removeRecipe(recipe.id);
    });

    let detailButton = recipeElement.querySelector(".detail-button");
    detailButton.addEventListener("click", (event) => {
      event.preventDefault();
      renderSingleRecipe(recipe);
    });
  });
};

// render single recipe
const renderSingleRecipe = (recipe) => {
  if (!recipe || recipe.length === 0) {
    recipesContainer.innerHTML = "<h3>No recipe found</h3>";
    return;
  }

  let recipeHTML = `
        <div class="single-recipe-view">
            <div class="recipe">
                <h4>${recipe.title}</h4>
                <img src="${recipe.image_url}" alt="${recipe.title}">
                <p>${recipe.instructions}</p>
            </div>

            <button class="back-button">Back</button>
        </div>`;
  recipesContainer.innerHTML = recipeHTML;

  let backButton = recipesContainer.querySelector(".back-button");
  backButton.addEventListener("click", async () => {
    const recipes = await fetchAllRecipes();
    renderAllRecipes(recipes);
  });
};

// create new recipe form
const createNewRecipeForm = () => {
  let formHtml = `
    <form>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" placeholder="Title">
    <label for="image_url">Image URL</label>
    <input type="text" id="image_url" name="image_url" placeholder="Image URL">
    <label for="instructions">Instructions</label>
    <textarea id="instructions" name="instructions" placeholder="Instructions"></textarea>
    <button type="submit">Create</button>
    </form>
    `;
  newRecipeFormContainer.innerHTML = formHtml;

  let form = newRecipeFormContainer.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let recipeData = {
      title: form.title.value,
      image_url: form.image_url.value,
      instructions: form.instructions.value,
    };

    await createNewRecipe(
      recipeData.title,
      recipeData.image_url,
      recipeData.instructions
    );

    const recipes = await fetchAllRecipes();
    renderAllRecipes(recipes);

    form.title.value = "";
    form.image_url.value = "";
    form.instructions.value = "";
  });
};

const init = async () => {
  const recipes = await fetchAllRecipes();
  renderAllRecipes(recipes);

  createNewRecipeForm();
};

init();
