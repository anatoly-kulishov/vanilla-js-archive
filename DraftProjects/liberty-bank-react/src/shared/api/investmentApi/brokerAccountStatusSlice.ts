import { RootState } from '@/app/appStore';
import { getBrokerAccountStatusFromLS } from '@/features';
import { BrokerAccountStatus } from '@/shared/model';
import { createSlice } from '@reduxjs/toolkit';

const brokerAccountStatusFromStorage: boolean = JSON.parse(
  getBrokerAccountStatusFromLS() || 'false',
);

const initialState: BrokerAccountStatus = {
  userHaveActiveBrokerAccount: brokerAccountStatusFromStorage,
};

export const investBrokerAccountStatusSlice = createSlice({
  name: 'investBrokerAccountStatusSlice',
  initialState,
  reducers: {
    setBrokerAccStatus: (state, actions) => {
      state.userHaveActiveBrokerAccount = actions.payload;
    },
  },
});

export const { setBrokerAccStatus } = investBrokerAccountStatusSlice.actions;

export const investBrokerAccStatus = investBrokerAccountStatusSlice.reducer;

export const getBrokerAccStatus = (state: RootState) =>
  state.investBrokerAccStatus.userHaveActiveBrokerAccount;
