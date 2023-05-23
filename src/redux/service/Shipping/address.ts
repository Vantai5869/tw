import { AddressRes } from "../../type/Shipping/address";
import httpService from "../httpService";
import url from "./url";

const handleAddress = {
  get: () => {
    const uri = url.list;
    return httpService.GET<string, AddressRes>({
      uri,
    });
  },
};

export default handleAddress;
