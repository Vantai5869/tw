import {
  TAddressObject,
  provinceItemObject,
  districtItemObject,
  wardItemObject,
} from "../../../constants/type.interface";
export interface AccountState {
  user?: any;
  errors?: any;
  loading?: boolean;
  addressList?: any;
  addressByID?: any;
  fpSuccess?: boolean;
  provinces?: provinceItemObject[] | any;
  districts?: districtItemObject[] | any;
  wards?: wardItemObject[] | any;
  requestEmailSuccess?: boolean;
  validateEmailSuccess?: boolean;
  changeEmailSuccess?: boolean;
  changeEmailToken?: string;
  typeRadio?: boolean;

  requestPhoneSuccess?: boolean;
  validatePhoneSuccess?: boolean;
  changePhoneSuccess?: boolean;
  changePhoneToken?: string;

  avatar?: string;

  shippingAddress?: TAddressObject;
  selectedShippingAddress?: any;

  addressState?: {
    pickedProvince?: provinceItemObject | any;
    pickedDistrict?: districtItemObject | any;
    pickedWard?: wardItemObject | any;
    detailAddress?: any;
    isEdit?: any;
    isRegister?: any;
  };
  suggestLocation?: any;
  suggestLocationByKeyWord?: any;
  directLocationByKeyWord?: any;
  distributorInfo?: DistributorInfo[];
}

export interface DistributorInfo {
  id?: string;
  name?: string;
  code?: string;
  phone?: string;
  address?: string;
  taxCode?: string;
  email?: string;
  status?: number;
  isActive?: boolean;
  reason?: string;
  legalRepresentativeName?: string;
  legalRepresentativeAddres?: string;
  dob?: string;
  cardNumber?: string;
  logo?: string;
  frontLicense?: string;
  backLicense?: string;
  introduction?: string;
  businessId?: string;
  position?: {
    provinceId?: string;
    districtId?: string;
    wardId?: string;
    provinceName?: string;
    districtName?: string;
    wardName?: string;
    lattitude?: number;
    longtitude?: number;
  };
  provinceId?: string;
  districtId?: string;
  wardId?: string;
}
export interface ResponseFail {
  status: number;
  message: string;
}
export interface cityRes {
  data: provinceItemObject[];
}

export interface districtRes {
  data: districtItemObject[];
}

export interface districtReq {
  id: string;
}

export interface wardReq {
  id: string;
}
export interface GetAddressListReq {
  take: number;
  skip: number;
}
export interface GetAddressByID {
  id: string;
}

export interface GetAddressListRes {
  items: TAddressObject[];
  totalCount?: number;
}
export interface LanguageState {
  loading?: boolean;
  language?: LanguageRes;
}
export type LanguageType = {};

export interface LanguageReq {
  language: string;
}

export interface LanguageRes {
  items?: LanguageType[];
}
