import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const Communityincome = createAsyncThunk(
  "Communityincome/Communityincome",
  async (data) => {
    try {
      const res = await GET(apiList.Communityincome, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const CommunityincomeSlice = createSlice({
  name: "Communityincome",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Communityincome.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Communityincome.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Communityincome.rejected]: (state, action) => {
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

export const { cityAction, logout } = CommunityincomeSlice.actions;

export default CommunityincomeSlice.reducer;
