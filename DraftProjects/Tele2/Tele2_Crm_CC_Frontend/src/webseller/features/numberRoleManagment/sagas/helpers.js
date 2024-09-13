import { selectHandlingState } from 'reducers/internal/selectors'
import { select } from 'redux-saga/effects'
import { getPersonalAccountState, getUserState } from 'selectors/index'
import { selectNumberRoleNumberRoleManagment } from '../selectors'
import { selectDataClientMainData, selectSubscriberId, selectSubscriberMainData } from 'webseller/common/crmIntegration/selectors'
import * as moment from 'moment'
import { DateFormat } from 'webseller/constants'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { isAdminRole } from '../helpers'

export function * createDocumentRequestBodyNumberRoleManagment () {
  const { msisdn: userName } = yield select(getUserState)
  const { Id: handlingId } = yield select(selectHandlingState)
  const { BillingBranchId, Msisdn, ParentClientInfo, SubscriberFullInfo } = yield select(getPersonalAccountState)
  const activeSalesOffice = yield select(selectActiveSalesOffice)
  const { roleName: newRoleName, clientEmail: newEmail } = yield select(selectNumberRoleNumberRoleManagment)
  const { IndividualTaxId } = yield select(selectDataClientMainData)
  const { EmailAdmin: currentEmail } = yield select(selectSubscriberMainData)

  const isEmptyRole = newRoleName === 'Нет'

  return {
    typeId: 15,
    handlingId,
    format: 'PDF',
    data: {
      branchId: BillingBranchId,
      employeeName: userName,
      codeOutlet: activeSalesOffice?.salesOfficeId,
      addressOutlet: activeSalesOffice?.fullAddress,
      emailForRequest: isAdminRole(newRoleName) ? newEmail || currentEmail : undefined,
      name: ParentClientInfo?.ParentClientName,
      contractInn: IndividualTaxId,
      account: ParentClientInfo?.PersonalAccountId,
      contractDate: moment(SubscriberFullInfo?.SubscriberInfo?.ActivationDate, DateFormat.VIEW_DATE).format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY),
      turnOnRemoteService: false,
      changeEmailRemoteService: false,
      turnOffRemoteService: false,
      turnOnAccessForLk: !isEmptyRole,
      phoneNumber: Msisdn,
      turnOffAccessForLk: isEmptyRole,
      deletePhoneNumber: isEmptyRole ? Msisdn : '-',
      changeAccessForLk: currentEmail !== newEmail,
      changeAccessForLkPhoneNumber: Msisdn,
      changeAccessForLkEmail: currentEmail,
      changeAccessForLkNewEmail: newEmail,
      role: newRoleName,
      deleteRoleOnPhNumber: !isEmptyRole,
      includeTermsRemoteService: true
    }
  }
}

export function * createExecuteOperationRequestBodyNumberRoleManagment () {
  const subscriberId = yield select(selectSubscriberId)
  const { BillingBranchId: branchid, Msisdn: msisdn } = yield select(getPersonalAccountState)
  const { Id: handlingId } = yield select(selectHandlingState)
  const { roleId, clientEmail: newEmail } = yield select(selectNumberRoleNumberRoleManagment)
  const { EmailAdmin: currentEmail } = yield select(selectSubscriberMainData)

  const emailAdmin = newEmail && newEmail !== currentEmail ? newEmail : undefined

  return {
    subscriberId,
    branchid,
    msisdn,
    handlingId,
    id: roleId,
    emailAdmin
  }
}

export function * createErrorParamsCreateInteractionNumberRoleManagment () {
  const { Id: handlingId } = yield select(selectHandlingState)
  const { Msisdn: msisdn } = yield select(getPersonalAccountState)
  const { msisdn: userName, DisplayName: userFio } = yield select(getUserState)

  return {
    handlingId,
    msisdn,
    registeringCaseId: 7,
    userFio,
    categoryId: 0,
    reasonId: 315,
    createdOn: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY),
    createdBy: userName,
    username: userName
  }
}
