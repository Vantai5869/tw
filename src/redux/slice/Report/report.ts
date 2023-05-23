import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessage } from "../../../common/utils";
import api from "../../service/Report/report";
import { RootState } from "../../store";
import {
  GetGrowthByCategoryReq,
  GetGrowthByProductReq,
  GetGrowthRes,
  GetGrowthRevenueReq,
  GetRateRPRes,
  GrowthState,
  GetProuctTopSellingRpReq,
  GetProuctTopSellingRpRes,
  getCustomerOrderRpReq,
  getCustomerOrderRpRes,
  getCancelSumaryrpReq,
  getCancelSumaryrpRes,
  getCancelrpReq,
  getCancelrpRes,
  GetRatingRP,
} from "../../type/Report/report";

const initialState: GrowthState = {
  loading: false,
  GrowReport: [],
  RateRP: {
    items: [],
    totalCount: 0,
  },
  propductTopSelling: {
    items: [],
    totalCount: 0,
    hasMore: true,
    currentPage: 0,
  },
  customerOrderRp: {
    items: [],
    totalCount: 0,
    hasMore: true,
    currentPage: 0,
  },
  cancelRp: undefined,
  cancelSumaryRp: undefined,
};
export const getGrowthByCategory = createAsyncThunk(
  "reportReducer/getGrowthByCategory",
  async (params: GetGrowthByCategoryReq, thunkAPI) => {
    try {
      const res: GetGrowthRes[] = await api.getGrowthByCategory(params);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);
export const getGrowthByProduct = createAsyncThunk(
  "reportReducer/getGrowthByProduct",
  async (params: GetGrowthByProductReq, thunkAPI) => {
    try {
      const res: GetGrowthRes[] = await api.getGrowthByProduct(params);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);
export const getGrowthRevenue = createAsyncThunk(
  "reportReducer/getGrowthRevenue",
  async (params: GetGrowthRevenueReq, thunkAPI) => {
    try {
      const res: GetGrowthRes[] = await api.getGrowthByRevenue(params);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);
export const getRateRP = createAsyncThunk(
  "reportReducer/getRateRP",
  async (params: GetRatingRP, thunkAPI) => {
    try {
      const res: GetRateRPRes = await api.getProductRatingRP(params);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);
export const getMoreRateRP = createAsyncThunk(
  "reportReducer/getMoreRateRP",
  async (params: GetRatingRP, thunkAPI) => {
    try {
      const res: GetRateRPRes = await api.getProductRatingRP(params);

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);

export const getProductTopSellingRp = createAsyncThunk(
  "reportReducer/getProuctTopSellingRp",
  async (params: GetProuctTopSellingRpReq, thunkAPI) => {
    try {
      const res: GetProuctTopSellingRpRes = await api.getProuctTopSellingRp(
        params
      );
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);

export const getCustomerOrderRp = createAsyncThunk(
  "reportReducer/getCustomerOrderRp",
  async (params: getCustomerOrderRpReq, thunkAPI) => {
    try {
      const res: getCustomerOrderRpRes = await api.getCustomerOrderRp(params);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);
export const getCancelSumaryRP = createAsyncThunk(
  "reportReducer/getCancelSumaryRP",
  async (parmas: getCancelSumaryrpReq, thunkAPI) => {
    try {
      const res: getCancelSumaryrpRes = await api.getCancelSumaryRP(parmas);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);
export const getCancelRP = createAsyncThunk(
  "reportReducer/getCancelRP",
  async (params: getCancelrpReq, thunkAPI) => {
    try {
      const res: getCancelrpRes = await api.getCancelRP(params);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);
export const getMoreCancelRP = createAsyncThunk(
  "reportReducer/getMoreCancelRP",
  async (params: getCancelrpReq, thunkAPI) => {
    try {
      const res: getCancelrpRes = await api.getCancelRP(params);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(getMessage(err));
    }
  }
);
export const reportSlice = createSlice({
  name: "reportReducer",
  initialState,
  reducers: {
    resetReport: (state: GrowthState, action) => {
      state.GrowReport = [];
      state.propductTopSelling = {
        items: [],
        totalCount: 0,
        hasMore: true,
        currentPage: 0,
      };
      state.customerOrderRp = {
        items: [],
        totalCount: 0,
        hasMore: true,
        currentPage: 0,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(getGrowthByCategory.pending, (state, action) => {
      state.loading = true;
      state.GrowReport = [];
    });
    builder.addCase(getGrowthByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.GrowReport = action.payload;
    });
    builder.addCase(getGrowthByCategory.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getGrowthByProduct.pending, (state, action) => {
      state.loading = true;
      state.GrowReport = [];
    });
    builder.addCase(getGrowthByProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.GrowReport = action.payload;
    });
    builder.addCase(getGrowthByProduct.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getGrowthRevenue.pending, (state, action) => {
      state.loading = true;
      state.GrowReport = [];
    });
    builder.addCase(getGrowthRevenue.fulfilled, (state, action) => {
      state.loading = false;
      state.GrowReport = action.payload;
    });
    builder.addCase(getGrowthRevenue.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getRateRP.pending, (state, action) => {
      state.loading = true;
      // state.RateRP.items = undefined;
      // state.RateRP.totalCount = 0;
    });
    builder.addCase(getRateRP.fulfilled, (state, action) => {
      state.loading = false;
      state.RateRP = action.payload;
    });
    builder.addCase(getRateRP.rejected, (state, action) => {
      state.loading = false;
      state.RateRP.items = [];
      state.RateRP.totalCount = 0;
    });
    builder.addCase(getMoreRateRP.pending, (state, action) => {
      state.loading = true;
      // state.RateRP.items = undefined;
      // state.RateRP.totalCount = 0;
    });
    builder.addCase(getMoreRateRP.fulfilled, (state, action) => {
      state.loading = false;
      if (state.RateRP && action.payload) {
        state.RateRP = {
          ...state.RateRP,
          items: [...state.RateRP?.items, ...action.payload.items],
        };
      }
    });
    builder.addCase(getMoreRateRP.rejected, (state, action) => {
      state.loading = false;
      state.RateRP.items = [];
      state.RateRP.totalCount = 0;
    });

    builder.addCase(getProductTopSellingRp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductTopSellingRp.fulfilled, (state, action) => {
      state.loading = false;
      state.propductTopSelling = action.payload;
    });
    builder.addCase(getProductTopSellingRp.rejected, (state, action) => {
      state.loading = false;
      state.propductTopSelling.items = undefined;
      state.propductTopSelling.totalCount = 0;
    });

    builder.addCase(getCustomerOrderRp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCustomerOrderRp.fulfilled, (state, action) => {
      state.customerOrderRp.items = state.customerOrderRp.items
        ? state.customerOrderRp.items?.concat(action.payload?.items || [])
        : action.payload?.items;
      state.customerOrderRp.totalCount = action.payload?.totalCount;
      if (state.customerOrderRp.items?.length === action.payload?.totalCount) {
        state.customerOrderRp.hasMore = false;
      }
      state.loading = false;
      state.customerOrderRp.currentPage = state.customerOrderRp.currentPage + 1;
    });
    builder.addCase(getCustomerOrderRp.rejected, (state, action) => {
      state.loading = false;
      state.customerOrderRp.items = undefined;
      state.customerOrderRp.totalCount = 0;
    });
    builder.addCase(getCancelSumaryRP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCancelSumaryRP.fulfilled, (state, action) => {
      state.loading = false;
      state.cancelSumaryRp = action.payload;
    });
    builder.addCase(getCancelSumaryRP.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getCancelRP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCancelRP.fulfilled, (state, action) => {
      state.loading = false;
      state.cancelRp = action.payload;
    });
    builder.addCase(getCancelRP.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getMoreCancelRP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMoreCancelRP.fulfilled, (state, action) => {
      state.loading = false;
      if (state.cancelRp && action.payload) {
        state.cancelRp = {
          ...state.cancelRp,
          items: [...state.cancelRp?.items, ...action.payload.items],
        };
      }
    });
    builder.addCase(getMoreCancelRP.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export const { resetReport } = reportSlice.actions;

export const selectReport = (state: RootState) => state.reportReducer;
export default reportSlice.reducer;
