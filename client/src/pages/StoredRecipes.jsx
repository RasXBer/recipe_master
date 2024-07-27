// import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_STORED_RECIPES } from '../utils/queries';
import { DELETE_RECIPE } from '../utils/mutations';

const StoredRecipes = () => {
  const { loading, error, data } = useQuery(GET_STORED_RECIPES);
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    refetchQueries: [{ query: GET_STORED_RECIPES }],
  });
  console.log('Data:', data);
  console.log('StoredRecipes:', data?.StoredRecipes);

  const handleDelete = async (id) => {
    try {
      await deleteRecipe({ variables: { id } });
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching recipes...</p>;

  const recipes = data?.StoredRecipes || [];

  return (
    <div className="container">
      <h1 className="text-center mb-5">Stored Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">Ingredients: {recipe.ingredients.join(', ')}</p>
                <p className="card-text">Instructions: {recipe.instructions}</p>
                <button className="btn btn-danger" onClick={() => handleDelete(recipe.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoredRecipes;