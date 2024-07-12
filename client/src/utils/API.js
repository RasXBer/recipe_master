import axios from 'axios';
import dotenv from 'react-dotenv';


export const fetchRecipes = async (query) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${dotenv.API_KEY}`, {
      // params: {
      //   apiKey: dotenv.API_KEY,
      //   // query: query
      // }
    });

    return response.data.results; // Adjust based on Spoonacular API response structure
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; // Return empty array or handle error as needed
  }
};