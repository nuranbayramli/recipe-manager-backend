import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);

  async function loadRecipes() {
    const response = await fetch(`${API_URL}/recipes`);
    const data = await response.json();
    setRecipes(data);
  }

  async function deleteRecipe(id) {
    await fetch(`${API_URL}/recipes/${id}`, {
      method: "DELETE"
    });

    loadRecipes();
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <div key={recipe.id} className="card">
          <h3>{recipe.name}</h3>

          <p>{recipe.description}</p>

          <p>
            Preparation time: {recipe.preparationTime} min
          </p>

          <div className="actions">
            <Link to={`/recipes/${recipe.id}/edit`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => deleteRecipe(recipe.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeListPage;