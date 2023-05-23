import { TagType } from "../../../constants/type.interface";

export interface ProductState {
  loading?: boolean;
  products: ProductSearchRes;
  filters: FilterType;
  product?: ProductDetailRes;
  recentSearchText: string[];
  suggestion?: string[];
  keyWordFromHome: string;
  quantities: any;
  errors?: string;
  loadQuantity: boolean;
  getQuantityStatus?: number;
  lastModificationTime?: string;
  updateStatus?: boolean;
}
export type SortType = 0 | 1 | 2;

export interface FilterType {
  skip?: number;
  take?: number;
  TextSearch?: string;
  ListSupplierId?: TagType[];
  ListCategoryId?: TagType[];
  FromPrice?: number;
  ToPrice?: number;
  SortField?: SortType;
  SortType?: SortType;
}

export interface ProductSearchReq {
  skip?: number;
  take?: number;
  TextSearch?: string;
  ListSupplierId?: string[];
  ListCategoryId?: string[];
  FromPrice?: number;
  ToPrice?: number;
  SortField?: SortType;
  SortType?: SortType;
  isByHighlight?: boolean;
  isByTopSearch?: boolean;
  selling?: number;
  CreationTime?: number;
  supplierId?: string;
}

export type ProductType = {
  id?: string;
  image?: string;
  name?: string;
  price?: number;
};

export interface ProductSearchRes {
  items: ProductType[];
  totalCount: number;
}

export interface SearchNamesByKeywordReq {
  keyword: string;
}
export interface ProductDetailRes {
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
  totalQuantity: number;
  distributorTotalQuantity: number;
  retailerTotalQuantity: number;
  customerRating: Rating;
  retailerRating: Rating;
  stockInventory: {
    id: string;
    quantity: number;
    soldQuantity: number;
    receivedQuantity: number;
  };
}
export interface Rating {
  totalRate: number;
  ratingAvg: number;
  ratings: RateDetail[];
}
export interface RateDetail {
  ratePoint: number;
  rateOptions: number[];
  userAvt: string;
  creatorId: string;
  creationTime: string;
}
