import {
  aboutBank,
  accountsApi,
  authApi,
  authToken,
  bankBranchesServiceApi,
  cardsApi,
  creditApi,
  currencyServiceApi,
  customerApi,
  depositApi,
  educationCourse,
  insuranceApi,
  insuranceApiStrapi,
  investBrokerAccStatus,
  investSettings,
  investmentApi,
  moexApi,
  paymentsApi,
} from '@/shared';
import { mosBirjaApi } from '@/shared/api/investmentApi/mosBirjaApi';
import { formStepper } from '@/widgets';
import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  formStepper,
  aboutBank,
  educationCourse,
  investSettings,
  investBrokerAccStatus,
  authToken,
  [authApi.reducerPath]: authApi.reducer,
  [accountsApi.reducerPath]: accountsApi.reducer,
  [depositApi.reducerPath]: depositApi.reducer,
  [creditApi.reducerPath]: creditApi.reducer,
  [customerApi.reducerPath]: customerApi.reducer,
  [investmentApi.reducerPath]: investmentApi.reducer,
  [insuranceApi.reducerPath]: insuranceApi.reducer,
  [insuranceApiStrapi.reducerPath]: insuranceApiStrapi.reducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
  [moexApi.reducerPath]: moexApi.reducer,
  [mosBirjaApi.reducerPath]: mosBirjaApi.reducer,
  [currencyServiceApi.reducerPath]: currencyServiceApi.reducer,
  [bankBranchesServiceApi.reducerPath]: bankBranchesServiceApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        authApi.middleware,
        accountsApi.middleware,
        depositApi.middleware,
        creditApi.middleware,
        customerApi.middleware,
        investmentApi.middleware,
        insuranceApi.middleware,
        insuranceApiStrapi.middleware,
        cardsApi.middleware,
        moexApi.middleware,
        mosBirjaApi.middleware,
        currencyServiceApi.middleware,
        bankBranchesServiceApi.middleware,
        paymentsApi.middleware,
      ),
    preloadedState,
  });
};

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
