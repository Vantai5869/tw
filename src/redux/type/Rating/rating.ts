export interface RatingReq {
  orderId?: string;
  productRatings?: ProductRatings[];
}
export interface RatingRes {
  id: string;
  content?: string;
  productId?: string;
  ratePoint?: number;
  rateOption?: number[];
}
export interface RatingState {
  loading?: boolean;
  newRate?: RatingRes;
  ratingOrderImportSuccess?: boolean;
  errors?: string;
}
export interface ProductRatings {
  content?: string;
  productId?: string;
  ratePoint?: number;
  rateOptions?: number[];
}
