import * as moment from 'moment'
import { select, call } from 'redux-saga/effects'

import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { getSubscriberStatusList, getUserState } from 'selectors/index'
import { DateFormat } from 'webseller/constants'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { joinToString } from 'webseller/helpers'
import { selectNewStatusChangingClientStatus, selectPersonalDataChangingClientStatus } from '../selectors'
import { FORM_FIELDS } from 'webseller/constants/form'
import { getIdentityDocumentInfoById } from 'webseller/common/personalData/saga/helpers'
import { selectHandlingState } from 'reducers/internal/selectors'

export function * createDocumentRequestBodyChangingClientStatus ({ code, isArchive }) {
  const { BillingBranchId: branchId, Msisdn: msisdn } = yield select(selectPersonalAccount)
  const { DisplayName: sellerName, officeId, userId: appSellerUserId } = yield select(getUserState)
  const { Id: handlingId } = yield select(selectHandlingState)
  const activeSalesOffice = yield select(selectActiveSalesOffice)
  const personalData = yield select(selectPersonalDataChangingClientStatus)
  const newStatusId = yield select(selectNewStatusChangingClientStatus)
  const statuses = yield select(getSubscriberStatusList)

  const statusName = statuses?.find(({ Id: id }) => id === newStatusId)?.Name

  const { ruTitle: docType } = yield call(getIdentityDocumentInfoById, personalData?.[FORM_FIELDS.DOCUMENT_TYPE])

  return {
    typeId: 14,
    isArchive,
    handlingId,
    data: {
      branchId,
      signDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY),
      appSellerUserId,
      dsKey: code,
      status: statusName,
      subscriberInformation: {
        msisdn,
        name: joinToString([
          personalData[FORM_FIELDS.LAST_NAME],
          personalData[FORM_FIELDS.FIRST_NAME],
          personalData[FORM_FIELDS.MIDDLE_NAME]
        ]),
        docType,
        docSeries: personalData[FORM_FIELDS.DOCUMENT_SERIES],
        docNumber: personalData[FORM_FIELDS.DOCUMENT_NUMBER]
      },
      companyInfo: {
        sellerName,
        contractStartPlace: activeSalesOffice?.fullAddress,
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId
      }
    }
  }
}
