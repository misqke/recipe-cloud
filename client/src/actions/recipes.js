import axios from 'axios';
import { getCookie } from './auth';

export const getRecipes = async (page) => {
  try {
    const response = await axios.get(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/?page=${page}`)
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}
export const getSingleRecipe = async (id) => {
  try {
    const response = await axios.get(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const getUserRecipes = async (username, viewer) => {
  try {
    const response = await axios.get(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/?username=${username}&viewer=${viewer}`)
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const getLikedRecipes = async (id) => {
  try {
    const response = await axios.get(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/likes/?id=${id}`)
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const addRecipe = async (recipe) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(`https://misqke-recipe-cloud.herokuapp.com/api/recipes`, recipe, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const addComment = async (comment, id) => {
  try {
    const token = getCookie('token');
    const response = await axios.patch(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/${id}/comment`, {comment}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const deleteComment = async (index, id) => {
  try {
    const token = getCookie('token');
    const response = await axios.patch(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/${id}/comment/delete`, {index}, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const updateRecipe = async (recipe) => {
  try {
    const token = getCookie('token');
    const response = await axios.patch(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/${recipe._id}`, recipe, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const deleteRecipe = async (id) => {
  try {
    const token = getCookie('token');
    const response = await axios.delete(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const toggleLike = async (id) => {
  try {
    const token = getCookie('token');
    console.log("actions - toggle - token pre call: ", token)
    const response = await axios.get(`https://misqke-recipe-cloud.herokuapp.com/api/recipes/${id}/like`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
  
}