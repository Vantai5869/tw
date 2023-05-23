const getSellingProduct =
  "/webbff/report/api/app/product-report/product-top-selling?skip=0&take=20";
const getNewProduct = "/webbff/sales/api/app/product/new?skip=0&take=20";
const getHome = "/webbff/sales/api/app/product/home-for-retailer";
const getGreeting = "/webbff/partnership/api/app/greeting/message";
const getCategory = "/webbff/sales/api/app/category/data-by-home-screen";
const getSupplier =
  "/webbff/partnership/api/app/supplier/by-mobile?skip=0&take=20&isHighlight=false";

const url = {
  getHome: getHome,
  getGreeting: getGreeting,
  getCategory: getCategory,
  getSupplier: getSupplier,
  getNewProduct: getNewProduct,
  getSellingProduct: getSellingProduct,
  getUserInfor: "/auth/connect/userinfo",
  getDistributorInfo: "/webbff/partnership/api/app/distributor/info",
  getWallet: "/webbff/wallet/api/app/wallet/wallet",
  getCategoryNcc: "/webbff/sales/api/app/category/for-supplier/",
};

export default url;
