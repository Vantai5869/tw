import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Iwallet, pageOption } from './../../type/Wallet';
import api from "../../service/Wallet/";

const initialState:Iwallet = {
    loading: false,
    transactionHistory: {
        items:[],
        totalCount:0
    },
    hasMore: true,
    currentPage:0
};

export const GetTransactionHistory = createAsyncThunk(
  "walletReducer/GetTransactionHistory",
  async (params: pageOption, thunkAPI) => {
    try {
        const res = await api.list(params);
      return res;
    } catch (error) {
    }
  }
);

export const walletSlice = createSlice({
  name: "walletReducer",
  initialState,
  reducers: {
    resetWallet: (state: Iwallet, action: any) => {
      state.transactionHistory = {
        items:[],
        totalCount:0
      },
      state.hasMore= true,
      state.currentPage= 0
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetTransactionHistory.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetTransactionHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.transactionHistory.totalCount= action.payload?.totalCount||0;
      state.transactionHistory.items = [...state.transactionHistory.items,...action.payload?.items? action.payload?.items: []];
      state.currentPage= state.currentPage+1;
      if(action?.payload?.items?.length===0){
        state.hasMore= false;
      }
    });
    builder.addCase(GetTransactionHistory.rejected, (state, action: any) => {
      state.loading = false;
    });

  },
});

export const {
 resetWallet
} = walletSlice.actions;
export const selectWallet = (state: RootState) => state.walletReducer;

export default walletSlice.reducer;
