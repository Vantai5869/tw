import { RatingReq, RatingRes, RatingState } from "./../../type/Rating/rating";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../service/Rating/rating";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import { RootState } from "../../store";

const initialState: RatingState = {
  loading: false,
  newRate: undefined,
};

export const SendRate = createAsyncThunk(
  "rateReducer/SendRate",
  async (params: RatingReq, thunkAPI) => {
    try {
      const res: RatingRes = await api.rate(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);
export const rating = createSlice({
  name: "rateReducer",
  initialState,
  reducers: {
    resetRatingState: (state: RatingState, action: any) => {
      state.loading = false;
      state.ratingOrderImportSuccess = false;
      state.errors = "";
    },
    onRatingErrors: (state: RatingState, action: any) => {
      state.errors = action.payload;
    },
    onRateSuccess: (state: RatingState, action: any) => {
      state.ratingOrderImportSuccess = true;
      state.errors = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SendRate.pending, (state) => {
      state.loading = true;
      state.ratingOrderImportSuccess = false;
    });
    builder.addCase(SendRate.fulfilled, (state, action) => {
      state.loading = false;
      state.newRate = action.payload;
      state.ratingOrderImportSuccess = true;
      state.errors = "";
    });
    builder.addCase(SendRate.rejected, (state, action) => {
      state.loading = false;
      state.ratingOrderImportSuccess = false;
      state.errors = action?.payload?.toString() || "";
    });
  },
});
export const { resetRatingState, onRatingErrors, onRateSuccess } =
  rating.actions;

export const selectRate = (state: RootState) => state.rateReducer;

export default rating.reducer;
