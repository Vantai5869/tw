import httpService from "../httpService";
import url from "./url";
import {
  CheckEmailPhoneReq,
  RegisterReq,
  RegisterRes,
  RegisterStatusReq,
  RequestOTPReq,
  RequestRegister,
  ResetPasswordOTPReq,
  ValidateOTPReq,
  ValidateOTPRes,
} from "../../type/Authen/register";
import noTokenHttpService from "../noTokenHttpService";

const handleRegister = {
  register: (request: RequestRegister) => {
    const uri = url.register;
    return noTokenHttpService.POST_FORM_DATA<RequestRegister, RegisterRes>({
      uri,
      request,
    });
  },
  checkEmailPhone: (request: CheckEmailPhoneReq) => {
    const uri = url.checkEmailPhone;
    return noTokenHttpService.POST<CheckEmailPhoneReq, "">({
      uri,
      request,
    });
  },
  getBusinissId: () => {
    const uri = url.getBusinissId;
    return noTokenHttpService.GET<"", "">({
      uri,
    });
  },
  changePassword: (request: any) => {
    const uri = url.changePassword;
    return httpService.POST<"", "">({
      uri,
      request,
    });
  },
};

export default handleRegister;
