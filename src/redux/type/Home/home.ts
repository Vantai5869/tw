export interface CategoryType {
  id: string;
  name: string;
  avatar: string;
  parentId: string;
}
export interface NewProductType {
  items: ItemNewProductType;
  totalCount: number;
}
export interface ItemNewProductType {
  attachment: [];
  brandName: string;
  categoryId: string;
  description: string;
  expireDate: Date;
  id: string;
  image: [];
  name: string;
  packingSize: string;
  price: number;
  soldQuantity: number;
  supplierId: string;
  unit: string;
  weight: string;
}

export interface SellingProductType {
  items: ItemSellingProductType;
  totalCount: number;
}
export interface ItemSellingProductType {
  attachment: [];
  brandName: string;
  categoryId: string;
  description: string;
  expireDate: Date;
  id: string;
  image: [];
  name: string;
  packingSize: string;
  price: number;
  soldQuantity: number;
  supplierId: string;
  unit: string;
  weight: string;
}
export interface SupplierType {
  items: ItemSupplierType;
  totalCount: number;
}
export interface ItemSupplierType {
  id: string;
  name: string;
  logo: string;
  totalProduct: number;
  rate: number;
}
