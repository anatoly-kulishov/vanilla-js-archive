import { RootState } from '@/app/appStore';
import { getAccessToken } from '@/features';
import { AccessToken } from '@/shared/model';
import { createSlice } from '@reduxjs/toolkit';

const authTokenFromStorage: string | null = JSON.parse(getAccessToken() || 'null');

const initialState: AccessToken = {
  accessToken: authTokenFromStorage,
};

export const authTokensSlice = createSlice({
  name: 'investBrokerAccountStatusSlice',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAuthToken } = authTokensSlice.actions;

export const authToken = authTokensSlice.reducer;

export const getAuthToken = (state: RootState) => state.authToken.accessToken;
