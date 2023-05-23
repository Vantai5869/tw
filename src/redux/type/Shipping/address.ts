import { TAddressObject } from "../../../constants/type.interface";

export interface AddressState {
  loading?: boolean;
  addresses: AddressRes;
  shippingAddress?: TAddressObject;
}
export type AddressType = {
  id?: string;
  name?: string;
  userId?: string;
  phoneNumber?: string;
  districtCode?: string;
  districtName?: string;
  provinceCode?: string;
  provinceName?: string;
  wardCode?: string;
  wardName?: string;
  specificAddress?: string;
  shippingAddressType?: string;
  isDefault?: boolean;
};

export interface AddressRes {
  items: AddressType[];
  totalCount: number;
}
