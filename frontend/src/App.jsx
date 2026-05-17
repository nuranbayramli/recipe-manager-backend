import { Routes, Route, Link } from "react-router-dom";

import RecipeListPage from "./pages/RecipeListPage";
import RecipeFormPage from "./pages/RecipeFormPage";
import IngredientListPage from "./pages/IngredientListPage";
import IngredientFormPage from "./pages/IngredientFormPage";

function App() {
  return (
    <div className="container">
      <h1>Recipe Manager</h1>

      <nav>
        <Link to="/">Recipes</Link>
        <Link to="/recipes/create">Create Recipe</Link>
        <Link to="/ingredients">Ingredients</Link>
        <Link to="/ingredients/create">Create Ingredient</Link>
      </nav>

      <Routes>
        <Route path="/" element={<RecipeListPage />} />
        <Route path="/recipes/create" element={<RecipeFormPage />} />
        <Route path="/recipes/:id/edit" element={<RecipeFormPage />} />

        <Route path="/ingredients" element={<IngredientListPage />} />
        <Route path="/ingredients/create" element={<IngredientFormPage />} />
        <Route path="/ingredients/:id/edit" element={<IngredientFormPage />} />
      </Routes>
    </div>
  );
}

export default App;