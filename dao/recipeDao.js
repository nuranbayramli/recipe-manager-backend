const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/recipes.json");

function readRecipes() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeRecipes(recipes) {
  fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));
}

function getAll() {
  return readRecipes();
}

function create(recipeData) {
  const recipes = readRecipes();

  const newRecipe = {
    id: Date.now().toString(),
    name: recipeData.name,
    description: recipeData.description,
    preparationTime: recipeData.preparationTime,
    instructions: recipeData.instructions
  };

  recipes.push(newRecipe);
  writeRecipes(recipes);

  return newRecipe;
}

function update(id, recipeData) {
  const recipes = readRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === id);

  if (index === -1) return null;

  recipes[index] = {
    ...recipes[index],
    ...recipeData,
    id
  };

  writeRecipes(recipes);
  return recipes[index];
}

function remove(id) {
  const recipes = readRecipes();
  const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);

  if (recipes.length === filteredRecipes.length) return false;

  writeRecipes(filteredRecipes);
  return true;
}

module.exports = {
  getAll,
  create,
  update,
  remove
};
