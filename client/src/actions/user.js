import axios from "axios";

export const getUser = async (id) => {
  try {
    const response = await axios.get(
      `https://misqke-recipe-cloud.herokuapp.com/api/user/?id=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
