export interface OrderState {
  loading?: boolean;
  order?: OrderType;
  orders?: GetOrderRes;
  orderFilter?: GetOrderReq;
  orderSummary?: SummaryOrdersRes;
  rejectedOrder?: RejectRes;
  statusCall?: boolean;
  cancelReason?: GetReasonRes[];
  CustomerCancelReason?: GetReasonRes[];
}
export interface RejectRes {
  orderId?: string;
  retailerId?: string;
  isReject?: boolean;
  reason?: string;
}
export interface OrderType {
  id?: string;
  isPaid?: boolean;
  status?: number;
  orderNumber?: string;
  paymentId?: string;
  distibutorId?: string;
  retailerId?: string;
  supplierId?: string;
  supplierName?: string;
  supplierLogo?: string;
  totalPrice?: number;
  paymentType?: number;
  shippingType?: number;
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
  orderDetails?: OrderProductType[];
  rejectTime?: number;
  cancelType?: number;
  paymentTime: string;
  shippingTime: string;
  cancelTime: string;
}
export interface OrderProductType {
  orderId?: string;
  orderDetailId?: string;
  productId?: string;
  quantity?: number;
  price?: number;
  unit?: string;
  productName?: string;
  image?: string[];
  code?: string;
}
export interface GetSummaryOrdersReq {}
export interface GetOrderReq {
  status?: string;
  TextSearch?: string;
  CreatedDate?: number;
  skip: number;
  take?: number;
}
export interface GetOrderRes {
  items: OrderType[];
  totalCount: number;
}
export interface GetReasonRes {
  id: string;
  reasonName: string;
  reasonCode: string;
}

export interface RateOrderImportReq {
  id: string;
  rate?: number;
  message?: number;
}
export interface SummaryOrdersRes {
  waitAccept?: number;
  preparing?: number;
  shipping?: number;
  delivered?: number;
  cancelled?: number;
}
export interface CancelOrderReq {
  id: string;
  reason?: CancelOrderReqBody;
}
export interface CancelOrderReqBody {
  reason?: string;
  reasonId?: string;
}
export interface AcceptOrderReq {
  id: string;
  shippingType?: {
    shippingType?: number;
  };
}
