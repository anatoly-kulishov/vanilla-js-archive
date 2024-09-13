import { select } from 'redux-saga/effects'
import * as moment from 'moment'

import { selectSearchParams } from 'webseller/features/webSellerSearch/reducer/selectors'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { selectSubscriberData } from 'webseller/common/signing/selectors'
import { CLIENT_ENVIRONMENTS } from 'webseller/constants/clientCategory'
import { clientCategories } from 'constants/personalAccountStrings'
import { SEARCH_PARAMS } from 'webseller/constants/searchParams'
import { getPersonalAccountState, getUserState } from 'selectors/index'

import {
  selectB2bClientMinimalInfo,
  selectPersonalAccount,
  selectPersonalData,
  selectSubscriberPersonalData
} from '../selectors'
import { selectHandlingState } from 'reducers/internal/selectors'

export function * createRequestBodyCorrectRfaApplication ({ code }) {
  const { DisplayName: sellerName, officeId, userId: appSellerUserId, msisdn: userName } = yield select(getUserState)
  const { BillingBranchId, Msisdn, ParentClientInfo } = yield select(selectPersonalAccount)
  const subscriberPersonalData = yield select(selectSubscriberPersonalData)
  const b2bClientMinimalInfo = yield select(selectB2bClientMinimalInfo)
  const activeSalesOffice = yield select(selectActiveSalesOffice)
  const subscriberData = yield select(selectSubscriberData)
  const searchParams = yield select(selectSearchParams)
  const documentData = yield select(selectPersonalData)

  if (searchParams?.[SEARCH_PARAMS.CLIENT_CATEGORY] === clientCategories.B2C) {
    return {
      typeId: 17,
      format: 'PDF',
      data: {
        appSellerUserName: userName,
        appSellerUserId: Number(appSellerUserId),
        branchId: BillingBranchId,
        codeWord: documentData?.codeWord,
        dsKey: code,
        signDate: moment(),
        subscriberInformation: {
          msisdn: Msisdn,
          name: subscriberPersonalData?.FullName,
          docType: subscriberPersonalData?.IdentityDocumentFields?.TypeDoc,
          docSeries: subscriberPersonalData?.IdentityDocumentFields?.Series,
          docNumber: subscriberPersonalData?.IdentityDocumentFields?.Number
        },
        companyInfo: {
          sellerName: sellerName.trim(),
          sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
          contractStartPlace: activeSalesOffice?.fullAddress
        }
      }
    }
  }

  return {
    typeId: 16,
    format: 'PDF',
    data: {
      docDate: moment().format('YYYY-MM-DD'),
      subscriberName: ParentClientInfo?.ParentClientName,
      subscriberDocument: ParentClientInfo?.PersonalAccountId,
      msisdn: Msisdn,
      codeWord: documentData?.codeWord,
      isCodeWordOnMsisdn: searchParams?.[SEARCH_PARAMS.ENVIROMENT] === CLIENT_ENVIRONMENTS.UNION,
      contactMsisdn: subscriberData?.Data?.MainData?.ContactNumberB2b,
      confirmDocument: b2bClientMinimalInfo?.Data?.AdditionalOptParameters?.find(el => el['Key'] === 'managerAuthorityDocument')['Value'],
      operatorName: sellerName.trim(),
      sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
      contractStartPlace: activeSalesOffice?.fullAddress
    }
  }
}

export function * createRequestParamsCreateInteraction () {
  const { DisplayName: sellerName, msisdn: userName } = yield select(getUserState)
  const { Msisdn: msisdn } = yield select(getPersonalAccountState)
  const { Id: handlingId } = yield select(selectHandlingState)

  return {
    handlingId,
    msisdn,
    registeringCaseId: 7,
    UserFio: sellerName.trim(),
    categoryId: 0,
    reasonId: 187,
    createdOn: moment(),
    createdBy: userName,
    userName
  }
}
