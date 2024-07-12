import { useEffect, useState } from 'react';
import { fetchRecipes } from '../utils/API';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        // Example query 'Risotto'
        const data = await fetchRecipes('Risotto'); 
        setRecipes(data);
      } catch (error) {
        // Set recipes to empty array or handle error state
        console.error('Error loading recipes:', error);
        setRecipes([]); 
      }
    };
    loadRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;