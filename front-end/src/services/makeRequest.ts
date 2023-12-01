import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_SERVER_URL || "http://localhost:3001",
});

export function makeRequest(
  url: string,
  options?: AxiosRequestConfig<any> | undefined
) {
  return api(url, options)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error ?? "Error"));
}
