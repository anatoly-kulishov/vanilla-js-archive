import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity } from '../types';

interface IAboutBankState {
  currentCity: ICity;
}

const initialState: IAboutBankState = {
  currentCity: {
    cityName: 'Москва',
  },
};

export const aboutBankSlice = createSlice({
  name: 'aboutBankSlice',
  initialState,
  reducers: {
    setCurrentCity: (state, action: PayloadAction<ICity>) => {
      state.currentCity = action.payload;
    },
  },
});

export const { setCurrentCity } = aboutBankSlice.actions;
export const aboutBank = aboutBankSlice.reducer;
