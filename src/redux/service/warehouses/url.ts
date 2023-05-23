const ROOT = "/webbff/warehouses/api/app/distributor-stock-inventory";
const MANAGEMENT = "/webbff/sales/api/app/product/distributor-management";
const PRODUCTQUANTITY =
  "/webbff/warehouses/api/app/distributor-stock-inventory";
const CATEGORY = "/webbff/sales/api/app/category/my-categories-as-distributor";
const MYSTOCKSTATISTIC =
  "/webbff/report/api/app/distributor-report/my-stock-statistic";
// const PRODUCTSALE =
//   "http://45.76.152.56/webbff/report/api/app/product-report/product-top-selling";
const PRODUCTSALE = "/webbff/sales/api/app/product";
const url = {
  list: MANAGEMENT,
  quantity: ROOT + "/quantity",
  getquantity: (id: string) => PRODUCTQUANTITY + "/" + id,
  updatequantity: () => PRODUCTQUANTITY + "/quantity",
  getCatgory: CATEGORY,
  detail: (id: string) => ROOT + "/" + id,
  validate: ROOT + "/validate-order-import-stock",
  overview: MYSTOCKSTATISTIC,
  myTopProductSelling: (skip = 20, take = 20) =>
    PRODUCTSALE +
    `/distributor-my-top-product-selling?skip=${skip}&take=${take}`,
  myTopProductOutOfStockWarning: () =>
    PRODUCTSALE + `/distributor-my-top-product-out-of-stock-warning`,
};

export default url;
