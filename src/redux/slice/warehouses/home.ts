import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import warehouseOverview from "../../service/warehouses/overview";
import { RootState } from "../../store";
import { GetListReq } from "../../type/warehouses/distributor-stock-inventory";
import {
  IMyProductSallingRes,
  IOverview,
  IProduct,
  IwareHome,
} from "../../type/warehouses/home";

// Define the initial state using that type
const initialState: IwareHome = {
  overview: undefined,
  myTopProductSelling: undefined,
  myTopProductOutOfStockWarning: undefined,
  loading: false,
};

export const getOverview = createAsyncThunk(
  "warehouse/overview",
  async (params: any, thunkAPI) => {
    try {
      const res: IOverview = await warehouseOverview.getWareOverview();

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyTopProductSelling = createAsyncThunk(
  "warehouse/getMyTopProductSelling",
  async (params: any, thunkAPI) => {
    try {
      const res: IMyProductSallingRes =
        await warehouseOverview.getMyTopProductSelling(0, 20);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyTopProductOutOfStockWarning = createAsyncThunk(
  "warehouse/myTopProductOutOfStockWarning",
  async (params: GetListReq, thunkAPI) => {
    try {
      const res: IMyProductSallingRes =
        await warehouseOverview.getMyTopProductOutOfStockWarning(params);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getMoreMyTopProductOutOfStockWarning = createAsyncThunk(
  "warehouse/MoremyTopProductOutOfStockWarning",
  async (params: GetListReq, thunkAPI) => {
    try {
      const res: IMyProductSallingRes =
        await warehouseOverview.getMyTopProductOutOfStockWarning(params);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const warehouseHomeSlice = createSlice({
  name: "warehouseHomeReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOverview.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOverview.fulfilled, (state, action) => {
      state.loading = false;
      state.overview = action.payload;
    });
    builder.addCase(getOverview.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(getMyTopProductSelling.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyTopProductSelling.fulfilled, (state, action) => {
      state.loading = false;
      state.myTopProductSelling = action.payload;
    });
    builder.addCase(getMyTopProductSelling.rejected, (state, action) => {
      state.loading = false;
    });

    builder.addCase(
      getMyTopProductOutOfStockWarning.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getMyTopProductOutOfStockWarning.fulfilled,
      (state, action) => {
        state.loading = false;
        state.myTopProductOutOfStockWarning = action.payload;
      }
    );
    builder.addCase(
      getMyTopProductOutOfStockWarning.rejected,
      (state, action) => {
        state.loading = false;
      }
    );
    builder.addCase(
      getMoreMyTopProductOutOfStockWarning.pending,
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getMoreMyTopProductOutOfStockWarning.fulfilled,
      (state, action) => {
        state.loading = false;
        if (state.myTopProductOutOfStockWarning && action.payload) {
          state.myTopProductOutOfStockWarning = {
            ...state.myTopProductOutOfStockWarning,
            items: [
              ...state.myTopProductOutOfStockWarning.items,
              ...action.payload.items,
            ],
          };
        }
      }
    );
    builder.addCase(
      getMoreMyTopProductOutOfStockWarning.rejected,
      (state, action) => {
        state.loading = false;
      }
    );
  },
});

export const {} = warehouseHomeSlice.actions;

export const selectWareHome = (state: RootState) => state.warehouseHomeSlice;

export default warehouseHomeSlice.reducer;
