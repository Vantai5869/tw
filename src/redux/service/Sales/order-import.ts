import { omit } from "lodash";
import {
  CancelOrderImportReq,
  GetOrderImportReq,
  GetOrderImportRes,
  OrderImportReq,
  OrderImportRes,
  OrderImportType,
  PaymentReq,
  PaymentRes,
  RateOrderImportReq,
  ReasonType,
  RePurchaseOrderImportRes,
} from "../../type/Sales/order-import";
import httpService from "../httpService";
import url from "./url";

const handleOrder = {
  quickOrder: (request: OrderImportReq) => {
    const uri = url.quickOrder;
    return httpService.POST<OrderImportReq, OrderImportRes>({
      uri,
      request: omit(request, ["type"]),
    });
  },

  createOrder: (request: OrderImportReq) => {
    const uri = url.createOrder;
    return httpService.POST<OrderImportReq, OrderImportRes>({
      uri,
      request: omit(request, ["type"]),
    });
  },

  getUrlVnPay: (request: PaymentReq) => {
    const uri = url.vnpay;
    return httpService.POST<PaymentReq, PaymentRes>({
      uri,
      request,
    });
  },

  list: (params: GetOrderImportReq) => {
    const uri = url.listOrder;
    return httpService.GET<GetOrderImportReq, GetOrderImportRes>({
      uri,
      params,
    });
  },

  detail: (id: string) => {
    const uri = url.detaiOrderl(id);
    return httpService.GET<string, OrderImportType>({
      uri,
    });
  },

  rate: (request: RateOrderImportReq) => {
    const uri = url.detaiOrderl(request?.id?.toString());
    return httpService.POST<RateOrderImportReq, boolean>({
      uri,
      request,
    });
  },
  deliveredOder: (id: string) => {
    const uri = url.recivedOrder(id);
    return httpService.PUT<any, OrderImportType>({
      uri,
    });
  },
  cancelOrderImport: (request: CancelOrderImportReq) => {
    const uri = url.cacnelOrder(request?.id?.toString());
    return httpService.POST<RateOrderImportReq, boolean>({
      uri,
      request: omit(request, ["id"]),
    });
  },

  getReason: () => {
    const uri = url.getReason;
    return httpService.GET<string, ReasonType[]>({
      uri,
    });
  },

  rePurchaseOrderImport: (id: string) => {
    const uri = url.repurchase(id);
    return httpService.POST<string, RePurchaseOrderImportRes>({
      uri,
    });
  },
};

export default handleOrder;
