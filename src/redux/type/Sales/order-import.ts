// paymentType  = 1  là thanh toán tiền mặt , 2 là online

import { TAddressObject } from "../../../constants/type.interface";

// còn trạng thái đơn hàng :  chờ xác nhận 1, đang giao 2, đã nhận hàng 3, Huỷ 0
export interface OrderImportState {
  loading?: boolean;
  newOrder?: OrderImportRes;
  order?: OrderImportType;
  orders?: GetOrderImportRes;
  orderFilter?: GetOrderImportReq;
  loadingRate?: boolean;
  loadingCancel?: boolean;
  reasons?: ReasonType[];
  orderSuccess?: boolean;
  cancelOrderSuccess?: boolean;
  rateOrderSuccess?: boolean;
  loadingRePurchase?: boolean;
  rePurchaseData?: RePurchaseOrderImportRes;
  rePurchaseSuccess?: boolean;
  dataFlterOrders?: GetOrderImportRes;
  loadingFilterOrderImport?: boolean;
  orderImportId?: string;
  paymentUrl?: string;
  errors?: string;
}
export interface OrderImportProductType {
  cartItemId?: string;
  productId?: string;
  quantity?: number;
  price?: number;
  unit?: string;
  productName?: string;
  image?: string[];
  code?: string;
  orderImportId?: string;
  orderImportDetailId?: string;
  productCode?: string;
  status?: number;
}

export interface OrderImportDetailsType {
  supplierId?: string;
  orderDetails?: OrderImportProductType[];
  shippingFee?: number;
}

export interface OrderImportReq {
  isPrintOrder: boolean;
  orderDetails: OrderImportDetailsType[];
  paymentType: number;
  shippingAddressId?: string;
  companyName?: string;
  email?: string;
  taxCode?: string;
  shippingUnit?: string;
  type?: string;
}
export interface OrderImportRes {
  paymentID: string;
  totalPrice: number;
  listRetailerOrders: OrderImportType[];
  orderNumber?: string;
}

export interface OrderImportType {
  id?: string;
  isPaid?: boolean;
  status?: number;
  orderNumber?: string;
  paymentId?: string;
  distibutorId?: string;
  retailerId?: string;
  retailerCartItemId?: string;
  supplierId?: string;
  supplierName?: string;
  supplierLogo?: string;
  totalPrice?: number;
  paymentType?: number; //1 COD, 2 ONLINE
  shippingType?: number; //Tinwin vận chuyển = 1  Đại lý vận chuyển = 2
  shippingAddressId?: string;
  address: string;
  phoneNumber: string;
  companyName?: string;
  email?: string;
  taxCode?: string;
  shippingFee?: number;
  reason?: string;
  totalPay?: number;
  isPrintOrder?: boolean;
  creationTime?: string;
  orderDetails?: OrderImportProductType[];
  shippingAddress: TAddressObject;
  paymentTime?: string;
  rejectTime?: string;
  shippingTime?: string;
  shippingUnit?: string;
  cancelType?: number; //Hệ thống :1, khách hàng 2, đại lý : 3 , nhà cc 4
  cancelTime?: string;
}

export interface GetOrderImportReq {
  Status?: string;
  Code?: string;
  CreatedDate?: number;
  skip: number;
  take: number;
}
export interface GetOrderImportRes {
  items: OrderImportType[];
  totalCount: number;
}

export interface RateOrderImportReq {
  id: string;
  rate?: number;
  message?: number;
}

export interface CancelOrderImportReq {
  id: string;
  reason: string;
  status?: number;
  reasonId: string;
}

export interface ReasonType {
  id: string;
  reasonName: string;
  position?: string;
}
export interface RePurchaseOrderImportProductItemType {
  productId?: string;
  productName?: string;
  productCode?: string;
  quantity?: number;
  image?: string[];
  status?: number;
}

export interface RePurchaseOrderImportRes {
  orderId?: string;
  allProductReady: boolean;
  productItems: RePurchaseOrderImportProductItemType[];
  retailerCartItemIds?: string[];
}

export interface PaymentReq {
  orderIds: string[];
  source: number;
  extraProperties: any;
}
export interface PaymentRes {
  paymentUrl: string;
}
