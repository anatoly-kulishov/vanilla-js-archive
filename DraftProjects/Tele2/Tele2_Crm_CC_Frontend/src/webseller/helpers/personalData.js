import { call, put, select, all } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'
import { joinToString, createDateFromString } from 'webseller/helpers'
import { FORM_FIELDS, RUSSIAN_FEDERATION_PASSPORT, RUSSIAN_PASSPORT_ID } from 'webseller/constants/form'
import { getPersonalAccountState } from 'selectors/index'
import { searchAddressesSuccess } from 'reducers/saleSim/saleSimReducer'
import { DateFormat } from 'webseller/constants'
import { getFoundAddressesFromDaData } from './daData'

const {
  fetchIdentityDocumentTypes,
  fetchDataClient: fetchAdditionalDataClient,
  fetchB2bClientMinimalInfo,
  fetchClientSubscriberInfo,
  fetchSubscriberMinimalInfo,
  fetchSearchAddresses,
  fetchIdentityDocumentCountries
} = api

export function * getInitialClientPersonalData ({ storeRegistrationAddresses, storeCountries } = {}) {
  try {
    const { BillingBranchId: BranchId, SubscriberId, ClientId, Msisdn } = yield select(getPersonalAccountState)

    const [
      { data: docTypes },
      { data: additionalDataClient },
      { data: b2bClientMinimalInfo },
      { data: subscriberMinimalInfo },
      { data: clientSubscriberInfo }
    ] = yield all([
      call(fetchIdentityDocumentTypes),
      call(fetchAdditionalDataClient, { BranchId, ClientId }),
      call(fetchB2bClientMinimalInfo, { BranchId, ClientId }),
      call(fetchSubscriberMinimalInfo, {
        BranchId,
        SubscriberId,
        ClientId,
        Msisdn
      }),
      call(fetchClientSubscriberInfo, {
        BranchId,
        SubscriberId,
        ClientId,
        Msisdn
      })
    ])

    const rawInitialClientPersonalData = mapResponsePersonalData({
      docTypes,
      additionalDataClient,
      b2bClientMinimalInfo,
      subscriberMinimalInfo,
      clientSubscriberInfo
    })

    const citizenships = yield call(getCitizenships, {
      identityDocumentType: rawInitialClientPersonalData[FORM_FIELDS.DOCUMENT_TYPE],
      countryName: rawInitialClientPersonalData[FORM_FIELDS.CITIZENSHIP]
    })

    if (Array.isArray(citizenships) && storeCountries) {
      yield put(storeCountries(citizenships))
    }

    const initialRegistrationAddress = rawInitialClientPersonalData?.[FORM_FIELDS.REGISTRATION_ADDRESS]

    const { foundAddresses, fullAddress } = yield call(getRegistrationAddressFullData, {
      subscriberMinimalInfo,
      initialRegistrationAddress
    })

    // TEMPORARY Разделение для обратной совместимости, пока идет перенос в WebsellerRemote
    const actionStoreRegistartionAddress = storeRegistrationAddresses || searchAddressesSuccess
    const payload = storeRegistrationAddresses
      ? foundAddresses.Data.DaData.map(address => address.SearchAccuracy)
      : foundAddresses
    yield put(actionStoreRegistartionAddress(payload))
    //

    return {
      ...rawInitialClientPersonalData,
      [FORM_FIELDS.CITIZENSHIP_ID]: citizenships?.[0]?.id,
      [FORM_FIELDS.REGISTRATION_ADDRESS]: fullAddress
    }
  } catch {
    notification.error({
      message: 'Не удалось получить информацию о персональных данных клиента. Воспользуйтесь формой для заполнения'
    })
  }
}

function mapResponsePersonalData ({
  docTypes,
  additionalDataClient,
  b2bClientMinimalInfo,
  subscriberMinimalInfo,
  clientSubscriberInfo
}) {
  const docType = docTypes?.identityDocumentTypes?.find(({ name, billingName }) => {
    const docTypeName = subscriberMinimalInfo?.Data?.IdentityDocumentFields?.TypeDoc

    return docTypeName === billingName || docTypeName === name
  })
  const {
    Series: documentSeries,
    Number: documentNumber,
    IssuedBy: documentIssuedBy,
    IssuedOn: documentIssuedOn
  } = subscriberMinimalInfo?.Data?.IdentityDocumentFields || {}
  const [lastName, firstName, middleName] = subscriberMinimalInfo?.Data?.FullName?.split(' ') || []
  const birthDate = b2bClientMinimalInfo?.Data?.DateOfBirth
  const birthPlace = b2bClientMinimalInfo?.Data?.AdditionalOptParameters?.find(
    ({ Key }) => Key === 'placeOfBirth'
  )?.Value
  const documentCode = b2bClientMinimalInfo?.Data?.AdditionalOptParameters?.find(
    ({ Key }) => Key === 'divisionCode'
  )?.Value
  const citizenship = b2bClientMinimalInfo?.Data?.AdditionalOptParameters?.find(
    ({ Key }) => Key === 'Citizenship'
  )?.Value
  const sex = subscriberMinimalInfo?.Data?.Sex?.toString()
  const address = joinToString([
    subscriberMinimalInfo?.Data?.RegistrationAddress?.PostIndex,
    subscriberMinimalInfo?.Data?.RegistrationAddress?.City,
    subscriberMinimalInfo?.Data?.RegistrationAddress?.Street,
    subscriberMinimalInfo?.Data?.RegistrationAddress?.House,
    subscriberMinimalInfo?.Data?.RegistrationAddress?.Frame
  ])
  const contactNumber =
    additionalDataClient?.Data?.MainData?.ContactNumberB2b ||
    b2bClientMinimalInfo?.Data?.UnstructuredPhoneNumber ||
    clientSubscriberInfo?.SubscriberInfo?.Msisdn
  const email = b2bClientMinimalInfo?.Data?.Email || clientSubscriberInfo?.SubscriberInfo?.Email

  return {
    [FORM_FIELDS.DOCUMENT_TYPE]: docType?.id || RUSSIAN_PASSPORT_ID,
    [FORM_FIELDS.DOCUMENT_NAME]: docType?.billingName || RUSSIAN_FEDERATION_PASSPORT,
    [FORM_FIELDS.LAST_NAME]: lastName,
    [FORM_FIELDS.FIRST_NAME]: firstName,
    [FORM_FIELDS.MIDDLE_NAME]: middleName,
    [FORM_FIELDS.BIRTH_DATE]: birthDate ? createDateFromString(birthDate) : undefined,
    [FORM_FIELDS.BIRTH_PLACE]: birthPlace,
    [FORM_FIELDS.SEX]: sex,
    [FORM_FIELDS.CITIZENSHIP]: citizenship,
    [FORM_FIELDS.DOCUMENT_SERIES]: documentSeries,
    [FORM_FIELDS.DOCUMENT_NUMBER]: documentNumber,
    [FORM_FIELDS.DOCUMENT_ADDRESS]: documentIssuedBy,
    [FORM_FIELDS.DOCUMENT_DATE]: documentIssuedOn
      ? createDateFromString(documentIssuedOn, DateFormat.VIEW_DATE)
      : undefined,
    [FORM_FIELDS.DOCUMENT_CODE]: documentCode,
    [FORM_FIELDS.REGISTRATION_ADDRESS]: address,
    [FORM_FIELDS.CONTACT_NUMBER]: contactNumber,
    [FORM_FIELDS.EMAIL]: email
  }
}

function * getCitizenships (params) {
  try {
    const { data } = yield call(fetchIdentityDocumentCountries, params)

    return data?.countries
  } catch {
    // Ловим ошибку локально, без обработки
  }
}

function * getRegistrationAddressFullData ({ subscriberMinimalInfo, initialRegistrationAddress }) {
  let foundAddresses = null
  let fullAddress = initialRegistrationAddress

  try {
    const { data } = yield call(fetchSearchAddresses, initialRegistrationAddress)

    foundAddresses = data
  } catch {
    // Ловим ошибку локально, без обработки
  }

  const hasFoundAddresses = getFoundAddressesFromDaData(foundAddresses)?.length > 0
  if (hasFoundAddresses) {
    fullAddress = foundAddresses.Data.DaData[0].SearchAccuracy.FullAddress
  } else {
    // Если DaData не нашла совпадений (либо ошибка при запросе), то берем данные из предыдущих запросов, в виде ответа DaData
    const { PostIndex, City, Street, House } = subscriberMinimalInfo?.Data?.RegistrationAddress || {}

    foundAddresses = {
      // Поле, которого нет в DaData, но оно необходимо, чтобы понимать дальше, что ответ не из DaData
      isGenerated: true,
      Data: {
        DaData: [
          {
            SearchAccuracy: {
              PostIndex: PostIndex || '',
              City: City || '',
              Street: Street || '',
              StreetWithType: Street || '',
              House: House || '',
              FullAddress: initialRegistrationAddress
            }
          }
        ]
      }
    }
  }

  return {
    foundAddresses,
    fullAddress
  }
}
