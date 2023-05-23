export interface GetGrowthByCategoryReq {
  CategoryId?: string;
  FromDate?: string;
  ToDate?: string;
  GroupType?: number;
}
export interface GetRatingRP {
  CategoryId?: string;
  FromDate?: string;
  ToDate?: string;
  skip?: number;
  take?: number;
}
export interface GetGrowthByProductReq {
  ProductId?: string;
  FromDate?: string;
  ToDate?: string;
  GroupType?: number;
}
export interface GetGrowthRevenueReq {
  FromDate?: string;
  ToDate?: string;
  GroupType?: number;
}
export interface GetProuctTopSellingRpReq {
  FromDate?: string;
  ToDate?: string;
  CategoryId?: string;
  skip?: number;
  take?: number;
}
export interface getCustomerOrderRpReq {
  FromDate?: string;
  ToDate?: string;
  OrderStatus?: number;
  skip?: number;
  take?: number;
}
export interface getCancelrpReq {
  CancelType?: number;
  CancelReasonId: string;
  FromDate?: string;
  ToDate?: string;
  skip?: number;
  take?: number;
}
export interface getCancelSumaryrpReq {
  cancelType?: number;
  FromDate?: string;
  ToDate?: string;
}
export interface GetGrowthRes {
  key: string;
  totalQuantity: number;
  totalRevenue: number;
}
export interface GetRateRPRes {
  items: items[];
  totalCount: number;
}
export interface getCancelrpRes {
  items: itemsCancel[];
  totalCount: number;
}
export interface getCancelSumaryrpRes {
  items: itemsCancelSumary[];
  totalCount: number;
}
export interface items {
  productId: string;
  code: string;
  name: string;
  image: string[];
  categoryId: string;
  categoryName: string;
  avgPoint: number;
  totalRateTime: number;
}
export interface itemsCancel {
  id: string;
  orderNumber: string;
  creationTime: string;
  cancelType: number;
  cancelReasonId: string;
  cancelReason: string;
}
export interface itemsCancelSumary {
  cancelReason: string;
  cancelReasonId: string;
  totalOrder: number;
}
export interface GrowthState {
  loading: boolean;
  GrowReport: GetGrowthRes[];
  RateRP: GetRateRPRes;
  propductTopSelling: GetProuctTopSellingRpRes;
  customerOrderRp: getCustomerOrderRpRes;
  cancelSumaryRp?: getCancelSumaryrpRes;
  cancelRp?: getCancelrpRes;
}
export interface IProduct {
  productId?: string;
  code?: string;
  name: string;
  image: string[];
  categoryId: string;
  categoryName: string;
  totalOrder: number;
  totalQuantity: number;
  revenue: number;
}
export interface IOrderRp {
  id?: string;
  orderNumber?: string;
  totalPay: number;
  buyerName: string;
  creationTime: string;
  status: number;
  shippingName: string;
  shippingPhoneNumber: string;
  shippingSpecificAddress: string;
}
export interface GetProuctTopSellingRpRes {
  totalCount?: number;
  items?: IProduct[];
  hasMore: boolean;
  currentPage: number;
}
export interface getCustomerOrderRpRes {
  totalCount?: number;
  items?: IOrderRp[];
  hasMore: boolean;
  currentPage: number;
}
