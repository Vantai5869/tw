export interface CartState {
  loading?: boolean;
  retailerCartId?: string;
  cart?: CartType[];
  carts: CartType[];
  listProductToCartData?: ListProductToCartRes;
  listProductToCartLoading?: boolean;
  listProductToCartSuccess?: boolean;
  loadingDelete?: boolean;
  productId?: string;
  errors?: string;
  addToCartSuccess?: string;
  changeQuantitySuccess?: number;
}
export interface CartProductType {
  productId?: string;
  productName?: string;
  quantity?: number;
  image?: string[];
  code?: string;
  supplierId?: string;
  price?: number;
  unit?: string;
  distributorCartId?: string;
  distributorCartItemId?: string;
  isDeleted: boolean;
  isOutOfStock?: boolean;
  quantityReady?: number;
  distributorTotalQuantity?: number;
}

export interface CartType {
  supplierId?: string;
  supplierName?: string;
  items?: CartProductType[];
  shippingFee?: number;
}
export interface AddToCartReq {
  productId: string;
  quantity: number;
  distributorCartItemId?: string;
  isLogin?: boolean;
}

export interface GetCartReq {
  customerCartId?: string;
  isLogin?: boolean;
}

export interface GetCartRes {
  customerCartId?: string;
  distributorCartId?: string;
  userId?: string;
  cartItems: CartType[];
}

export type CustomerCartRes = {
  userId?: string;
  id?: string;
  creationTime?: string;
} & AddToCartReq;

export interface ChangeQuantityReq {
  productId: string;
  quantity: number;
  distributorCartId?: string;
  distributorCartItemId?: string;
  isLogin?: boolean;
  quantityReady?: number;
}

export interface MergeCartRes {
  id: string;
  userId?: string;
  cartItems: CartType[];
  creationTime?: string;
}

export interface RetailCartAddReq {
  productId: string;
  quantity: number;
}

export interface DeleteCartItemReq {
  id: string;
  distributorCartItemId: string;
}

export interface GetRetailCartReq {
  productId: string;
  quantity: number;
}

export type ListProductToCartRes = {
  id?: string;
  userId?: string;
  cartItems?: CartType[];
  creationTime?: string;
};

export interface DeleteListCartReq {
  id: string;
  ids: string[];
}
