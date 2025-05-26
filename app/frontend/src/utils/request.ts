import axios from "axios";
import { v4 } from "uuid";
import customConfig from "../config";
const request = axios.create();
/**
 *
 * @param {Number} status error code
 */
const errorHandle = async (status: number, other: string) => {
  switch (status) {
    // 401: no login in
    case 401:
      // reloadParentPage();
      break;
    // 403 token expire
    // clear token and redirect to login page
    case 403:
      break;
    case 404:
      // errorTip("request not found");
      break;
    default:
      console.log(other);
  }
};
console.log(customConfig);
// const apiPreFix = customConfig.bff.apiPreFix;
const baseUrl = customConfig.ui.request.baseUrl;
request.defaults.baseURL = baseUrl;

// request.defaults.timeout = customConfig.ui.request.timeout;
request.defaults.headers.post["Content-Type"] = "application/json";

//disable get cache for IE
request.defaults.headers.get["Cache-Control"] = "no-cache";
request.defaults.headers.get["Pragma"] = "no-cache";
/**
 * request interceptor
 * Before each request, if token exists, carry it in the request header
 */
request.interceptors.request.use(
  (config: any) => {
    config.headers["x-request-id"] = v4();
    return config;
  },
  (error) => Promise.reject(error),
);

request.interceptors.response.use(
  (res) => {
    if (res.request.responseType === "blob") {
      return Promise.resolve(res);
    }
    if (200 <= res.status && res.status < 300) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      return Promise.reject(error);
    }
  },
);

export default request;
