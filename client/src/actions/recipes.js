import axios from 'axios';
import { getCookie } from './auth';

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/recipes`)
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}
export const getSingleRecipe = async (id) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const getUserRecipes = async (username) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/recipes/?username=${username}`)
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const addRecipe = async (recipe) => {
  try {
    const token = getCookie('token');
    const response = await axios.post(`${process.env.REACT_APP_API}/api/recipes`, recipe, {
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
    const response = await axios.patch(`${process.env.REACT_APP_API}/api/recipes/${id}/comment`, {comment}, {
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
    const response = await axios.patch(`${process.env.REACT_APP_API}/api/recipes/${id}/comment/delete`, {index}, {
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
    const response = await axios.patch(`${process.env.REACT_APP_API}/api/recipes/${recipe._id}`, recipe, {
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
    const response = await axios.delete(`${process.env.REACT_APP_API}/api/recipes/${id}`, {
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