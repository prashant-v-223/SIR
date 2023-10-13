import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const Mainwallate123 = createAsyncThunk(
  "Mainwallate123/Mainwallate",
  async (data) => {
    try {
      const res = await GET(apiList.Mainwallate, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Wallet123 = createAsyncThunk(
  "Mainwallate123/Mainwallate",
  async (data) => {
    try {
      const res = await GET(apiList.V4X, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const MainwallateSlice = createSlice({
  name: "Mainwallate123",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Mainwallate123.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Mainwallate123.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Mainwallate123.rejected]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Wallet123.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Wallet123.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Wallet123.rejected]: (state, action) => {
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

export const { cityAction, logout } = MainwallateSlice.actions;

export default MainwallateSlice.reducer;
