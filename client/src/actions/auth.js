import cookie from 'js-cookie';
import axios from 'axios';


export const signup = async (user) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/signup`, user);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data
    }
  }

export const login = async (user) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data
  }
}

export const logout = async (next) => {
  clearCookie('token');
  clearLocalStorage('user');
  next();
  try {
    const response = await axios.get(`${process.env.REACT_APP_API}/api/auth/logout`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const setCookie = (key, value) => {
  cookie.set(key, value, {expires: 1})
}

export const clearCookie = (key) => {
  cookie.remove(key, {expires: 1})
}

export const getCookie = (key) => {
  return cookie.get(key);
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
}

export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);
  next();
}

export const isAuth = () => {
  const cookieChecked = getCookie('token');
  if (cookieChecked) {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))
    } else {
      return false;
    }
  }
}