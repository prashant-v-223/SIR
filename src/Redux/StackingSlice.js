import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const BuyStacking = createAsyncThunk(
  "auth/BuyStacking",
  async (data) => {
    try {
      const res = await POST(
        apiList.Stacking,
        {
          WalletType: data.WalletType,
          Amount: data.Amount,
          otp: data.otp,
          V4XTokenPrice: data.V4XTokenPrice,
          transactionHash: data?.transactionHash,
        },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Allstacking = createAsyncThunk(
  "auth/BuyStacking",
  async (data) => {
    try {
      const res = await GET(apiList.allstacking, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const StackingSlice = createSlice({
  name: "city",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [BuyStacking.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [BuyStacking.pending]: (state, action) => {
      state.isLoader = false;
    },
    [BuyStacking.rejected]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [Allstacking.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.data = action.error;
        state.isLoader = !false;
      }
    },
    [Allstacking.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Allstacking.rejected]: (state, action) => {
      if (action.payload) {
        state.stateData = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
  },
});

export const { cityAction, logout } = StackingSlice.actions;

export default StackingSlice.reducer;
