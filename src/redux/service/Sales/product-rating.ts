import {
  ProductRatingReq,
  ProductRatingRes,
} from "../../type/Sales/product-rating";
import httpService from "../httpService";
import noTokenHttpService from "../noTokenHttpService";
import url from "./url";

const handleProductRating = {
  getListRating: (params: ProductRatingReq) => {
    const uri = url.productRating;
    return noTokenHttpService.GET<ProductRatingReq, ProductRatingRes>({
      uri,
      params,
    });
  },
  getListRatingRetailer: (params: ProductRatingReq) => {
    const uri = url.productRatingRetailer;
    return noTokenHttpService.GET<ProductRatingReq, ProductRatingRes>({
      uri,
      params,
    });
  },
};

export default handleProductRating;
