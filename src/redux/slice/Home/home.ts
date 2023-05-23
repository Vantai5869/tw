import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import homeScreen from "../../service/Home/home";
import { RootState } from "../../store";
import {
  CategoryType,
  NewProductType,
  SellingProductType,
  SupplierType,
} from "../../type/Home/home";
import { persistedStorage } from "../../../common/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the initial state using that type
const initialState = {
  greeting: "",
  loading: false,
  listCategory: {} as any,
  listSupplier: {} as any,
  listNewProduct: {} as any,
  listSellingProduct: {} as any,
  listUserInfor: {} as any,
  retailerInfo: undefined as any,
  dataWallet: {} as any,
  listCategoryNcc: {} as any,
};

export const getGreeting = createAsyncThunk(
  "homeReducer/getGreeting",
  async (params: any, thunkAPI) => {
    try {
      const token = await persistedStorage?.getItem("accessToken");
      const res: string = await homeScreen.getGreeting();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCategory = createAsyncThunk(
  "homeReducer/getCategory",
  async (params: any, thunkAPI) => {
    try {
      const res: CategoryType = await homeScreen.getCategory();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getNewProduct = createAsyncThunk(
  "homeReducer/getNewProduct",
  async (params: any, thunkAPI) => {
    try {
      const res: NewProductType = await homeScreen.getNewProduct();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSellingProduct = createAsyncThunk(
  "homeReducer/getSellingProduct",
  async (params: any, thunkAPI) => {
    try {
      const res: SellingProductType = await homeScreen.getSelling();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSupplier = createAsyncThunk(
  "homeReducer/getSupplier",
  async (params: any, thunkAPI) => {
    try {
      const res: SupplierType = await homeScreen.getSupplier();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserInfor = createAsyncThunk(
  "homeReducer/getUserInfor",
  async (params: any, thunkAPI) => {
    try {
      const res: any = await homeScreen.getUserInfor();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDistributorInfo = createAsyncThunk(
  "homeReducer/getDistributorInfo",
  async (params: any, thunkAPI) => {
    try {
      const res: any = await homeScreen.getDistributorInfo();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getWallet = createAsyncThunk(
  "homeReducer/getWallet",
  async (params: any, thunkAPI) => {
    try {
      const res: any = await homeScreen.getWallet(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategoryNccs = createAsyncThunk(
  "homeReducer/getCategoryNcc",
  async (req: { params: any; supllierId: string }, thunkAPI) => {
    try {
      const res: any = await homeScreen.getCategoryNcc(
        req.params,
        req.supllierId
      );

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const homeSlice = createSlice({
  name: "homeReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGreeting.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getGreeting.fulfilled, (state, action) => {
      state.loading = false;
      state.greeting = action.payload;
    });
    builder.addCase(getGreeting.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getSupplier.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSupplier.fulfilled, (state, action) => {
      state.listSupplier = action.payload;
      state.loading = false;
    });
    builder.addCase(getSupplier.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.listCategory = action.payload;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getSellingProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSellingProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.listSellingProduct = action.payload;
    });
    builder.addCase(getSellingProduct.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getNewProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getNewProduct.fulfilled, (state, action) => {
      state.loading = false;

      state.listNewProduct = action.payload;
    });
    builder.addCase(getNewProduct.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getUserInfor.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserInfor.fulfilled, (state, action) => {
      state.loading = false;
      state.listUserInfor = action.payload;
    });
    builder.addCase(getUserInfor.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getDistributorInfo.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDistributorInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.retailerInfo = action.payload;
    });
    builder.addCase(getDistributorInfo.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getWallet.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getWallet.fulfilled, (state, action) => {
      state.loading = false;
      state.dataWallet = action.payload;
    });
    builder.addCase(getWallet.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getCategoryNccs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCategoryNccs.fulfilled, (state, action) => {
      state.loading = false;
      state.listCategoryNcc = action.payload;
    });
    builder.addCase(getCategoryNccs.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {} = homeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHome = (state: RootState) => state.homeReducer;

export default homeSlice.reducer;
