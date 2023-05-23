import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { take, uniq } from "lodash";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import { MEDIA } from "../../../constants/media";
import api from "../../service/Sales/product";
import handleDistributorStockInventory from "../../service/warehouses/distributor-stock-inventory";
import { RootState } from "../../store";
import {
  FilterType,
  ProductDetailRes,
  ProductSearchReq,
  ProductSearchRes,
  ProductState,
  SearchNamesByKeywordReq,
} from "../../type/Sales/product";
import {
  GetQuantityRes,
  UpdateQuantity,
} from "../../type/warehouses/distributor-stock-inventory";

export const defaultFilter: FilterType = {
  skip: 0,
  take: 20,
  ListCategoryId: [],
  ListSupplierId: [],
  TextSearch: "",
  FromPrice: 0,
  SortField: 0,
  SortType: 0,
};
// Define the initial state using that type
const initialState: ProductState = {
  loading: false,
  products: {
    items: [],
    totalCount: 0,
  },
  filters: defaultFilter,
  product: undefined,
  recentSearchText: [],
  suggestion: [],
  keyWordFromHome: "",
  quantities: {},
  loadQuantity: false,
};

export const ProductLoading = createAsyncThunk(
  "productReducer/ProductLoading",
  async (params: boolean, thunkAPI) => {
    try {
      return params;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const RecentSearchText = createAsyncThunk(
  "productReducer/handleProduct/RecentSearchText",
  async (params: string, thunkAPI) => {
    try {
      const res = await AsyncStorage.getItem("recentSearch");
      const newRes = uniq(res?.split(",") || []);
      return take(newRes, 3);
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const SearchNamesByKeyword = createAsyncThunk(
  "productReducer/handleProduct/SearchNamesByKeyword",
  async (params: SearchNamesByKeywordReq, thunkAPI) => {
    try {
      const res: string[] = await api.searchNamesByKeyword(params);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ProductSearch = createAsyncThunk(
  "productReducer/productSearch",
  async (params: ProductSearchReq, thunkAPI) => {
    try {
      const res: ProductSearchRes = await api.search(params);

      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ProductDetail = createAsyncThunk(
  "productReducer/ProductDetail",
  async (id: string, thunkAPI) => {
    try {
      const res: ProductDetailRes = await api.productDetail(id);

      return res;
      // return true;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const GetQuantity = createAsyncThunk(
  "productReducer/GetQuantity",
  async (id: string, thunkAPI) => {
    try {
      const res: GetQuantityRes =
        await handleDistributorStockInventory.getQuantity(id);

      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const GetQuantityProduct = createAsyncThunk(
  "productReducer/GetQuantityProduct",
  async (params: any, thunkAPI) => {
    try {
      const res: any = await api.getQuantityProduct(params);
      return res;
      // return true;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const UpdateQuanity = createAsyncThunk(
  "productReducer/UpdateQuantity",
  async (req: UpdateQuantity, thunkAPI) => {
    try {
      const res: any = await handleDistributorStockInventory.updateQuantity(
        req
      );

      return req;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const productSlice = createSlice({
  name: "productReducer",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    keyWordFromHome: (state: ProductState, action: any) => {
      state.keyWordFromHome = action.payload;
    },
    ProductFilter: (state: ProductState, action: any) => {
      state.filters = action?.payload;
    },
    resetSuggestion: (state: ProductState, action: any) => {
      state.suggestion = [];
    },
    resetProductState: (state: ProductState, action: any) => {
      state.errors = "";
      state.loading = false;
    },
    onProductErrors: (state: ProductState, action: any) => {
      state.errors = action.payload;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ProductLoading.fulfilled, (state, action) => {
      state.loading = action?.payload;
    });
    //Product Search
    builder.addCase(ProductSearch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ProductSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action?.payload;
    });
    builder.addCase(ProductSearch.rejected, (state, action: any) => {
      state.loading = false;
    });

    //Product Detail
    builder.addCase(ProductDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(ProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action?.payload;
    });
    builder.addCase(ProductDetail.rejected, (state, action: any) => {
      state.loading = false;
    });
    builder.addCase(GetQuantityProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(GetQuantityProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.quantities = action?.payload;
    });
    builder.addCase(GetQuantityProduct.rejected, (state, action: any) => {
      state.loading = false;
    });
    builder.addCase(RecentSearchText.fulfilled, (state, action) => {
      state.loading = false;
      state.recentSearchText = action?.payload || [];
    });
    builder.addCase(SearchNamesByKeyword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(SearchNamesByKeyword.fulfilled, (state, action) => {
      state.loading = false;
      state.suggestion = action?.payload;
    });
    builder.addCase(SearchNamesByKeyword.rejected, (state, action: any) => {
      state.loading = false;
    });
    builder.addCase(GetQuantity.pending, (state) => {
      state.loadQuantity = true;
      state.getQuantityStatus = undefined;
    });
    builder.addCase(GetQuantity.fulfilled, (state, action) => {
      state.loadQuantity = false;
      state.lastModificationTime = action.payload.lastModificationTime;
      if (state.product) {
        state.product!!.stockInventory.quantity = action.payload.quantity
          ? action.payload.quantity
          : 0;
      }
      state.getQuantityStatus = action.payload.quantity || undefined;
    });
    builder.addCase(GetQuantity.rejected, (state) => {
      state.loadQuantity = false;
      state.getQuantityStatus = undefined;
    });
    builder.addCase(UpdateQuanity.pending, (state) => {
      state.loading = true;
      state.updateStatus = false;
    });
    builder.addCase(UpdateQuanity.fulfilled, (state, action) => {
      state.loading = false;
      state.updateStatus = true;
      if (state.product) {
        state.product!!.stockInventory.quantity = Number(
          action.payload.quantity
        );
      }
    });
    builder.addCase(UpdateQuanity.rejected, (state) => {
      state.loading = false;
      state.updateStatus = false;
    });
  },
});

export const {
  keyWordFromHome,
  ProductFilter,
  resetSuggestion,
  resetProductState,
  onProductErrors,
  resetUpdateStatus,
} = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProduct = (state: RootState) => state.productReducer;

export default productSlice.reducer;
