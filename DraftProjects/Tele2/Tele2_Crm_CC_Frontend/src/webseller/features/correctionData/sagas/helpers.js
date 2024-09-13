import { call, put, select } from 'redux-saga/effects'
import * as moment from 'moment'
import {
  selectCorrectionData,
  selectIsFromMarkersCorrectionData,
  selectPersonalDataCorrectionData,
  selectDocumentTypeCorrectionData,
  selectRegistrationAddressCorrectionData
} from 'webseller/features/correctionData/selectors'
import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { selectMnpMarkers } from 'reducers/mnp/selectors'
import { FORM_FIELDS } from 'webseller/constants/form'
import { normalizeNumber, joinToString, createStringFromDate } from 'webseller/helpers'
import { getAddressData } from 'sagas/saleSim/helpers'
import { selectSaleSim } from 'reducers/saleSim/selectors'
import { getPersonalAccountState, getUserState } from 'selectors/index'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { selectCommentary, selectSigningType } from 'webseller/common/signing/selectors'
import { selectHandlingState } from 'reducers/internal/selectors'
import { GenderValueDocumentOperations } from 'webseller/helpers/operations'
import { formatDate } from 'webseller/helpers/formatDate'
import { getIdentityDocumentInfoById } from 'webseller/common/personalData/saga/helpers'
import {
  getCityWithLocality,
  getHouseOrStead,
  getRegionWithDistrict,
  getStreetOrLocality
} from 'webseller/helpers/daData'
import { SigningType } from 'webseller/common/signing/helpers'
import { DateFormat } from 'webseller/constants'
import { createCommentForInteraction } from 'webseller/helpers/api'
import { setOnlyPaperDocumentsScenario } from '../reducer'
import featureConfig from 'webseller/featureConfig'
import { selectorsSigningRemote } from 'websellerRemote/Signing'

const formatRequestDate = date => moment(date).format('YYYY-MM-DD')

/**
 * Заявление на присоединение к оферте и выдаче ключа ПЭП
 */
export function * createRequestBodyPepConnectionDocument () {
  const { documentData, selectedPepMsisdn } = yield select(selectCorrectionData)
  const { Msisdn } = yield select(selectPersonalAccount)

  let clientAddressData
  if (featureConfig.isUseRemoteDocumentIdentity) {
    clientAddressData = yield select(selectRegistrationAddressCorrectionData)
  } else {
    const { foundAddresses } = yield select(selectSaleSim)

    clientAddressData = getAddressData(foundAddresses, documentData[FORM_FIELDS.REGISTRATION_ADDRESS]).SearchAccuracy
  }

  return {
    typeId: 3,
    format: 'PDF',
    data: {
      pepMsisdn: selectedPepMsisdn,
      clientInfo: {
        name: documentData[FORM_FIELDS.FIRST_NAME],
        surname: documentData[FORM_FIELDS.LAST_NAME],
        patronymic: documentData[FORM_FIELDS.MIDDLE_NAME],
        msisdn: Msisdn
      },
      clientIdentityCard: {
        typeId: documentData[FORM_FIELDS.DOCUMENT_TYPE],
        series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
        number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
        issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
        issuedCode: documentData[FORM_FIELDS.DOCUMENT_CODE],
        issuedDate: formatRequestDate(documentData[FORM_FIELDS.DOCUMENT_DATE])
      },
      clientAddress: {
        zipCode: clientAddressData.PostIndex || undefined,
        region: getRegionWithDistrict({ address: clientAddressData, withType: true }),
        city: getCityWithLocality({ address: clientAddressData }),
        street: clientAddressData.StreetWithType || getStreetOrLocality({ address: clientAddressData }),
        house: getHouseOrStead({ address: clientAddressData, withType: true }),
        frame: joinToString([clientAddressData.BuildingType, clientAddressData.BuildingName]),
        flat: clientAddressData.Flat || undefined
      }
    }
  }
}

/**
 * Заявление на актуализацию регистрационных данных абонента (AppSeller)
 */
export function * createRequestBodyCorrectRfaApplication ({ code, isArchive }) {
  const { documentData } = yield select(selectCorrectionData)
  const { BillingBranchId, Msisdn } = yield select(selectPersonalAccount)
  const { DisplayName: sellerName, officeId, userId: appSellerUserId } = yield select(getUserState)
  const activeSalesOffice = yield select(selectActiveSalesOffice)

  let docType
  if (featureConfig.isUseRemoteDocumentIdentity) {
    const documentType = yield select(selectDocumentTypeCorrectionData)
    docType = documentType.name
  } else {
    const documentType = yield call(getIdentityDocumentInfoById, documentData[FORM_FIELDS.DOCUMENT_TYPE])
    docType = documentType.ruTitle
  }

  return {
    typeId: 9,
    format: 'PDF',
    isArchive,
    data: {
      branchId: BillingBranchId,
      signDate: moment().format('YYYY-MM-DD'),
      appSellerUserId,
      dsKey: code || undefined,
      subscriberInformation: {
        msisdn: Msisdn,
        name: joinToString([
          documentData[FORM_FIELDS.LAST_NAME],
          documentData[FORM_FIELDS.FIRST_NAME],
          documentData[FORM_FIELDS.MIDDLE_NAME]
        ]),
        citizenship: documentData[FORM_FIELDS.CITIZENSHIP],
        birthDate: formatRequestDate(documentData[FORM_FIELDS.BIRTH_DATE]),
        birthPlace: documentData[FORM_FIELDS.BIRTH_PLACE],
        docType,
        docSeries: documentData[FORM_FIELDS.DOCUMENT_SERIES],
        docNumber: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
        issueDate: formatRequestDate(documentData[FORM_FIELDS.DOCUMENT_DATE]),
        issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
        migrationCardNumber: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        stayFromInRussia: documentData[FORM_FIELDS.ARRIVING_DATE],
        stayToInRussia: documentData[FORM_FIELDS.DEPARTURE_DATE],
        gender: GenderValueDocumentOperations[documentData[FORM_FIELDS.SEX]],
        contactMsisdn: normalizeNumber(documentData[FORM_FIELDS.CONTACT_NUMBER], { fallback: undefined }),
        email: documentData[FORM_FIELDS.EMAIL],
        issueId: documentData[FORM_FIELDS.DOCUMENT_CODE],
        regAddress: documentData[FORM_FIELDS.REGISTRATION_ADDRESS],
        factAddress: documentData[FORM_FIELDS.REGISTRATION_ADDRESS]
      },
      companyInfo: {
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
        contractStartPlace: activeSalesOffice?.fullAddress,
        sellerName
      }
    }
  }
}

export function * createRequestBodyCorrectionData ({ isOnline }) {
  const { documentData } = yield select(selectCorrectionData)
  const { BillingBranchId: branchId, ClientId: clientId, Msisdn: msisdn } = yield select(selectPersonalAccount)
  const { Id: handlingId } = yield select(selectHandlingState)
  const commentary = yield select(
    featureConfig.isUseRemoteSigning
      ? selectorsSigningRemote.selectCommentary
      : selectCommentary
  )
  const isFromMarkers = yield select(selectIsFromMarkersCorrectionData)

  const firstName = documentData[FORM_FIELDS.FIRST_NAME]
  const lastName = documentData[FORM_FIELDS.LAST_NAME]
  const middleName = documentData[FORM_FIELDS.MIDDLE_NAME]
  const dateOfBirth = formatRequestDate(documentData[FORM_FIELDS.BIRTH_DATE])
  const birthPlace = documentData[FORM_FIELDS.BIRTH_PLACE]
  const citizenship = documentData[FORM_FIELDS.CITIZENSHIP]
  const documentTypeId = documentData[FORM_FIELDS.DOCUMENT_TYPE]
  const documentSeries = documentData[FORM_FIELDS.DOCUMENT_SERIES]
  const documentNumber = documentData[FORM_FIELDS.DOCUMENT_NUMBER]
  const documentIssuedDate = formatRequestDate(documentData[FORM_FIELDS.DOCUMENT_DATE])
  const documentIssuedBy = documentData[FORM_FIELDS.DOCUMENT_ADDRESS]
  const documentCode = documentData[FORM_FIELDS.DOCUMENT_CODE]
  const registrationAddress = documentData[FORM_FIELDS.REGISTRATION_ADDRESS]

  let clientAddressData
  if (featureConfig.isUseRemoteDocumentIdentity) {
    clientAddressData = yield select(selectRegistrationAddressCorrectionData)
  } else {
    const { foundAddresses } = yield select(selectSaleSim)
    clientAddressData = getAddressData(foundAddresses, registrationAddress).SearchAccuracy
  }

  const birthFullInfo = joinToString(
    [
      createStringFromDate(documentData[FORM_FIELDS.BIRTH_DATE], DateFormat.VIEW_DATE),
      documentData[FORM_FIELDS.BIRTH_PLACE]
    ],
    '; '
  )

  let docName
  if (featureConfig.isUseRemoteDocumentIdentity) {
    const documentType = yield select(selectDocumentTypeCorrectionData)
    docName = documentType.name
  } else {
    const documentType = yield call(getIdentityDocumentInfoById, documentData[FORM_FIELDS.DOCUMENT_TYPE])
    docName = documentType.ruTitle
  }
  const identityDocumentFullInfo = joinToString(
    [
      docName,
      joinToString([documentData[FORM_FIELDS.DOCUMENT_SERIES], documentData[FORM_FIELDS.DOCUMENT_NUMBER]], ' '),
      documentData[FORM_FIELDS.DOCUMENT_CODE],
      documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
      createStringFromDate(documentData[FORM_FIELDS.DOCUMENT_DATE], DateFormat.VIEW_DATE)
    ],
    ';'
  )

  return {
    msisdn,
    branchId,
    clientId,
    name: firstName,
    surname: lastName,
    patronymic: middleName,
    phone: documentData[FORM_FIELDS.CONTACT_NUMBER],
    email: documentData[FORM_FIELDS.EMAIL],
    gender: documentData[FORM_FIELDS.SEX],
    dateOfBirth,
    birthPlace,
    citizenship,
    document: {
      typeId: documentTypeId,
      series: documentSeries,
      number: documentNumber,
      issuedDate: documentIssuedDate,
      issuedBy: documentIssuedBy,
      issueId: documentCode
    },
    migrationCard: documentData[FORM_FIELDS.APPROVED_STAYING_DOCUMENT]
      ? {
        name: documentData[FORM_FIELDS.APPROVED_STAYING_DOCUMENT],
        number: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        dateFrom: createStringFromDate(documentData[FORM_FIELDS.ARRIVING_DATE]),
        dateUntil: createStringFromDate(documentData[FORM_FIELDS.DEPARTURE_DATE])
      }
      : undefined,
    locationAddress: {
      index: clientAddressData.PostIndex || undefined,
      city: clientAddressData.City || undefined,
      street: getStreetOrLocality({ address: clientAddressData }),
      house: getHouseOrStead({ address: clientAddressData }),
      flat: joinToString([clientAddressData.FlatType, clientAddressData.Flat], ' '),
      building: joinToString([clientAddressData.BuildingType, clientAddressData.BuildingName], ' '),
      region: getRegionWithDistrict({ address: clientAddressData, withType: true }),
      locality: joinToString([clientAddressData.LocalityType, clientAddressData.Locality], ' ')
    },
    isOnline,
    bpmSetting: !isOnline
      ? {
        reasonId: 1300,
        handlingId,
        techServiceId: '55274371-06FA-4536-BBE3-20E23D68FE0C',
        bpmParams: [
          {
            key: '5F9D5C3A-4BB3-4FFC-B5A4-A514D4FEE38C',
            value: msisdn
          },
          {
            key: '3CF9DB1B-5D37-4538-9052-BF6ABDBAE4F4',
            value: joinToString([lastName, firstName, middleName])
          },
          {
            key: '92285845-50FE-4947-818C-2A095D628F3B',
            value: birthFullInfo
          },
          {
            key: '346D89B2-61C0-4421-86AE-8B6907A19F7A',
            value: identityDocumentFullInfo
          },
          {
            key: 'FB68193F-D586-4954-AFB8-4EA0A28C47A6',
            value: registrationAddress
          }
        ]
      }
      : {
        handlingId
      },
    commentary: !isOnline ? commentary || undefined : undefined,
    isFromMarkers
  }
}

export function * createRequestParamsCreateInteraction () {
  const { Id: handlingId } = yield select(selectHandlingState)
  const {
    BillingBranchId: clientBranchId,
    Msisdn: msisdn,
    ClientId: clientId,
    SubscriberId: subscriberId,
    SubscriberFullInfo
  } = yield select(getPersonalAccountState)
  const signingType = yield select(
    featureConfig.isUseRemoteSigning
      ? selectorsSigningRemote.selectSigningType
      : selectSigningType
  )
  const isFromMarkers = yield select(selectIsFromMarkersCorrectionData)

  const isPep = signingType === SigningType.SMS_CODE
  const isPaperDocumentsSigning = signingType === SigningType.PAPER_DOCUMENTS

  const commentText = createCommentForInteraction({ isFromMarkers, isPep })

  return {
    categoryId: 0,
    clientBranchId,
    clientId,
    subscriberBranchId: SubscriberFullInfo?.SubscriberClientInfo?.BillingBranchId,
    subscriberId,
    commentText,
    handlingId,
    msisdn,
    reasonId: isPaperDocumentsSigning ? 1300 : 590,
    registeringCaseId: 7
  }
}

export const isPersonalDataMatchesWithBillingData = ({ personalData, subscriberData, keys, minMatchesCount }) => {
  const matches = keys.reduce((acc, key) => {
    if (subscriberData[key] && personalData[key] === subscriberData[key]) acc++
    return acc
  }, 0)

  return matches >= minMatchesCount
}

export function * checkPersonalDataWithBillingData () {
  const personalData = yield select(selectPersonalDataCorrectionData)
  const { SubscriberName: subscriberData = {} } = yield select(selectPersonalAccount)
  const { BirthDate: subscriberBirthDate } = (yield select(selectMnpMarkers)) || {}
  const { BirthDate } = personalData

  const formattedBirthDate = BirthDate && formatDate(BirthDate)
  const formattedSubscriberBirthDate = subscriberBirthDate && formatDate(subscriberBirthDate)

  const isMatches = isPersonalDataMatchesWithBillingData({
    personalData: { ...personalData, BirthDate: formattedBirthDate },
    subscriberData: { ...subscriberData, BirthDate: formattedSubscriberBirthDate },
    keys: ['Name', 'Surname', 'Patronymic', 'BirthDate'],
    minMatchesCount: 3
  })

  if (!isMatches) yield put(setOnlyPaperDocumentsScenario())
}
