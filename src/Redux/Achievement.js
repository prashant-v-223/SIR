import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const Achievementbouns = createAsyncThunk(
  "Achievementblock/Achievementblock",
  async (data) => {
    try {
      const res = await GET(apiList.Achievementblock, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Allicomebouns = createAsyncThunk(
  "Allicomebouns/Allicomebouns",
  async (data) => {
    try {
      const res = await GET(apiList.allicome, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Allicomebouns1 = createAsyncThunk(
  "Allicomebouns/Allicomebouns",
  async (data) => {
    try {
      const res = await GET(apiList.allicome, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const AchievementbounsSlice = createSlice({
  name: "Achievementbouns",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Achievementbouns.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Achievementbouns.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Achievementbouns.rejected]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Allicomebouns.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Allicomebouns.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Allicomebouns.rejected]: (state, action) => {
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

export const { cityAction, logout } = AchievementbounsSlice.actions;

export default AchievementbounsSlice.reducer;
