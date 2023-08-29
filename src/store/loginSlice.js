import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  login: false,
  firstName: "",
  lastName: "",
  role: "",
  userId: "",
  avatarUrl: "/img/user.png",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin(state) {
      state.login = true;
    },
    setLogout(state) {
      state.login = false;
      state.firstName = "";
      state.lastName = "";
      state.role = "";
      state.userId = "";
      state.avatarUrl = "/img/user.png";
    },
    setUserFirstName(state, action) {
      state.firstName = action.payload;
    },
    setUserLastName(state, action) {
      state.lastName = action.payload;
    },
    setUserRole(state, action) {
      state.role = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setUserAvatarUrl(state, action) {
      state.avatarUrl = action.payload;
    },
  },
});

export const {
  setLogin,
  setLogout,
  setUserFirstName,
  setUserLastName,
  setUserRole,
  setUserId,
  setUserAvatarUrl,
} = loginSlice.actions;
export default loginSlice.reducer;
