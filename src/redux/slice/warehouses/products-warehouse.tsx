import {
  FilterType,
  GetCategoryReq,
  GetCategoryRes,
  GetListRes,
  GetQuantityRes,
  ListProductWareHouseState,
  StockInventory,
  UpdateQuantity,
} from "../../type/warehouses/distributor-stock-inventory";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { GetListReq } from "./../../type/warehouses/distributor-stock-inventory";
import api from "../../service/warehouses/distributor-stock-inventory";
import { RootState } from "../../store";
import { Alert } from "react-native";
import { getMessage } from "../../../common/utils";
import { IMyProductSallingRes } from "../../type/warehouses/home";
import warehouseOverview from "../../service/warehouses/overview";
export const defaultFilter: FilterType = {
  skip: 0,
  take: 20,
  ListCategoryId: [],
  ListSupplierId: [],
  FromPrice: 0,
};
const initialState: ListProductWareHouseState = {
  loading: false,
  products: undefined,
  updateStatus: false,
  getQuantityStatus: undefined,
  category: undefined,
  filterCategory: [],
  filterProduct: defaultFilter,
  loadQuantity: false,
  myTopProductOutOfStockWarning: undefined,
  // error: undefined,
};
export const GetListProductWareHouse = createAsyncThunk(
  "productsWareHouseReducer/GetList",
  async (params: GetListReq, thunkAPI) => {
    try {
      const res: GetListRes = await api.getList(params);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const GetMoreListProductWareHouse = createAsyncThunk(
  "productsWareHouseReducer/GetMoreList",
  async (params: GetListReq, thunkAPI) => {
    try {
      const res: GetListRes = await api.getList(params);
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
export const GetCategoryWareHouse = createAsyncThunk(
  "productsWareHouseReducer/GetCategoryWareHouse",
  async (params: GetCategoryReq, thunkAPI) => {
    try {
      const res: GetCategoryRes = await api.getCategory(params);

      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const GetQuantity = createAsyncThunk(
  "productsWareHouseReducer/GetQuantity",
  async (id: string, thunkAPI) => {
    try {
      const res: GetQuantityRes = await api.getQuantity(id);

      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const GetQuantityOutStock = createAsyncThunk(
  "productsWareHouseReducer/GetQuantityOutStock",
  async (id: string, thunkAPI) => {
    try {
      const res: GetQuantityRes = await api.getQuantity(id);

      return res;
    } catch (error) {
      Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const UpdateQuanity = createAsyncThunk(
  "productsWareHouseReducer/UpdateQuantity",
  async (req: UpdateQuantity, thunkAPI) => {
    try {
      const res: any = await api.updateQuantity(req);

      return req;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const UpdateQuanityOutStock = createAsyncThunk(
  "productsWareHouseReducer/UpdateQuanityOutStock",
  async (req: UpdateQuantity, thunkAPI) => {
    try {
      const res: any = await api.updateQuantity(req);

      return req;
    } catch (error) {
      // Alert.alert(getMessage(error));
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const productWareHouse = createSlice({
  name: "productsWareHouseReducer",
  initialState,
  reducers: {
    resetList: (state) => {
      state.products = undefined;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = false;
    },
    searchCatgory: (state, action) => {
      const array = state.category?.items?.filter((item) => {
        return item.name
          .toUpperCase()
          .includes(action.payload.trim().toUpperCase());
      });
      state.filterCategory = array;
    },
    resetFilter: (state) => {
      state.filterCategory = state.category?.items;
    },
    ProductFilter: (state, action: any) => {
      state.filterProduct = action?.payload;
    },
    resetProductFilter: (state) => {
      state.filterProduct = defaultFilter;
    },
    resetError: (state) => {
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(GetListProductWareHouse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetListProductWareHouse.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(GetListProductWareHouse.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(GetMoreListProductWareHouse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetMoreListProductWareHouse.fulfilled, (state, action) => {
      state.loading = false;
      if (state.products && action.payload) {
        state.products = {
          ...state.products,
          items: [...state.products.items, ...action.payload.items],
        };
      }
    });
    builder.addCase(GetMoreListProductWareHouse.rejected, (state) => {
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
    builder.addCase(GetCategoryWareHouse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(GetCategoryWareHouse.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.filterCategory = action.payload.items;
    });
    builder.addCase(GetCategoryWareHouse.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(GetQuantity.pending, (state) => {
      state.loadQuantity = true;
      state.getQuantityStatus = undefined;
    });
    builder.addCase(GetQuantity.fulfilled, (state, action) => {
      state.loadQuantity = false;
      state.lastModificationTime = action.payload.lastModificationTime;
      const products = state.products?.items?.map((e) => {
        if (e.stockInventory.id === action.payload.id) {
          e.stockInventory.quantity = action.payload.quantity;
        }
        return e;
      });
      state.products!!.items = products ? products : [];
      state.getQuantityStatus = action.payload.quantity;
    });
    builder.addCase(GetQuantity.rejected, (state) => {
      state.loadQuantity = false;
      state.getQuantityStatus = undefined;
    });
    builder.addCase(GetQuantityOutStock.pending, (state) => {
      state.loadQuantity = true;
      state.getQuantityStatus = undefined;
    });
    builder.addCase(GetQuantityOutStock.fulfilled, (state, action) => {
      state.loadQuantity = false;
      state.lastModificationTime = action.payload.lastModificationTime;
      const productOutstock = state.myTopProductOutOfStockWarning?.items?.map(
        (e) => {
          if (e.stockInventory.id === action.payload.id) {
            e.stockInventory.quantity = action.payload.quantity;
          }
          return e;
        }
      );
      state.myTopProductOutOfStockWarning!!.items = productOutstock
        ? productOutstock
        : [];
      state.getQuantityStatus = action.payload.quantity || undefined;
    });
    builder.addCase(GetQuantityOutStock.rejected, (state) => {
      state.loadQuantity = false;
      state.getQuantityStatus = undefined;
    });
    builder.addCase(UpdateQuanity.pending, (state) => {
      state.loading = true;
      state.updateStatus = false;
      state.error = undefined;
    });
    builder.addCase(UpdateQuanity.fulfilled, (state, action) => {
      state.loading = false;
      state.updateStatus = true;
      const products = state.products?.items?.map((e) => {
        if (e.stockInventory.id === action.payload.id) {
          e.stockInventory.quantity = Number(action.payload.quantity);
        }
        return e;
      });
      state.products!!.items = products ? products : [];
      state.error = undefined;
    });
    builder.addCase(UpdateQuanity.rejected, (state, action) => {
      state.loading = false;
      state.updateStatus = false;
      state.error = action.payload.error.message;
    });
    builder.addCase(UpdateQuanityOutStock.pending, (state) => {
      state.loading = true;
      state.updateStatus = false;
    });
    builder.addCase(UpdateQuanityOutStock.fulfilled, (state, action) => {
      state.loading = false;
      state.updateStatus = true;
      const products = state.myTopProductOutOfStockWarning?.items?.map((e) => {
        if (e.stockInventory.id === action.payload.id) {
          e.stockInventory.quantity = Number(action.payload.quantity);
        }
        return e;
      });
      state.myTopProductOutOfStockWarning!!.items = products ? products : [];
    });
    builder.addCase(UpdateQuanityOutStock.rejected, (state) => {
      state.loading = false;
      state.updateStatus = false;
    });
  },
});

export const {
  resetList,
  resetUpdateStatus,
  searchCatgory,
  resetFilter,
  ProductFilter,
  resetProductFilter,
  resetError,
} = productWareHouse.actions;
export const selectProductWarehouse = (state: RootState) =>
  state.productsWareHouse;

export default productWareHouse.reducer;
