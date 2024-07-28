import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_RECIPE } from '../utils/mutations';
import { GET_ADDRECIPES } from '../utils/queries';
import { fetchRecipes } from '../utils/API';
import { Link } from 'react-router-dom';

const Recipe = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState('');

  const [addRecipe] = useMutation(ADD_RECIPE, {
    update(cache, { data: { addRecipe } }) {
      const { recipes } = cache.readQuery({ query: GET_ADDRECIPES });
      cache.writeQuery({
        query: GET_ADDRECIPES,
        data: { recipes: [...recipes, addRecipe] }
      });
    }
  });

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchRecipes(query);
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      await addRecipe({
        variables: { title, ingredients: ingredients.split(','), instructions, tags: tags.split(',') }
      });
      setTitle('');
      setIngredients('');
      setInstructions('');
      setTags('');
    } catch (error) {
      console.log("new recipe added");
    }
  };

  const openRecipeUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="container">
      <h1 className="text-center mb-5">Recipe Search and Add</h1>
      
      <div className="mb-4">
        <h2>Search Recipes</h2>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={handleSearch} disabled={!query}>
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>

      {recipes.length > 0 && (
        <div className="mb-4">
          <h2>Search Results</h2>
          <div className="row">
            {recipes.map(recipe => (
              <div key={recipe.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.title}
                    style={{ cursor: 'pointer' }}
                    onClick={() => openRecipeUrl(recipe.spoonacularSourceUrl)}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ cursor: 'pointer' }} onClick={() => openRecipeUrl(recipe.spoonacularSourceUrl)}>
                      {recipe.title}
                    </h5>
                    <p className="card-text">Source: {recipe.sourceName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr />

      <div>
        <h2>Add Your Recipe</h2>
        <form onSubmit={handleAddRecipe} className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ingredients (comma-separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tags (comma-separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Recipe</button>
        </form>
      </div>
      <Link to="/stored-recipes" className="btn btn-primary">
        View Stored Recipes
      </Link>
    </div>
  );
};

export default Recipe;