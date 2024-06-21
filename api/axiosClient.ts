import { store } from "./../app/store";
import { Alert, AsyncStorage } from "react-native";
import { ResponseSignIn } from "../models/auth";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import queryString from "query-string";
import { setUserInfo } from "../app/authSlice";
import { Log, LogError, LogRequest, LogResponse } from "../utils/logs";

const createAxiosInstance = () => {
  const axiosInstance: AxiosInstance = axios.create({
    // baseURL: "http://localhost:8000/bh",
    baseURL: "https://a147-42-116-6-42.ngrok-free.app/bh",
    headers: {
      "Content-Type": "application/json",
    },
    paramsSerializer: {
      serialize: (params) => queryString.stringify(params),
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      LogResponse(response);

      if (response && response.data) {
        return response.data;
      }

      return response;
    },
    (error: AxiosError<any>) => {
      LogError(error);
      if (error.response?.status === 401 || error.status === 401) {
        deleteToken();
      }
      return Promise.reject<{ data: { message: string } }>(error.response);
    }
  );

  axiosInstance.interceptors.request.use(
    // @ts-ignore
    function (config: AxiosRequestConfig) {
      // Do something before request is sent
      const accessToken = store.getState().authSlice.userInfo.accessToken;
      if (accessToken) {
        // @ts-ignore
        config.headers = { ...config.headers, Authorization: accessToken };
      }
      LogRequest(config);
      return config;
    },
    function (error) {
      // Do something with request error
      console.log("errr", error);
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const deleteToken = async () => {
  await AsyncStorage.clear();
  Alert.alert(
    "Hết hạn đăng nhập",
    "Vui lòng đăng nhập lại để tiếp tục sử dụng",
    [{ text: "OK", onPress: () => store.dispatch(setUserInfo(null)) }]
  );
};

export default createAxiosInstance();
