import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api";

function IngredientListPage() {
  const [ingredients, setIngredients] = useState([]);

  async function loadIngredients() {
    const response = await fetch(`${API_URL}/ingredients`);
    const data = await response.json();

    setIngredients(data);
  }

  async function deleteIngredient(id) {
    await fetch(`${API_URL}/ingredients/${id}`, {
      method: "DELETE"
    });

    loadIngredients();
  }

  useEffect(() => {
    loadIngredients();
  }, []);

  return (
    <div>
      <h2>Ingredients</h2>

      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="card">
          <h3>{ingredient.name}</h3>

          <p>
            Quantity: {ingredient.quantity}
          </p>

          <p>
            Unit: {ingredient.unit}
          </p>

          <p>
            Recipe ID: {ingredient.recipeId}
          </p>

          <div className="actions">
            <Link
              to={`/ingredients/${ingredient.id}/edit`}
            >
              <button>Edit</button>
            </Link>

            <button
              onClick={() =>
                deleteIngredient(ingredient.id)
              }
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IngredientListPage;