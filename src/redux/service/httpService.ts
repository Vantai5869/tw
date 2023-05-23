import axios, { AxiosError } from "axios";
import qs from "qs";
import { persistedStorage, saveToken } from "../../common/storage";
import { CLIENT_AUTH } from "../../constants/untils";
import { navigate } from "../../navigation/navigate";
import { ScreenNames } from "../../navigation/screen";
import { RefreshToken } from "../slice/Authen/login";
import { store } from "../store";
const CLIENT_BASE_URL = "http://45.76.152.56";

type ApiConfig<T = any> = {
  uri: String;
  // request: T;
  request?: any;
  token?: String;
  params?: Object;
  paramsList?: Object;
};

export type ResponseError = {
  status: number;
  data: any;
  exception: { detail: string };
  message: string;
};

const axiosApiInstance = axios.create();

export function setConfigAxios(token: string) {
  if (token) {
    axiosApiInstance.defaults.headers.common["Authorization"] =
      `Bearer ` + token;
    axiosApiInstance.defaults.headers.common["X-Authorization"] =
      `Bearer ` + token;
    axiosApiInstance.defaults.headers.common[
      "Content-Typ"
    ] = `application/json`;
  }
}
export function setLanguages(lang: string) {
  axiosApiInstance.defaults.headers.common["accept-language"] = lang;
}

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = await persistedStorage?.getItem("accessToken");
    const language = await persistedStorage?.getItem("language");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        "X-Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Accept-Language": "vi-VN",
        "accept-language": `${language}`,
      };
    } else {
      config.headers = {
        "accept-language": `${language}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      // navigate(ScreenNames.Login as never, {} as never);
      const refresh_token = await persistedStorage?.getItem("refreshToken");
      if (refresh_token) {
        return axios
          .post(
            CLIENT_BASE_URL + "/auth/connect/token",
            qs.stringify({
              ...CLIENT_AUTH,
              grant_type: "refresh_token",
              refresh_token: refresh_token || "",
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then(async (res: any) => {
            const originalRequest = error.config;
            originalRequest.headers["Authorization"] =
              "Bearer " + res?.data.access_token;
            originalRequest.headers["X-Authorization"] =
              "Bearer " + res?.data.access_token;
            await saveToken({
              accessToken: res?.data.access_token,
              refreshToken: res?.data.refresh_token,
            });
            await setConfigAxios(res?.data.access_token);
            return axiosApiInstance.request(originalRequest);
          })
          .catch((err) => {
            navigate(ScreenNames.Login as never, {} as never);
            return Promise.reject(err?.response);
          });
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

const httpService = {
  GET: async <T, O>(apiConfig: ApiConfig<T>) => {
    // const { uri, token, params } = apiConfig;
    // let url = CLIENT_BASE_URL + uri;
    // try {
    //   const res = await axiosApiInstance.get<O>(url, {
    //     params,
    //   });
    //   return res.data;
    const { uri, params } = apiConfig;

    let url = CLIENT_BASE_URL + uri;
    const token = await persistedStorage?.getItem("accessToken");

    let headers = {};
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "application/json",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
      };
    }
    try {
      const res = await axiosApiInstance.get<O>(url, {
        headers,
        params,
        paramsSerializer: (paramsList) => {
          return qs.stringify(paramsList);
        },
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err?.response) {
        const responseError: ResponseError = err?.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "some thing wrong",
        },
        message: err?.message || "",
      };
      throw responseError;
    }
  },

  POST: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, params, request } = apiConfig;

    const token = await persistedStorage?.getItem("accessToken");

    let url = CLIENT_BASE_URL + uri;
    let headers = {};

    // let url = CLIENT_BASE_URL + uri;
    // let headers = {};
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "application/json",
        ...params,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
        ...params,
      };
    }
    const body =
      request instanceof FormData ? request : JSON.stringify(request);

    try {
      const res = await axiosApiInstance.post<O>(url, body, {
        headers,
        params,
      });

      return res.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err?.response) {
        const responseError: ResponseError = err?.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "some thing wrong",
        },
        message: err?.message || "",
      };
      throw responseError;
    }
  },

  PUT: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, request, params } = apiConfig;
    const token = await persistedStorage?.getItem("accessToken");
    let url = CLIENT_BASE_URL + uri;

    let headers = {};
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "application/json",
        // ...params,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
        // ...params,
      };
    }
    const body = JSON.stringify(request);
    try {
      const res = await axiosApiInstance.put<O>(url, body, { headers, params });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err?.response) {
        const responseError: ResponseError = err?.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "some thing wrong",
        },
        message: "",
      };
      throw responseError;
    }
  },

  DELETE: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, params } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    try {
      const res = await axiosApiInstance.delete<O>(url, { params });

      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response) {
        const responseError: ResponseError = err?.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "some thing wrong",
        },
        message: "",
      };
      throw responseError;
    }
  },

  POST_ENCODED: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, request, token, params } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = {};
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        ...params,
      };
    } else {
      headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
        ...params,
      };
    }
    const body = qs.stringify(request);
    try {
      const res = await axiosApiInstance.post<O>(url, body, { headers });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response) {
        const responseError: ResponseError = err?.response.data;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "some thing wrong",
        },
        message: err?.message || "",
      };
      throw responseError;
    }
  },
  PUT_FORM_DATA: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, request, params } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = {};
    const token = await persistedStorage?.getItem("accessToken");
    if (token === "" || token === null) {
      headers = {
        "Content-Type": "multipart/form-data",
        ...params,
      };
    } else {
      headers = {
        "Content-Type": "multipart/form-data",
        "X-Authorization": `Bearer ${token}`,
        Authorization: `Bearer ${token}`,
        ...params,
      };
    }

    const body = request;
    try {
      const res = await axios.put<O>(url, body, { headers, params });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const responseError: ResponseError = err?.response?.data?.error;
        throw responseError;
      }
      const responseError: ResponseError = {
        status: 400,
        data: {},
        exception: {
          detail: "some thing wrong",
        },
        message: err?.message || "",
      };
      throw responseError;
    }
  },
};

export default httpService;
