import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../api";

function RecipeFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    preparationTime: "",
    instructions: ""
  });

  async function loadRecipes() {
    const response = await fetch(`${API_URL}/recipes`);
    const recipes = await response.json();

    const recipe = recipes.find((r) => r.id === id);

    if (recipe) {
      setFormData(recipe);
    }
  }

  useEffect(() => {
    if (isEdit) {
      loadRecipes();
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
      ? `${API_URL}/recipes/${id}`
      : `${API_URL}/recipes`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    navigate("/");
  }

  return (
    <div>
      <h2>
        {isEdit ? "Edit Recipe" : "Create Recipe"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe name"
          value={formData.name}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="preparationTime"
          placeholder="Preparation time"
          value={formData.preparationTime}
          onChange={handleChange}
        />

        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
        />

        <button type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default RecipeFormPage;