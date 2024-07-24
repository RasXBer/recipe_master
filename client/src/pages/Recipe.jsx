import { useState } from 'react';
import { fetchRecipes } from '../utils/API';

const Recipe = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const openRecipeUrl = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}

      {recipes.length > 0 && recipes.map(recipe => (
        <div key={recipe.id} style={{ marginBottom: '20px' }}>
          <h2 style={{ cursor: 'pointer' }} onClick={() => openRecipeUrl(recipe.sourceUrl)}>
            {recipe.title}
          </h2>
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }}
            onClick={() => openRecipeUrl(recipe.sourceUrl)}
          />
          <p>Source: {recipe.sourceName}</p>
        </div>
      ))}
    </div>
  );
};

export default Recipe;