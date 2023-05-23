export interface RegisterState {
  registerRes: {
    id: string;
    name: string;
    phone: string;
    address: string;
    status: number;
    link: string;
    password: string;
    businessType: number;
    frontImage: Array<string>;
    brandImage: string;
    licenseImage: string;
    email: string;
    reason: string;
  } | null;
  registerStatus: any;
  requestSuccess: boolean;
  loading: boolean;
  tokenOTP?: string;
  registerReject: object;
  validateSuccess: boolean | null;
  fpSuccess: boolean;
  checkEmailPhone: boolean | null;
  reqestRegister: RequestRegister | null;
  businessId: string;
  changePassword?: boolean | null;
  messageError?: string | null;
  listBusiness: Array<object> | null;
}
export interface ResetPasswordOTPReq {
  emailOrPhoneNumber: string;
  password: string;
  resetToken: string;
}

export type ResponseError = {
  status: number;
  data: any;
  message: string;
};

export interface RegisterFail {
  message: string;
  code: number;
}

export interface RegisterReq {
  name: string;
  phone: string;
  address: string;
  lattitude: number;
  longtitude: number;
  taxCode: string;
  link: string;
  password: string;
  status: number;
  businessType: number;
  frontImage: Array<string>;
  brandImage: string;
  licenseImage: string;
  email: string;
  registerToken: string;
}

export interface RegisterRes {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  reason: string;
  link: string;
  password: string;
  status: number;
  businessType: number;
  frontImage: Array<string>;
  brandImage: string;
  licenseImage: string;
}

export interface RequestOTPReq {
  emailOrPhoneNumber: string;
  purpose?: string;
}
export interface ValidateOTPReq {
  emailOrPhoneNumber: string;
  otp: string;
  purpose?: string;
}

export interface ValidateOTPRes {
  isValid: boolean;
  token: string;
}

export interface RegisterStatusReq {
  id: number;
}
export interface RegisterStatusRes {}

export interface CheckEmailPhoneReq {
  email: string;
  phone: string;
}

export interface RequestRegister {
  Phone?: string;
  Name?: string;
  Address?: string;
  TaxCode?: string;
  Logo?: string;
  Email?: string;
  LegalRepresentativeName?: string;
  LegalRepresentativeAddres?: string;
  DOB?: string;
  CardNumber?: string;
  FrontLicense?: string;
  BackLicense?: string;
  Introduction?: string;
  Lattitude?: number;
  Longtitude?: number;
  PlaceId?: string;
  ProvinceId?: string;
  DistrictId?: string;
  WardId?: string;
  Password?: string;
  DeviceToken?: string;
  BusinessId?: string;
  logoImageList?: object;
  imageFontList?: object;
  imageBackList?: object;
}
