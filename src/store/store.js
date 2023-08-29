import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "./loginSlice";
import langReducers from "./langSlice";

const store = configureStore({
  reducer: {
    login: loginReducers,
    lang: langReducers,
  },
});

export default store;
