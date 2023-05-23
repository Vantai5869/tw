// const ORDER_BY_RETAILER = "/webbff/api/app/order-aggregate-data/by-retailer";
const ORDER_BY_RETAILER =
  "/webbff/api/app/retailer-order-aggregate-data/by-distributor";
const ORDER_AGGREGATE_DATA = "/webbff/api/app/retailer-order-aggregate-data";
const ORDER = "/webbff/sales/api/app/retailer-order";
const SUMMARY_ORDER =
  "/webbff/sales/api/app/retailer-order/count-order-status-by-distributor";
const CANCEL_REASON = "/webbff/sales/api/app/reason/for-seller";
const CANCEL_REASON_BY_BUYER = "/webbff/sales/api/app/reason/for-buyer";
const url = {
  listOrderByRetailer: ORDER_BY_RETAILER,
  detailOrderByRetailer: (id: string) => ORDER_AGGREGATE_DATA + `/${id}`,
  acceptOrder: (id: string) => ORDER + `/${id}/accept-order`,
  cancelOrder: (id: string) => ORDER + `/${id}/cancel-my-sell`,
  getcancelReason: CANCEL_REASON,

  getCustomercancelReason: CANCEL_REASON_BY_BUYER,
  deliveriedOrder: (id: string) => ORDER + `/${id}/delivered-order`,
  shippingOrder: (id: string) => ORDER + `/${id}/shipping-order`,
  summayOrders: SUMMARY_ORDER,
  rejectOrder: (id: string) => ORDER + `/${id}/reject-order`,
};

export default url;
