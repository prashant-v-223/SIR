import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const Wallatedata = createAsyncThunk(
  "auth/Wallatedata",
  async (data) => {
    try {
      const res = await GET(apiList.gelUserWallate, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const getdappWallatedata = createAsyncThunk(
  "auth/gelUserWallate",
  async (data) => {
    try {
      const res = await GET(apiList.getwallateblance, { data }, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const getdappWallatedata1 = createAsyncThunk(
  "auth/gelUserWallate11",
  async (data) => {
    try {
      const res = await POST(
        apiList.getwallateblance121,
        { otp: data.otp, Amount: data.Amount, walletaddress: data.walletaddress, Remark: data.Remark },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const WallatedatSlice = createSlice({
  name: "city",
  initialState: {
    data: [],
    Wallatedata: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Wallatedata.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Wallatedata.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Wallatedata.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [getdappWallatedata.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [getdappWallatedata.pending]: (state, action) => {
      state.isLoader = false;
    },
    [getdappWallatedata.rejected]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [getdappWallatedata1.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [getdappWallatedata1.pending]: (state, action) => {
      state.isLoader = false;
    },
    [getdappWallatedata1.rejected]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
  },
});

export const { cityAction, logout } = WallatedatSlice.actions;

export default WallatedatSlice.reducer;
