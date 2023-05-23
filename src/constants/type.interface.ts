export enum PurposeOTP {
  login = "login",
  reset = "reset-password",
  register = "register",
  changeEmail = "change-email",
  changePhone = "change-phone",
}

export interface TagType {
  id: string;
  name: string;
  checked?: boolean;
}

export interface TTempAddressObject {
  province?: string | null;
  provinceId?: string | null;
  provinceCode?: string | null;
  district?: string | null;
  districtId?: string | null;
  districtCode?: string | null;
  wardId?: string | null;
  ward?: string | null;
  wardCode?: string | null;
}
export interface TAddressObject {
  id?: number | string;
  name: string;
  phoneNumber: string;
  province?: string | null;
  provinceId?: string;
  provinceCode?: string | null;
  provinceName?: string;
  district?: string | null;
  districtId?: string;
  districtCode?: string | null;
  districtName?: string;
  wardId?: string;
  longtitude?: number | null;
  latitude?: number | null;
  placeId?: string;
  ward?: string | null;
  wardCode?: string | null;
  wardName?: string;
  specificAddress: string;
  isDefault?: boolean;
  shippingAddressType?: number;
}
export interface provinceItemObject {
  id?: string | null;
  name?: string | null;
  code?: string | null;
  level?: number | null;
  parentId?: string | null;
  type?: string | null;
}

export interface districtItemObject {
  id?: string | null;
  name?: string | null;
  code?: string | null;
  provinceCode?: string | null;
}

export interface wardItemObject {
  id?: string | null;
  name?: string | null;
  code?: string | null;
  districtCode?: string | null;
}

export interface AddressErrors {
  name?: string;
  phone?: string;
  province?: string;
  ward?: string;
  address?: string;
  district?: string;
  specificAddress?: string;
  provinceId?: string;
  districtId?: string;
  wardId?: string;
}
export interface sendAddressObject {
  name: string;
  phoneNumber: string;
  provinceCode?: string | null;
  districtCode?: string | null;
  wardCode?: string | null;
  specificAddress: string | null;
  isDefault?: boolean;
  shippingAddressType?: number;
}

export enum ACTION_TYPE {
  BUYNOW = "BUYNOW",
}
