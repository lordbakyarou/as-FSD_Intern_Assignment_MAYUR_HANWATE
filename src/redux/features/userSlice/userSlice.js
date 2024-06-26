import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserData: (state, action) => action.payload.user,
    removeUserData: (state, action) => initialState,
  },
});

export const { addUserData } = userSlice.actions;

export default userSlice.reducer;
