import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import { ACTION_TYPE } from "../../../constants/type.interface";
import { translate } from "../../../locale";
import api from "../../service/Sales/order-import";
import { RootState } from "../../store";
import {
  CancelOrderImportReq,
  GetOrderImportReq,
  GetOrderImportRes,
  OrderImportReq,
  OrderImportRes,
  OrderImportState,
  OrderImportType,
  PaymentReq,
  PaymentRes,
  RateOrderImportReq,
  ReasonType,
  RePurchaseOrderImportRes,
} from "../../type/Sales/order-import";
import { GetDistributorCart } from "../Cart/distributor-cart";

// Define the initial state using that type
const initialState: OrderImportState = {
  loading: false,
  order: undefined,
  orders: {
    items: [],
    totalCount: 0,
  },
  paymentUrl: undefined,
};

export const EPaymentType = ["1", "2", "VNBANK", "INTCARD", "VnPayQR"];

export const OrderImport = createAsyncThunk(
  "orderImportReducer/OrderImport",
  async (params: OrderImportReq, thunkAPI) => {

    try {
      if (params.type === ACTION_TYPE.BUYNOW) {
        const res: OrderImportRes = await api.quickOrder(params);
        if (res?.paymentID) {
          await thunkAPI.dispatch(
            GetOrderImport({ skip: 1, take: 20, Status: "1" })
          );
        }
        return res;
      } else {
        const res: OrderImportRes = await api.createOrder(params);
        if (res?.paymentID) {
          await thunkAPI.dispatch(
            GetOrderImport({ skip: 1, take: 20, Status: "1" })
          );
        }
        return res;
      }
    } catch (error) {
      // Alert.alert(getMessage(error), "", [
      //   { onPress: () => thunkAPI.dispatch(GetRetailerCart()) },
      // ]);
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);

export const GetOrderImport = createAsyncThunk(
  "orderImportReducer/GetOrderImport",
  async (params: GetOrderImportReq, thunkAPI) => {
    try {
      const res: GetOrderImportRes = await api.list(params);
      return {
        data: res,
        params,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const OrderImportWithVPN = createAsyncThunk(
  "orderImportReducer/OrderImportVNP",
  async (params: OrderImportReq, thunkAPI) => {
    try {
      if (params.type === ACTION_TYPE.BUYNOW) {
        const res: OrderImportRes = await api.quickOrder(params);
        if (res?.paymentID) {
          await thunkAPI.dispatch(
            GetOrderImport({ skip: 1, take: 20, Status: "1" })
          );
          const res2 = await thunkAPI.dispatch(
            GetUrlVnPay({
              orderIds: res?.listRetailerOrders?.map((i) => i.id) as [],
              // orderIds: ['a5cc8b59-e96d-4b83-81d9-45fbc86b773d'],
              source: 0,
              extraProperties: {
                BankCode: EPaymentType[params.paymentType - 1],
              },
            })
          );
          return res2;
        }
        return res;
      } else {
        const res: OrderImportRes = await api.createOrder(params);
        if (res?.paymentID) {
          await thunkAPI.dispatch(
            GetOrderImport({ skip: 1, take: 20, Status: "1" })
          );
          const res2: any = await thunkAPI.dispatch(
            GetUrlVnPay({
              orderIds: res?.listRetailerOrders?.map((i) => i.id) as [],
              // orderIds: ['a5cc8b59-e96d-4b83-81d9-45fbc86b773d'],
              source: 0,
              extraProperties: {
                BankCode: EPaymentType[params.paymentType - 1],
              },
            })
          );
          return res2;
        }
        return res;
      }
    } catch (error) {
      Alert.alert(getMessage(error), "", [
        { onPress: () => thunkAPI.dispatch(GetDistributorCart()) },
      ]);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetUrlVnPay = createAsyncThunk(
  "orderReducer/GetUrlVnPay",
  async (params: PaymentReq, thunkAPI) => {
    try {
      const res: PaymentRes = await api.getUrlVnPay(params);
      if (res?.paymentUrl) {
        return res.paymentUrl;
      }
      // return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetDetailOrder = createAsyncThunk(
  "orderImportReducer/GetDetailOrder",
  async (id: string, thunkAPI) => {
    try {
      const res: OrderImportType = await api.detail(id);
      return res;
    } catch (error) {
      // Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const RateOrderImport = createAsyncThunk(
  "orderImportReducer/RateOrderImport",
  async (body: RateOrderImportReq, thunkAPI) => {
    try {
      const res: boolean = await api.rate(body);
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const CancelOrderImport = createAsyncThunk(
  "orderReducer/CancelOrder",
  async (body: CancelOrderImportReq, thunkAPI) => {
    try {
      await api.cancelOrderImport(body);
      return body;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetReasonCancelOrderImport = createAsyncThunk(
  "orderReducer/GetReasonCancelOrder",
  async (body: string, thunkAPI) => {
    try {
      const res: ReasonType[] = await api.getReason();

      return res?.map((el, index) => {
        return {
          ...el,
          position: (index + 1).toString(),
        };
      });
    } catch (error) {
      // Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const GetRePurchaseOrderImport = createAsyncThunk(
  "orderReducer/handleOrder/GetRePurchaseOrder",
  async (body: string, thunkAPI) => {
    try {
      const res: RePurchaseOrderImportRes = await api.rePurchaseOrderImport(
        body
      );
      return res;
    } catch (error) {
      // Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const FilterOrderImport = createAsyncThunk(
  "orderImportReducer/FilterOrderImport",
  async (params: GetOrderImportReq, thunkAPI) => {
    try {
      const res: GetOrderImportRes = await api.list(params);

      return {
        data: res,
        params,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderImport = createSlice({
  name: "orderImportReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetOrderImportState: (state: OrderImportState, action: any) => {
      state.orderSuccess = false;
      state.cancelOrderSuccess = false;
      state.rateOrderSuccess = false;
      state.rePurchaseSuccess = false;
      state.rePurchaseData = undefined;
      state.orderImportId = undefined;
      state.errors = "";
    },
    handleOrderImportId: (state: OrderImportState, action: any) => {
      state.orderImportId = action.payload.id;
    },

    onOrderImportErrors: (state: OrderImportState, action: any) => {
      state.errors = action.payload;
    },
    onOrderImportSuccess: (state: OrderImportState, action: any) => {
      state.orderSuccess = true;
      state.errors = "";
    },
    onRateSuccess: (state: OrderImportState, action: any) => {
      state.rateOrderSuccess = true;
      state.errors = "";
    },
  },
  extraReducers: (builder) => {
    //OrderImport
    builder.addCase(OrderImport.pending, (state, action) => {
      state.loading = true;
      state.orderSuccess = false;
    });
    builder.addCase(OrderImport.fulfilled, (state, action) => {
      state.loading = false;
      state.newOrder = action.payload;
      state.orderSuccess = true;
      state.errors = "";
    });
    builder.addCase(OrderImport.rejected, (state, action: any) => {
      state.loading = false;
      state.orderSuccess = false;

      state.errors = action?.payload || "";
    });

    //GetOrderImport
    builder.addCase(GetOrderImport.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetOrderImport.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.data;
      state.orderFilter = action.payload.params;
    });
    builder.addCase(GetOrderImport.rejected, (state, action: any) => {
      state.loading = false;
    });

    //GetDetailOrder
    builder.addCase(GetDetailOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetDetailOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(GetDetailOrder.rejected, (state, action: any) => {
      state.loading = false;
    });

    //RateOrderImport
    builder.addCase(RateOrderImport.pending, (state, action) => {
      state.loadingRate = true;
    });
    builder.addCase(RateOrderImport.fulfilled, (state, action) => {
      state.loadingRate = false;
    });
    builder.addCase(RateOrderImport.rejected, (state, action: any) => {
      state.loadingRate = false;
    });

    //CancelOrder
    builder.addCase(CancelOrderImport.pending, (state, action) => {
      state.loadingCancel = true;
      state.cancelOrderSuccess = false;
    });
    builder.addCase(CancelOrderImport.fulfilled, (state, action) => {
      state.loadingCancel = false;
      state.cancelOrderSuccess = true;
    });
    builder.addCase(CancelOrderImport.rejected, (state, action: any) => {
      state.loadingCancel = false;
      state.cancelOrderSuccess = false;
    });

    //GetReasonCancelOrder
    builder.addCase(GetReasonCancelOrderImport.pending, (state, action) => {
      state.loadingCancel = true;
    });
    builder.addCase(GetReasonCancelOrderImport.fulfilled, (state, action) => {
      state.loadingCancel = false;
      state.reasons = action.payload;
    });
    builder.addCase(
      GetReasonCancelOrderImport.rejected,
      (state, action: any) => {
        state.loadingCancel = false;
      }
    );

    //RePurchase
    builder.addCase(GetRePurchaseOrderImport.pending, (state, action) => {
      state.loadingRePurchase = true;
      state.rePurchaseSuccess = false;
    });
    builder.addCase(GetRePurchaseOrderImport.fulfilled, (state, action) => {
      state.loadingRePurchase = false;
      state.rePurchaseSuccess = true;
      state.rePurchaseData = action.payload;
    });
    builder.addCase(GetRePurchaseOrderImport.rejected, (state, action: any) => {
      state.loadingRePurchase = false;
      state.rePurchaseSuccess = false;
      state.rePurchaseData = undefined;
    });

    //FilterOrderImport
    builder.addCase(FilterOrderImport.pending, (state, action) => {
      state.loadingFilterOrderImport = true;
      state.dataFlterOrders = undefined;
    });
    builder.addCase(FilterOrderImport.fulfilled, (state, action) => {
      state.loadingFilterOrderImport = false;
      state.dataFlterOrders = action.payload.data;
    });
    builder.addCase(FilterOrderImport.rejected, (state, action: any) => {
      state.loadingFilterOrderImport = false;
    });

    // GetUrlVnPay
    builder.addCase(GetUrlVnPay.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetUrlVnPay.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentUrl = action.payload;
    });
    builder.addCase(GetUrlVnPay.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {
  resetOrderImportState,
  handleOrderImportId,
  onOrderImportErrors,
  onOrderImportSuccess,
  onRateSuccess,
} = orderImport.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOrderImport = (state: RootState) => state.orderImportReducer;

export default orderImport.reducer;
