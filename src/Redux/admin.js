import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET, POST, PUT } from "./services";
import { apiList } from "./api";
export const Adminuserdata = createAsyncThunk(
  "adminalluserget/adminalluserget",
  async (data) => {
    try {
      const res = await GET(apiList.adminalluserget, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Alltranfordata = createAsyncThunk(
  "Alltranfordata/Alltranfordata",
  async (data) => {
    try {
      const res = await GET(apiList.adminalltranfor, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const userdatablock = createAsyncThunk(
  "adminalluserget/adminalluserget",
  async (data) => {
    try {
      const res = await POST(
        apiList.adminuserblock,
        { usename: data.usename, note: data.note },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Emailcheng = createAsyncThunk(
  "emailcheng/emailcheng",
  async (data) => {
    try {
      const res = await POST(
        apiList.emailcheng,
        { username: data.username, note: data.note },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Adminwallateblock = createAsyncThunk(
  "adminwallateblock/adminwallateblock",
  async (data) => {
    try {
      const res = await POST(
        apiList.adminwallateblock,
        { username: data.username, note: data.note },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const userRemove = createAsyncThunk(
  "asd/asdad",
  async (data) => {
    try {
      const res = await POST(
        apiList.userRemove,
        { usename: data.usename, note: data.note },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Adminprice = createAsyncThunk(
  "adminprice/adminprice",
  async (data) => {
    console.log(data);
    try {
      const res = await POST(
        apiList.adminprice,
        { price: data.price },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const GETprice = createAsyncThunk(
  "adminprice/adminprice",
  async (data) => {
    console.log(data);
    try {
      const res = await GET(apiList.adminprice, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Withdrdatadata = createAsyncThunk(
  "Withdrdatadata/Withdrdatadata",
  async (data) => {
    console.log(data);
    try {
      const res = await GET(apiList.Withdrdatadata, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Withdrdatadatauser = createAsyncThunk(
  "Withdrdatadata/Withdrdatadata",
  async (data) => {
    console.log(data);
    try {
      const res = await GET(apiList.Withdrdatadatauser, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const AllBuystack = createAsyncThunk(
  "Withdrdatadata/Withdrdatadata",
  async (data) => {
    console.log(data);
    try {
      const res = await GET(apiList.AllBuystack, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);

export const Withdrdatadata12 = createAsyncThunk(
  "Withdrdatadata/Withdrdatadata",
  async (data) => {
    console.log(data);
    try {
      const res = await POST(apiList.Withdrdatadata,
        { _id: data._id, transactionshsh: data.transactionshsh }, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Admintranfor = createAsyncThunk(
  "admintranfor/admintranfor",
  async (data) => {
    console.log(data);
    try {
      const res = await GET(apiList.admintranfor, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const AdminsendAmount = createAsyncThunk(
  "AdminsendAmount/AdminsendAmount",
  async (data) => {
    console.log(data);
    try {
      const res = await POST(
        apiList.adminsensamount,
        { price: data.price, username: data.username, Walletname: data.Walletname },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const AdminBuystcking = createAsyncThunk(
  "AdminsendAmount/AdminsendAmount",
  async (data) => {
    console.log(data);
    try {
      const res = await POST(
        apiList.AdminBuystack,
        {
          username: data.username,
          Amount: data.Amount,
          Walletname: data.Walletname,
        },
        data.Token
      );
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const Supportdata = createAsyncThunk(
  "/supportdata//supportdata",
  async (data) => {
    console.log(data);
    try {
      const res = await GET(apiList.Adminsupport, {}, data.Token);
      return res;
    } catch (e) {
      return e.response;
    }
  }
);
export const AdminuserdataSlice = createSlice({
  name: "admin",
  initialState: {
    data: [],
    Wallatedata: [],
    error: {},
    stateData: [],
    isLoader: !false,
  },
  extraReducers: {
    [Withdrdatadata.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Withdrdatadata.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Withdrdatadata.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    }, [Withdrdatadatauser.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Withdrdatadatauser.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Withdrdatadatauser.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [AllBuystack.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [AllBuystack.pending]: (state, action) => {
      state.isLoader = false;
    },
    [AllBuystack.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Withdrdatadata12.fulfilled]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [Withdrdatadata12.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Withdrdatadata12.rejected]: (state, action) => {
      if (action.payload) {
        state.isLoader = !false;
      } else {
        state.isLoader = !false;
      }
    },
    [Admintranfor.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Admintranfor.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Admintranfor.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [AdminBuystcking.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [AdminBuystcking.pending]: (state, action) => {
      state.isLoader = false;
    },
    [AdminBuystcking.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Emailcheng.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Emailcheng.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Emailcheng.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [userRemove.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [userRemove.pending]: (state, action) => {
      state.isLoader = false;
    },
    [userRemove.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Adminuserdata.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Adminuserdata.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Adminuserdata.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [GETprice.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [GETprice.pending]: (state, action) => {
      state.isLoader = false;
    },
    [GETprice.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Alltranfordata.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Alltranfordata.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Alltranfordata.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Adminwallateblock.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Adminwallateblock.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Adminwallateblock.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Adminprice.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Adminprice.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Adminprice.rejected]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.Wallatedata = action.error;
        state.isLoader = !false;
      }
    },
    [Supportdata.fulfilled]: (state, action) => {
      if (action.payload) {
        state.Wallatedata = action.payload;
        state.isLoader = !false;
      } else {
        state.stateData = action.error;
        state.isLoader = !false;
      }
    },
    [Supportdata.pending]: (state, action) => {
      state.isLoader = false;
    },
    [Supportdata.rejected]: (state, action) => {
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

export const { cityAction, logout } = AdminuserdataSlice.actions;

export default AdminuserdataSlice.reducer;
