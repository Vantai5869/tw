const REPORT_GROWTH = "/webbff/report/api/app/distributor-report";
const REPORT_CANCEL =
  "/webbff/report/api/app/distributor-report/retailer-order-cancelled";
const url = {
  getGrowthByCategory: REPORT_GROWTH + "/growth-report-by-category",
  getGrowthByProduct: REPORT_GROWTH + "/growth-report-by-product",
  getGrowthByRevenue: REPORT_GROWTH + "/growth-revenue-report",
  getProductRatingRP: REPORT_GROWTH + "/product-rating",
  productTopSelling: REPORT_GROWTH + "/product-top-selling",
  customerOrder: REPORT_GROWTH + "/retailer-order",
  getCancelSumaryrp: REPORT_CANCEL + "-reason-summary",
  getCancelrp: REPORT_CANCEL,
};

export default url;
