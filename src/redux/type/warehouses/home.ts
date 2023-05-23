export interface IOverview {
  productCount: number;
  categoryCount: number;
  minStockProductWarningCount: number;
  orderShippingCount: number;
}
export interface IProduct {
  code: string;
  name: string;
  image: string[];
  packingSize?: string;
  price: number;
  productId: string;
  stockInventory: StockInventory;
  stockQuantity: number;
  weight?: number;
}

export interface IMyProductSallingRes {
  totalCount: number;
  items: IProduct[];
}

export interface IwareHome {
  overview: IOverview | undefined;
  myTopProductSelling: IMyProductSallingRes | undefined;
  myTopProductOutOfStockWarning: IMyProductSallingRes | undefined;
  loading: boolean;
}
export interface StockInventory {
  id: string;
  quantity?: number;
  receivedQuantity: number;
  soldQuantity: number;
}
