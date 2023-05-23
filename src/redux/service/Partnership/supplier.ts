import { SupplierReq, SupplierType } from "../../type/Partnership/supplier";
import httpService from "../noTokenHttpService";
import url from "./url";

const handleSupplier = {
  search: (params?: SupplierReq) => {
    const uri = url.search;
    return httpService.GET<SupplierReq, SupplierType[]>({
      uri,
      params,
    });
  },
  detail: (id: string) => {
    const uri = url.detail(id);
    return httpService.GET<any, any>({
      uri,
    });
  },
};

export default handleSupplier;
