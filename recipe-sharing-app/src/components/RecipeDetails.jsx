// RecipeDetails.jsx
import { useParams } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipes = useRecipeStore(state => state.recipes);

  // Convert URL id (string) to number for matching
  const recipe = recipes.find(r => r.id === Number(id));

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <div>
      <h2>Recipe Details</h2>
      <p><strong>ID:</strong> {recipe.id}</p> {/* <-- Ensures recipe.id is used */}
      <p><strong>Title:</strong> {recipe.title}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
    </div>
  );
};

export default RecipeDetails;