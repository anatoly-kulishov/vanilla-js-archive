import { select, call } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import * as moment from 'moment'

import {
  selectAddedSimsSaleSim,
  selectIsMnpOrderProcessTypeSaleSim,
  selectIsOrderProcessTypeSaleSim,
  selectOrderIdSaleSim,
  selectOrderMnpMsisdnSaleSim,
  selectOrderInfo,
  selectPersonalDataSaleSim,
  selectSaleSim,
  selectTransferDateSaleSim,
  selectTransferNumberSaleSim,
  selectUser
} from 'reducers/saleSim/selectors'
import { FORM_FIELDS } from 'webseller/constants/form'
import { NumbersCategorySlugId, isESim, SallingProcessTypes } from 'webseller/features/saleSim/helpers'
import {
  normalizeNumber,
  joinToString,
  createStringFromDate,
  createDateFromString,
  insertSymbol
} from 'webseller/helpers'
import {
  selectIsSigningSkipped,
  selectPepCode,
  selectSignedDocuments,
  selectSigningType
} from 'webseller/common/signing/selectors'
import { SigningType } from 'webseller/common/signing/helpers'
import { mapAgreementsRequest } from 'webseller/helpers/api'
import { selectAgreements } from 'webseller/common/agreements/selectors'
import {
  getCityWithLocality,
  getHouseOrStead,
  getRegionWithDistrict,
  getStreetOrLocality
} from 'webseller/helpers/daData'
import { getIdentityDocumentInfoById } from 'webseller/common/personalData/saga/helpers'
import { selectCheckIdCheckSmev } from 'reducers/checkSmev/selectors'
import createWebSocketWithAuth from 'webseller/helpers/api/createWebSocketWithAuth'
import BussinessLogicError from 'webseller/helpers/BussinessLogicError'
import { DateFormat } from 'webseller/constants'
import { formatDateWithFullTimeUtc } from 'utils/helpers'

export const getUpdatedNumbersList = (currentNumbersCategories, fetchedNumbersCategories) => {
  return currentNumbersCategories.map(category => {
    const newNumbersCategories = fetchedNumbersCategories.find(({ price, salePrice }) => {
      return price === category.price && salePrice === category.salePrice
    })

    return {
      ...category,
      numbersList: [...category.numbersList, ...(newNumbersCategories?.numbersList || [])]
    }
  })
}

export const getExistingPersonalDataByWs = ({ simSellId, sockets }) => {
  if (!simSellId) {
    const error = new BussinessLogicError('Отсутствует Id продажи')
    return Promise.reject(error)
  }

  return new Promise((resolve, reject) => {
    const socket = createWebSocketWithAuth(
      `${process.env.REACT_APP_APPSELLER_BACKEND_HOST_WS}/DocumentImagesService/api/v1/SimSell/${simSellId}/personalData`
    )

    if (sockets) {
      sockets.push(socket)
    }

    socket.onmessage = event => {
      const personalData = JSON.parse(event.data)
      resolve(personalData)
      socket.close()
    }

    socket.onerror = () => {
      const error = new BussinessLogicError('Ошибка при получении данных документа из AppSeller')
      reject(error)
    }
  })
}

export const mapResponseGetExistingPersonalData = rawPersonalData => {
  const clientInfo = rawPersonalData?.ClientInfo || {}
  const clientIdentityCard = rawPersonalData?.ClientIdentityCard || {}

  return {
    [FORM_FIELDS.FIRST_NAME]: clientInfo.Name,
    [FORM_FIELDS.LAST_NAME]: clientInfo.Surname,
    [FORM_FIELDS.MIDDLE_NAME]: clientInfo.Patronymic,
    [FORM_FIELDS.BIRTH_DATE]: createDateFromString(clientInfo.BirthDate, DateFormat.VIEW_DATE_DASH),
    [FORM_FIELDS.BIRTH_PLACE]: clientInfo.BirthPlace,
    [FORM_FIELDS.SEX]: String(clientInfo.GenderId),
    [FORM_FIELDS.DOCUMENT_SERIES]: clientIdentityCard.Series,
    [FORM_FIELDS.DOCUMENT_NUMBER]: clientIdentityCard.Number,
    [FORM_FIELDS.DOCUMENT_DATE]: createDateFromString(clientIdentityCard.IssuedDate, DateFormat.VIEW_DATE_DASH),
    [FORM_FIELDS.DOCUMENT_CODE]: insertSymbol(clientIdentityCard.IssuedCode, '-', 3),
    [FORM_FIELDS.DOCUMENT_ADDRESS]: clientIdentityCard.IssuedBy
  }
}

export const getAddressData = (addresses, fullAddress) =>
  addresses?.Data.DaData.find(foundAddress => fullAddress === foundAddress.SearchAccuracy.FullAddress) || {}

export const createClientAddressRequestData = (addresses, fullAddress) => {
  const { SearchAccuracy: addressRegistrationDaData } = getAddressData(addresses, fullAddress)
  const { BuildingType, BuildingName, StreetWithType, Street, Flat, PostIndex, Locality, LocalityType } =
    addressRegistrationDaData

  return {
    city: getCityWithLocality({ address: addressRegistrationDaData, withType: true }),
    frame: BuildingType && BuildingName ? `${BuildingType} ${BuildingName}` : undefined,
    house: getHouseOrStead({ address: addressRegistrationDaData, withType: true }),
    region: getRegionWithDistrict({ address: addressRegistrationDaData, withType: true }),
    street: StreetWithType || Street || undefined,
    flat: Flat || undefined,
    zipCode: PostIndex || undefined,
    locality: LocalityType && Locality ? `${LocalityType} ${Locality}` : undefined
  }
}

export function * createRequestBodyRegisterUntemplatedSim (sim) {
  const {
    sallingProcessType,
    foundAddresses,
    documentData,
    transferNumberOld,
    submittedTransferTimeSlot,
    sellAvailability
  } = yield select(selectSaleSim)
  const pepCode = yield select(selectPepCode)
  const signingType = yield select(selectSigningType)
  const isSigningSkipped = yield select(selectIsSigningSkipped)
  const smevCheckId = yield select(selectCheckIdCheckSmev)
  const isOrderProcess = yield select(selectIsOrderProcessTypeSaleSim)
  const isMnpOrderProcess = yield select(selectIsMnpOrderProcessTypeSaleSim)

  const { SearchAccuracy: clientAddressData } = getAddressData(
    foundAddresses,
    documentData[FORM_FIELDS.REGISTRATION_ADDRESS]
  )

  const agreements = yield select(selectAgreements)
  const isInformation = yield call(mapAgreementsRequest, agreements)

  const isTransferToTele2 = sallingProcessType === SallingProcessTypes.TRANSFER

  const { pcdbId } = yield call(getIdentityDocumentInfoById, documentData[FORM_FIELDS.DOCUMENT_TYPE])

  let eshopOrderId = sim.eShopOrderId
  if (isOrderProcess) {
    eshopOrderId = yield select(selectOrderIdSaleSim)
  }

  let mnpMsisdn
  let portingDate
  if (isMnpOrderProcess) {
    mnpMsisdn = yield select(selectOrderMnpMsisdnSaleSim)
    portingDate = submittedTransferTimeSlot
  }
  if (isTransferToTele2) {
    mnpMsisdn = transferNumberOld
    portingDate = submittedTransferTimeSlot
  }

  return {
    clientInfo: {
      firstName: documentData[FORM_FIELDS.FIRST_NAME],
      lastName: documentData[FORM_FIELDS.LAST_NAME],
      middleName: documentData[FORM_FIELDS.MIDDLE_NAME],
      birthDate: createStringFromDate(documentData[FORM_FIELDS.BIRTH_DATE]),
      birthPlace: documentData[FORM_FIELDS.BIRTH_PLACE],
      gender: documentData[FORM_FIELDS.SEX],
      contactPhone: normalizeNumber(documentData[FORM_FIELDS.CONTACT_NUMBER], {
        isNeedToSliceFirstDigit: true,
        fallback: undefined
      }),
      email: documentData[FORM_FIELDS.EMAIL],
      mnpMsisdn,
      portingDate
    },
    clientIdentityCard: {
      typeId: pcdbId,
      citizenship: documentData[FORM_FIELDS.CITIZENSHIP],
      series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
      number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
      issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
      issuedId: documentData[FORM_FIELDS.DOCUMENT_CODE],
      issuedDate: createStringFromDate(documentData[FORM_FIELDS.DOCUMENT_DATE])
    },
    clientAddress: {
      zipCode: clientAddressData.PostIndex || undefined,
      region: getRegionWithDistrict({ address: clientAddressData, withType: true }),
      city: getCityWithLocality({ address: clientAddressData }),
      street: clientAddressData.StreetWithType || getStreetOrLocality({ address: clientAddressData }),
      house: getHouseOrStead({ address: clientAddressData, withType: true }),
      building: joinToString([clientAddressData.BuildingType, clientAddressData.BuildingName]),
      flat: clientAddressData.Flat || undefined
    },
    isInformation,
    subscriberInfo: {
      icc: isESim(sim.simTypeId) ? undefined : sim.icc,
      msisdn: sim.msisdn,
      eshopOrderId
    },
    clientMigrationCard: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER]
      ? {
        name: documentData[FORM_FIELDS.APPROVED_STAYING_DOCUMENT],
        numberMigrationCard: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        validFrom: createStringFromDate(documentData[FORM_FIELDS.ARRIVING_DATE]),
        validUntil: createStringFromDate(documentData[FORM_FIELDS.DEPARTURE_DATE])
      }
      : undefined,
    requestUuid: uuid(),
    branchId: sellAvailability?.branchId,
    simTypeId: sim.simTypeId,
    simCardId: sim.simCardId,
    msisdnCategory: NumbersCategorySlugId[sim.numberSlug],
    msisdnPrice: sim.msisdnPrice,
    pepCode: isSigningSkipped || !pepCode ? undefined : pepCode,
    isPaperRfa: isSigningSkipped || signingType === SigningType.PAPER_DOCUMENTS,
    isPepConnectionDoc: signingType === SigningType.SMS_CODE,
    personalDataCheckId: smevCheckId || undefined
  }
}

export function * createRequestBodyRegisterTemplatedSim (sim) {
  const { foundAddresses, documentData } = yield select(selectSaleSim)
  const pepCode = yield select(selectPepCode)
  const signingType = yield select(selectSigningType)
  const isSigningSkipped = yield select(selectIsSigningSkipped)
  const smevCheckId = yield select(selectCheckIdCheckSmev)

  const { SearchAccuracy: clientAddressData } = getAddressData(
    foundAddresses,
    documentData[FORM_FIELDS.REGISTRATION_ADDRESS]
  )

  const agreements = yield select(selectAgreements)
  const isInformation = yield call(mapAgreementsRequest, agreements)

  const { pcdbId } = yield call(getIdentityDocumentInfoById, documentData[FORM_FIELDS.DOCUMENT_TYPE])

  return {
    clientInfo: {
      firstName: documentData[FORM_FIELDS.FIRST_NAME],
      lastName: documentData[FORM_FIELDS.LAST_NAME],
      middleName: documentData[FORM_FIELDS.MIDDLE_NAME],
      birthDate: createStringFromDate(documentData[FORM_FIELDS.BIRTH_DATE]),
      birthPlace: documentData[FORM_FIELDS.BIRTH_PLACE],
      gender: documentData[FORM_FIELDS.SEX],
      contactPhone: normalizeNumber(documentData[FORM_FIELDS.CONTACT_NUMBER], {
        isNeedToSliceFirstDigit: true,
        fallback: undefined
      }),
      email: documentData[FORM_FIELDS.EMAIL]
    },
    clientIdentityCard: {
      typeId: pcdbId,
      citizenship: documentData[FORM_FIELDS.CITIZENSHIP],
      series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
      number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
      issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
      issuedId: documentData[FORM_FIELDS.DOCUMENT_CODE],
      issuedDate: createStringFromDate(documentData[FORM_FIELDS.DOCUMENT_DATE])
    },
    clientAddress: {
      zipCode: clientAddressData.PostIndex || undefined,
      region: getRegionWithDistrict({ address: clientAddressData, withType: true }),
      city: getCityWithLocality({ address: clientAddressData }),
      street: clientAddressData.StreetWithType || getStreetOrLocality({ address: clientAddressData }),
      house: getHouseOrStead({ address: clientAddressData, withType: true }),
      building: joinToString([clientAddressData.BuildingType, clientAddressData.BuildingName]),
      flat: clientAddressData.Flat || undefined
    },
    isInformation,
    subscriberInfo: [
      {
        icc: isESim(sim.simTypeId) ? undefined : sim.icc,
        msisdn: sim.msisdn
      }
    ],
    clientMigrationCard: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER]
      ? {
        name: documentData[FORM_FIELDS.APPROVED_STAYING_DOCUMENT],
        numberMigrationCard: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        validFrom: createStringFromDate(documentData[FORM_FIELDS.ARRIVING_DATE]),
        validUntil: createStringFromDate(documentData[FORM_FIELDS.DEPARTURE_DATE])
      }
      : undefined,
    requestUuid: uuid(),
    pepCode: isSigningSkipped || !pepCode ? undefined : pepCode,
    isPaperRfa: isSigningSkipped || signingType === SigningType.PAPER_DOCUMENTS,
    isPepConnectionDoc: signingType === SigningType.SMS_CODE,
    personalDataCheckId: smevCheckId || undefined
  }
}

export function * createRequestBodyRegisterTemplatedSimMnp (sim) {
  const { foundAddresses, documentData, transferNumberOld, submittedTransferTimeSlot } = yield select(selectSaleSim)
  const pepCode = yield select(selectPepCode)
  const signingType = yield select(selectSigningType)
  const isSigningSkipped = yield select(selectIsSigningSkipped)
  const smevCheckId = yield select(selectCheckIdCheckSmev)

  const { SearchAccuracy: clientAddressData } = getAddressData(
    foundAddresses,
    documentData[FORM_FIELDS.REGISTRATION_ADDRESS]
  )

  const agreements = yield select(selectAgreements)
  const isInformation = yield call(mapAgreementsRequest, agreements)

  const { pcdbId } = yield call(getIdentityDocumentInfoById, documentData[FORM_FIELDS.DOCUMENT_TYPE])

  return {
    clientInfo: {
      firstName: documentData[FORM_FIELDS.FIRST_NAME],
      lastName: documentData[FORM_FIELDS.LAST_NAME],
      middleName: documentData[FORM_FIELDS.MIDDLE_NAME],
      birthDate: createStringFromDate(documentData[FORM_FIELDS.BIRTH_DATE]),
      birthPlace: documentData[FORM_FIELDS.BIRTH_PLACE],
      gender: documentData[FORM_FIELDS.SEX],
      contactPhone: normalizeNumber(documentData[FORM_FIELDS.CONTACT_NUMBER], {
        isNeedToSliceFirstDigit: true,
        fallback: undefined
      }),
      email: documentData[FORM_FIELDS.EMAIL],
      mnpMsisdn: transferNumberOld?.slice(1),
      portingDate: submittedTransferTimeSlot
    },
    clientIdentityCard: {
      typeId: pcdbId,
      citizenship: documentData[FORM_FIELDS.CITIZENSHIP],
      series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
      number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
      issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
      issuedId: documentData[FORM_FIELDS.DOCUMENT_CODE],
      issuedDate: createStringFromDate(documentData[FORM_FIELDS.DOCUMENT_DATE])
    },
    clientAddress: {
      zipCode: clientAddressData.PostIndex || undefined,
      region: getRegionWithDistrict({ address: clientAddressData, withType: true }),
      city: getCityWithLocality({ address: clientAddressData }),
      street: clientAddressData.StreetWithType || getStreetOrLocality({ address: clientAddressData }),
      house: getHouseOrStead({ address: clientAddressData, withType: true }),
      building: joinToString([clientAddressData.BuildingType, clientAddressData.BuildingName]),
      flat: clientAddressData.Flat || undefined
    },
    isInformation,
    subscriberInfo: {
      icc: isESim(sim.simTypeId) ? undefined : sim.icc,
      msisdn: sim.msisdn
    },
    clientMigrationCard: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER]
      ? {
        name: documentData[FORM_FIELDS.APPROVED_STAYING_DOCUMENT],
        numberMigrationCard: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        validFrom: documentData[FORM_FIELDS.ARRIVING_DATE],
        validUntil: documentData[FORM_FIELDS.DEPARTURE_DATE]
      }
      : undefined,
    requestUuid: uuid(),
    pepCode: isSigningSkipped || !pepCode ? undefined : pepCode,
    isPaperRfa: isSigningSkipped || signingType === SigningType.PAPER_DOCUMENTS,
    isPepConnectionDoc: signingType === SigningType.SMS_CODE,
    personalDataCheckId: smevCheckId || undefined
  }
}

export function * createRequestBodyCheckSmev () {
  const { documentData, soldSims } = yield select(selectSaleSim)
  const { msisdn } = soldSims[0]
  return {
    msisdn,
    surname: documentData[FORM_FIELDS.LAST_NAME],
    name: documentData[FORM_FIELDS.FIRST_NAME],
    patronymic: documentData[FORM_FIELDS.MIDDLE_NAME],
    birthDate: createStringFromDate(documentData[FORM_FIELDS.BIRTH_DATE]),
    series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
    number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
    issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
    issuedDate: createStringFromDate(documentData[FORM_FIELDS.DOCUMENT_DATE]),
    issuedId: documentData[FORM_FIELDS.DOCUMENT_CODE]
  }
}

export function * createRequestBodyMnpOrder () {
  const personalData = yield select(selectPersonalDataSaleSim)
  const addedSims = yield select(selectAddedSimsSaleSim)
  const transferDate = yield select(selectTransferDateSaleSim)
  const signedDocuments = yield select(selectSignedDocuments)
  const isMnpOrder = yield select(selectIsMnpOrderProcessTypeSaleSim)
  const mnpMsisdnSelector = isMnpOrder ? selectOrderMnpMsisdnSaleSim : selectTransferNumberSaleSim
  const mnpMsisdn = yield select(mnpMsisdnSelector)

  const msisdn = addedSims[0].number
  const file = signedDocuments[0]
  const email = personalData[FORM_FIELDS.EMAIL]
  const contactNumber = personalData[FORM_FIELDS.CONTACT_NUMBER]

  const identityDocumentId = personalData[FORM_FIELDS.DOCUMENT_TYPE]
  const { ruTitle: identityDocumentName } = yield call(getIdentityDocumentInfoById, identityDocumentId)

  const formData = new FormData()

  formData.append('Msisdn', msisdn)
  formData.append('MnpMsisdn', mnpMsisdn)
  formData.append('PortingDate', moment(transferDate).utc(true).format())
  formData.append('IsArchive', true)
  formData.append('File', file)
  formData.append('ClientInfo.Surname', personalData[FORM_FIELDS.LAST_NAME])
  formData.append('ClientInfo.Name', personalData[FORM_FIELDS.FIRST_NAME])
  formData.append('ClientInfo.Patronymic', personalData[FORM_FIELDS.MIDDLE_NAME])
  formData.append('ClientInfo.Address', personalData[FORM_FIELDS.REGISTRATION_ADDRESS])
  if (email) {
    formData.append('ClientInfo.Email', email)
  }
  if (contactNumber) {
    formData.append('ClientInfo.ContactPhone', contactNumber)
  }
  formData.append('IdentityDocument.Series', personalData[FORM_FIELDS.DOCUMENT_SERIES])
  formData.append('IdentityDocument.Number', personalData[FORM_FIELDS.DOCUMENT_NUMBER])
  formData.append('IdentityDocument.TypeId', identityDocumentId)
  formData.append('IdentityDocument.Name', identityDocumentName)
  formData.append('IdentityDocument.IssuedDate', createStringFromDate(personalData[FORM_FIELDS.DOCUMENT_DATE]))
  formData.append('IdentityDocument.IssuedBy', personalData[FORM_FIELDS.DOCUMENT_ADDRESS])

  return formData
}

export function * createRequestBodyCompleteOrderStatus () {
  const { userId } = yield select(selectUser)
  const {
    createdOn,
    client: { name: clientName = '', phone: clientPhone = '' }
  } = yield select(selectOrderInfo)

  const createOnUtc = formatDateWithFullTimeUtc(createdOn)
  const now = moment()
  const changedOn = formatDateWithFullTimeUtc(now)

  return {
    userId,
    changedOn,
    createdOn: createOnUtc,
    clientName,
    clientPhone
  }
}
