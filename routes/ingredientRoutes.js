const express = require("express");
const router = express.Router();

const ingredientDao = require("../dao/ingredientDao");
const recipeDao = require("../dao/recipeDao");

router.post("/", (req, res) => {
  const { recipeId, name, quantity, unit } = req.body;

  if (!recipeId || !name || !quantity || !unit) {
    return res.status(400).json({ error: "Missing required ingredient data" });
  }

  const recipes = recipeDao.getAll();
  const recipeExists = recipes.some((recipe) => recipe.id === recipeId);

  if (!recipeExists) {
    return res.status(404).json({ error: "Related recipe not found" });
  }

  const newIngredient = ingredientDao.create({
    recipeId,
    name,
    quantity,
    unit
  });

  res.status(201).json(newIngredient);
});

router.get("/", (req, res) => {
  const ingredients = ingredientDao.getAll();
  res.json(ingredients);
});

router.put("/:id", (req, res) => {
  const updatedIngredient = ingredientDao.update(req.params.id, req.body);

  if (!updatedIngredient) {
    return res.status(404).json({ error: "Ingredient not found" });
  }

  res.json(updatedIngredient);
});

router.delete("/:id", (req, res) => {
  const deleted = ingredientDao.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Ingredient not found" });
  }

  res.json({ message: "Ingredient deleted successfully" });
});

module.exports = router;
