import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const indaireactteam = createAsyncThunk(
  "indaireactteam/indaireactteam",
  async (data) => {
    try {
      const res = await GET(apiList.indaireactteam, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const indaireactteamSlice = createSlice({
  name: "indaireactteam",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [indaireactteam.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [indaireactteam.pending]: (state, action) => {
      state.isLoader = false;
    },
    [indaireactteam.rejected]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
  },
});

export const { cityAction, logout } = indaireactteamSlice.actions;

export default indaireactteamSlice.reducer;
