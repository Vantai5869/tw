import { omit } from "lodash";
import {
  CartType,
  RetailCartAddReq,
  GetRetailCartReq,
  ChangeQuantityReq,
  DeleteCartItemReq,
  GetCartRes,
  AddToCartReq,
  ListProductToCartRes,
  DeleteListCartReq,
} from "../../type/Cart/cart";
import httpService from "../httpService";
import url from "./url";

const handleDistributorCart = {
  add: (request: RetailCartAddReq) => {
    const uri = url.add;
    return httpService.POST<RetailCartAddReq, CartType>({
      uri,
      request,
    });
  },
  get: () => {
    const uri = url.getCarts;
    return httpService.GET<GetRetailCartReq, GetCartRes>({
      uri,
    });
  },
  delete: (params: DeleteCartItemReq) => {
    const uri = url.deleteCart(params.id, params.distributorCartItemId);
    return httpService.DELETE<string, boolean>({
      uri,
    });
  },
  changeQuantity: (request: ChangeQuantityReq) => {
    const uri = url.changeQuantity;

    return httpService.PUT<ChangeQuantityReq, CartType>({
      uri,
      request: omit(request, ["isLogin", "quantityReady"]),
    });
  },
  listProductToCart: (request?: AddToCartReq[]) => {
    const uri = url.listProductToCart;
    return httpService.POST<AddToCartReq[], ListProductToCartRes>({
      uri,
      request,
    });
  },
  deleteList: (request: DeleteListCartReq) => {
    const uri = url.deleteList(request.id);
    return httpService.POST<string[], string[]>({
      uri,
      request: request.ids,
    });
  },
};

export default handleDistributorCart;
