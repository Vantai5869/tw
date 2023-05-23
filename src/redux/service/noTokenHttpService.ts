import axios, { AxiosError } from "axios";
import qs from "qs";
const CLIENT_BASE_URL = "http://45.76.152.56";

type ApiConfig<T = any> = {
  uri: String;
  // request: T;
  request?: any;
  token?: String;
  params?: Object;
};

export type ResponseError = {
  status: number;
  data: any;
  exception: { detail: string };
  message: string;
};

const axiosApi = axios.create({ baseURL: CLIENT_BASE_URL });

export function setLanguagesNoToken(lang: string) {
  axiosApi.defaults.headers.common["accept-language"] = lang;
}
const noTokenHttpService = {
  GET: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, params } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = { "Content-Type": "application/json" };
    try {
      const res = await axios.get<O>(url, {
        headers,
        params,
      });

      return res.data;
    } catch (error) {
      const err = error as AxiosError<ResponseError>;
      if (err.response) {
        const responseError: ResponseError = err.response.data;
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
    const { uri, request, token, params } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    const headers = {
      "Content-Type": "application/json",
    };
    const body =
      request instanceof FormData ? request : JSON.stringify(request);

    try {
      const res = await axios.post<O>(url, body, { headers });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const responseError: ResponseError = err.response.data;
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
    const { uri, request, token } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify(request);
    try {
      const res = await axios.put<O>(url, body, { headers });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const responseError: ResponseError = err.response.data;
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
    const { uri } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.delete<O>(url, { headers });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const responseError: ResponseError = err.response.data;
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
    const { uri, request, params } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    if (params) {
      Object.assign(headers, { ...params });
    }
    const body = qs.stringify(request);
    try {
      const res = await axios.post<O>(url, body, { headers });

      return res.data;
    } catch (error) {
      const err = error as AxiosError;

      if (err.response) {
        const responseError: ResponseError = err.response.data;
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
  POST_FORM_DATA: async <T, O>(apiConfig: ApiConfig<T>) => {
    const { uri, request, token, params } = apiConfig;
    let url = CLIENT_BASE_URL + uri;
    let headers = {};
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
      const res = await axios.post<O>(url, body, {
        headers,
        transformRequest: (data) => {
          return data;
        },
      });
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        const responseError: ResponseError = err.response.data.error;
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

export default noTokenHttpService;
