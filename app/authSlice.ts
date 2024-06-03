import { AuthState, ResponseSignIn, VerifyType } from "../models/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isLoading: false,
  isLogin: false,
  isDisabled: false,
  verifyInfo: {
    isVerifiedOtp: false,
    username: "",
    phone: "",
    userId: "",
  },
  userInfo: {
    accessToken: "",
    refreshToken: "",
    user: {
      address: {
        city: "",
        district: "",
        ward: "",
        street: "",
      },
      _id: "",
      username: "",
      email: "",
      phone: "",
      identity: "",
      name: "",
      gender: "",
      dob: "",
      avatar: "",
      notifications: [],
      enable: false,
      socketId: "",
      wishList: [],
      deleted: false,
      wallet: {
        walletPrivateKey: "",
        walletAddress: "",
        balance: 0,
      },
      createdAt: "",
      updatedAt: "",
    },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setVerifiedInfo: (state, action: PayloadAction<VerifyType>) => {
      const { isVerifiedOtp, phone, username, userId } = action.payload;
      state.verifyInfo = { isVerifiedOtp, phone, username, userId };
    },
    setUserInfo: (state, action: PayloadAction<ResponseSignIn | null>) => {
      if (action.payload) state.userInfo = action.payload;
      else state.userInfo = initialState.userInfo;
    },
  },
  extraReducers: (builder) => {},
});

export const { setLogin, setVerifiedInfo, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
