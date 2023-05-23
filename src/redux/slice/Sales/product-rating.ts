import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessage } from "../../../common/utils";
import api from "../../service/Sales/product-rating";
import { RootState } from "../../store";
import {
  ProductRatingReq,
  ProductRatingRes,
  ProductRatingState,
} from "../../type/Sales/product-rating";

// Define the initial state using that type
const initialState: ProductRatingState = {
  loading: false,
  errors: "",
  reviews: undefined,
};

export const GetListRating = createAsyncThunk(
  "reviewsReducer/handleProductRating/GetListRating",
  async (body: ProductRatingReq, thunkAPI) => {
    try {
      const res: ProductRatingRes = await api.getListRating(body);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);
export const GetMoreListRating = createAsyncThunk(
  "reviewsReducer/handleProductRating/GetMoreListRating",
  async (body: ProductRatingReq, thunkAPI) => {
    try {
      const res: ProductRatingRes = await api.getListRating(body);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);
export const GetListRatingRetailer = createAsyncThunk(
  "reviewsReducer/handleProductRating/GetListRatingRetailer",
  async (body: ProductRatingReq, thunkAPI) => {
    try {
      const res: ProductRatingRes = await api.getListRatingRetailer(body);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);
export const GetMoreListRatingRetailer = createAsyncThunk(
  "reviewsReducer/handleProductRating/GetMoreListRatingRetailers",
  async (body: ProductRatingReq, thunkAPI) => {
    try {
      const res: ProductRatingRes = await api.getListRatingRetailer(body);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);

export const order = createSlice({
  name: "reviewsReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetOrderState: (state: ProductRatingState, action: any) => {
      state.loading = false;
      state.errors = "";
    },
    onProductRatingErrors: (state: ProductRatingState, action: any) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    //GetListRating
    builder.addCase(GetListRating.pending, (state, action) => {
      state.loading = true;
      // state.reviews = undefined;
    });
    builder.addCase(GetListRating.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.reviews = action.payload;
    });
    builder.addCase(GetListRating.rejected, (state, action: any) => {
      state.loading = false;
      state.errors = action.payload || "";
      state.reviews = undefined;
    });
    builder.addCase(GetListRatingRetailer.pending, (state, action) => {
      state.loading = true;
      // state.reviews = undefined;
    });
    builder.addCase(GetListRatingRetailer.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      state.reviews = action.payload;
    });
    builder.addCase(GetListRatingRetailer.rejected, (state, action: any) => {
      state.loading = false;
      state.errors = action.payload || "";
      state.reviews = undefined;
    });
    builder.addCase(GetMoreListRating.pending, (state, action) => {
      state.loading = true;
      // state.reviews = undefined;
    });
    builder.addCase(GetMoreListRating.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      if (state.reviews && action.payload.items.length > 0) {
        state.reviews = {
          ...state.reviews,
          items: [...state.reviews?.items, ...action.payload.items],
        };
      }
    });
    builder.addCase(GetMoreListRating.rejected, (state, action: any) => {
      state.loading = false;
      state.errors = action.payload || "";
      state.reviews = undefined;
    });
    builder.addCase(GetMoreListRatingRetailer.pending, (state, action) => {
      state.loading = true;
      // state.reviews = undefined;
    });
    builder.addCase(GetMoreListRatingRetailer.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
      if (state.reviews && action.payload) {
        state.reviews = {
          ...state.reviews,
          items: [...state.reviews?.items, ...action.payload.items],
        };
      }
    });
    builder.addCase(
      GetMoreListRatingRetailer.rejected,
      (state, action: any) => {
        state.loading = false;
        state.errors = action.payload || "";
        state.reviews = undefined;
      }
    );
  },
});

export const { onProductRatingErrors } = order.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProductRating = (state: RootState) => state.reviewsReducer;

export default order.reducer;
