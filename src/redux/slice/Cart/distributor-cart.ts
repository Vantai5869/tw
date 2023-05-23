import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import { translate } from "../../../locale";
import api from "../../service/Cart/distributorCart";
import { RootState } from "../../store";
import {
  AddToCartReq,
  CartState,
  CartType,
  ChangeQuantityReq,
  DeleteListCartReq,
  GetCartRes,
  ListProductToCartRes,
  RetailCartAddReq,
} from "../../type/Cart/cart";

// Define the initial state using that type
const initialState: CartState = {
  loading: false,
  carts: [],
};

export const GetDistributorCart = createAsyncThunk(
  "cartReducer/handleDistributorrCart/GetDistributorCart",
  async (body: undefined, thunkAPI) => {
    try {
      const res: GetCartRes = await api.get();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const AddDistributorCart = createAsyncThunk(
  "cartReducer/handleDistributorCart/AddDistributorCart",
  async (body: RetailCartAddReq, thunkAPI) => {
    try {
      const res: CartType = await api.add(body);
      if (res) {
        await thunkAPI.dispatch(GetDistributorCart());
      }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);

export const DeleteDistributorCart = createAsyncThunk(
  "cartReducer/handleDistributorCart/DeleteDistributorCart",
  async (distributorCartItemId: string, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const retailerCartId = state?.distributorCartReducer?.retailerCartId || "";

    try {
      const res: boolean = await api.delete({
        id: retailerCartId,
        distributorCartItemId,
      });
      if (res) {
        await thunkAPI.dispatch(GetDistributorCart());
      }
      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ChangeQuantity = createAsyncThunk(
  "cartReducer/handleDistributorCart/ChangeQuantity",
  async (body: ChangeQuantityReq, thunkAPI) => {
    try {
      const res: CartType = await api.changeQuantity(body);
      if (res) {
        await thunkAPI.dispatch(GetDistributorCart());
      }
      return res;
    } catch (error) {
      try {
        const res: CartType = await api.changeQuantity({
          ...body,
          quantity: body?.quantityReady || 1,
        });
        if (res) {
          await thunkAPI.dispatch(GetDistributorCart());
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(
          getMessage(error) + " ( Còn lại " + (body?.quantityReady || 0) + " ) "
        );
      }
      return thunkAPI.rejectWithValue(
        getMessage(error) + " ( Còn lại " + (body?.quantityReady || 0) + " ) "
      );
    }
  }
);

export const AddListProductToCart = createAsyncThunk(
  "cartReducer/handleCart/AddListProductToCart",
  async (params: AddToCartReq[], thunkAPI) => {
    try {
      const res: ListProductToCartRes = await api.listProductToCart(params);
      if (res?.id) {
        await thunkAPI.dispatch(GetDistributorCart());
      }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);

export const DeleteListCart = createAsyncThunk(
  "cartReducer/handleCart/DeleteListCart",
  async (params: DeleteListCartReq, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const token = (await AsyncStorage.getItem("accessToken")) || "";
    const distributorCartId =
      state?.retailerCartReducer?.distributorCartId || "";
    try {
      const res: string[] = await api.deleteList({
        ...params,
        id: distributorCartId,
      });
      if (res) {
        await thunkAPI.dispatch(GetDistributorCart());
      }
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(getMessage(error));
    }
  }
);

export const distributorCartSlice = createSlice({
  name: "distributorCartReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetCartState: (state: CartState, action: any) => {
      state.listProductToCartSuccess = false;
      state.loading = false;
      state.loadingDelete = false;
      state.errors = "";
      state.productId = "";
      state.addToCartSuccess = "";
      state.changeQuantitySuccess = 1;
    },
    handleProductId: (state: CartState, action: any) => {
      state.productId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Add to Cart
    builder.addCase(AddDistributorCart.pending, (state, action) => {
      state.addToCartSuccess = "";
      state.errors = "";
    });
    builder.addCase(AddDistributorCart.fulfilled, (state, action) => {
      state.addToCartSuccess = translate("add_to_cart_success");
      state.errors = "";
    });
    builder.addCase(AddDistributorCart.rejected, (state, action) => {
      state.addToCartSuccess = "";
      state.errors = action?.payload?.toString() || "";
    });

    //Get Carts
    builder.addCase(GetDistributorCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetDistributorCart.fulfilled, (state, action) => {
      state.loading = false;

      state.carts = action?.payload.cartItems || [];
      state.retailerCartId = action?.payload.retailerCartId || "";
    });

    builder.addCase(GetDistributorCart.rejected, (state, action) => {
      state.loading = false;
    });

    //Delete Item Cart
    builder.addCase(DeleteDistributorCart.pending, (state, action) => {
      state.loadingDelete = true;
    });
    builder.addCase(DeleteDistributorCart.fulfilled, (state, action) => {
      state.loadingDelete = false;
    });
    builder.addCase(DeleteDistributorCart.rejected, (state, action) => {
      state.loadingDelete = false;
    });

    //Change Quantity
    builder.addCase(ChangeQuantity.fulfilled, (state, action) => {
      state.errors = "";
      state.changeQuantitySuccess = 2;
    });
    builder.addCase(ChangeQuantity.rejected, (state, action) => {
      state.errors = action?.payload?.toString() || "";
      state.changeQuantitySuccess = 3;
    });

    //Add List Product To Cart
    builder.addCase(AddListProductToCart.pending, (state, action) => {
      state.listProductToCartLoading = true;
      state.listProductToCartSuccess = false;
    });
    builder.addCase(AddListProductToCart.fulfilled, (state, action) => {
      state.listProductToCartLoading = false;
      state.listProductToCartSuccess = true;
      state.listProductToCartData = action.payload;
      state.errors = "";
    });
    builder.addCase(AddListProductToCart.rejected, (state, action: any) => {
      state.listProductToCartLoading = false;
      state.listProductToCartSuccess = false;
      state.errors = action?.payload || "";
    });

    //Delete List Cart
    builder.addCase(DeleteListCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(DeleteListCart.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = "";
    });
    builder.addCase(DeleteListCart.rejected, (state, action: any) => {
      state.loading = false;
      state.errors = action?.payload || "";
    });
  },
});

export const { resetCartState, handleProductId } = distributorCartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDistributorCart = (state: RootState) =>
  state.distributorCartReducer;

export default distributorCartSlice.reducer;
