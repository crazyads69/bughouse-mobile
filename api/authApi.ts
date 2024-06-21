import {
  FormConfirmOtp,
  FormValuesSignIn,
  FormValuesSignUp,
  ResponseSignIn,
} from "../models/auth";
import axiosInstance from "./axiosClient";

import axiosClient from "./axiosClient";

const BASES_URL = "/auth";

export const authApi = {
  login(params: FormValuesSignIn) {
    return axiosInstance.post<ResponseSignIn>(`/auth/login`, params);
  },

  register(params: FormValuesSignUp) {
    return axiosClient.post(`/auth/registry`, params);
  },

  resetOtp(params: Omit<FormValuesSignIn, "password">) {
    return axiosClient.post(`/auth/reset-otp`, params);
  },

  confirmOtp(params: FormConfirmOtp) {
    return axiosClient.post(`/auth/confirm-account`, params);
  },
  verifyEmail() {
    return axiosClient.post(`/auth/verify-email`, {});
  },
};
