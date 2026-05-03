const express = require("express");
const router = express.Router();

const recipeDao = require("../dao/recipeDao");

router.post("/", (req, res) => {
  const { name, description, preparationTime, instructions } = req.body;

  if (!name || !description || !preparationTime || !instructions) {
    return res.status(400).json({ error: "Missing required recipe data" });
  }

  const newRecipe = recipeDao.create({
    name,
    description,
    preparationTime,
    instructions
  });

  res.status(201).json(newRecipe);
});

router.get("/", (req, res) => {
  const recipes = recipeDao.getAll();
  res.json(recipes);
});

router.put("/:id", (req, res) => {
  const updatedRecipe = recipeDao.update(req.params.id, req.body);

  if (!updatedRecipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  res.json(updatedRecipe);
});

router.delete("/:id", (req, res) => {
  const deleted = recipeDao.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  res.json({ message: "Recipe deleted successfully" });
});

module.exports = router;
