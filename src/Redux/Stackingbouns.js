import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const Stackingbouns = createAsyncThunk(
  "Stackingbouns/Stackingbouns",
  async (data) => {
    try {
      const res = await GET(apiList.Stackingbouns, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const StackingbounsSlice = createSlice({
  name: "Stackingbouns",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Stackingbouns.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Stackingbouns.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Stackingbouns.rejected]: (state, action) => {
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

export const { cityAction, logout } = StackingbounsSlice.actions;

export default StackingbounsSlice.reducer;
