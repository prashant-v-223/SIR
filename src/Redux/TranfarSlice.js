import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const Transferdata = createAsyncThunk(
  "Transferdata/Transfer",
  async (data) => {
    try {
      const res = await POST(apiList.transfercoin, { ...data }, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const getTransferdata = createAsyncThunk(
  "getTransferdata/Transfer",
  async (data) => {
    try {
      const res = await GET(apiList.transfercoin, { ...data }, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const TransferdataSlice = createSlice({
  name: "city",
  initialState: {
    data: [],
    Wallatedata: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Transferdata.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Transferdata.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Transferdata.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [getTransferdata.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [getTransferdata.pending]: (state, action) => {
      state.isLoader = false;
    },
    [getTransferdata.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
  },
});

export const { cityAction, logout } = TransferdataSlice.actions;

export default TransferdataSlice.reducer;
