import { CategoryReq, CategoryType } from "../../type/Sales/category";
import httpService from "../noTokenHttpService";
import url from "./url";

const handleCategory = {
  search: (params?: CategoryReq) => {
    const uri = url.categoryList;
    return httpService.GET<CategoryReq, CategoryType[]>({
      uri,
      params,
    });
  },
};

export default handleCategory;
