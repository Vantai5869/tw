import httpService from "../httpService";
import { LoginReq, LoginRes } from "../../type/Authen/login";
import url from "./url";
import {
  ProductDetailRes,
  ProductSearchReq,
  ProductSearchRes,
  SearchNamesByKeywordReq,
} from "../../type/Sales/product";

const handleProduct = {
  search: (params?: ProductSearchReq) => {
    const uri = url.search;
    return httpService.GET<ProductSearchReq, ProductSearchRes>({
      uri,
      params,
    });
  },

  productDetail: (id: string) => {
    const uri = url.detail(id);
    return httpService.GET<any, ProductDetailRes>({
      uri,
    });
  },
  searchNamesByKeyword: (params: SearchNamesByKeywordReq) => {
    const uri = url.searchNamesByKeyword;
    return httpService.GET<SearchNamesByKeywordReq, string[]>({
      uri,
      params,
    });
  },
  getQuantityProduct: (params: any) => {
    const uri = url.GetQuantityProduct;
    return httpService.GET<any, any>({
      uri,
      params,
    });
  },
};

export default handleProduct;
