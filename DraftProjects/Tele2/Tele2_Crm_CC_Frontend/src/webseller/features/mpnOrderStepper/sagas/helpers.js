import * as moment from 'moment'
import { select } from 'redux-saga/effects'

import { selectSubmittedTransferTimeSlot } from 'webseller/common/transferTimeStep/selectors'
import { getHandlingState, getPersonalAccountState, getUserState } from 'selectors/index'
import { selectHandlingState } from 'reducers/internal/selectors'
import { FIRST_STEP_FIELDS } from 'webseller/constants/form'

import { selectMpnOrderTransferNumberOld, selectPersonalDataMnp } from '../selectors'

export function * createRequestBodyCorrectRfaApplication ({ isArchive = false }) {
  const transferTimeSlots = yield select(selectSubmittedTransferTimeSlot)
  const mnpMsisdn = yield select(selectMpnOrderTransferNumberOld)
  const personalData = yield select(selectPersonalDataMnp)

  return {
    typeId: 5,
    isArchive,
    data: {
      clientIdentityCard: {
        number: personalData?.[FIRST_STEP_FIELDS.DOCUMENT_NUMBER],
        series: personalData?.[FIRST_STEP_FIELDS.DOCUMENT_SERIES],
        typeId: personalData?.[FIRST_STEP_FIELDS.DOCUMENT_TYPE]
      },
      clientInfo: {
        mnpMsisdn,
        portingDate: moment(transferTimeSlots).format('DD.MM.YYYY HH:mm'),
        name: personalData?.[FIRST_STEP_FIELDS.FIRST_NAME],
        surname: personalData?.[FIRST_STEP_FIELDS.LAST_NAME],
        patronymic: personalData?.[FIRST_STEP_FIELDS.MIDDLE_NAME]
      }
    }
  }
}

export function * createRequestParamsCreateInteraction () {
  const { DisplayName: sellerName, msisdn: userName } = yield select(getUserState)
  const { Id: HandlingId } = yield select(selectHandlingState)
  const { Msisdn } = yield select(getPersonalAccountState)
  const handling = yield select(getHandlingState)

  return {
    HandlingId: handling?.id || HandlingId,
    Msisdn,
    RegisteringCaseId: 7,
    UserFio: sellerName.trim(),
    CategoryId: 0,
    ReasonId: 321,
    CreatedOn: moment(),
    CreatedBy: userName,
    UserName: userName
  }
}
