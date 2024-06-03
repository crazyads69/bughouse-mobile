import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWalletInfo } from "../models/user";

export interface IWalletSlices {
  walletInfo: IWalletInfo;
}

const initialState: IWalletSlices = {
  walletInfo: {
    walletPrivateKey: null,
    walletAddress: null,
    balance: null,
  },
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setInfoWallet(state, action: PayloadAction<IWalletInfo | null>) {
      if (action.payload) {
        state.walletInfo = action.payload;
      } else {
        state.walletInfo = initialState.walletInfo;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const {} = walletSlice.actions;

export default walletSlice.reducer;
