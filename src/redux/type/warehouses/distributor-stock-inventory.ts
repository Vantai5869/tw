import { IMyProductSallingRes } from "./home";

export interface DistributorStockInventoryState {
  loading?: boolean;
  ValidateDistributorStockInventorySuccess?: boolean;
  errors?: string;
}
export interface ListProductWareHouseState {
  loading?: boolean;
  products?: GetListRes;
  myTopProductOutOfStockWarning: IMyProductSallingRes | undefined;
  updateStatus?: boolean;
  getQuantityStatus?: number;
  category?: GetCategoryRes;
  filterCategory?: CategoryWareHouse[];
  filterProduct?: FilterType;
  loadQuantity?: boolean;
  lastModificationTime?: string;
  error?: string;
}
export interface FilterType {
  skip?: number;
  take?: number;

  ListSupplierId?: TagType[];
  ListCategoryId?: TagType[];
  FromPrice?: number;
  ToPrice?: number;
}
export interface TagType {
  id: string;
  name: string;
  checked?: boolean;
}
export interface DistributorStockInventoryReq {
  // supplierId: string;
  // orderItems: { productId: string; quantity: number }[];
  productId: string;
  quantity: number;
}
export interface DistributorStockInventoryRes {
  isValid: boolean;
  message: string;
}
export interface GetListReq {
  SortField?: number;
  SortType?: number;
  ListCategoryId?: string[];
  ListSupplierId?: string[];
  TextSearch?: string;
  skip?: number;
  take?: number;
  FromPrice?: number;
  ToPrice?: number;
}
export interface GetCategoryReq {
  level?: number;
  skip?: number;
  take?: number;
}
export interface GetCategoryRes {
  items?: CategoryWareHouse[];
  totalCount?: number;
}
export interface CategoryWareHouse {
  id: string;
  avatar: string;
  parentId: string;
  level: number;
  totalProduct: number;
  name: string;
}
export interface LangquageTranslation {
  code: string;
  name: string;
  tree: string;
}
export interface UpdateQuantity {
  id: string;
  quantity?: string;
  lastModificationTime?: string;
}
export interface GetQuantity {}
export interface GetQuantityRes {
  id?: string;
  productId?: string;
  retailerId?: string;
  quantity?: number;
  lastModificationTime?: string;
}
export interface GetListRes {
  items: ProductWareHouse[];
  totalCount?: number;
}
export interface ProductWareHouse {
  id: string;
  name: string;
  code: string;
  image: string[];
  attachment: string[];
  price: number;
  categoryId: string;
  supplierId: string;
  brandName: string;
  unit: string;
  description: string;
  packingSize: string;
  weight: string;
  soldQuantity: number;
  expireDate: string;
  stockInventory: StockInventory;
  distributorTotalQuantity: number;
  retailerTotalQuantity: number;
}
export interface StockInventory {
  id?: string;
  warehouseId?: string;
  quantity?: number;
  retailerId?: string;
}
