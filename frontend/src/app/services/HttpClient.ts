import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { sleep } from "../utils/sleep";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

httpClient.interceptors.response.use(async (data) => {
  const isDevMode = import.meta.env.DEV;

  if (isDevMode) {
    await sleep(2500);
  }

  return data;
});
