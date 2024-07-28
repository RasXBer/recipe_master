import axios from 'axios';

// Access environment variables directly using import.meta.env
const API_KEY = import.meta.env.VITE_API_KEY;

// const API_ID = 'YOUR_EDAMAM_API_ID'; // Replace with your Edamam API ID
// const API_KEY = 'YOUR_EDAMAM_API_KEY'; // Replace with your Edamam API key

// Function to fetch recipes
export const fetchRecipes = async (query) => {
  try {
    // Fetch recipe IDs using complexSearch
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query: query,
        apiKey: API_KEY
      }
    });

    const recipes = response.data.results;

    // Step 2: Fetch detailed recipe information using IDs
    const recipesWithDetails = await Promise.all(recipes.map(async (recipe) => {
      try {
        const detailsResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
          params: {
            apiKey: API_KEY
          }
        });
        
        const { title, image, sourceName, spoonacularSourceUrl } = detailsResponse.data;

          // Check if sourceName is foodista.com and skip those recipes
          if (sourceName && sourceName.toLowerCase().includes('foodista')) {
            return null; // Skip this recipe
          }      
        
        // Check if sourceUrl is valid (you can add more specific checks if needed)
        if (!spoonacularSourceUrl || spoonacularSourceUrl.trim() === '' || spoonacularSourceUrl.includes('timeout')) {
          return null; // Skip this recipe
        }

        return { id: recipe.id, title, image, sourceName, spoonacularSourceUrl };
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        return null; // Skip this recipe on error
      }
    }));

    // Filter out null entries (recipes that were skipped)
    const filteredRecipes = recipesWithDetails.filter(recipe => recipe !== null);

    return filteredRecipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; // Return empty array or handle error as needed
  }
};

//     return response.data.results; // Adjust based on Spoonacular API response structure
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     return []; // Return empty array or handle error as needed
//   }
// };

// export const fetchRecipes = async (query) => {
//   try {
//     const response = await axios.get(`https://api.edamam.com/api/recipes/v2`, {
//       params: {
//         q: query,
//         app_id: API_ID,
//         app_key: API_KEY
//       }
//     });

//     return response.data.hits.map(hit => ({
//       id: hit.recipe.uri,
//       title: hit.recipe.label,
//       image: hit.recipe.image,
//       sourceName: hit.recipe.source,
//       sourceUrl: hit.recipe.url
//     }));
//   } catch (error) {
//     console.error('Error fetching recipes:', error);
//     throw error; // Propagate the error so it can be handled in the component
//   }
// };