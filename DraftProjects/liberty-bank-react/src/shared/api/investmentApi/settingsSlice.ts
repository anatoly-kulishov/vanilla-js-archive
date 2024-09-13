import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../app/appStore';
import { getInvestOptionsIntoStorage } from '@/features';
import { CurrencyValues, CatalogFilters, IInvestOptions } from '@/shared/model';

interface IInvestSettings {
  briefcaseCurrency: CurrencyValues;
  catalogFilter: CatalogFilters;
  isSettingsChanged: boolean;
  isNotificationsEnabled: boolean;
  isNotificationsWithPeriodEnabled: boolean;
  notificationsPeriod: string;
}

const investOptionsIntoStorage: IInvestOptions = JSON.parse(
  getInvestOptionsIntoStorage() || 'null',
);

const briefcaseCurrencyInStorage: CurrencyValues =
  investOptionsIntoStorage?.briefcaseCurrency || CurrencyValues.ruble;

const catalogFilterInStorage: CatalogFilters =
  investOptionsIntoStorage?.catalogFilter || CatalogFilters.withAllAssets;

const isNotificationsEnabledinStorage: boolean =
  investOptionsIntoStorage?.isNotificationsEnabled || false;

const isNotificationsWithPeriodEnabledinStorage: boolean =
  investOptionsIntoStorage?.isNotificationsWithPeriodEnabled || false;

const notificationsPeriodinStorage: string =
  investOptionsIntoStorage?.notificationsPeriod || '01:00';

const initialState: IInvestSettings = {
  briefcaseCurrency: briefcaseCurrencyInStorage,
  catalogFilter: catalogFilterInStorage,
  isNotificationsEnabled: isNotificationsEnabledinStorage,
  isNotificationsWithPeriodEnabled: isNotificationsWithPeriodEnabledinStorage,
  notificationsPeriod: notificationsPeriodinStorage,
  isSettingsChanged: false,
};

export const investSettingsSlice = createSlice({
  name: 'investSettingsSlice',
  initialState,
  reducers: {
    setBriefcaseCurrency: (state, actions) => {
      state.briefcaseCurrency = actions.payload;
    },
    setCatalogFilter: (state, actions) => {
      state.catalogFilter = actions.payload;
    },
    setEnableNotifications: (state, actions) => {
      state.isNotificationsEnabled = actions.payload;
    },
    setNotificationsWithPeriodEnable: (state, actions) => {
      state.isNotificationsWithPeriodEnabled = actions.payload;
    },
    setNotificationsPeriod: (state, actions) => {
      state.notificationsPeriod = actions.payload;
    },
    setIsSettingsChanged: (state, actions) => {
      state.isSettingsChanged = actions.payload;
    },
  },
});

export const {
  setBriefcaseCurrency,
  setCatalogFilter,
  setIsSettingsChanged,
  setEnableNotifications,
  setNotificationsWithPeriodEnable,
  setNotificationsPeriod,
} = investSettingsSlice.actions;
export const investSettings = investSettingsSlice.reducer;

export const getBriefcaseCurrency = (state: RootState) => state.investSettings.briefcaseCurrency;
export const getCatalogFilter = (state: RootState) => state.investSettings.catalogFilter;
export const getEnableNotifications = (state: RootState) =>
  state.investSettings.isNotificationsEnabled;
export const getNotificationsWithPeriodEnable = (state: RootState) =>
  state.investSettings.isNotificationsWithPeriodEnabled;
export const getNotificationsPeriod = (state: RootState) =>
  state.investSettings.notificationsPeriod;
export const getIsSettingsChanged = (state: RootState) => state.investSettings.isSettingsChanged;
