import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { removeToken } from "../../../common/storage";
import {
  TAddressObject,
  provinceItemObject,
  districtItemObject,
  wardItemObject,
} from "../../../constants/type.interface";
import accountApi from "../../service/Profile/profile";
import { setConfigAxios } from "../../service/httpService";
import { RootState } from "../../store";
import {
  ResponseFail,
  AccountState,
  GetAddressListReq,
  GetAddressListRes,
  LanguageState,
  LanguageReq,
  LanguageRes,
} from "../../type/Profile/profile";
import { saveLanguage } from "../../../common/storage";
import { getMessage } from "../../../common/utils";
import { changedLanguage } from "../../../locale";
import { setLanguages } from "../../service/httpService";
import { setLanguagesNoToken } from "../../service/noTokenHttpService";

// Define the initial state using that type
const initProvince: provinceItemObject = {
  id: null,
  name: null,
  code: null,
};
const initDistrict: districtItemObject = {
  id: null,
  name: null,
  code: null,
  provinceCode: null,
};
const initWard: wardItemObject = {
  id: null,
  name: null,
  code: null,
  districtCode: null,
};
const initAddress = {
  name: null,
  longitude: null,
  latitude: null,
};

const initialState: AccountState = {
  user: null,
  loading: false,
  errors: undefined,
  addressList: [],
  addressByID: {},
  fpSuccess: false,
  provinces: [],
  districts: [],
  wards: [],
  requestEmailSuccess: false,
  validateEmailSuccess: false,
  changeEmailSuccess: false,
  changeEmailToken: "",
  typeRadio: false,

  requestPhoneSuccess: false,
  validatePhoneSuccess: false,
  changePhoneSuccess: false,
  changePhoneToken: "",
  addressState: {
    pickedProvince: initProvince,
    pickedDistrict: initDistrict,
    pickedWard: initWard,
    detailAddress: null,
    isEdit: false,
  },
  selectedShippingAddress: [],
  suggestLocation: [],
  suggestLocationByKeyWord: [],
  directLocationByKeyWord: [],
  distributorInfo: [],
};

const initialLanguage: LanguageState = {
  language: undefined,
  loading: false,
};

export const GetAddressList = createAsyncThunk(
  "profileReducer/handleProfile/getAddressList",
  async (filter: GetAddressListReq, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const shippingAddress = state?.accountReducer?.shippingAddress || "";
    try {
      const res: GetAddressListRes = await accountApi.getAddressList(filter);
      // if (res && !shippingAddress?.id) {
      //   thunkAPI.dispatch(SelectShippingAddress(res?.items?.[0]));
      // }
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);
export const GetAddressById = createAsyncThunk(
  "profileReducer/handleProfile/getAddressById",
  async (filter: string, thunkAPI) => {
    try {
      const res = await accountApi.getAddressById(filter);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);

export const CreateAddress = createAsyncThunk(
  "profileReducer/handleProfile/createAddress",
  async (request: TAddressObject, thunkAPI) => {
    try {
      const res: TAddressObject = await accountApi.createAddress(request);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);
export const UpdateAddress = createAsyncThunk(
  "profileReducer/handleProfile/updateAddress",
  async (request: TAddressObject, thunkAPI) => {
    try {
      const res: TAddressObject = await accountApi.updateAddress(request);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);
export const SetDefaultAddress = createAsyncThunk(
  "profileReducer/handleProfile/setDefaultAddress",
  async (request: TAddressObject, thunkAPI) => {
    try {
      const res: TAddressObject = await accountApi.setDefaultAddress(request);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);

export const DeleteAddress = createAsyncThunk(
  "profileReducer/handleProfile/deleteAddress",
  async (request: string | number | undefined, thunkAPI) => {
    try {
      const res: any = await accountApi.deleteAddress(request);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);

export const GetProvince = createAsyncThunk(
  "profileReducer/handleProfile/getProvince",
  async (request: any, thunkAPI) => {
    try {
      const res = await accountApi.getCityAddress();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);

export const GetDistrict = createAsyncThunk(
  "profileReducer/handleProfile/getDistrict",
  async (request: any, thunkAPI) => {
    try {
      const res = await accountApi.getDistrict(request);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);

export const GetWard = createAsyncThunk(
  "profileReducer/handleProfile/getWard",
  async (request: any, thunkAPI) => {
    try {
      const res = await accountApi.getWard(request);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ResponseFail);
    }
  }
);

export const GetAddressByCoords = createAsyncThunk(
  "profileReducer/GetAddressByCoords",
  async (params: object, thunkAPI) => {
    try {
      const res = await accountApi.getAddressByCoords(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);
export const GetSuggestLocation = createAsyncThunk(
  "profileReducer/GetSuggestLocation",
  async (params: string, thunkAPI) => {
    try {
      const res = await accountApi.suggestLocation(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);
export const GetDirectLocationByText = createAsyncThunk(
  "profileReducer/GetDirectLocationByText",
  async (params: string, thunkAPI) => {
    try {
      const res = await accountApi.getDirectLocationByText(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);
export const GetDistributorInfo = createAsyncThunk(
  "profileReducer/GetDistributorInfo",
  async (params: string, thunkAPI) => {
    try {
      const res = await accountApi.getDistributorInfo(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);

export const ChangeInfo = createAsyncThunk(
  "profileReducer/ChangeInfo",
  async (params: any, thunkAPI) => {
    try {
      const res = await accountApi.changeInfo(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);
export const changeLanguage = createAsyncThunk(
  "profileReducer/changeLanguage",
  async (requests: LanguageReq, thunkAPI) => {
    try {
      const res: LanguageRes = await accountApi.changeLanguage(requests);
      await setLanguages(requests.language);
      await setLanguagesNoToken(requests.language);
      await changedLanguage(requests.language);
      await saveLanguage({
        language: requests.language,
      });
      return res;
    } catch (err) {
      // Alert.alert(getMessage(err));
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const profileSlice = createSlice({
  name: "profileReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addressDetail: (state, action) => {
      state.addressState = action.payload;
    },
    resetAddressDetail: (state, action) => {
      state.addressState = {
        pickedProvince: initProvince,
        pickedDistrict: initDistrict,
        pickedWard: initWard,
        detailAddress: null,
        isEdit: false,
      };
    },
    resetSuggestLocation: (state: any, action) => {
      state.suggestLocation = [];
      state.suggestLocationByKeyWord = [];
      state.directLocationByKeyWord = [];
    },
    typeRadioAddress: (state: any, action) => {
      state.typeRadio = action.payload;
    },
    resetRadioAddress: (state: any, action) => {
      state.typeRadio = false;
    },
    selectedAddress: (state, action) => {
      state.selectedShippingAddress = action.payload;
    },
    resetSelectedAddress: (state, action) => {
      state.selectedShippingAddress = [];
    },
  },
  extraReducers: (builder) => {
    // GET LIST ADDRESS
    builder.addCase(GetAddressList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetAddressList.fulfilled, (state, action) => {
      state.addressList = action.payload;
      state.loading = false;
    });
    builder.addCase(GetAddressList.rejected, (state, action) => {
      state.addressList = [];
      state.loading = false;
    });

    // GET ADDRESS BY ID
    builder.addCase(GetAddressById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetAddressById.fulfilled, (state, action) => {
      state.addressByID = action.payload;
      state.loading = false;
    });
    builder.addCase(GetAddressById.rejected, (state, action) => {
      state.addressList = [];
      state.loading = false;
    });

    //CREATE ADDRESS

    builder.addCase(CreateAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(CreateAddress.fulfilled, (state, action) => {
      let cloneState = [...state.addressList.items];
      // JSON.parse(JSON.stringify([...state.addressList.items]));
      if (action.payload.isDefault) {
        cloneState = cloneState.map((item) => {
          if (item.isDefault === true) {
            item.isDefault = false;
          }
          return item;
        });
      }
      state.addressList = {
        ...state.addressList,
        totalCount: state.addressList.totalCount + 1,
        items: [action.payload, ...cloneState],
      };

      state.loading = false;
    });
    builder.addCase(CreateAddress.rejected, (state, action) => {
      state.loading = false;
    });

    //UPDATE ADDRESS
    builder.addCase(UpdateAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(UpdateAddress.fulfilled, (state, action) => {
      const clone = [...state.addressList.items];
      // let setDefault = [];
      // action.payload.isDefault
      //   ? (setDefault = clone.map((item) => {
      //       item.isDefault = false;
      //       if (item.id === action.payload.id) {
      //         item = action.payload;
      //       }
      //       return item;
      //     }))
      //   : (setDefault = clone.map((item) => {
      //       if (item.id === action.payload.id) {
      //         item = action.payload;
      //       }
      //       return item;
      //     }));

      // state.addressList = {
      //   ...state.addressList,
      //   totalCount: state.addressList.totalCount,
      //   items: [...setDefault],
      // };
      state.loading = false;
    });
    builder.addCase(UpdateAddress.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(SetDefaultAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(SetDefaultAddress.fulfilled, (state, action) => {
      const clone = [...state.addressList.items];

      // const setDefault = clone.map((item) => {
      //   item.isDefault = false;
      //   if (item.id === action.payload.id) {
      //     item.isDefault = true;
      //   }
      //   return item;
      // });

      // state.addressList = {
      //   ...state.addressList,
      //   totalCount: state.addressList.totalCount,
      //   items: [...setDefault],
      // };
      state.loading = false;
    });
    builder.addCase(SetDefaultAddress.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(ChangeInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ChangeInfo.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(ChangeInfo.rejected, (state, action) => {
      state.loading = false;
    });

    //DELETE ADDRESS
    builder.addCase(DeleteAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteAddress.fulfilled, (state, action) => {
      const clone = [...state.addressList.items];

      const dataFilter = clone.filter((item) => item.id !== action.payload.id);
      state.addressList = {
        ...state.addressList,
        totalCount: state.addressList.totalCount - 1,
        items: [...dataFilter],
      };
      state.loading = false;
    });
    builder.addCase(DeleteAddress.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(GetAddressByCoords.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(GetAddressByCoords.fulfilled, (state, action) => {
      state.suggestLocation = action.payload;
      // state.loading = false;
    });
    builder.addCase(GetAddressByCoords.rejected, (state, action) => {
      state.suggestLocation = [];
      // state.loading = false;
    });

    builder.addCase(GetSuggestLocation.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(GetSuggestLocation.fulfilled, (state, action) => {
      state.suggestLocationByKeyWord = action.payload;
      // state.loading = false;
    });
    builder.addCase(GetSuggestLocation.rejected, (state, action) => {
      state.suggestLocationByKeyWord = [];
      // state.loading = false;
    });

    GetDistributorInfo;

    builder.addCase(GetDistributorInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetDistributorInfo.fulfilled, (state, action) => {
      state.distributorInfo = action.payload;
      state.loading = false;
    });
    builder.addCase(GetDistributorInfo.rejected, (state, action) => {
      // state.suggestLocationByKeyWord = [];
      state.loading = false;
    });

    builder.addCase(GetDirectLocationByText.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(GetDirectLocationByText.fulfilled, (state, action) => {
      state.directLocationByKeyWord = action.payload;
      // state.loading = false;
    });
    builder.addCase(GetDirectLocationByText.rejected, (state, action) => {
      state.directLocationByKeyWord = [];
      // state.loading = false;
    });

    // address list
    builder.addCase(GetProvince.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetProvince.fulfilled, (state, action) => {
      state.provinces = action.payload as any;
      state.loading = false;
    });
    builder.addCase(GetProvince.rejected, (state, action) => {
      state.provinces = [];
      state.loading = false;
    });

    // district List
    builder.addCase(GetDistrict.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetDistrict.fulfilled, (state, action) => {
      state.districts = action.payload as any;
      state.loading = false;
    });
    builder.addCase(GetDistrict.rejected, (state, action) => {
      state.districts = [];
      state.loading = false;
    });

    // ward List
    builder.addCase(GetWard.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetWard.fulfilled, (state, action) => {
      state.wards = action.payload as any;
      state.loading = false;
    });
    builder.addCase(GetWard.rejected, (state, action) => {
      state.wards = [];
      state.loading = false;
    });

    builder.addCase(changeLanguage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeLanguage.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(changeLanguage.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const {
  addressDetail,
  resetAddressDetail,
  resetSuggestLocation,
  typeRadioAddress,
  resetRadioAddress,
  selectedAddress,
} = profileSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProfile = (state: RootState) => state.profileReducer;

export default profileSlice.reducer;
