import axios from 'axios';

// Access environment variables directly using import.meta.env
const API_KEY = import.meta.env.VITE_API_KEY;

// Function to fetch recipes
export const fetchRecipes = async (query) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query: query,
        apiKey: API_KEY
      }
    });

    return response.data.results; // Adjust based on Spoonacular API response structure
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; // Return empty array or handle error as needed
  }
};