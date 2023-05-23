import { GetListReq } from "../../type/warehouses/distributor-stock-inventory";
import httpService from "../httpService";
import url from "./url";

const warehouseOverview = {
  getWareOverview: () => {
    const uri = url.overview;
    return httpService.GET<any, any>({
      uri,
    });
  },
  getMyTopProductSelling: (skip: number, take: number) => {
    const uri = url.myTopProductSelling(skip, take);
    return httpService.POST<any, any>({
      uri,
    });
  },
  getMyTopProductOutOfStockWarning: (params: GetListReq) => {
    const uri = url.myTopProductOutOfStockWarning();
    return httpService.GET<any, any>({
      uri,
      params,
    });
  },
};

export default warehouseOverview;
