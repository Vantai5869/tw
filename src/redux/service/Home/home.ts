import {
  SellingProductType,
  NewProductType,
  CategoryType,
  SupplierType,
} from "../../type/Home/home";
import { persistedStorage } from "../../../common/storage";
import httpService from "../httpService";
import noHttpService from "../noTokenHttpService";
import url from "./url";

const homeScreen = {
  getGreeting: async () => {
    const uri = url.getGreeting;
    return noHttpService.GET<"", string>({
      uri,
    });
  },
  getNewProduct: async () => {
    const uri = url.getNewProduct;
    return noHttpService.GET<"", NewProductType>({
      uri,
    });
  },
  getSelling: async () => {
    const uri = url.getSellingProduct;
    return noHttpService.GET<"", SellingProductType>({
      uri,
    });
  },
  getCategory: async () => {
    const uri = url.getCategory;
    return noHttpService.GET<"", CategoryType>({
      uri,
    });
  },
  getSupplier: async () => {
    const uri = url.getSupplier;
    return noHttpService.GET<"", SupplierType>({
      uri,
    });
  },
  getUserInfor: async () => {
    const uri = url.getUserInfor;
    return httpService.GET<"", "">({
      uri,
    });
  },
  getDistributorInfo: async () => {
    const uri = url.getDistributorInfo;
    return httpService.GET<"", "">({
      uri,
    });
  },
  getWallet: async (params: any) => {
    const uri = url.getWallet;
    return noHttpService.GET<"", "">({
      uri,
      params,
    });
  },
  getCategoryNcc: async (params: any, supllierId: string) => {
    const uri = url.getCategoryNcc + supllierId;
    return httpService.GET<"", "">({
      uri,
      params,
    });
  },
};

export default homeScreen;
