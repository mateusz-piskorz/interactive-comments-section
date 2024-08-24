import axios, { AxiosRequestConfig } from "axios";

const serverUrl = process.env.REACT_APP_BACKEND_SERVER_URL;

axios.defaults.baseURL = serverUrl
  ? `${serverUrl}/systemcomments`
  : "http://localhost:3001";

axios.defaults.withCredentials = true;

export function makeRequest(
  url: string,
  options?: AxiosRequestConfig<any> | undefined
) {
  return axios(url, options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data ?? error));
}
