import { select, call } from 'redux-saga/effects'
import * as moment from 'moment'

import api from 'utils/api'
import { getPersonalAccountState, getUserState } from 'selectors/index'
import { createCommentForInteraction, mapAgreementsRequest } from 'webseller/helpers/api'
import { selectIsFromMarkersDuplicateRfa, selectPersonalDataDuplicateRfa } from '../selectors'
import { selectHandlingState } from 'reducers/internal/selectors'
import { DateFormat } from 'webseller/constants'
import { FORM_FIELDS } from 'webseller/constants/form'
import { createStringFromDate, joinToString } from 'webseller/helpers'
import { selectSaleSim } from 'reducers/saleSim/selectors'
import { getAddressData } from 'sagas/saleSim/helpers'
import { selectAgreements } from 'webseller/common/agreements/selectors'
import { AgreementKey } from 'webseller/common/agreements/helpers'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { selectSigningType } from 'webseller/common/signing/selectors'
import { SigningType } from 'webseller/common/signing/helpers'
import { GenderValueDocumentOperations } from 'webseller/helpers/operations'
import { getIdentityDocumentInfoById } from 'webseller/common/personalData/saga/helpers'
import {
  getCityWithLocality,
  getHouseOrStead,
  getRegionWithDistrict,
  getStreetOrLocality
} from 'webseller/helpers/daData'

const DOCUMENT_TYPE_IDS_MAP = {
  1: 'Договор об оказании услуг связи'
}

export function * preflightGetPaperDocuments () {
  const { fetchCreateDocument } = api

  const { Id: handlingId } = yield select(selectHandlingState)
  const body = yield call(createRequestBodyRfaDocument, { isArchive: false })

  return [
    {
      title: DOCUMENT_TYPE_IDS_MAP[1],
      request: fetchCreateDocument,
      params: [handlingId, body]
    }
  ]
}

export function * createRequestBodyRfaDocument ({ isArchive, pepCode }) {
  const { DisplayName: sellerName, userId: appSellerUserId, officeId } = yield select(getUserState)
  const { BillingBranchId: branchId, Msisdn: msisdn, SubscriberFullInfo } = yield select(getPersonalAccountState)
  const personalData = yield select(selectPersonalDataDuplicateRfa)
  const rawAgreements = yield select(selectAgreements)
  const activeSalesOffice = yield select(selectActiveSalesOffice)

  // TODO refactor ДУЛ
  const { foundAddresses } = yield select(selectSaleSim)
  const { SearchAccuracy: clientAddressData } = getAddressData(
    foundAddresses,
    personalData[FORM_FIELDS.REGISTRATION_ADDRESS]
  )

  const agreements = yield call(mapAgreementsRequest, rawAgreements)

  const { docOutType } = yield call(getIdentityDocumentInfoById, personalData[FORM_FIELDS.DOCUMENT_TYPE])

  return {
    typeId: 1,
    isArchive,
    data: {
      appSellerUserId,
      duplicate: true,
      subscriberInformation: {
        firstName: personalData[FORM_FIELDS.FIRST_NAME],
        lastName: personalData[FORM_FIELDS.LAST_NAME],
        middleName: personalData[FORM_FIELDS.MIDDLE_NAME],
        nationality: personalData[FORM_FIELDS.CITIZENSHIP],
        birthDate: createStringFromDate(
          personalData[FORM_FIELDS.BIRTH_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        birthPlace: personalData[FORM_FIELDS.BIRTH_PLACE],
        address: {
          zipCode: clientAddressData.PostIndex || undefined,
          city: getCityWithLocality({ address: clientAddressData }),
          street: clientAddressData.StreetWithType || getStreetOrLocality({ address: clientAddressData }),
          house: getHouseOrStead({ address: clientAddressData, withType: true }),
          flat: clientAddressData.Flat || undefined,
          frame: joinToString([clientAddressData.BuildingType, clientAddressData.BuildingName], ' ') || undefined,
          region: getRegionWithDistrict({ address: clientAddressData, withType: true })
        },
        documentType: docOutType,
        series: personalData[FORM_FIELDS.DOCUMENT_SERIES],
        number: personalData[FORM_FIELDS.DOCUMENT_NUMBER],
        issueDate: createStringFromDate(
          personalData[FORM_FIELDS.DOCUMENT_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        issueId: personalData[FORM_FIELDS.DOCUMENT_CODE],
        issuedBy: personalData[FORM_FIELDS.DOCUMENT_ADDRESS],
        gender: GenderValueDocumentOperations[personalData[FORM_FIELDS.SEX]],
        contactPhone: personalData[FORM_FIELDS.CONTACT_NUMBER],
        email: personalData[FORM_FIELDS.EMAIL],
        migrationCardNumber: personalData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        stayFromInRussia: personalData[FORM_FIELDS.ARRIVING_DATE],
        stayToInRussia: personalData[FORM_FIELDS.DEPARTURE_DATE]

      },
      requestCompanyInfo: {
        sellerName,
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
        contractStartPlace: activeSalesOffice?.fullAddress
      },
      branchId,
      msisdn,
      dsKey: pepCode,
      identificationModuleNumder: SubscriberFullInfo?.USIProfile?.Iccid,
      tariffPlan: SubscriberFullInfo?.SubscriberInfo?.RateName,
      notThirdHandTransfer: agreements[AgreementKey.isPersonalDataDelegation],
      informationBan: agreements[AgreementKey.isAgreeUseSubscriberInfo],
      advertisementBan: agreements[AgreementKey.isRefuseSmsAdvertising],
      notAcceptDs: agreements[AgreementKey.isNotAcceptDs],
      notTariffSms: agreements[AgreementKey.isNotTariffSms],
      dsSignDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY),
      contractStartDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY)
    }
  }
}

export function * createRequestBodyExecuteOperation () {
  const {
    BillingBranchId: branchId,
    Msisdn: msisdn,
    ClientId: clientId,
    SubscriberFullInfo
  } = yield select(getPersonalAccountState)
  const activeSalesOffice = yield select(selectActiveSalesOffice)
  const { officeId } = yield select(getUserState)
  const { Id: handlingId } = yield select(selectHandlingState)
  const personalData = yield select(selectPersonalDataDuplicateRfa)
  const signingType = yield select(selectSigningType)
  const rawAgreements = yield select(selectAgreements)
  const isFromMarkers = yield select(selectIsFromMarkersDuplicateRfa)

  // TODO refactor ДУЛ
  const { foundAddresses } = yield select(selectSaleSim)
  const { SearchAccuracy: clientAddressData } = getAddressData(
    foundAddresses,
    personalData[FORM_FIELDS.REGISTRATION_ADDRESS]
  )

  const agreements = yield call(mapAgreementsRequest, rawAgreements)

  return {
    msisdn,
    branchId,
    clientId,
    contract: {
      signDate: SubscriberFullInfo?.SubscriberInfo?.ActivationDate
        ? moment(SubscriberFullInfo?.SubscriberInfo?.ActivationDate, 'DD.MM.YYYY').format('YYYY-MM-DD')
        : undefined
    },
    officeId: activeSalesOffice?.salesOfficeId || officeId,
    name: personalData[FORM_FIELDS.FIRST_NAME],
    surname: personalData[FORM_FIELDS.LAST_NAME],
    patronymic: personalData[FORM_FIELDS.MIDDLE_NAME],
    phone: personalData[FORM_FIELDS.CONTACT_NUMBER],
    email: personalData[FORM_FIELDS.EMAIL],
    document: {
      typeId: personalData[FORM_FIELDS.DOCUMENT_TYPE],
      series: personalData[FORM_FIELDS.DOCUMENT_SERIES],
      number: personalData[FORM_FIELDS.DOCUMENT_NUMBER],
      issuedDate: createStringFromDate(personalData[FORM_FIELDS.DOCUMENT_DATE]),
      issuedBy: personalData[FORM_FIELDS.DOCUMENT_ADDRESS],
      issuedId: personalData[FORM_FIELDS.DOCUMENT_CODE]
    },
    gender: personalData[FORM_FIELDS.SEX],
    dateOfBirth: createStringFromDate(personalData[FORM_FIELDS.BIRTH_DATE]),
    birthPlace: personalData[FORM_FIELDS.BIRTH_PLACE],
    citizenship: personalData[FORM_FIELDS.CITIZENSHIP],
    migrationCard: personalData[FORM_FIELDS.MIGRATION_CARD_NUMBER]
      ? {
        name: personalData[FORM_FIELDS.APPROVED_STAYING_DOCUMENT],
        number: personalData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        dateFrom: createStringFromDate(personalData[FORM_FIELDS.ARRIVING_DATE]),
        dateUntil: createStringFromDate(personalData[FORM_FIELDS.DEPARTURE_DATE])
      }
      : undefined,
    locationAddress: {
      index: clientAddressData.PostIndex || undefined,
      city: joinToString(
        [
          joinToString([clientAddressData.City, clientAddressData.CityType]),
          getRegionWithDistrict({ address: clientAddressData, withType: true })
        ],
        ', '
      ),
      street: getStreetOrLocality({ address: clientAddressData, withType: true }),
      house: joinToString(
        [
          getHouseOrStead({ address: clientAddressData, withType: true }),
          joinToString([clientAddressData.BlockType, clientAddressData.Block]),
          joinToString([clientAddressData.FlatType, clientAddressData.Flat])
        ],
        ', '
      )
    },
    agreements: {
      isPersonalDataDelegation: agreements[AgreementKey.isPersonalDataDelegation],
      isRefuseSmsAdvertising: agreements[AgreementKey.isRefuseSmsAdvertising],
      isAgreeUseSubscriberInfo: agreements[AgreementKey.isAgreeUseSubscriberInfo],
      isNotAcceptDs: agreements[AgreementKey.isNotAcceptDs],
      isNotTariffSms: agreements[AgreementKey.isNotTariffSms]
    },
    isOnline: signingType === SigningType.SMS_CODE,
    handlingId,
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
  const signingType = yield select(selectSigningType)
  const isFromMarkers = yield select(selectIsFromMarkersDuplicateRfa)

  const isPep = signingType === SigningType.SMS_CODE

  // TODO получать из конфига
  const isProd =
    !window.origin.includes('test') &&
    !window.origin.includes('stage') &&
    !window.origin.includes('dev') &&
    !window.origin.includes('localhost')

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
    reasonId: isProd ? 1543 : 10323,
    registeringCaseId: 7
  }
}
