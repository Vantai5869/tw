import { RootState } from "../../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  RegisterFail,
  RegisterReq,
  RegisterRes,
  RegisterState,
  RegisterStatusReq,
  RequestOTPReq,
  ResetPasswordOTPReq,
  ValidateOTPReq,
  ValidateOTPRes,
  ResponseError,
  CheckEmailPhoneReq,
  RequestRegister,
} from "../../type/Authen/register";
import registers from "../../service/Authen/register";
import { getMessage } from "../../../common/utils";
import { Alert } from "react-native";
import { removeToken } from "../../../common/storage";
import { setConfigAxios } from "../../service/httpService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the initial state using that type
const initialState: RegisterState = {
  registerRes: null,
  registerStatus: null,
  requestSuccess: false,
  loading: false,
  tokenOTP: "",
  registerReject: {},
  validateSuccess: null,
  fpSuccess: false,
  checkEmailPhone: null,
  reqestRegister: {
    Address: "",
    BackLicense: "",
    BusinessId: "",
    CardNumber: "",
    DOB: "",
    Email: "",
    FrontLicense: "",
    Introduction: "",
    Lattitude: 0,
    LegalRepresentativeAddres: "",
    LegalRepresentativeName: "",
    Logo: "",
    Longtitude: 0,
    Name: "",
    TaxCode: "",
    PlaceId: "",
    ProvinceId: "",
    DistrictId: "",
    WardId: "",
    Password: "",
    DeviceToken: "",
    Phone: "",
  },
  businessId: "",
  listBusiness: null,
  changePassword: null,
  messageError: null,
};

export const RegisterHandle = createAsyncThunk(
  "registerReducer/RegisterHandle",
  async (body: RequestRegister, thunkAPI) => {
    try {
      const res: RegisterRes = await registers.register(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ResponseError);
    }
  }
);

export const CheckEmailPhones = createAsyncThunk(
  "registerReducer/CheckEmailPhone",
  async (body: CheckEmailPhoneReq, thunkAPI) => {
    try {
      const res: any = await registers.checkEmailPhone(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ResponseError);
    }
  }
);

export const getBusinissIds = createAsyncThunk(
  "registerReducer/getBusinissIds",
  async (thunkAPI) => {
    try {
      const res: any = await registers.getBusinissId();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ResponseError);
    }
  }
);

export const ClearErrors = createAsyncThunk(
  "loginReducer/clearErrors",
  async () => {
    try {
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);
export const ChangePassWord = createAsyncThunk(
  "loginReducer/changePassword",
  async (body: any, thunkAPI) => {
    try {
      const res: any = await registers.changePassword(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ResponseError);
    }
  }
);

export const registerSlice = createSlice({
  name: "loginReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetRegisterReject: (state: any, action: any) => {
      state.registerReject = "";
    },
    setDefaultRegisterState: (state: RegisterState, action: any) => {
      state.validateSuccess = null;
      state.requestSuccess = false;
      state.checkEmailPhone = null;
    },
    resetRegisterData: (state: any, action: any) => {
      state.registerRes = null;
    },
    setReqRegister: (state: any, action: any) => {
      state.reqestRegister = { ...state.reqestRegister, ...action.payload };
    },
    resetSuccess: (state: any, action: any) => {
      state.changePassword = null;
    },
    resetMessageError: (state: any, action: any) => {
      state.messageError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RegisterHandle.fulfilled, (state, action) => {
      state.registerRes = action.payload;
    });
    builder.addCase(RegisterHandle.rejected, (state, action) => {
      const res = action.payload as ResponseError;
      state.registerReject = res;
    });
    builder.addCase(CheckEmailPhones.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CheckEmailPhones.fulfilled, (state, action) => {
      state.loading = false;
      state.checkEmailPhone = action.payload;
    });
    builder.addCase(CheckEmailPhones.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(ChangePassWord.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ChangePassWord.fulfilled, (state, action) => {
      state.loading = false;
      state.changePassword = true;
    });
    builder.addCase(ChangePassWord.rejected, (state, action) => {
      state.loading = false;
      state.messageError = action?.payload?.error?.message;
    });
    builder.addCase(getBusinissIds.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBusinissIds.fulfilled, (state, action) => {
      state.loading = false;
      state.listBusiness = action.payload;
    });
    builder.addCase(getBusinissIds.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {
  resetRegisterReject,
  setDefaultRegisterState,
  resetRegisterData,
  setReqRegister,
  resetSuccess,
  resetMessageError,
} = registerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectRegister = (state: RootState) => state.registerReducer;

export default registerSlice.reducer;
