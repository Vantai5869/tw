import {
  DistributorStockInventoryReq,
  DistributorStockInventoryRes,
  GetCategoryReq,
  GetCategoryRes,
  GetListRes,
  GetQuantity,
  GetQuantityRes,
  UpdateQuantity,
} from "../../type/warehouses/distributor-stock-inventory";
import httpService from "../httpService";
import url from "./url";
import { GetListReq } from "./../../type/warehouses/distributor-stock-inventory";

const handleDistributorStockInventory = {
  validate: (request: DistributorStockInventoryReq[]) => {
    const uri = url.validate;
    return httpService.POST<
      DistributorStockInventoryReq[],
      DistributorStockInventoryRes
    >({
      uri,
      request,
    });
  },
  getList: (params: GetListReq) => {
    const uri = url.list;
    return httpService.GET<GetListReq, GetListRes>({
      uri,
      params,
    });
  },
  getQuantity: (id: string) => {
    const uri = url.getquantity(id);
    return httpService.GET<GetQuantity, GetQuantityRes>({
      uri,
    });
  },
  updateQuantity: (request: UpdateQuantity) => {
    const uri = url.updatequantity();

    return httpService.PUT<UpdateQuantity, any>({
      uri,
      request,
    });
  },
  getCategory: (params: GetCategoryReq) => {
    const uri = url.getCatgory;
    return httpService.GET<GetCategoryReq, GetCategoryRes>({
      uri,
      params,
    });
  },
};

export default handleDistributorStockInventory;
