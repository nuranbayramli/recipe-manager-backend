const express = require("express");
const cors = require("cors");

const recipeRoutes = require("./routes/recipeRoutes");
const ingredientRoutes = require("./routes/ingredientRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Recipe Manager backend is running" });
});

app.use("/recipes", recipeRoutes);
app.use("/ingredients", ingredientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

