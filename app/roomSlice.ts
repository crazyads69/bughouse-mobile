import { room } from "./../models/room";
import { AuthState, ResponseSignIn, VerifyType } from "../models/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRoomSlice {
  listFavorite: room[] | [];
}

export const initialState: IRoomSlice = {
  listFavorite: [],
};

export const roomSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doSetFavorite(state, action: PayloadAction<room | null>) {
      if (action.payload) state.listFavorite = [...state.listFavorite, action.payload];
      else state.listFavorite = [];
    },
    doRemoveFavorite(state, action: PayloadAction<string>) {
      const newList = state.listFavorite.filter((item) => item._id !== action.payload);
      state.listFavorite = newList;
    },
  },
  extraReducers: (builder) => {},
});

export const { doSetFavorite, doRemoveFavorite } = roomSlice.actions;

export default roomSlice.reducer;
