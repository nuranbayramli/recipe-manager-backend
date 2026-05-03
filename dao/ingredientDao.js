const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/ingredients.json");

function readIngredients() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeIngredients(ingredients) {
  fs.writeFileSync(filePath, JSON.stringify(ingredients, null, 2));
}

function getAll() {
  return readIngredients();
}

function create(ingredientData) {
  const ingredients = readIngredients();

  const newIngredient = {
    id: Date.now().toString(),
    recipeId: ingredientData.recipeId,
    name: ingredientData.name,
    quantity: ingredientData.quantity,
    unit: ingredientData.unit
  };

  ingredients.push(newIngredient);
  writeIngredients(ingredients);

  return newIngredient;
}

function update(id, ingredientData) {
  const ingredients = readIngredients();
  const index = ingredients.findIndex((ingredient) => ingredient.id === id);

  if (index === -1) return null;

  ingredients[index] = {
    ...ingredients[index],
    ...ingredientData,
    id
  };

  writeIngredients(ingredients);
  return ingredients[index];
}

function remove(id) {
  const ingredients = readIngredients();
  const filteredIngredients = ingredients.filter((ingredient) => ingredient.id !== id);

  if (ingredients.length === filteredIngredients.length) return false;

  writeIngredients(filteredIngredients);
  return true;
}

module.exports = {
  getAll,
  create,
  update,
  remove
};
