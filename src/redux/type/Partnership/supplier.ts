export interface SupplierState {
  loading?: boolean;
  suppliers: SupplierType[];
  supplier?: SupplierType;
  getDetailSuppilerSuccess?: boolean;
  filters: {
    skip: number;
    take: number;
    ListCategoryId: [];
    ListSupplierId: [];
    TextSearch: string;
    FromPrice: number;
    SortField: number;
    SortType: number;
  };
}
export type SupplierType = {
  id?: string;
  nameCompany?: string;
  address?: string;
  taxCode?: string;
  businessRepresentative?: string;
  dateOfBirth: string;
  addressOfBusinessRepresentative?: string;
  business?: string;
  accountId?: string;
  businessName?: string;
  logo?: string;
  logoFileName?: string;
  businessLicense?: string;
  businessLicenseFileName?: string;
  identityNumber?: string;
  email?: string;
  phoneNumber?: string;
  info?: string;
  isActive?: boolean;
};

export interface SupplierReq {
  nameCompany?: string;
  taxCode?: string;
}

export interface SupplierRes {
  items: SupplierType[];
}
