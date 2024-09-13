import { notification } from 'antd';
import { all, call, cancel, cancelled, fork, put, select, take, takeEvery } from 'typed-redux-saga';

import api from 'api';
import { Api } from 'api/types';
import { isSuccessfulResponse, getDocumentByWs } from 'api/helpers';
import { selectHandlingId, selectPersonalAccount } from 'helpers/store/hostAppSelectors';
import { downloadFile } from 'helpers/downloadFile';
import { FieldsDocumentIdentity } from 'common/documentIdentity/helpers';
import actionSigning, { ActionTypeSigning } from '../actions';
import selectorsSigning from '../selectors';
import {
  CheckPepCodeSagaDecoratorArgs,
  CreateHandlerSuccessfulPepCodeCheckArgs,
  GetDocumentCodeSagaDecoratorArgs,
  GetPaperDocumentsSagaDecoratorArgs,
  GetSmsCodeSagaDecoratorArgs
} from './types';

export function* checkIsClientHasPepSaga() {
  try {
    const { Msisdn, BillingBranchId: BranchId, ClientId } = yield* select(selectPersonalAccount);

    const requestGetDataSubscriber: Api.PersonalInfoService.GetDataSubscriber.Request = {
      Msisdn,
      BranchId,
      ClientId
    };

    const { data: additionalDataSubscriber } = yield* call(
      api.personalInfo.getDataSubscriber,
      requestGetDataSubscriber
    );

    const isClientHasPep = Boolean(additionalDataSubscriber?.Data?.Pep?.SignAgree);
    yield put(
      actionSigning.checkIsClientHasPepSuccess({
        subscriberData: additionalDataSubscriber,
        isClientHasPep
      })
    );
  } catch {
    yield put(actionSigning.checkIsClientHasPepError());
  }
}

function* getPepNumbersSagaDecorator({ personalData = {} } = {}) {
  try {
    yield put(actionSigning.getPepNumbers());

    const requestBody: Api.PepService.GetClientsPep.Request = {
      name: personalData[FieldsDocumentIdentity.MainFields.FIRST_NAME],
      surname: personalData[FieldsDocumentIdentity.MainFields.LAST_NAME],
      patronymic: personalData[FieldsDocumentIdentity.MainFields.MIDDLE_NAME],
      documentSeries: personalData[FieldsDocumentIdentity.MainFields.DOCUMENT_SERIES],
      documentNumber: personalData[FieldsDocumentIdentity.MainFields.DOCUMENT_NUMBER]
    };

    const { data } = yield* call(api.pep.getClientsPep, requestBody);
    const { msisdns } = data || {};

    if (msisdns) {
      yield put(actionSigning.getPepNumbersSuccess(msisdns));
    } else {
      throw new Error();
    }
  } catch {
    yield put(actionSigning.getPepNumbersError());
  }
}

function* getSmsCodeSagaDecorator({ requestBody }: GetSmsCodeSagaDecoratorArgs) {
  try {
    yield put(actionSigning.getSmsCode());

    const responseSendPep = yield* call(api.pep.sendPepCode, requestBody);

    if (isSuccessfulResponse(responseSendPep)) {
      yield put(actionSigning.getSmsCodeSuccess());
    } else {
      throw new Error();
    }
  } catch {
    yield put(actionSigning.getSmsCodeError());
    notification.error({
      message: 'Не удалось отправить SMS код'
    });
  }
}

function* getDocumentCodeSagaDecorator<BodyPrepareSimSellDocument>({
  preflightGetDocumentCode
}: GetDocumentCodeSagaDecoratorArgs<BodyPrepareSimSellDocument>) {
  yield fork(function* () {
    yield put(actionSigning.getDocumentCode());
    const sockets: WebSocket[] = [];

    try {
      const { request, params, title } = yield* call(preflightGetDocumentCode);

      const document = yield* call(function* () {
        const { data: requestId } = yield* call(request, ...params);

        return yield* call(getDocumentByWs, {
          title,
          requestId,
          sockets
        });
      });

      const documentUrl = document?.url;
      if (documentUrl) {
        yield put(actionSigning.getDocumentCodeSuccess());
        downloadFile(documentUrl);
      } else {
        throw new Error();
      }
    } catch {
      yield put(actionSigning.getDocumentCodeError());
      notification.error({
        message: 'Ошибка при формировании документа'
      });
    } finally {
      if (yield cancelled()) {
        yield put(actionSigning.getDocumentCodeError());
        sockets.forEach((socket) => {
          socket.close();
        });
      }
    }
  });

  yield take(ActionTypeSigning.CANCEL_GET_DOCUMENT_CODE); // TODO удалить?
  yield cancel();
}

function* checkPepCodeSagaDecorator({
  requestData,
  handleSuccessfulCheck
}: CheckPepCodeSagaDecoratorArgs) {
  try {
    yield put(actionSigning.checkPepCode());

    const activePepNumber = yield* select(selectorsSigning.selectActivePepNumber);

    const responseCheckPepCode = yield* call(
      api.pep.checkPepCode,
      activePepNumber || requestData.msisdn,
      requestData
    );

    const { data, status } = responseCheckPepCode;

    if (isSuccessfulResponse(responseCheckPepCode)) {
      if (handleSuccessfulCheck) {
        yield* call(handleSuccessfulCheck);
      }

      yield put(actionSigning.checkPepCodeSuccess(requestData.code));
    } else if (status === 400) {
      throw new Error('Введен неверный код, повтори попытку');
    } else {
      throw new Error(data?.message || 'Ошибка при проверке кода ПЭП');
    }
  } catch (err) {
    yield put(actionSigning.checkPepCodeError());
    notification.error({
      message: err?.message
    });
  }
}

function* createHandlerSuccessfulPepCodeCheck({
  documentRequestData,
  smsDocumentName
}: CreateHandlerSuccessfulPepCodeCheckArgs) {
  return function* () {
    /**
     * Если у абонента не было ПЭП, фоново отправляем согласие на ПЭП
     */
    const isClientHasPep = yield* select(selectorsSigning.selectIsClientHasPep);
    if (!isClientHasPep) {
      const { Msisdn, SubscriberId, BillingBranchId, ClientId } = yield* select(
        selectPersonalAccount
      );
      const handlingId = yield* select(selectHandlingId);
      const requestData: Api.PersonalInfoService.SendPepAgree.Request = {
        msisdn: Msisdn,
        subscriberId: SubscriberId,
        branchId: BillingBranchId,
        clientId: ClientId,
        handlingId
      };
      api.personalInfo.sendPepAgree(requestData);
    }

    try {
      const handlingId = yield* select(selectHandlingId);
      const PersonalAccount = yield* select(selectPersonalAccount);
      const { data: requestId } = yield* call(
        api.document.createDocument,
        handlingId,
        documentRequestData
      );
      const { url } = yield* call(getDocumentByWs, { requestId });

      const { SubscriberId, BillingBranchId } = PersonalAccount;

      if (url) {
        const { Msisdn } = yield* select(selectPersonalAccount);

        const requestBody: Api.SmsService.SendSms.Request = {
          Msisdn,
          SenderSms: 'Tele2',
          ScriptInforming: '100000004',
          BillingBranch: BillingBranchId,
          CreateInteractionParams: {
            SubscriberId: SubscriberId,
            HandlingId: handlingId
          },
          Text: `Документ "${smsDocumentName}" доступен по ссылке: ${url}`,
          IgnoreAdvertisingAgreement: true,
          IgnorePeriodOfSilence: true
        };

        yield* call(api.sms.sendSms, requestBody);
      } else {
        throw new Error();
      }
    } catch {
      throw new Error('Ошибка формирования документа');
    }
  };
}

function* getPaperDocumentsSagaDecorator({
  preflightGetPaperDocuments
}: GetPaperDocumentsSagaDecoratorArgs) {
  yield fork(function* () {
    yield put(actionSigning.getPaperDocuments());
    const sockets: WebSocket[] = [];

    try {
      const preflightRequests = yield* call(preflightGetPaperDocuments);

      const documents = yield* all(
        preflightRequests.map(({ request, params, title }) =>
          call(function* () {
            const response = yield* call(request, ...params);
            const { data: requestId } = response;

            if (isSuccessfulResponse(response)) {
              return yield* call(getDocumentByWs, {
                title,
                requestId,
                sockets
              });
            }
          })
        )
      );

      const isAllDocumentsHaveUrl = documents?.every((document) => Boolean(document?.url));
      if (isAllDocumentsHaveUrl) {
        yield put(actionSigning.getPaperDocumentsSuccess(documents));
      } else {
        throw new Error();
      }
    } catch {
      yield put(actionSigning.getPaperDocumentsError());
      notification.error({
        message: 'Ошибка при формировании документов на подпись'
      });
    } finally {
      if (yield cancelled()) {
        yield put(actionSigning.getPaperDocumentsError());
        sockets.forEach((socket) => {
          socket.close();
        });
      }
    }
  });

  yield take(ActionTypeSigning.CANCEL_GET_PAPER_DOCUMENTS);
  yield cancel();
}

export const helpers = {
  getPepNumbersSagaDecorator: getPepNumbersSagaDecorator,
  getSmsCodeSagaDecorator: getSmsCodeSagaDecorator,
  getDocumentCodeSagaDecorator: getDocumentCodeSagaDecorator,
  checkPepCodeSagaDecorator: checkPepCodeSagaDecorator,
  getPaperDocumentsSagaDecorator: getPaperDocumentsSagaDecorator,
  createHandlerSuccessfulPepCodeCheck: createHandlerSuccessfulPepCodeCheck
};

export default function* () {
  yield all([takeEvery(ActionTypeSigning.CHECK_IS_CLIENT_HAS_PEP, checkIsClientHasPepSaga)]);
}
