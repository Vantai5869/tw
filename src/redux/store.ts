import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slice/Authen/login";
import registerReducer from "../redux/slice/Authen/register";
import distributorCartReducer from "../redux/slice/Cart/distributor-cart";
import productReducer from "../redux/slice/Sales/product";
import supplierReducer from "../redux/slice/Partnership/supplier";
import categoryReducer from "../redux/slice/Sales/category";
import addressReducer from "../redux/slice/Shipping/address";
import distributorStockInventoryReducer from "../redux/slice/warehouses/distributor-stock-inventory";
import orderImportReducer from "../redux/slice/Sales/order-import";
import orderByRetailer from "./slice/Order/retailer-order";
import homeReducer from "../redux/slice/Home/home";
import rateReducer from "../redux/slice/Rating/rating-order";
import profileReducer from "../redux/slice/Profile/profile";
import productsWareHouse from "./slice/warehouses/products-warehouse";
import warehouseHomeSlice from "./slice/warehouses/home";
import reviewsReducer from "../redux/slice/Sales/product-rating";
import reportReducer from "../redux/slice/Report/report";
import walletReducer from "../redux/slice/wallet";

export const store = configureStore({
  reducer: {
    loginReducer,
    registerReducer,
    distributorCartReducer,
    productReducer,
    supplierReducer,
    categoryReducer,
    addressReducer,
    distributorStockInventoryReducer,
    orderImportReducer,
    homeReducer,
    orderByRetailer,
    rateReducer,
    profileReducer,
    productsWareHouse,
    warehouseHomeSlice,
    reviewsReducer,
    reportReducer,
    walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
