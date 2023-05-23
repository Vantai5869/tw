import httpService from "../noTokenHttpService";
import { LoginReq, LoginRes, RefreshTokenReq } from "../../type/Authen/login";
import url from "./url";

const handleLogin = {
  login: (request: LoginReq, token: string) => {
    const uri = url.login;
    return httpService.POST_ENCODED<LoginReq, LoginRes>({
      uri,
      request,
    });
  },

  refreshToken: (request: RefreshTokenReq) => {
    const uri = url.login;
    return httpService.POST_ENCODED<RefreshTokenReq, LoginRes>({
      uri,
      request,
    });
  },
};

export default handleLogin;
