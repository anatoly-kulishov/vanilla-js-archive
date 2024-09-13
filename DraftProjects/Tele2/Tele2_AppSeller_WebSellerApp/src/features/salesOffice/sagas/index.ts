import { notification } from 'antd';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import api from 'api';
import { SalesOfficeLimitationsService } from 'api/salesOfficeLimitations/types';
import actions, { ActionTypeSalesOffice, ActionSalesOffice } from 'features/salesOffice/actions';
import { DealerInfoService } from 'api/dealerInfo/types';
import { BussinessLogicError, isErrorResponse, isSuccessfulResponse } from 'api/helpers';
import getFinalPollingData from 'api/helpers/getFinalPollingData';

function* getActiveSalesOfficeSaga() {
  const MESSAGE_ERROR = 'Не удалось получить информацию';

  try {
    const {
      data: activeSalesOffice
    }: AxiosResponse<SalesOfficeLimitationsService.GetActiveSalesOffice.Response> = yield call(
      api.salesOfficeLimitations.getActiveSalesOffice
    );
    const { salesOfficeId } = activeSalesOffice || {};

    if (salesOfficeId) {
      const [{ data: salesOfficeInfo }, { data: branchesResponse }] = yield all([
        call(api.dealerInfo.getSalesOfficeInfo, { officeId: String(salesOfficeId) }),
        call(api.dealerInfo.getSalesOfficeBranches, { officeId: salesOfficeId })
      ]);

      yield put(
        actions.getActiveSalesOfficeSuccess({
          salesOfficeId,
          fullAddress: salesOfficeInfo?.fullAddress,
          branches: branchesResponse?.branches
        })
      );
    } else {
      throw new BussinessLogicError();
    }
  } catch {
    yield put(actions.getActiveSalesOfficeError());
    notification.error({
      message: 'Торговая точка',
      description: MESSAGE_ERROR
    });
  }
}

function* getPotentialActiveSalesOfficeInfoSaga({
  payload
}: ActionSalesOffice.GetPotentialActiveSalesOfficeInfo) {
  const DEFAULT_MESSAGE_ERROR = 'Ошибка при получении информации по торговой точке';

  try {
    const { data, status }: AxiosResponse<DealerInfoService.GetSalesOfficeInfo.Response> =
      yield call(api.dealerInfo.getSalesOfficeInfo, { officeId: payload.officeId });

    if (status === 404) {
      const MESSAGE_ERROR_NOT_FOUND = 'Торговая точка не найдена';
      yield put(actions.getPotentialActiveSalesOfficeInfoError(MESSAGE_ERROR_NOT_FOUND));
      notification.error({
        message: 'Смена торговой точки',
        description: isErrorResponse(data) ? data.message : MESSAGE_ERROR_NOT_FOUND
      });
      return;
    }

    if (data?.isActiveSettingAvailable !== true) {
      const { activeSettingReason, message } = data || {};

      const messageError = activeSettingReason || message;
      yield put(actions.getPotentialActiveSalesOfficeInfoError(messageError));
      notification.error({
        message: 'Смена торговой точки',
        description: messageError
      });
      return;
    }

    yield put(
      actions.getPotentialActiveSalesOfficeInfoSuccess({ officeId: payload.officeId, ...data })
    );
  } catch {
    yield put(actions.getPotentialActiveSalesOfficeInfoError(DEFAULT_MESSAGE_ERROR));
    notification.error({
      message: 'Смена торговой точки',
      description: DEFAULT_MESSAGE_ERROR
    });
  }
}

function* changeActiveSalesOfficeSaga({ payload }: ActionSalesOffice.ChangeActiveSalesOffice) {
  const { newOfficeId, refreshTokens } = payload || {};

  try {
    const responseChangeOffice = yield call(api.salesOfficeLimitations.changeActiveSalesOffice, {
      officeId: newOfficeId
    });

    if (!isSuccessfulResponse(responseChangeOffice)) {
      const MESSAGE_ERROR =
        responseChangeOffice.data?.message || 'Изменение торговых точек ограничено';
      yield put(actions.changeActiveSalesOfficeError(MESSAGE_ERROR));
      notification.error({
        message: 'Смена торговой точки',
        description: MESSAGE_ERROR
      });
      return;
    }

    const { officeChangeSessionId } = responseChangeOffice.data || {};
    if (officeChangeSessionId) {
      const changingOfficeStatus: AxiosResponse<SalesOfficeLimitationsService.GetActiveSalesOfficeStatus.Response> =
        yield call(
          getFinalPollingData<SalesOfficeLimitationsService.GetActiveSalesOfficeStatus.Response>,
          {
            interval: 7_000,
            threshold: 60_000,
            fetchData: () =>
              api.salesOfficeLimitations.getActiveSalesOfficeStatus({ officeChangeSessionId }),
            checkOnError: (response) => !isSuccessfulResponse(response),
            checkOnSuccess: (response) => response?.data?.isMigrationResultReceived === true
          }
        );

      const isConfirmedChanging = changingOfficeStatus?.data?.isConfirmed === true;
      if (isConfirmedChanging) {
        yield put(
          actions.changeActiveSalesOfficeSuccess({
            salesOfficeId: newOfficeId
          })
        );
        yield put(actions.getActiveSalesOffice());
        refreshTokens?.();
      } else {
        const MESSAGE_ERROR =
          'При изменении торговой точки возникла ошибка. Попробуйте изменить точку повторно';
        yield put(actions.changeActiveSalesOfficeError(MESSAGE_ERROR));
        notification.error({
          message: 'Смена торговой точки',
          description: MESSAGE_ERROR
        });
      }
    } else {
      throw new BussinessLogicError('Не удалось получить id смены торговой точки');
    }
  } catch {
    const MESSAGE_ERROR = 'Произошел технический сбой. Попробуйте еще раз';
    yield put(actions.changeActiveSalesOfficeError(MESSAGE_ERROR));
    notification.error({
      message: 'Смена торговой точки',
      description: MESSAGE_ERROR
    });
  }
}

export default function* sagaSalesOffice() {
  yield all([
    takeEvery(ActionTypeSalesOffice.GET_ACTIVE_SALES_OFFICE, getActiveSalesOfficeSaga),
    takeEvery(
      ActionTypeSalesOffice.GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO,
      getPotentialActiveSalesOfficeInfoSaga
    ),
    takeEvery(ActionTypeSalesOffice.CHANGE_ACTIVE_SALES_OFFICE, changeActiveSalesOfficeSaga)
  ]);
}
