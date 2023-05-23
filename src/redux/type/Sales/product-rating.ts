export interface ProductRatingState {
  loading?: boolean;
  errors?: string;
  reviews?: ProductRatingRes;
}

export interface ProductRatingType {
  content: string;
  ratePoint: number;
  rateOptions: number[];
  productId: string;
  userAvt: string;
  rateByUserFullName: string;
  id: string;
  creatorId: string;
  creationTime: string;
}

export interface ProductRatingReq {
  productId?: string;
  ratePoint?: number;
  haveComment?: boolean;
  skip?: number;
  take?: number;
}

export interface ProductRatingRes {
  extraData: ExtraData;
  totalCount: number;
  items: ProductRatingType[];
}
export interface ExtraData {
  countOneStar: number;
  countTwoStar: number;
  countThreeStar: number;
  countFourStar: number;
  countFiveStar: number;
  totalCount: number;
  haveCommentCount: number;
}
