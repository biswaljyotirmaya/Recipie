import axios from 'axios';

const API_BASE_URL = 'http://localhost:4041';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const recipeAPI = {
  getAllRecipes: (page = 1, limit = 10) => {
    return api.get(`/api/recipes?page=${page}&limit=${limit}`);
  },
  
  getRecipeById: (id) => {
    return api.get(`/api/recipes/${id}`);
  },
  
  searchRecipes: (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    });
    
    return api.get(`/api/recipes/search?${params.toString()}`);
  },
  
  getAllFields: () => {
    return api.get('/api/recipes/fields');
  },
  
  getAllCuisines: () => {
    return api.get('/api/recipes/cuisines');
  },
  
  getRecipeCount: () => {
    return api.get('/api/recipes/count');
  }
};