import { select } from 'redux-saga/effects'
import moment from 'moment'

import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { FORM_FIELDS } from 'webseller/constants/form'
import { joinToString } from 'webseller/helpers'
import { getPersonalAccountState, getUserState } from 'selectors/index'

import { selectIcc, selectIsFromMarkersReplaceSim, selectPersonalAccount, selectPersonalData } from '../selectors'
import { ADMIN_CATEGORY_ID, AUTO_NOTE_ID } from 'webseller/features/replaceSim/constants'
import { getReasonId } from 'webseller/features/replaceSim/utils'
import { selectHandlingState } from 'reducers/internal/selectors'
import { createCommentForInteraction } from 'webseller/helpers/api'
import { selectPepCode } from 'webseller/common/signing/selectors'

/**
 * Заявление на актуализацию регистрационных данных абонента (AppSeller)
 */
export function * createRequestBodyCorrectRfaApplication ({ isArchive, code }) {
  const { BillingBranchId, ClientId, Msisdn } = yield select(selectPersonalAccount)
  const { DisplayName: sellerName, officeId, userId: appSellerUserId } = yield select(getUserState)
  const activeSalesOffice = yield select(selectActiveSalesOffice)
  const documentData = yield select(selectPersonalData)
  const icc = yield select(selectIcc)

  return {
    typeId: 10,
    isArchive,
    data: {
      branchId: BillingBranchId,
      clientId: ClientId,
      appSellerUserId,
      icc: String(icc),
      iccNew: String(documentData['icc']),
      signDate: moment().format('YYYY-MM-DD'),
      dsKey: code,
      subscriberInformation: {
        msisdn: Msisdn,
        name: joinToString([
          documentData[FORM_FIELDS.LAST_NAME],
          documentData[FORM_FIELDS.FIRST_NAME],
          documentData?.[FORM_FIELDS.MIDDLE_NAME]
        ]),
        docType: documentData[FORM_FIELDS.DOCUMENT_NAME] || String(documentData[FORM_FIELDS.DOCUMENT_TYPE]),
        docSeries: documentData[FORM_FIELDS.DOCUMENT_SERIES],
        docNumber: documentData[FORM_FIELDS.DOCUMENT_NUMBER]
      },
      companyInfo: {
        sellerName: sellerName.trim(),
        sellerPointId: String(activeSalesOffice?.salesOfficeId || officeId),
        contractStartPlace: activeSalesOffice?.fullAddress
      }
    }
  }
}

export const checkChangeSimHistoryLimit = historyChangeSim => {
  return (
    historyChangeSim?.filter(order => {
      const prevDayTimeStamp = moment().subtract('day', 1).unix()
      const dateToTimeStamp = moment(order?.DateTo).unix()
      const currentDayTimeStamp = moment().unix()

      return currentDayTimeStamp >= dateToTimeStamp && dateToTimeStamp >= prevDayTimeStamp
    }).length >= 2
  )
}

export function * createRequestParamsCreateInteractionReplaceSim () {
  const { Id: handlingId } = yield select(selectHandlingState)
  const {
    BillingBranchId: clientBranchId,
    Msisdn: msisdn,
    ClientId: clientId,
    SubscriberId: subscriberId,
    SubscriberBranchId: subscriberBranchId
  } = yield select(getPersonalAccountState)
  const isFromMarkers = yield select(selectIsFromMarkersReplaceSim)
  const isPep = yield select(selectPepCode)
  const documentData = yield select(selectPersonalData)

  return {
    categoryId: ADMIN_CATEGORY_ID,
    registeringCaseId: AUTO_NOTE_ID,
    commentText: createCommentForInteraction({ isFromMarkers, isPep }),
    reasonId: getReasonId(documentData),
    subscriberBranchId,
    clientBranchId,
    subscriberId,
    clientId,
    handlingId,
    msisdn
  }
}
