import { persistedStorage } from "../../../common/storage";
import {
  TAddressObject,
  sendAddressObject,
} from "../../../constants/type.interface";
import {
  cityRes,
  districtRes,
  GetAddressListReq,
  GetAddressListRes,
  LanguageReq,
  LanguageRes,
} from "../../type/Profile/profile";
import { ValidateOTPRes } from "../../type/Authen/register";
import httpService from "../httpService";
import noTokenHttpService from "../noTokenHttpService";
import url from "./url";

const handleAccount = {
  getAddressList: async (params: GetAddressListReq) => {
    const uri = url.addressList;
    const token = await persistedStorage?.getItem("accessToken");
    return httpService.GET<GetAddressListReq, GetAddressListRes>({
      uri,
      params,
    });
  },

  createAddress: async (request: sendAddressObject) => {
    const uri = url.addressCreate;
    const token = await persistedStorage?.getItem("accessToken");
    return httpService.POST<sendAddressObject, TAddressObject>({
      uri,
      request,
      token: token || "",
    });
  },

  updateAddress: (request: TAddressObject) => {
    const uri = url.addressEdit(request?.id?.toString() || "");
    return httpService.PUT<TAddressObject, TAddressObject>({
      uri,
      request,
    });
  },

  getAddressById: async (request: string) => {
    const uri = url.addressGetById(request);
    const token = await persistedStorage?.getItem("accessToken");
    return httpService.GET<GetAddressListReq, GetAddressListRes>({
      uri,
      request,
    });
  },

  setDefaultAddress: async (request: TAddressObject) => {
    const uri = url.addressSetDefault(request?.id?.toString() || "");
    const token = await persistedStorage?.getItem("accessToken");
    return httpService.PUT<TAddressObject, TAddressObject>({
      uri,
      request,
      token: token || "",
    });
  },

  deleteAddress: async (request: string | number | undefined) => {
    const uri = url.addressDelete(request?.toString() || "");
    const token = await persistedStorage?.getItem("accessToken");
    return httpService.DELETE<any, any>({
      uri,
      token: token || "",
    });
  },

  getCityAddress: async () => {
    const uri = url.getProvince;

    return httpService.GET<"", cityRes>({
      uri,
    });
  },

  getDistrict: async (params: string) => {
    const uri = url.getDistrict(params);

    return httpService.GET<"", districtRes>({
      uri,
    });
  },
  getWard: async (params: string) => {
    const uri = url.getWard(params);

    return httpService.GET<"", districtRes>({
      uri,
    });
  },
  getAddressByCoords: async (params: object) => {
    const uri = url.getLocation;
    return httpService.POST<any, any>({
      uri,
      params,
    });
  },
  suggestLocation: async (params: string) => {
    const uri = url.getSuggestPlace;
    return httpService.POST<any, any>({
      uri,
      params,
    });
  },

  getDirectLocationByText: async (params: string) => {
    const uri = url.getLocationByText;
    return httpService.POST<string, any>({
      uri,
      params,
    });
  },
  getDistributorInfo: async (params: string) => {
    const uri = url.distributorInfo;
    return httpService.GET<string, any>({
      uri,
    });
  },
  changeInfo: async (request: object) => {
    const uri = url.changeInfo;

    return httpService.PUT_FORM_DATA<any, any>({
      uri,
      request,
    });
  },
  changeLanguage: (request?: LanguageReq) => {
    const uri = url.changeLanguage;
    return httpService.PUT<LanguageReq, LanguageRes>({
      uri,
      request,
    });
  },
};
export default handleAccount;
