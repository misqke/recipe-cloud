import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    username: "",
  },
  reducers: {
    logInState: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
    },
    logOutState: (state) => {
      state._id = "";
      state.username = "";
    }
  }
})

export const {logInState, logOutState} = userSlice.actions;
export default userSlice.reducer;