import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as SecureStore from "expo-secure-store";
import { ROUTES } from "../../constants";
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigation, toast }, { rejectWithValue }) => {
    try {
      //console.log(formValue);
      const response = await api.signin(formValue);
      //console.log(response.data);
      toast.show("به اپلیکیشن دامیار خوش آمدید", { type: "success" });
      navigation.replace(ROUTES.HOME);
      await SecureStore.setItemAsync("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      //console.log(formValue.formValue.email);
      const response = await api.signup(formValue);
      //toast.success("ثبت نام شما با موفقیت انجام شد");
      navigate.replace("Verify");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const googleSignIn = createAsyncThunk(
//   "auth/googleSignIn",
//   async ({ result, navigate, toast }, { rejectWithValue }) => {
//     try {
//       //console.log(formValue.formValue.email);
//       const response = await api.googleSignIn(result);
//       toast.success("Success googleSignIn");
//       navigate("/");
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      SecureStore.deleteItemAsync("profile");
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        SecureStore.setItemAsync(
          "profile",
          JSON.stringify({ ...action.payload })
        );
        state.user = action?.payload;
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        //console.log(action.payload.message);
        state.error = action?.payload?.message;
      }),
      builder.addCase(register.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      }),
      builder.addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
