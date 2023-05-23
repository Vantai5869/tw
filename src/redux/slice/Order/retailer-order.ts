import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import handleOrder from "../../service/Order/order";
import { RootState } from "../../store";
import {
  AcceptOrderReq,
  CancelOrderReq,
  GetOrderReq,
  GetOrderRes,
  GetReasonRes,
  GetSummaryOrdersReq,
  OrderState,
  OrderType,
  RejectRes,
  SummaryOrdersRes,
} from "../../type/Orders/order";
const initialState: OrderState = {
  loading: false,
  order: undefined,
  orders: {
    items: [],
    totalCount: 0,
  },
  orderSummary: undefined,
  rejectedOrder: undefined,
  statusCall: false,
  cancelReason: undefined,
  CustomerCancelReason: undefined,
};
export const AcceptOrder = createAsyncThunk(
  "orderReducer/AcceptOrder",
  async (req: AcceptOrderReq, thunkAPI) => {
    try {
      const res: OrderType = await handleOrder.accept(req);

      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const CancelOrder = createAsyncThunk(
  "orderReducer/CancelOrder",
  async (req: CancelOrderReq, thunkAPI) => {
    try {
      const res: OrderType = await handleOrder.cancel(req);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const RejectOrder = createAsyncThunk(
  "orderReducer/RejectOrder",
  async (req: CancelOrderReq, thunkAPI) => {
    try {
      const res: RejectRes = await handleOrder.reject(req);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const ShippingOrder = createAsyncThunk(
  "orderReducer/ShippingOrder",
  async (id: string, thunkAPI) => {
    try {
      const res: OrderType = await handleOrder.shipping(id);

      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const DeliveriedOrder = createAsyncThunk(
  "orderReducer/DeliveriedOrder",
  async (id: string, thunkAPI) => {
    try {
      const res: OrderType = await handleOrder.deliveried(id);

      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const GetOrder = createAsyncThunk(
  "orderReducer/GetOrder",
  async (params: GetOrderReq, thunkAPI) => {
    try {
      const res: GetOrderRes = await handleOrder.list(params);
      return {
        data: res,
        params,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const GetReason = createAsyncThunk(
  "orderReducer/GetReason",
  async (params: any, thunkAPI) => {
    try {
      const res: GetReasonRes[] = await handleOrder.cancelReasonList();

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const GetCustomerReason = createAsyncThunk(
  "orderReducer/GetCustomerReason",
  async (params: any, thunkAPI) => {
    try {
      const res: GetReasonRes[] = await handleOrder.customerCancelReasonList();

      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const GetMoreOrder = createAsyncThunk(
  "orderReducer/GetMoreOrder",
  async (params: GetOrderReq, thunkAPI) => {
    try {
      const res: GetOrderRes = await handleOrder.list(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetSummaryOrders = createAsyncThunk(
  "orderReducer/GetSummaryOrders",
  async (params: GetSummaryOrdersReq, thunkAPI) => {
    try {
      const res: SummaryOrdersRes = await handleOrder.summary();

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const GetDetailOrder = createAsyncThunk(
  "orderReducer/GetDetailOrder",
  async (id: string, thunkAPI) => {
    try {
      const res: OrderType = await handleOrder.detail(id);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const orderByRetailer = createSlice({
  name: "orderReducer",
  initialState,
  reducers: {
    resetStatusCall: (state: OrderState) => {
      state.statusCall = false;
    },
    resetOrder: (state: OrderState) => {
      state.orders = undefined;
    },
    resetOrderDetail: (state: OrderState) => {
      state.order = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetOrder.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.loading = false;
      state.orderFilter = action.payload.params;
    });
    builder.addCase(GetOrder.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(GetMoreOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetMoreOrder.fulfilled, (state, action) => {
      state.loading = false;
      if (state.orders && action.payload) {
        state.orders = {
          ...state.orders,
          items: [...state.orders?.items, ...action.payload.items],
        };
      }
    });
    builder.addCase(GetMoreOrder.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(GetSummaryOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetSummaryOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orderSummary = action.payload;
    });
    builder.addCase(GetSummaryOrders.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(GetReason.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetReason.fulfilled, (state, action) => {
      state.loading = false;
      state.cancelReason = action.payload;
    });
    builder.addCase(GetReason.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(GetCustomerReason.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetCustomerReason.fulfilled, (state, action) => {
      state.loading = false;
      state.CustomerCancelReason = action.payload;
    });
    builder.addCase(GetCustomerReason.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(GetDetailOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetDetailOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(GetDetailOrder.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(AcceptOrder.pending, (state) => {
      state.loading = true;
      state.statusCall = false;
    });
    builder.addCase(AcceptOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.statusCall = true;
    });
    builder.addCase(AcceptOrder.rejected, (state) => {
      state.loading = false;
      state.statusCall = false;
    });
    builder.addCase(CancelOrder.pending, (state) => {
      state.loading = true;
      state.statusCall = false;
    });
    builder.addCase(CancelOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.statusCall = true;
    });
    builder.addCase(CancelOrder.rejected, (state) => {
      state.loading = false;
      state.statusCall = false;
    });
    builder.addCase(RejectOrder.pending, (state) => {
      state.loading = true;
      state.statusCall = false;
    });
    builder.addCase(RejectOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.rejectedOrder = action.payload;
      state.statusCall = true;
    });
    builder.addCase(RejectOrder.rejected, (state) => {
      state.loading = false;
      state.statusCall = false;
    });
    builder.addCase(DeliveriedOrder.pending, (state) => {
      state.loading = true;
      state.statusCall = false;
    });
    builder.addCase(DeliveriedOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.statusCall = true;
    });
    builder.addCase(DeliveriedOrder.rejected, (state) => {
      state.loading = false;
      state.statusCall = false;
    });
    builder.addCase(ShippingOrder.pending, (state) => {
      state.loading = true;
      state.statusCall = false;
    });
    builder.addCase(ShippingOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.statusCall = true;
    });
    builder.addCase(ShippingOrder.rejected, (state) => {
      state.loading = false;
      state.statusCall = false;
    });
  },
});

export const { resetStatusCall, resetOrder, resetOrderDetail } =
  orderByRetailer.actions;

export const selectOrderByRetailer = (state: RootState) =>
  state.orderByRetailer;

export default orderByRetailer.reducer;
