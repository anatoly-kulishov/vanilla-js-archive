import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { RevokeUserDeposit } from '.';
import { rootReducer } from '../../app/appStore';
import { Provider } from 'react-redux';
import { USER_REVOKE_DEPOSIT_TEXT } from './constants';
import { depositApi } from '@/shared';

const MockRevokeUserDeposit = {
  hideRevokeModal: () => {},
  depAccountNumber: '123e4567-e89b-12d3-a456-426655440000',
};

const mockStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(depositApi.middleware),
});

describe('Revoke User Deposit', () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <RevokeUserDeposit {...MockRevokeUserDeposit} />
      </Provider>,
    );
  });
  test('displays revoke question modal correctly', () => {
    expect(screen.getByText(USER_REVOKE_DEPOSIT_TEXT.revokeQuestion)).toBeInTheDocument();
    expect(screen.getByText(USER_REVOKE_DEPOSIT_TEXT.revokeButtonCancel)).toBeInTheDocument();
    expect(screen.getByText(USER_REVOKE_DEPOSIT_TEXT.revokeButtonYes)).toBeInTheDocument();
    fireEvent.click(screen.getByText(USER_REVOKE_DEPOSIT_TEXT.revokeButtonYes));
    expect(screen.queryByText(USER_REVOKE_DEPOSIT_TEXT.revokeQuestion)).not.toBeInTheDocument();
  });

  test('displays revoke status success modal correctly', () => {
    fireEvent.click(screen.getByText(USER_REVOKE_DEPOSIT_TEXT.revokeButtonYes));
    expect(screen.getByText(USER_REVOKE_DEPOSIT_TEXT.revokeStatusSuccess)).toBeInTheDocument();
    expect(screen.getByText(USER_REVOKE_DEPOSIT_TEXT.revokeButtonSendBill)).toBeInTheDocument();
    expect(
      screen.getByText(USER_REVOKE_DEPOSIT_TEXT.revokeButtonBackToMainPage),
    ).toBeInTheDocument();
  });
});
