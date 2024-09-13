import * as moment from 'moment'
import { call, select } from 'redux-saga/effects'
import { getAddressData } from 'sagas/saleSim/helpers'
import { getPersonalAccountState, getUserState } from 'selectors/index'
import { DateFormat } from 'webseller/constants'
import { FORM_FIELDS } from 'webseller/constants/form'
import { RecreateClientType } from 'webseller/features/recreateClient/helpers'
import {
  selectRecreateClientReceivingParty,
  selectRecreateClientTransmittingParty,
  selectRecreateClientType
} from 'webseller/features/recreateClient/selectors'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { selectAgreements } from 'webseller/common/agreements/selectors'
import { AgreementKey } from 'webseller/common/agreements/helpers'
import { GenderValueDocumentOperations } from 'webseller/helpers/operations'
import { createStringFromDate, joinToString } from 'webseller/helpers'
import { selectHandlingState } from 'reducers/internal/selectors'
import { getIdentityDocumentInfoById } from 'webseller/common/personalData/saga/helpers'
import { getCityWithLocality, getHouseOrStead, getRegionWithDistrict, getStreetOrLocality } from 'webseller/helpers/daData'
import { selectPhoneNumberCode, selectPhoneNumberDiscountPrice } from 'webseller/integration/phoneNumberCategory/selectors'

/**
 * Соглашение об уступке прав и обязанностей по договору
 */
export function * createAgreementTransferResponsibilitiesDocumentRequestData () {
  const { Msisdn: customerMsisdn, BillingBranchId: branchId } = yield select(getPersonalAccountState)
  const { DisplayName: sellerName, officeId, userId: appSellerUserId } = yield select(getUserState)
  const transmittingPartyData = yield select(selectRecreateClientTransmittingParty)
  const receivingPartyData = yield select(selectRecreateClientReceivingParty)
  const activeSalesOffice = yield select(selectActiveSalesOffice)

  const transmittingPartyIdentityDocument = yield call(
    getIdentityDocumentInfoById,
    transmittingPartyData[FORM_FIELDS.DOCUMENT_TYPE]
  )
  const receivingPartyIdentityDocument = yield call(
    getIdentityDocumentInfoById,
    receivingPartyData[FORM_FIELDS.DOCUMENT_TYPE]
  )

  return {
    typeId: 7,
    data: {
      appSellerUserId,
      showGenerateInAppSeller: false,
      branchId,
      transmittingParty: {
        msisdn: customerMsisdn,
        name: joinToString([
          transmittingPartyData[FORM_FIELDS.LAST_NAME],
          transmittingPartyData[FORM_FIELDS.FIRST_NAME],
          transmittingPartyData[FORM_FIELDS.MIDDLE_NAME]
        ]),
        birthDate: createStringFromDate(
          transmittingPartyData[FORM_FIELDS.BIRTH_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        citizenship: transmittingPartyData[FORM_FIELDS.CITIZENSHIP],
        docType: transmittingPartyIdentityDocument.docOutType,
        docSeries: Number(transmittingPartyData[FORM_FIELDS.DOCUMENT_SERIES]),
        docNumber: Number(transmittingPartyData[FORM_FIELDS.DOCUMENT_NUMBER]),
        issueDate: createStringFromDate(
          transmittingPartyData[FORM_FIELDS.DOCUMENT_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        issueId: transmittingPartyData[FORM_FIELDS.DOCUMENT_CODE],
        issuedBy: transmittingPartyData[FORM_FIELDS.DOCUMENT_ADDRESS],
        regAddress: transmittingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS]
      },
      receivingParty: {
        msisdn: receivingPartyData[FORM_FIELDS.CONTACT_NUMBER],
        name: joinToString([
          receivingPartyData[FORM_FIELDS.LAST_NAME],
          receivingPartyData[FORM_FIELDS.FIRST_NAME],
          receivingPartyData[FORM_FIELDS.MIDDLE_NAME]
        ]),
        citizenship: receivingPartyData[FORM_FIELDS.CITIZENSHIP],
        birthDate: createStringFromDate(
          receivingPartyData[FORM_FIELDS.BIRTH_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        birthPlace: receivingPartyData[FORM_FIELDS.BIRTH_PLACE],
        docType: receivingPartyIdentityDocument.docOutType,
        docSeries: Number(receivingPartyData[FORM_FIELDS.DOCUMENT_SERIES]),
        docNumber: Number(receivingPartyData[FORM_FIELDS.DOCUMENT_NUMBER]),
        issueDate: createStringFromDate(
          receivingPartyData[FORM_FIELDS.DOCUMENT_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        issueId: receivingPartyData[FORM_FIELDS.DOCUMENT_CODE],
        issuedBy: receivingPartyData[FORM_FIELDS.DOCUMENT_ADDRESS],
        regAddress: receivingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS],
        address: receivingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS],
        email: receivingPartyData[FORM_FIELDS.EMAIL]
      },
      companyInfo: {
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
        contractStartPlace: activeSalesOffice?.fullAddress,
        sellerName
      },
      signDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY)
    }
  }
}

/**
 * Договор об оказании услуг связи
 */
export function * createRfaDocumentRequestData () {
  const {
    Msisdn: customerMsisdn,
    BillingBranchId: branchId,
    SubscriberFullInfo
  } = yield select(getPersonalAccountState)
  const { userId: appSellerUserId, DisplayName: sellerName, officeId } = yield select(getUserState)
  const receivingPartyData = yield select(selectRecreateClientReceivingParty)
  const agreements = yield select(selectAgreements)
  const activeSalesOffice = yield select(selectActiveSalesOffice)
  // TODO refactor
  const subscriberFoundAddresses = yield select(state => state.saleSim.foundAddresses)

  const { SearchAccuracy: subscriberAddress } = getAddressData(
    subscriberFoundAddresses,
    receivingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS]
  )

  const { docOutType } = yield call(getIdentityDocumentInfoById, receivingPartyData[FORM_FIELDS.DOCUMENT_TYPE])

  return {
    typeId: 1,
    data: {
      branchId,
      appSellerUserId,
      msisdn: customerMsisdn,
      identificationModuleNumder: SubscriberFullInfo?.USIProfile?.Iccid,
      tariffPlan: SubscriberFullInfo.SubscriberInfo.RateName,
      notThirdHandTransfer: agreements[AgreementKey.isPersonalDataDelegation],
      advertisementBan: agreements[AgreementKey.isRefuseSmsAdvertising],
      informationBan: agreements[AgreementKey.isAgreeUseSubscriberInfo],
      notAcceptDs: agreements[AgreementKey.isNotAcceptDs],
      notTariffSms: agreements[AgreementKey.isNotTariffSms],
      dsSignDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY),
      contractStartDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY),
      subscriberInformation: {
        firstName: receivingPartyData[FORM_FIELDS.FIRST_NAME],
        lastName: receivingPartyData[FORM_FIELDS.LAST_NAME],
        middleName: receivingPartyData[FORM_FIELDS.MIDDLE_NAME],
        nationality: receivingPartyData[FORM_FIELDS.CITIZENSHIP],
        birthDate: createStringFromDate(
          receivingPartyData[FORM_FIELDS.BIRTH_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        birthPlace: receivingPartyData[FORM_FIELDS.BIRTH_PLACE],
        documentType: docOutType,
        series: receivingPartyData[FORM_FIELDS.DOCUMENT_SERIES],
        number: receivingPartyData[FORM_FIELDS.DOCUMENT_NUMBER],
        issueDate: createStringFromDate(
          receivingPartyData[FORM_FIELDS.DOCUMENT_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        issueId: receivingPartyData[FORM_FIELDS.DOCUMENT_CODE],
        issuedBy: receivingPartyData[FORM_FIELDS.DOCUMENT_ADDRESS],
        migrationCardNumber: receivingPartyData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        stayFromInRussia: receivingPartyData[FORM_FIELDS.ARRIVING_DATE],
        stayToInRussia: receivingPartyData[FORM_FIELDS.DEPARTURE_DATE],
        gender: GenderValueDocumentOperations[receivingPartyData[FORM_FIELDS.SEX]],
        contactPhone: receivingPartyData[FORM_FIELDS.CONTACT_NUMBER],
        email: receivingPartyData[FORM_FIELDS.EMAIL],
        address: {
          zipCode: subscriberAddress.PostIndex || undefined,
          city: getCityWithLocality({ address: subscriberAddress }),
          street: subscriberAddress.StreetWithType || getStreetOrLocality({ address: subscriberAddress }),
          house: getHouseOrStead({ address: subscriberAddress, withType: true }),
          flat: subscriberAddress.Flat || undefined,
          region: getRegionWithDistrict({ address: subscriberAddress, withType: true })
        }
      },
      requestCompanyInfo: {
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
        contractStartPlace: activeSalesOffice?.fullAddress,
        sellerName
      }
    }
  }
}

/**
 * Заявление на переоформление абонентского номера
 */
export function * createApplicationReissueNumberDocumentRequestData () {
  const { Msisdn: customerMsisdn, BillingBranchId: branchId } = yield select(getPersonalAccountState)
  const { userId: appSellerUserId, DisplayName: sellerName, officeId } = yield select(getUserState)
  const transmittingPartyData = yield select(selectRecreateClientTransmittingParty)
  const receivingPartyData = yield select(selectRecreateClientReceivingParty)
  const activeSalesOffice = yield select(selectActiveSalesOffice)

  const transmittingPartyIdentityDocument = yield call(
    getIdentityDocumentInfoById,
    transmittingPartyData[FORM_FIELDS.DOCUMENT_TYPE]
  )
  const receivingPartyIdentityDocument = yield call(
    getIdentityDocumentInfoById,
    receivingPartyData[FORM_FIELDS.DOCUMENT_TYPE]
  )

  return {
    typeId: 8,
    data: {
      branchId,
      appSellerUserId,
      transmittingParty: {
        msisdn: customerMsisdn,
        name: joinToString([
          transmittingPartyData[FORM_FIELDS.LAST_NAME],
          transmittingPartyData[FORM_FIELDS.FIRST_NAME],
          transmittingPartyData[FORM_FIELDS.MIDDLE_NAME]
        ]),
        birthDate: createStringFromDate(
          transmittingPartyData[FORM_FIELDS.BIRTH_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        citizenship: transmittingPartyData[FORM_FIELDS.CITIZENSHIP],
        docType: transmittingPartyIdentityDocument.ruTitle,
        docSeries: transmittingPartyData[FORM_FIELDS.DOCUMENT_SERIES],
        docNumber: transmittingPartyData[FORM_FIELDS.DOCUMENT_NUMBER],
        issueDate: createStringFromDate(
          transmittingPartyData[FORM_FIELDS.DOCUMENT_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        issueId: transmittingPartyData[FORM_FIELDS.DOCUMENT_CODE],
        issuedBy: transmittingPartyData[FORM_FIELDS.DOCUMENT_ADDRESS],
        regAddress: transmittingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS]
      },
      receivingParty: {
        msisdn: receivingPartyData[FORM_FIELDS.CONTACT_NUMBER],
        name: joinToString([
          receivingPartyData[FORM_FIELDS.LAST_NAME],
          receivingPartyData[FORM_FIELDS.FIRST_NAME],
          receivingPartyData[FORM_FIELDS.MIDDLE_NAME]
        ]),
        citizenship: receivingPartyData[FORM_FIELDS.CITIZENSHIP],
        birthDate: createStringFromDate(
          receivingPartyData[FORM_FIELDS.BIRTH_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        birthPlace: receivingPartyData[FORM_FIELDS.BIRTH_PLACE],
        docType: receivingPartyIdentityDocument.ruTitle,
        docSeries: receivingPartyData[FORM_FIELDS.DOCUMENT_SERIES],
        docNumber: receivingPartyData[FORM_FIELDS.DOCUMENT_NUMBER],
        issueDate: createStringFromDate(
          receivingPartyData[FORM_FIELDS.DOCUMENT_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        issueId: receivingPartyData[FORM_FIELDS.DOCUMENT_CODE],
        issuedBy: receivingPartyData[FORM_FIELDS.DOCUMENT_ADDRESS],
        regAddress: receivingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS],
        address: receivingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS],
        email: receivingPartyData[FORM_FIELDS.EMAIL]
      },
      companyInfo: {
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
        contractStartPlace: activeSalesOffice?.fullAddress,
        sellerName
      },
      signDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY)
    }
  }
}

/**
 * Заявление на подключение городского номера
 */
export function * createAdditionalNumberDocumentRequestData () {
  const { BillingBranchId: branchId, SubscriberFullInfo } = yield select(getPersonalAccountState)
  const { userId: appSellerUserId, DisplayName: sellerName, officeId } = yield select(getUserState)
  const receivingPartyData = yield select(selectRecreateClientReceivingParty)
  const activeSalesOffice = yield select(selectActiveSalesOffice)

  const { ruTitle: identityDocumentTitle } = yield call(
    getIdentityDocumentInfoById,
    receivingPartyData[FORM_FIELDS.DOCUMENT_TYPE]
  )

  const msisdnAdditional = SubscriberFullInfo?.SubscriberInfo?.CityPhone
  const msisdnType = 'ORDINARY'

  return {
    typeId: 11,
    data: {
      branchId,
      appSellerUserId,
      subscriberInformation: {
        msisdn: receivingPartyData[FORM_FIELDS.CONTACT_NUMBER],
        msisdnAdditional,
        msisdnType,
        name: joinToString([
          receivingPartyData[FORM_FIELDS.LAST_NAME],
          receivingPartyData[FORM_FIELDS.FIRST_NAME],
          receivingPartyData[FORM_FIELDS.MIDDLE_NAME]
        ]),
        docType: identityDocumentTitle,
        docSeries: receivingPartyData[FORM_FIELDS.DOCUMENT_SERIES],
        docNumber: receivingPartyData[FORM_FIELDS.DOCUMENT_NUMBER]
      },
      companyInfo: {
        sellerName,
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
        contractStartPlace: activeSalesOffice?.fullAddress
      },
      signDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY)
    }
  }
}

/**
 * Соглашение на оказание услуги "Красивый номер"
 */
export function * createAgreementBeautifulNumberDocumentRequestData () {
  const { Id: handlingId } = yield select(selectHandlingState)
  const { BillingBranchId: branchId, Msisdn: msisdn } = yield select(getPersonalAccountState)
  const { DisplayName: sellerName, officeId } = yield select(getUserState)
  const activeSalesOffice = yield select(selectActiveSalesOffice)
  const receivingPartyData = yield select(selectRecreateClientReceivingParty)
  const msisdnType = yield select(selectPhoneNumberCode)
  const msisdnPrice = yield select(selectPhoneNumberDiscountPrice)

  const { docOutType: docType } = yield call(
    getIdentityDocumentInfoById,
    receivingPartyData[FORM_FIELDS.DOCUMENT_TYPE]
  )

  return {
    handlingId,
    typeId: 2,
    format: 'PDF',
    data: {
      branchId,
      signDate: moment().format(DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY),
      subscriberInfo: {
        name: joinToString([
          receivingPartyData[FORM_FIELDS.LAST_NAME],
          receivingPartyData[FORM_FIELDS.FIRST_NAME],
          receivingPartyData[FORM_FIELDS.MIDDLE_NAME]
        ]),
        docType,
        docSeries: receivingPartyData[FORM_FIELDS.DOCUMENT_SERIES],
        docNumber: receivingPartyData[FORM_FIELDS.DOCUMENT_NUMBER],
        issueDate: createStringFromDate(
          receivingPartyData[FORM_FIELDS.DOCUMENT_DATE],
          DateFormat.TRANSPORT_DATE_AND_TIME_SECONDARY
        ),
        issueCode: receivingPartyData[FORM_FIELDS.DOCUMENT_CODE],
        address: receivingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS],
        issuedBy: receivingPartyData[FORM_FIELDS.DOCUMENT_ADDRESS]
      },
      msisdnInfo: {
        msisdn,
        type: msisdnType,
        price: msisdnPrice
      },
      companyInfo: {
        sellerName,
        sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
        contractStartPlace: activeSalesOffice?.fullAddress
      }
    }
  }
}

export function * createRecreateClientRequestBody () {
  const { Id: handlingId } = yield select(selectHandlingState)
  const { Msisdn: customerMsisdn } = yield select(getPersonalAccountState)
  const recreateClientType = yield select(selectRecreateClientType)
  const receivingPartyData = yield select(selectRecreateClientReceivingParty)
  const agreements = yield select(selectAgreements)
  // TODO refactor
  const subscriberFoundAddresses = yield select(state => state.saleSim.foundAddresses)

  const { SearchAccuracy: subscriberAddress } = getAddressData(
    subscriberFoundAddresses,
    receivingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS]
  )

  const birthDate = createStringFromDate(receivingPartyData[FORM_FIELDS.BIRTH_DATE])

  const { ruTitle: docName } = yield call(getIdentityDocumentInfoById, receivingPartyData[FORM_FIELDS.DOCUMENT_TYPE])
  const documentSeries = receivingPartyData[FORM_FIELDS.DOCUMENT_SERIES]
  const documentNumber = receivingPartyData[FORM_FIELDS.DOCUMENT_NUMBER]
  const documentDate = createStringFromDate(receivingPartyData[FORM_FIELDS.DOCUMENT_DATE])

  const isOffline = recreateClientType === RecreateClientType.OFFLINE

  const fullName = joinToString(
    [
      receivingPartyData[FORM_FIELDS.LAST_NAME],
      receivingPartyData[FORM_FIELDS.FIRST_NAME],
      receivingPartyData[FORM_FIELDS.MIDDLE_NAME]
    ],
    ' '
  )
  const passportFullInfo = joinToString(
    [
      docName,
      joinToString([documentSeries, documentNumber], ' '),
      receivingPartyData[FORM_FIELDS.DOCUMENT_CODE],
      receivingPartyData[FORM_FIELDS.DOCUMENT_ADDRESS],
      createStringFromDate(receivingPartyData[FORM_FIELDS.DOCUMENT_DATE], DateFormat.VIEW_DATE)
    ],
    ';'
  )

  return {
    isOnline: !isOffline,
    client: {
      name: receivingPartyData[FORM_FIELDS.FIRST_NAME],
      surname: receivingPartyData[FORM_FIELDS.LAST_NAME],
      patronymic: receivingPartyData[FORM_FIELDS.MIDDLE_NAME],
      genderid: receivingPartyData[FORM_FIELDS.SEX],
      birthday: birthDate,
      birthPlace: receivingPartyData[FORM_FIELDS.BIRTH_PLACE],
      citizenship: receivingPartyData[FORM_FIELDS.CITIZENSHIP],
      address: {
        index: subscriberAddress.PostIndex,
        city: joinToString([
          getRegionWithDistrict({ address: subscriberAddress, withType: true }),
          getCityWithLocality({ address: subscriberAddress })
        ], ', '),
        street: subscriberAddress.StreetWithType,
        house: joinToString(
          [
            getHouseOrStead({ address: subscriberAddress, withType: true }),
            joinToString([subscriberAddress.BlockType, subscriberAddress.Block]),
            joinToString([subscriberAddress.FlatType, subscriberAddress.Flat])
          ],
          ', '
        )
      },
      phone: receivingPartyData[FORM_FIELDS.CONTACT_NUMBER],
      email: receivingPartyData[FORM_FIELDS.EMAIL]
    },
    bpmSetting: {
      reasonId: 1297,
      handlingId,
      techServiceId: '7DD05A8C-33CC-4DC7-BF97-A7F9338707E6'
    },
    params: [
      {
        key: '08C49AE0-A0A9-444A-84DD-D8F87B96BF48',
        value: customerMsisdn
      },
      {
        key: '0C1E6A60-0130-41BE-BF45-58D55D2E1F77',
        value: fullName
      },
      {
        key: '5C8B99AB-B6F1-4316-A293-3EAACA2F042D',
        value: Number(receivingPartyData[FORM_FIELDS.SEX]) === 1 ? 'Женский' : 'Мужской'
      },
      {
        key: '64604F44-47D9-480E-8679-6FC517B94E32',
        value: joinToString(
          [
            createStringFromDate(receivingPartyData[FORM_FIELDS.BIRTH_DATE], DateFormat.VIEW_DATE),
            receivingPartyData[FORM_FIELDS.BIRTH_PLACE]
          ],
          '; '
        )
      },
      {
        key: '346D89B2-61C0-4421-86AE-8B6907A19F7A',
        value: passportFullInfo
      },
      {
        key: '7F22126F-0103-4C0E-AB66-39BF12ECBA0D',
        value: receivingPartyData[FORM_FIELDS.REGISTRATION_ADDRESS]
      }
    ],
    document: {
      typeId: receivingPartyData[FORM_FIELDS.DOCUMENT_TYPE],
      series: documentSeries,
      number: documentNumber,
      issuedDate: documentDate,
      issuedBy: receivingPartyData[FORM_FIELDS.DOCUMENT_ADDRESS],
      issueId: receivingPartyData[FORM_FIELDS.DOCUMENT_CODE]
    },
    agreements: {
      isPersonalDataDelegation: agreements[AgreementKey.isPersonalDataDelegation],
      isAgreeUseSubscriberInfo: agreements[AgreementKey.isAgreeUseSubscriberInfo],
      isRefuseSmsAdvertising: agreements[AgreementKey.isRefuseSmsAdvertising],
      isNotTariffSms: agreements[AgreementKey.isNotTariffSms]
    },
    migrationCard: receivingPartyData[FORM_FIELDS.MIGRATION_CARD_NUMBER]
      ? {
        name: receivingPartyData[FORM_FIELDS.APPROVED_STAYING_DOCUMENT],
        number: receivingPartyData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        dateFrom: createStringFromDate(receivingPartyData[FORM_FIELDS.ARRIVING_DATE]),
        dateUntil: createStringFromDate(receivingPartyData[FORM_FIELDS.DEPARTURE_DATE])
      }
      : undefined
  }
}
