import {
  AcceptOrderReq,
  CancelOrderReq,
  CancelOrderReqBody,
  GetOrderReq,
  GetOrderRes,
  GetReasonRes,
  OrderType,
  RejectRes,
  SummaryOrdersRes,
} from "../../type/Orders/order";
import httpService from "../httpService";
import url from "./url";

const handleOrder = {
  list: (params: GetOrderReq) => {
    const uri = url.listOrderByRetailer;

    return httpService.GET<GetOrderReq, GetOrderRes>({
      uri,
      params,
    });
  },
  summary: () => {
    const uri = url.summayOrders;
    return httpService.GET<GetOrderReq, SummaryOrdersRes>({
      uri,
    });
  },
  detail: (id: string) => {
    const uri = url.detailOrderByRetailer(id);
    return httpService.GET<string, OrderType>({
      uri,
    });
  },
  accept: (req: AcceptOrderReq) => {
    const uri = url.acceptOrder(req.id);

    return httpService.PUT<string, OrderType>({
      uri,
      request: req.shippingType,
    });
  },
  cancelReasonList: () => {
    const uri = url.getcancelReason;
    return httpService.GET<any, GetReasonRes[]>({
      uri,
    });
  },
  customerCancelReasonList: () => {
    const uri = url.getCustomercancelReason;
    return httpService.GET<any, GetReasonRes[]>({
      uri,
    });
  },
  cancel: (req: CancelOrderReq) => {
    const uri = url.cancelOrder(req.id);

    return httpService.POST<any, OrderType>({
      uri,
      request: req.reason,
    });
  },
  reject: (req: CancelOrderReq) => {
    const uri = url.rejectOrder(req.id);

    return httpService.POST<any, RejectRes>({
      uri,
      request: req.reason,
    });
  },
  deliveried: (id: string) => {
    const uri = url.deliveriedOrder(id);

    return httpService.PUT<string, OrderType>({
      uri,
    });
  },
  shipping: (id: string) => {
    const uri = url.shippingOrder(id);

    return httpService.PUT<string, OrderType>({
      uri,
    });
  },
};

export default handleOrder;
