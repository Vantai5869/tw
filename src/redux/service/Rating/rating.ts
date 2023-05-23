import { RatingReq, RatingRes } from "../../type/Rating/rating";
import httpService from "../httpService";
import url from "./url";

const api = {
  rate: (request: RatingReq) => {
    const uri = url.sendRate;
    return httpService.POST<RatingReq, RatingRes>({
      uri,
      request,
    });
  },
};
export default api;
