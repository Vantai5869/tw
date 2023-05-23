import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import api from "../../service/Partnership/supplier";
import { RootState } from "../../store";
import {
  SupplierReq,
  SupplierState,
  SupplierType,
} from "../../type/Partnership/supplier";

// Define the initial state using that type
const initialState: SupplierState = {
  loading: false,
  suppliers: [],
  filters: {
    skip: 0,
    take: 100,
    ListCategoryId: [],
    ListSupplierId: [],
    TextSearch: "",
    FromPrice: 0,
    SortField: 0,
    SortType: 0,
  },
};
export const SupplierSearch = createAsyncThunk(
  "supplierReducer/supplierSearch",
  async (params: SupplierReq, thunkAPI) => {
    try {
      const res: any = await api.search();

      if (!!params.nameCompany) {
        const newArray = res?.items?.filter(
          (e: SupplierType) =>
            !!e?.nameCompany &&
            e?.nameCompany
              ?.toLowerCase()
              // ?.normalize("NFD")
              // ?.replace(/[\u0300-\u036f]/g, "")
              ?.indexOf(params?.nameCompany?.toLowerCase() || "") > -1
        );
        return newArray;
      } else {
        return res.items;
      }
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetDetailSupplier = createAsyncThunk(
  "supplierReducer/GetDetailSupplier",
  async (id: string, thunkAPI) => {
    try {
      const res: any = await api.detail(id);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const supplierSlice = createSlice({
  name: "supplierReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetSupplier: (state: SupplierState, action: any) => {
      state.getDetailSuppilerSuccess = false;
    },
  },
  extraReducers: (builder) => {
    //supplier Search
    builder.addCase(SupplierSearch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(SupplierSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.suppliers = action.payload;
    });
    builder.addCase(SupplierSearch.rejected, (state, action: any) => {
      state.loading = false;
    });

    //Get detail
    builder.addCase(GetDetailSupplier.pending, (state, action) => {
      state.loading = true;
      state.getDetailSuppilerSuccess = false;
    });
    builder.addCase(GetDetailSupplier.fulfilled, (state, action) => {
      state.loading = false;
      state.supplier = action.payload;
      state.getDetailSuppilerSuccess = true;
    });
    builder.addCase(GetDetailSupplier.rejected, (state, action: any) => {
      state.loading = false;
      state.getDetailSuppilerSuccess = false;
    });
  },
});

export const { resetSupplier } = supplierSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSupplier = (state: RootState) => state.supplierReducer;

export default supplierSlice.reducer;
