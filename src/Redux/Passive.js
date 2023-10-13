import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const Passivebouns = createAsyncThunk(
  "Passivebouns/Passivebouns",
  async (data) => {
    try {
      const res = await GET(apiList.Passiveblock, {}, data.Token);
      console.log(res);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const PassivebounsSlice = createSlice({
  name: "Passivebouns",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Passivebouns.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Passivebouns.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Passivebouns.rejected]: (state, action) => {
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

export const { cityAction, logout } = PassivebounsSlice.actions;

export default PassivebounsSlice.reducer;
