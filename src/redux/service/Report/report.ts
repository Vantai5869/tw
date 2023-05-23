import {
  GetGrowthByCategoryReq,
  GetGrowthByProductReq,
  GetGrowthRes,
  GetGrowthRevenueReq,
  GetRateRPRes,
  GetProuctTopSellingRpReq,
  GetProuctTopSellingRpRes,
  getCustomerOrderRpReq,
  getCustomerOrderRpRes,
  getCancelSumaryrpReq,
  getCancelSumaryrpRes,
  getCancelrpReq,
  getCancelrpRes,
} from "../../type/Report/report";
import httpService from "../httpService";
import url from "./url";
const handleReport = {
  getGrowthByCategory: (params: GetGrowthByCategoryReq) => {
    const uri = url.getGrowthByCategory;
    return httpService.GET<GetGrowthByCategoryReq, GetGrowthRes[]>({
      uri,
      params,
    });
  },

  getGrowthByProduct: (params: GetGrowthByProductReq) => {
    const uri = url.getGrowthByProduct;
    return httpService.GET<GetGrowthByProductReq, GetGrowthRes[]>({
      uri,
      params,
    });
  },
  getGrowthByRevenue: (params: GetGrowthRevenueReq) => {
    const uri = url.getGrowthByProduct;
    return httpService.GET<GetGrowthRevenueReq, GetGrowthRes[]>({
      uri,
      params,
    });
  },
  getProductRatingRP: (params: GetGrowthByCategoryReq) => {
    const uri = url.getProductRatingRP;
    return httpService.GET<GetGrowthByCategoryReq, GetRateRPRes>({
      uri,
      params,
    });
  },

  getProuctTopSellingRp: (params: GetProuctTopSellingRpReq) => {
    const uri = url.productTopSelling;
    return httpService.GET<GetProuctTopSellingRpReq, GetProuctTopSellingRpRes>({
      uri,
      params,
    });
  },

  getCustomerOrderRp: (params: getCustomerOrderRpReq) => {
    const uri = url.customerOrder;
    return httpService.GET<getCustomerOrderRpReq, getCustomerOrderRpRes>({
      uri,
      params,
    });
  },
  getCancelSumaryRP: (params: getCancelSumaryrpReq) => {
    const uri = url.getCancelSumaryrp;
    return httpService.GET<getCancelSumaryrpReq, getCancelSumaryrpRes>({
      uri,
      params,
    });
  },
  getCancelRP: (params: getCancelrpReq) => {
    const uri = url.getCancelrp;
    return httpService.GET<getCancelrpReq, getCancelrpRes>({
      uri,
      params,
    });
  },
};
export default handleReport;
