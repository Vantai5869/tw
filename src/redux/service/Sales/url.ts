const CATEGORY = "/webbff/sales/api/app/category";
const PRODUCT = "/webbff/sales/api/app/product";
const CART = "/webbff/cart/api/app/distributor-cart";
const ORDER = "/webbff/sales/api/app/distributor-order";
const ORDER_AGGREGATE = "/webbff/api/app/distributor-order-aggregate-data";
const REASON = "/webbff/sales/api/app/reason/all";
const QUANTITYPRODUCT =
  "/webbff/warehouses/api/app/distributor-stock-inventory";

const url = {
  search: PRODUCT + "/for-distributor",
  create: PRODUCT,
  delete: (id: string) => PRODUCT + `/${id}`,
  detail: (id: string) => PRODUCT + `/by-id-for-distributor/${id}`,
  saleModeConfig: PRODUCT + "/sale-mode-config",
  categoryList: CATEGORY,
  quickOrder: ORDER + "/quick-order",
  createOrder: CART + "/check-out-cart",
  listOrder: ORDER_AGGREGATE,
  detaiOrderl: (id: string) => ORDER_AGGREGATE + `/${id}`,
  rejectOrder: (id: string) => ORDER + `/${id}/distributor-reject`,
  searchNamesByKeyword: PRODUCT + "/names-by-keyword",
  cacnelOrder: (id: string) => ORDER + `/${id}/cancel-my-buy`,
  getReason: REASON,
  rateOrder: "/webbff/reviews/rating-by-retailer",
  repurchase: (id: string) => ORDER + `/${id}/order-re-purchase`,
  vnpay: ORDER + "/start-order-payment",
  GetQuantityProduct: QUANTITYPRODUCT,
  recivedOrder: (id: string) => ORDER + `/${id}` + "delivered-order",
  productRating: "/webbff/reviews/get-for-customer",
  productRatingRetailer: "/webbff/reviews/get-for-retailer",
};

export default url;
