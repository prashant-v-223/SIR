import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { POST, PUT } from "./services";
import { apiList } from "./api";
export const Signup = createAsyncThunk("auth/Signup", async (data) => {
  try {
    const res = await POST(apiList.Signup, {
      walletaddress: data.Walletaddress,
      email: data.Email,
      password: data.Password,
      Fullname: data.username,
      refferalBy: data.referralId,
      PhoneNumber: data.phone
    });
    return res;
  } catch (e) {
    return e.response;
  }
});
export const Signin = createAsyncThunk("auth/Signin", async (data) => {
  try {
    const res = await POST(apiList.Signin, {
      email: data.Email,
      password: data.Password,
    });
    return res;
  } catch (e) {
    return e.response;
  }
});
export const adminSignin = createAsyncThunk("auth/adminSignin", async (data) => {
  try {
    const res = await POST(apiList.adminSignin, {
      email: data.Email,
      password: data.Password,
    });
    return res;
  } catch (e) {
    return e.response;
  }
});
export const Foegotpassword = createAsyncThunk(
  "auth/Foegotpassword",
  async (data) => {
    try {
      const res = await PUT(apiList.Foegotpassword, data);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const profileupdate = createAsyncThunk(
  "auth/Foegotpassword",
  async (data) => {
    try {
      const res = await POST(apiList.profileupdate,
        {
          address: data.address,
          profileimg: data.profileimg,
          walletaddress: data.walletaddress,
          Nominee: data.Nominee,
        },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const ChangePassword = createAsyncThunk(
  "auth/ChangePassword",
  async (data) => {
    try {
      const res = await POST(
        apiList.ChangePassword,
        {
          password: data.Password,
        },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const CitySlice = createSlice({
  name: "city",
  initialState: {
    data: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Signup.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.data = action.error;
        state.isLoader = !false;
      }
    },
    [Signup.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Signup.rejected]: (state, action) => {
      if (action.payload) {
        state.stateData = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    }, [profileupdate.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [profileupdate.pending]: (state, action) => {
      state.isLoader = false;
    },
    [profileupdate.rejected]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [Signin.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.data = action.error;
        state.isLoader = !false;
      }
    },
    [Signin.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Signin.rejected]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.data = action.payload;
        state.isLoader = !false;
      }
    },
    [Foegotpassword.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.data = action.error;
        state.isLoader = !false;
      }
    },
    [Foegotpassword.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Foegotpassword.rejected]: (state, action) => {
      if (action.payload) {
        state.stateData = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [ChangePassword.fulfilled]: (state, action) => {
      if (action.payload) {
        state.data = action.payload;
        state.isLoader = !false;
      } else {
        state.data = action.error;
        state.isLoader = !false;
      }
    },
    [ChangePassword.pending]: (state, action) => {
      state.isLoader = false;
    },
    [ChangePassword.rejected]: (state, action) => {
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

export const { cityAction, logout } = CitySlice.actions;

export default CitySlice.reducer;
