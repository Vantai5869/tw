import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../service/Shipping/address";
import { RootState } from "../../store";
import { AddressRes, AddressState } from "../../type/Shipping/address";

// Define the initial state using that type
const initialState: AddressState = {
  loading: false,
  addresses: {
    items: [],
    totalCount: 0,
  },
};

export const GetAddress = createAsyncThunk(
  "cartReducer/handleAddress/GetAddress",
  async (body: undefined, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const shippingAddress = state?.accountReducer?.shippingAddress || "";
    try {
      const res: AddressRes = await api.get();
      if (res && !shippingAddress?.id) {
        thunkAPI.dispatch(onPickUpAddress(res?.items?.[0]));
      }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addressSlice = createSlice({
  name: "addressReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    onPickUpAddress: (state: AddressState, action: any) => {
      state.shippingAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Get Carts
    builder.addCase(GetAddress.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(GetAddress.fulfilled, (state, action) => {
      // state.loading = false;
      state.addresses = action.payload;
    });
    builder.addCase(GetAddress.rejected, (state, action) => {
      // state.loading = false;
    });
  },
});

export const { onPickUpAddress } = addressSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAddress = (state: RootState) => state.addressReducer;

export default addressSlice.reducer;
