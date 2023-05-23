import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessage } from "../../../common/utils";
import api from "../../service/warehouses/distributor-stock-inventory";
import { RootState } from "../../store";
import { AddressRes } from "../../type/Shipping/address";
import {
  DistributorStockInventoryReq,
  DistributorStockInventoryRes,
  DistributorStockInventoryState,
} from "../../type/warehouses/distributor-stock-inventory";

// Define the initial state using that type
const initialState: DistributorStockInventoryState = {
  loading: false,
};

export const ValidateDistributorStockInventory = createAsyncThunk(
  "distributorStockInventoryReducer/handleDistributorStockInventory/ValidateDistributorStockInventory",
  async (body: DistributorStockInventoryReq[], thunkAPI) => {
    try {
      const res: DistributorStockInventoryRes = await api.validate(body);
      if (res?.isValid) {
        // await thunkAPI.dispatch();
      }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);

export const distributorStockInventorySlice = createSlice({
  name: "distributorStockInventoryReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetDistributorStockInventory: (
      state: DistributorStockInventoryState,
      action: any
    ) => {
      state.ValidateDistributorStockInventorySuccess = false;
      state.errors = "";
    },
  },
  extraReducers: (builder) => {
    //Get Carts
    builder.addCase(
      ValidateDistributorStockInventory.pending,
      (state, action) => {
        state.loading = true;
        state.ValidateDistributorStockInventorySuccess = false;
      }
    );
    builder.addCase(
      ValidateDistributorStockInventory.fulfilled,
      (state, action) => {
        state.loading = false;
        state.ValidateDistributorStockInventorySuccess =
          action.payload.isValid || false;
        state.errors = action.payload.isValid ? "" : action.payload.message;
      }
    );
    builder.addCase(
      ValidateDistributorStockInventory.rejected,
      (state, action) => {
        state.loading = false;
        state.ValidateDistributorStockInventorySuccess = false;
        state.errors = action?.payload?.toString() || "";
      }
    );
  },
});

export const { resetDistributorStockInventory } =
  distributorStockInventorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDistributorStockInventory = (state: RootState) =>
  state.distributorStockInventoryReducer;

export default distributorStockInventorySlice.reducer;
