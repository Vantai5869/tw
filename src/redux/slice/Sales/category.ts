import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import api from "../../service/Sales/category";
import { RootState } from "../../store";
import {
  CategoryReq,
  CategoryType,
  CategoryState,
} from "../../type/Sales/category";

// Define the initial state using that type
const initialState: CategoryState = {
  loading: false,
  categories: [],
};

export const GetCategory = createAsyncThunk(
  "categoryReducer/getCategory",
  async (params: CategoryReq, thunkAPI) => {
    try {
      const res: CategoryType[] = await api.search();
      if (!!params.searchKey) {
        const newArray = res?.filter(
          (e: CategoryType) =>
            !!e?.name &&
            e?.name
              ?.toLowerCase()
              // ?.normalize("NFD")
              // ?.replace(/[\u0300-\u036f]/g, "")
              ?.indexOf(params?.searchKey?.toLowerCase() || "") > -1
        );
        return newArray;
      } else {
        return res;
      }
    } catch (error) {
      // Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const CategorySearch = createAsyncThunk(
  "categoryReducer/categorySearch",
  async (params: CategoryReq, thunkAPI) => {
    try {
      // const res: CategoryType[] = await api.search(params);
      const state: any = thunkAPI.getState();

      const newArray = state?.categoryReducer?.categories?.filter(
        (e: CategoryType) =>
          !!e?.name &&
          e?.name
            ?.toLowerCase()
            // ?.normalize("NFD")
            // ?.replace(/[\u0300-\u036f]/g, "")
            ?.indexOf(params.searchKey || "") > -1
      );
      return newArray;
    } catch (error) {
      // Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "categoryReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get Category
    builder.addCase(GetCategory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(GetCategory.rejected, (state, action: any) => {
      state.loading = false;
    });
  },
});

export const {} = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategory = (state: RootState) => state.categoryReducer;

export default productSlice.reducer;
