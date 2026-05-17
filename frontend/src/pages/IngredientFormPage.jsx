import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../api";

function IngredientFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [recipes, setRecipes] = useState([]);

  const [formData, setFormData] = useState({
    recipeId: "",
    name: "",
    quantity: "",
    unit: ""
  });

  async function loadRecipes() {
    const response = await fetch(`${API_URL}/recipes`);
    const data = await response.json();

    setRecipes(data);
  }

  async function loadIngredients() {
    const response = await fetch(`${API_URL}/ingredients`);
    const ingredients = await response.json();

    const ingredient = ingredients.find(
      (i) => i.id === id
    );

    if (ingredient) {
      setFormData(ingredient);
    }
  }

  useEffect(() => {
    loadRecipes();

    if (isEdit) {
      loadIngredients();
    }
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const method = isEdit ? "PUT" : "POST";

    const url = isEdit
      ? `${API_URL}/ingredients/${id}`
      : `${API_URL}/ingredients`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    navigate("/ingredients");
  }

  return (
    <div>
      <h2>
        {isEdit
          ? "Edit Ingredient"
          : "Create Ingredient"}
      </h2>

      <form onSubmit={handleSubmit}>
        <select
          name="recipeId"
          value={formData.recipeId}
          onChange={handleChange}
        >
          <option value="">
            Select recipe
          </option>

          {recipes.map((recipe) => (
            <option
              key={recipe.id}
              value={recipe.id}
            >
              {recipe.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="name"
          placeholder="Ingredient name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          type="text"
          name="unit"
          placeholder="Unit"
          value={formData.unit}
          onChange={handleChange}
        />

        <button type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default IngredientFormPage;