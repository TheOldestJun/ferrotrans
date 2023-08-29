import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  lang: "",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang(state, action) {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;

export default langSlice.reducer;
