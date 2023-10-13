import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const daireactteam = createAsyncThunk(
  "daireactteam/daireactteam",
  async (data) => {
    try {
      const res = await GET(apiList.daireactteam, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const daireactteamSlice = createSlice({
  name: "daireactteam",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [daireactteam.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [daireactteam.pending]: (state, action) => {
      state.isLoader = false;
    },
    [daireactteam.rejected]: (state, action) => {
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

export const { cityAction, logout } = daireactteamSlice.actions;

export default daireactteamSlice.reducer;
