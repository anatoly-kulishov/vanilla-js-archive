import { call, select } from 'redux-saga/effects'
import * as moment from 'moment'

import { selectHandlingState } from 'reducers/internal/selectors'
import { getPersonalAccountState, getUserState } from 'selectors/index'
import { FORM_FIELDS } from 'webseller/constants/form'
import { createStringFromDate, joinToString } from 'webseller/helpers'
import { DateFormat } from 'webseller/constants'
import { getIdentityDocumentInfoById } from 'webseller/common/personalData/saga/helpers'
import {
  selectBalanceTransferParamTerminationClient,
  selectBankBalanceTransferInfoTerminationClient,
  selectNumberBalanceTransferInfoTerminationClient,
  selectOperationParamsTerminationClient,
  selectPersonalDataTerminationClient,
  selectTypeTerminationClient
} from '../selectors'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import {
  BalanceTransferParam,
  BankBalanceTransferInfoFormFields,
  BeneficiaryParam,
  NumberBalanceTransferInfoFormFields,
  OperationParamsFormFields,
  TerminationClientType
} from '../helpers'
import { mapBpmParamsToRequest } from 'webseller/helpers/operations'

export function * createRequestBodyTerminationClientDocument () {
  const { Id: handlingId } = yield select(selectHandlingState)
  const { userId: appSellerUserId, DisplayName: sellerName, officeId } = yield select(getUserState)
  const { Msisdn: customerMsisdn, BillingBranchId: branchId } = yield select(getPersonalAccountState)
  const activeSalesOffice = yield select(selectActiveSalesOffice)

  const balanceTransfer = yield select(selectBalanceTransferParamTerminationClient)
  const isNumberTransfer = balanceTransfer === BalanceTransferParam.NUMBER
  const isBankAccountTransfer = balanceTransfer === BalanceTransferParam.BANK_ACCOUNT

  const operationParams = yield select(selectOperationParamsTerminationClient)
  const beneficiaryParam = operationParams[OperationParamsFormFields.BENEFICIARY]
  const beneficiaryPersonalData = operationParams[OperationParamsFormFields.BENEFICIARY_PERSONAL_DATA] || {}

  const numberBalanceTransferInfo = yield select(selectNumberBalanceTransferInfoTerminationClient)
  const bankBalanceTransferInfo = yield select(selectBankBalanceTransferInfoTerminationClient)

  const clientPersonalData = yield select(selectPersonalDataTerminationClient)

  const { ruTitle: identityDocType } = yield call(
    getIdentityDocumentInfoById,
    clientPersonalData?.[FORM_FIELDS.DOCUMENT_TYPE]
  )

  const moneyTransfer = isNumberTransfer ? 'ACCOUNT' : isBankAccountTransfer ? 'BANK' : undefined

  return {
    typeId: 13,
    format: 'PDF',
    handlingId,
    data: {
      appSellerSystem: 'WEB',
      appSellerUserId,
      branchId,
      signDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY),
      subscriberInformation: {
        msisdn: customerMsisdn,
        name: joinToString([
          clientPersonalData?.[FORM_FIELDS.LAST_NAME],
          clientPersonalData?.[FORM_FIELDS.FIRST_NAME],
          clientPersonalData?.[FORM_FIELDS.MIDDLE_NAME]
        ]),
        birthDate: createStringFromDate(
          clientPersonalData?.[FORM_FIELDS.BIRTH_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        citizenship: clientPersonalData?.[FORM_FIELDS.CITIZENSHIP],
        contactMsisdn: operationParams[OperationParamsFormFields.CONTACT_NUMBER],
        email: operationParams[OperationParamsFormFields.CONTACT_EMAIL],
        birthPlace: clientPersonalData?.[FORM_FIELDS.BIRTH_PLACE],
        docType: identityDocType,
        docSeries: clientPersonalData?.[FORM_FIELDS.DOCUMENT_SERIES],
        docNumber: clientPersonalData?.[FORM_FIELDS.DOCUMENT_NUMBER],
        issueDate: createStringFromDate(
          clientPersonalData?.[FORM_FIELDS.DOCUMENT_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        issueId: clientPersonalData?.[FORM_FIELDS.DOCUMENT_CODE],
        issuedBy: clientPersonalData?.[FORM_FIELDS.DOCUMENT_ADDRESS],
        regAddress: clientPersonalData?.[FORM_FIELDS.REGISTRATION_ADDRESS]
      },
      beneficiaryInformation:
        beneficiaryParam === BeneficiaryParam.BENEFICIARY_INTEREST
          ? {
            name: joinToString([
              beneficiaryPersonalData[FORM_FIELDS.LAST_NAME],
              beneficiaryPersonalData[FORM_FIELDS.FIRST_NAME],
              beneficiaryPersonalData[FORM_FIELDS.MIDDLE_NAME]
            ]),
            docType: beneficiaryPersonalData[FORM_FIELDS.DOCUMENT_TYPE],
            docSeries: beneficiaryPersonalData[FORM_FIELDS.DOCUMENT_SERIES],
            docNumber: beneficiaryPersonalData[FORM_FIELDS.DOCUMENT_NUMBER],
            issueDate: createStringFromDate(
              beneficiaryPersonalData[FORM_FIELDS.DOCUMENT_DATE],
              DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
            ),
            issueId: beneficiaryPersonalData[FORM_FIELDS.DOCUMENT_CODE],
            issuedBy: beneficiaryPersonalData[FORM_FIELDS.DOCUMENT_ADDRESS],
            citizenship: beneficiaryPersonalData[FORM_FIELDS.CITIZENSHIP],
            birthDate: createStringFromDate(
              beneficiaryPersonalData[FORM_FIELDS.BIRTH_DATE],
              DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
            ),
            birthPlace: beneficiaryPersonalData[FORM_FIELDS.BIRTH_PLACE],
            regAddress: beneficiaryPersonalData[FORM_FIELDS.REGISTRATION_ADDRESS]
          }
          : undefined,
      moneyTransfer,
      bankInfo:
        isBankAccountTransfer && bankBalanceTransferInfo
          ? {
            name: bankBalanceTransferInfo[BankBalanceTransferInfoFormFields.BANK_NAME],
            kpp: bankBalanceTransferInfo[BankBalanceTransferInfoFormFields.KPP],
            inn: bankBalanceTransferInfo[BankBalanceTransferInfoFormFields.INN],
            bik: bankBalanceTransferInfo[BankBalanceTransferInfoFormFields.BIK],
            rs: bankBalanceTransferInfo[BankBalanceTransferInfoFormFields.RS],
            account: bankBalanceTransferInfo[BankBalanceTransferInfoFormFields.ACCOUNT],
            fio: bankBalanceTransferInfo[BankBalanceTransferInfoFormFields.CLIENT_NAME]
          }
          : undefined,
      transferMoneySubscriber:
        isNumberTransfer && numberBalanceTransferInfo
          ? {
            name: numberBalanceTransferInfo[NumberBalanceTransferInfoFormFields.NAME],
            msisdn: numberBalanceTransferInfo[NumberBalanceTransferInfoFormFields.NUMBER]
          }
          : undefined,
      companyInfo: {
        sellerName,
        contractStartPlace: activeSalesOffice?.fullAddress,
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId
      }
    }
  }
}

export function * createExecuteTerminationClientRequestBody () {
  const { Id: handlingId } = yield select(selectHandlingState)
  const type = yield select(selectTypeTerminationClient)
  const isOnline = type === TerminationClientType.ONLINE

  const { Msisdn: msisdn } = yield select(getPersonalAccountState)

  const clientPersonalData = yield select(selectPersonalDataTerminationClient)

  const { ruTitle: docName } = yield call(getIdentityDocumentInfoById, clientPersonalData[FORM_FIELDS.DOCUMENT_TYPE])

  const fullName = joinToString([
    clientPersonalData?.[FORM_FIELDS.LAST_NAME],
    clientPersonalData?.[FORM_FIELDS.FIRST_NAME],
    clientPersonalData?.[FORM_FIELDS.MIDDLE_NAME]
  ])
  const birthFullInfo = joinToString([
    createStringFromDate(clientPersonalData[FORM_FIELDS.BIRTH_DATE], DateFormat.VIEW_DATE),
    clientPersonalData[FORM_FIELDS.BIRTH_PLACE]
  ], '; ')
  const identityDocumentFullInfo = joinToString([
    docName,
    joinToString([
      clientPersonalData[FORM_FIELDS.DOCUMENT_SERIES],
      clientPersonalData[FORM_FIELDS.DOCUMENT_NUMBER]
    ], ' '),
    clientPersonalData[FORM_FIELDS.DOCUMENT_CODE],
    clientPersonalData[FORM_FIELDS.DOCUMENT_ADDRESS],
    createStringFromDate(clientPersonalData[FORM_FIELDS.DOCUMENT_DATE], DateFormat.VIEW_DATE)
  ], ';')

  const balanceTransferParam = yield select(selectBalanceTransferParamTerminationClient)
  const operationParams = yield select(selectOperationParamsTerminationClient)
  const contactNumber = operationParams?.[OperationParamsFormFields.CONTACT_NUMBER]
  const numberBalanceTransferInfo = yield select(selectNumberBalanceTransferInfoTerminationClient)
  const bankBalanceTransferInfo = yield select(selectBankBalanceTransferInfoTerminationClient)

  let reasonId
  let techServiceId
  let params
  switch (balanceTransferParam) {
    case BalanceTransferParam.NUMBER: {
      reasonId = 1296
      techServiceId = '5F7D9715-10CC-4F06-9003-0D9A08E14CED'
      params = [
        {
          key: '5F9D5C3A-4BB3-4FFC-B5A4-A514D4FEE38C',
          value: msisdn
        },
        {
          key: 'E9E886DE-60B2-4F68-8590-71725E4AFEAF',
          value: fullName
        },
        {
          key: '20EED00B-E939-4C99-B3CE-6ACE40E34D11',
          value: birthFullInfo
        },
        {
          key: '346D89B2-61C0-4421-86AE-8B6907A19F7A',
          value: identityDocumentFullInfo
        },
        {
          key: '77C1AA4E-ADFC-454B-A6D1-ECD00DB81470',
          value: contactNumber
        },
        {
          key: '0C8E9316-4BF4-4155-B219-56439354F129',
          value: numberBalanceTransferInfo?.[NumberBalanceTransferInfoFormFields.NUMBER]
        }
      ]
      break
    }
    case BalanceTransferParam.BANK_ACCOUNT: {
      reasonId = 1446
      techServiceId = '179579FB-8602-4676-822A-2CF853123CC6'
      params = [
        {
          key: '5F9D5C3A-4BB3-4FFC-B5A4-A514D4FEE38C',
          value: msisdn
        },
        {
          key: 'E9E886DE-60B2-4F68-8590-71725E4AFEAF',
          value: fullName
        },
        {
          key: '20EED00B-E939-4C99-B3CE-6ACE40E34D11',
          value: birthFullInfo
        },
        {
          key: '346D89B2-61C0-4421-86AE-8B6907A19F7A',
          value: identityDocumentFullInfo
        },
        {
          key: '77C1AA4E-ADFC-454B-A6D1-ECD00DB81470',
          value: contactNumber
        },
        {
          key: '3B1D89BC-6442-48FA-9B23-F3A9554E01F5',
          value: bankBalanceTransferInfo?.[BankBalanceTransferInfoFormFields.BANK_NAME]
        },
        {
          key: 'B1ECA61A-6C9C-4FE4-8B72-23A153FBB7D8',
          value: bankBalanceTransferInfo?.[BankBalanceTransferInfoFormFields.KPP]
        },
        {
          key: '187FACAF-EC92-4CE7-B67F-A21C019B750E',
          value: bankBalanceTransferInfo?.[BankBalanceTransferInfoFormFields.INN]
        },
        {
          key: '462E51D5-8B13-4324-991E-AD9CE1FE7D9F',
          value: bankBalanceTransferInfo?.[BankBalanceTransferInfoFormFields.RS]
        },
        {
          key: 'BFE8B27D-F299-461A-9FF9-1B35CEA9DDD7',
          value: bankBalanceTransferInfo?.[BankBalanceTransferInfoFormFields.BIK]
        },
        {
          key: 'DB1DB834-BDA0-41FA-A637-C625489170FA',
          value: bankBalanceTransferInfo?.[BankBalanceTransferInfoFormFields.ACCOUNT]
        },
        {
          key: '14D5E3E6-200B-40E5-8E11-1380F15DAC18',
          value: bankBalanceTransferInfo?.[BankBalanceTransferInfoFormFields.CLIENT_NAME]
        }
      ]
      break
    }
    case BalanceTransferParam.WITHOUT_TRANSFER:
    default: {
      reasonId = 1447
      techServiceId = '6A770B3F-1EEE-4673-8FF1-D9C9C363DAF9'
      params = [
        {
          key: '5F9D5C3A-4BB3-4FFC-B5A4-A514D4FEE38C',
          value: msisdn
        },
        {
          key: 'E9E886DE-60B2-4F68-8590-71725E4AFEAF',
          value: fullName
        },
        {
          key: '20EED00B-E939-4C99-B3CE-6ACE40E34D11',
          value: birthFullInfo
        },
        {
          key: '346D89B2-61C0-4421-86AE-8B6907A19F7A',
          value: identityDocumentFullInfo
        },
        {
          key: '77C1AA4E-ADFC-454B-A6D1-ECD00DB81470',
          value: contactNumber
        }
      ]
    }
  }

  return {
    isOnline,
    bpmSetting: {
      reasonId,
      handlingId,
      techServiceId
    },
    params: mapBpmParamsToRequest(params)
  }
}
