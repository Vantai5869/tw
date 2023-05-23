import {
  LoginState,
  LoginReq,
  LoginRes,
  LoginFail,
  RefreshTokenReq,
} from "../../type/Authen/login";
import { RootState } from "../../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import loginApi from "../../service/Authen/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeToken, saveToken } from "../../../common/storage";
import { setConfigAxios } from "../../service/httpService";
import { NavigatorName, ScreenNames } from "../../../navigation/screen";
import { navigate } from "../../../navigation/navigate";

// Define the initial state using that type
const initialState: LoginState = {
  token: "",
  loading: null,
};

export const LoginDL = createAsyncThunk(
  "loginReducer/handleLogin/LoginDL",
  async (body: LoginReq, thunkAPI) => {
    try {
      const res: LoginRes = await loginApi.login(body, "");
      await saveToken({
        accessToken: res?.access_token,
        refreshToken: res?.refresh_token,
      });
      await setConfigAxios(res?.access_token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as LoginFail);
    }
  }
);

export const RefreshToken = createAsyncThunk(
  "loginReducer/handleLogin/RefreshToken",
  async (body: RefreshTokenReq, thunkAPI) => {
    try {
      const res: LoginRes = await loginApi.refreshToken(body);

      await saveToken({
        accessToken: res?.access_token,
        refreshToken: res?.refresh_token,
      });
      await setConfigAxios(res?.access_token);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as LoginFail);
    }
  }
);

export const Logout = createAsyncThunk(
  "loginReducer/handleLogin/logout",
  async (token: string, thunkAPI) => {
    try {
      await removeToken();
      await setConfigAxios("");
      await navigate(NavigatorName.LoginNavigator as never, {} as never);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const loginSlice = createSlice({
  name: "loginReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginDL.fulfilled, (state, action) => {
      state.loading = true;
      state.token = action.payload?.access_token;
    });
    builder.addCase(LoginDL.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(RefreshToken.fulfilled, (state, action) => {
      state.token = action.payload?.access_token;
    });
    builder.addCase(RefreshToken.rejected, (state, action) => {});
  },
});

export const { resetLoading } = loginSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLogin = (state: RootState) => state.loginReducer;

export default loginSlice.reducer;
