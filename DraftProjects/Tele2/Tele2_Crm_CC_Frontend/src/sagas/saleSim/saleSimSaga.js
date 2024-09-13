import { all, call, cancel, cancelled, fork, put, select, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as moment from 'moment'
import api from 'utils/api'
import { checkRight } from 'utils/helpers'
import {
  addPersonalAccountNumberError,
  addPersonalAccountNumberSuccess,
  addPersonalAccountStep,
  addSimInOrderError,
  addSimInOrderSuccess,
  addSimSuccess,
  cancelGetExistingPersonalData,
  checkAddressError,
  checkAddressSuccess,
  checkSimMnpError,
  checkSimMnpSuccess,
  checkSimSaleAvailabilityError,
  checkSimSaleAvailabilitySuccess,
  createMnpOrderSaleSim,
  downloadAgreementFileError,
  downloadAgreementFileSuccess,
  downloadRegisterSimInstructionError,
  downloadRegisterSimInstructionSuccess,
  getAgreementFilesError,
  getAgreementFilesSuccess,
  getExistingPersonalDataError,
  getExistingPersonalDataSuccess,
  getSalesReportFullError,
  getSalesReportFullSuccess,
  getSalesReportShortError,
  getSalesReportShortSuccess,
  getSearchShopNumbersSuccess,
  getSellAvailabilityError,
  getSellAvailabilitySuccess,
  getShopNumbers,
  getShopNumbersError,
  getShopNumbersSuccess,
  getShopTariffs,
  getShopTariffsError,
  getShopTariffsSuccess,
  getTransferEarliestTimeSlotError,
  getTransferEarliestTimeSlotSuccess,
  getTransferTimeSlots,
  getTransferTimeSlotsError,
  getTransferTimeSlotsSucess,
  saleSimError,
  saleSimSuccess,
  searchAddressesError,
  searchAddressesSuccess,
  searchCodeUFMSError,
  searchCodeUFMSSuccess,
  searchCountriesError,
  searchCountriesSuccess,
  sellAddedSimsError,
  sellAddedSimsSuccess,
  setAddSimError,
  setRegistrationSimData,
  setShopNumbersIndexSeed,
  skipSaleSim
} from 'reducers/saleSim/saleSimReducer'
import { FORM_FIELDS } from 'webseller/constants/form'
import {
  isFinalRegistartionSimStatus,
  isSuccessRegistrationSimStatus,
  isUntemplatedSim,
  RegistrationStatusIds,
  SallingProcessTypes
} from 'webseller/features/saleSim/helpers'
import {
  createClientAddressRequestData,
  createRequestBodyCompleteOrderStatus,
  createRequestBodyMnpOrder,
  createRequestBodyRegisterTemplatedSim,
  createRequestBodyRegisterTemplatedSimMnp,
  createRequestBodyRegisterUntemplatedSim,
  getExistingPersonalDataByWs,
  getUpdatedNumbersList,
  mapResponseGetExistingPersonalData
} from './helpers'
import {
  selectAddedSimsSaleSim,
  selectIsOrderProcessTypeSaleSim,
  selectPersonalDataSaleSim,
  selectSaleSim,
  selectSoldSims,
  selectSimsInOrderSaleSim,
  selectTypeSaleSim,
  selectOrderIdSaleSim,
  selectOrderMnpMsisdnSaleSim,
  selectOrderIsMnpSaleSim,
  selectIsMnpOrderProcessTypeSaleSim,
  selectSoldSimsSaleSim
} from 'reducers/saleSim/selectors'
import fromEnv from 'config/fromEnv'
import { getAuthToken } from 'utils/helpers/authToken'
import { notification } from 'antd'
import {
  checkPepCodeSagaDecorator,
  getDocumentCodeSagaDecorator,
  getPaperDocumentsSagaDecorator,
  getPepNumbersSagaDecorator,
  getSmsCodeSagaDecorator
} from 'webseller/common/signing/sagas/sagas'
import { createStringFromDate, normalizeNumber } from 'webseller/helpers'
import { selectActivePepNumber, selectPepNumbers, selectSigningType } from 'webseller/common/signing/selectors'
import { mapAgreementsRequest } from 'webseller/helpers/api'
import { selectAgreements } from 'webseller/common/agreements/selectors'
import { SigningType } from 'webseller/common/signing/helpers'
import { sendDocumentSmev } from 'reducers/checkSmev/checkSmevReducer'
import features from 'webseller/featureConfig'
import BussinessLogicError, { isBussinessLogicError } from 'webseller/helpers/BussinessLogicError'
import { getIdentityDocumentInfoById } from 'webseller/common/personalData/saga/helpers'
import { createNewSession } from 'webseller/features/webSellerSearch/reducer/customersCheckReducer'
import { WebSellerSearchMainTabsKeys, WebSellerSearchSubTabsKeys } from 'webseller/features/webSellerSearch/constants'

const { isUseSmev, isAvailableScanUploadSmev } = features

const validateStatusDefault = status => status >= 200 && status < 300

export const DOCUMENT_TYPE_IDS_MAP = {
  1: 'Договор об оказании услуг связи',
  2: 'Соглашение на оказание услуги «Красивый номер»',
  5: 'Заявление о перенесении номера'
}

const WS_DOCUMENT_SERVICE = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_WS')}/documentservice`

export function * getSellAvailabilitySaga ({ payload }) {
  const { fetchSellAvailability } = api

  try {
    const { data: sellAvailability, status } = yield call(fetchSellAvailability, payload)
    if (validateStatusDefault(status)) {
      yield put(getSellAvailabilitySuccess({ sellAvailability }))
      yield put(getShopTariffs())
      yield put(getShopNumbers({ isInitial: true }))
    } else {
      yield put(getSellAvailabilityError())
    }
  } catch {
    yield put(getSellAvailabilityError())
  }
}

export function * getSalesReportFullSaga ({ payload }) {
  const { fetchSalesReport } = api

  try {
    const {
      data: { sales: salesReportFull },
      status
    } = yield call(fetchSalesReport, payload)
    if (validateStatusDefault(status)) {
      yield put(getSalesReportFullSuccess({ salesReportFull }))
    } else {
      yield put(getSalesReportFullError())
    }
    yield put(getSalesReportFullSuccess({ salesReportFull }))
  } catch {
    yield put(getSalesReportFullError())
  }
}

export function * getSalesReportShortSaga ({ payload }) {
  const { fetchSalesReport } = api

  try {
    const { data: salesReportShort, status } = yield call(fetchSalesReport, payload, false)
    if (validateStatusDefault(status)) {
      yield put(getSalesReportShortSuccess({ salesReportShort }))
    } else {
      yield put(getSalesReportShortError())
    }
  } catch {
    yield put(getSalesReportShortError())
  }
}

export function * getShopTariffsSaga () {
  const { sellAvailability } = yield select(selectSaleSim)
  const { fetchShopTariffs } = api

  try {
    const { data: shopTariffs, status } = yield call(fetchShopTariffs, {
      clientType: 'b2c',
      siteId: sellAvailability.siteId
    })
    if (validateStatusDefault(status)) {
      yield put(getShopTariffsSuccess({ shopTariffs }))
    } else {
      yield put(getShopTariffsError())
    }
  } catch {
    yield put(getShopTariffsError())
  }
}

export function * getShopNumbersSaga ({ payload }) {
  const { shopNumbersIndexSeed, sellAvailability, shopNumbers: currentShopNumbers } = yield select(selectSaleSim)
  const { fetchShopNumbers } = api

  const isInitialRequest = shopNumbersIndexSeed === null || payload?.isInitial === true
  const newShopNumbersIndexSeed = isInitialRequest ? Math.floor(Math.random() * 10_000) : shopNumbersIndexSeed + 1

  try {
    const { data, status } = yield call(fetchShopNumbers, {
      indexSeed: newShopNumbersIndexSeed,
      siteId: sellAvailability.siteId
    })
    if (validateStatusDefault(status)) {
      const shopNumbers = isInitialRequest
        ? data.categoryNumbers
        : getUpdatedNumbersList(currentShopNumbers, data.categoryNumbers)
      yield put(setShopNumbersIndexSeed(newShopNumbersIndexSeed))
      yield put(getShopNumbersSuccess({ shopNumbers }))
    } else {
      yield put(getShopNumbersError())
    }
  } catch {
    yield put(getShopNumbersError())
  }
}

export function * searchShopNumberSaga ({ payload }) {
  const { sellAvailability } = yield select(selectSaleSim)
  const { fetchSearchShopNumbers } = api

  try {
    const { data, status } = yield call(fetchSearchShopNumbers, {
      query: payload.query,
      siteId: sellAvailability.siteId
    })
    if (validateStatusDefault(status)) {
      yield put(getSearchShopNumbersSuccess({ shopNumbers: data?.categoryNumbers }))
    } else {
      yield put(getShopNumbersError())
    }
  } catch {
    yield put(getShopNumbersError())
  }
}

function * preparedBusinessEnvironmentAbonent (payload) {
  const { getPreparedBusinessEnvironmentAbonent } = api
  const { icc, msisdn, branchId, onSuccess } = payload

  try {
    const { data, status } = yield call(getPreparedBusinessEnvironmentAbonent, {
      icc,
      msisdn,
      branchId
    })

    if (status === 404) {
      switch (data?.bCode) {
        case 1:
          yield put(setAddSimError('Номер не найден'))
          return
        case 2:
          yield put(onSuccess())
          return
        case 3:
          yield put(setAddSimError('Номер оформлен на другого пользователя'))
          return
        default:
          yield put(setAddSimError('Номер оформлен на другого пользователя'))
      }
    } else if (validateStatusDefault(status)) {
      yield put(addPersonalAccountStep())
      yield put(onSuccess())
    } else {
      yield put(setAddSimError('SIM-карта недоступна для продажи'))
    }
  } catch (err) {
    const httpStatusCode = err.response?.status
    if (httpStatusCode && httpStatusCode >= 500) {
      yield put(onSuccess())
      return
    }

    yield put(setAddSimError('SIM-карта недоступна для продажи'))
  }
}

export function * addSimSaga ({ payload }) {
  const { icc } = payload
  const { fetchSimCardAvailability } = api

  try {
    const { data: simCardAvailability, status } = yield call(fetchSimCardAvailability, { icc })
    if (!validateStatusDefault(status)) {
      yield put(setAddSimError('SIM-карта недоступна для продажи'))
      return
    }

    const { partyTypeId } = simCardAvailability

    if (partyTypeId === 2 || partyTypeId === 4) {
      const { user } = yield select(state => state.internal.userState)
      const { sellAvailability } = yield select(selectSaleSim)

      const isAvailableUntemplatedSimSell = checkRight(user, 'AS:UntemplatedSIMSell')
      if (!isAvailableUntemplatedSimSell) {
        yield put(setAddSimError('Недостаточно прав для продажи SIM'))
        return
      }
      if (!sellAvailability?.isSimAvailable) {
        yield put(setAddSimError('Продажа SIM недоступна'))
        return
      }
    }

    if (!partyTypeId) {
      const { msisdn, branchId } = simCardAvailability
      yield call(preparedBusinessEnvironmentAbonent, {
        icc,
        msisdn,
        branchId,
        onSuccess: () => addSimSuccess(simCardAvailability)
      })
      return
    }

    yield put(addSimSuccess(simCardAvailability))
  } catch {
    yield put(setAddSimError('SIM-карта недоступна для продажи'))
  }
}

export function * addSimInOrderSaga ({ payload }) {
  const { id, tariff, icc } = payload
  const { fetchSimCardAvailability } = api

  try {
    const { data: simCardAvailability, status } = yield call(fetchSimCardAvailability, { icc })
    if (validateStatusDefault(status)) {
      const { partyTypeId } = simCardAvailability
      if (partyTypeId === 2 || partyTypeId === 4) {
        const { user } = yield select(state => state.internal.userState)
        const { sellAvailability } = yield select(selectSaleSim)
        const isAvailableUntemplatedSimSell = checkRight(user, 'AS:UntemplatedSIMSell')
        if (!isAvailableUntemplatedSimSell) {
          yield put(addSimInOrderError({ id, message: 'Недостаточно прав для продажи SIM' }))
          return
        }
        if (!sellAvailability?.isSimAvailable) {
          yield put(addSimInOrderError({ id, message: 'Продажа SIM недоступна' }))
          return
        }
      } else {
        // TODO вернуть, когда будет валидное partyTypeId в ответе
        // throw new Error('Only untemplated sim is available')
      }
      yield put(addSimInOrderSuccess({ id, tariff, availability: simCardAvailability }))
    } else {
      throw new Error('Server Error')
    }
  } catch {
    yield put(addSimInOrderError({ id, message: 'SIM-карта недоступна для продажи' }))
  }
}

export function * sellAddedSimsSaga () {
  const { fetchSellSim } = api
  const { addedSims, sellAvailability, sallingProcessType } = yield select(selectSaleSim)

  if (sallingProcessType === SallingProcessTypes.ORDER) {
    yield put(sellAddedSimsSuccess([]))
    return
  }

  try {
    const simsForSale = addedSims.reduce((sims, rawSimData) => {
      const isUntemplatedSIM = rawSimData.partyTypeId === 2 || rawSimData.partyTypeId === 4
      sims.push({
        isMnp: sallingProcessType === SallingProcessTypes.TRANSFER || undefined,
        tariffSlug: isUntemplatedSIM ? rawSimData.tariff.slug : undefined,
        siteId: sellAvailability?.siteId,
        msisdn: rawSimData.number,
        branchId: sellAvailability?.branchId,
        icc: rawSimData.icc,
        simTypeId: rawSimData.simTypeId,
        simSetTypeId: isUntemplatedSIM ? 2 : 1
      })
      return sims
    }, [])

    const soldSimsResponses = yield all(simsForSale.map(sim => call(fetchSellSim, sim)))

    const areAllOkResponses = soldSimsResponses.every(({ status }) => validateStatusDefault(status))
    if (areAllOkResponses) {
      const soldSims = soldSimsResponses.map(({ data }) => data)
      yield put(sellAddedSimsSuccess(soldSims))

      const hasUntemplatedSim = addedSims.some(({ partyTypeId }) => isUntemplatedSim(partyTypeId))
      if (hasUntemplatedSim) {
        yield put(getShopNumbers({ isInitial: true }))
      }
    } else {
      notification.error({
        message: 'Ошибка при оформлении SIM-карты. Попробуйте еще раз.'
      })
      yield put(sellAddedSimsError())
    }
  } catch (err) {
    notification.error({
      message: 'Ошибка при оформлении SIM-карты. Попробуйте еще раз.'
    })
    yield put(sellAddedSimsError())
  }
}

export function * getExistingPersonalDataSaga () {
  yield fork(function * () {
    const soldSims = yield select(selectSoldSims)

    const sockets = []

    try {
      const responses = yield all(
        soldSims.map(({ simSellId }) => {
          return getExistingPersonalDataByWs({ simSellId, sockets })
        })
      )

      const rawExistingPersonalData = responses[0]

      yield put(
        getExistingPersonalDataSuccess({
          isExists: rawExistingPersonalData.IsDocExists,
          personalData: mapResponseGetExistingPersonalData(rawExistingPersonalData)
        })
      )
      notification.success({
        message: 'Успешно получены данные документа из AppSeller'
      })
    } catch (err) {
      yield put(getExistingPersonalDataError())
      if (isBussinessLogicError(err)) {
        notification.error({
          message: err.message
        })
      }
    } finally {
      if (yield cancelled()) {
        sockets.forEach(socket => {
          socket.close()
        })
      }
    }
  })

  yield take(cancelGetExistingPersonalData().type)
  yield cancel()
}

export function * checkSimMnpSaga ({ payload: oldNumber }) {
  const { fetchMnpCheck } = api
  const { addedSims } = yield select(selectSaleSim)
  const newNumber = addedSims[0].number

  try {
    const { status } = yield call(fetchMnpCheck, {
      newNumber,
      oldNumber: normalizeNumber(oldNumber, { isNeedToSliceFirstDigit: true, fallback: undefined })
    })
    if (validateStatusDefault(status)) {
      yield put(checkSimMnpSuccess({ newNumber, oldNumber }))
    } else {
      throw new Error()
    }
  } catch {
    yield put(checkSimMnpError())
    notification.error({
      message: 'Номер недоступен для переноса'
    })
  }
}

export function * getTransferEarliestTimeSlotSaga () {
  const { fetchTransferEarliestTimeSlot } = api
  const { transferNumberOld } = yield select(selectSaleSim)
  const mnpMsisdn = yield select(selectOrderMnpMsisdnSaleSim)
  const isMnp = yield select(selectOrderIsMnpSaleSim)

  try {
    const { data } = yield call(
      fetchTransferEarliestTimeSlot,
      normalizeNumber(isMnp ? mnpMsisdn : transferNumberOld, {
        isNeedToSliceFirstDigit: true,
        fallback: transferNumberOld
      })
    )
    const earliestTimeSlot = data?.resultBody?.earliestTimeSlot
    if (earliestTimeSlot) {
      yield put(getTransferEarliestTimeSlotSuccess(earliestTimeSlot))
      const earliestTimeSlotDate = moment(earliestTimeSlot).format('YYYY-MM-DD')
      yield put(getTransferTimeSlots(earliestTimeSlotDate))
      return
    }
    yield put(getTransferEarliestTimeSlotError())
  } catch {
    yield put(getTransferEarliestTimeSlotError())
  }
}

export function * getTransferTimeSlotsSaga ({ payload: day }) {
  const { fetchTransferTimeSlots } = api
  const { transferNumberOld } = yield select(selectSaleSim)
  const timeSlotsDate = moment(day).format('YYYY-MM-DD')
  const mnpMsisdn = yield select(selectOrderMnpMsisdnSaleSim)
  const isMnp = yield select(selectOrderIsMnpSaleSim)

  try {
    const { data } = yield call(
      fetchTransferTimeSlots,
      normalizeNumber(isMnp ? mnpMsisdn : transferNumberOld, {
        isNeedToSliceFirstDigit: true,
        fallback: transferNumberOld
      }),
      timeSlotsDate
    )
    const { resultType, resultBody } = data || {}
    const hasTimeSlots = resultType === 'OK' && Array.isArray(resultBody)
    if (hasTimeSlots) {
      yield put(getTransferTimeSlotsSucess(resultBody))
      return
    }
    yield put(getTransferTimeSlotsError())
  } catch {
    yield put(getTransferTimeSlotsError())
  }
}

export function * searchCountriesSaga ({ payload: query }) {
  const { fetchSearchCountries } = api

  try {
    const { data: countries, status } = yield call(fetchSearchCountries, query)
    if (validateStatusDefault(status)) {
      yield put(searchCountriesSuccess(countries))
    } else {
      yield put(searchCountriesError())
    }
  } catch {
    yield put(searchCountriesError())
  }
}

export function * searchCodeUFMSSaga ({ payload: query }) {
  const { fetchSearchCodeUFMS } = api

  try {
    const { data: countries, status } = yield call(fetchSearchCodeUFMS, query)
    if (validateStatusDefault(status)) {
      yield put(searchCodeUFMSSuccess(countries))
    } else {
      yield put(searchCodeUFMSError())
    }
  } catch {
    yield put(searchCodeUFMSError())
  }
}

export function * searchAddressesSaga ({ payload: query }) {
  const { fetchSearchAddresses } = api

  try {
    const { data: foundAddresses, status } = yield call(fetchSearchAddresses, query)
    if (validateStatusDefault(status)) {
      yield put(searchAddressesSuccess(foundAddresses))
    } else {
      yield put(searchAddressesError())
    }
  } catch {
    yield put(searchAddressesError())
  }
}

export function * checkSimSaleAvailabilitySaga () {
  const { fetchSimSaleAvailabilityCheck } = api
  const { addedSims, documentData } = yield select(selectSaleSim)
  const requestPayload = {
    name: documentData[FORM_FIELDS.FIRST_NAME],
    surname: documentData[FORM_FIELDS.LAST_NAME],
    documentNumber: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
    simCardCount: addedSims.length
  }

  try {
    const { data } = yield call(fetchSimSaleAvailabilityCheck, requestPayload)

    if (data?.resultType === 'OK') {
      yield put(checkSimSaleAvailabilitySuccess())
    } else {
      const error = data?.resultInfo
      yield put(checkSimSaleAvailabilityError(error))
    }
  } catch {
    yield put(checkSimSaleAvailabilityError('Что-то пошло не так'))
  }
}

export function * getAgreementFilesSaga () {
  const { fetchAgreementTemplates } = api
  const { sallingProcessType, addedSims } = yield select(selectSaleSim)

  const isTransferToTele2 = sallingProcessType === SallingProcessTypes.TRANSFER

  try {
    const { data } = yield call(fetchAgreementTemplates)
    const { templates } = data || {}

    if (Array.isArray(templates)) {
      const hasBeautifulNumber = addedSims.some(sim => sim.hasBeautifulNumber)

      const neededTemplates = templates.filter(template => {
        if (template.isMnp) {
          return isTransferToTele2
        }

        if (template.isBeautifulNumber) {
          return hasBeautifulNumber
        }

        return true
      })

      yield put(getAgreementFilesSuccess(neededTemplates))
    } else {
      yield put(getAgreementFilesError())
    }
  } catch {
    yield put(getAgreementFilesError())
  }
}

export function * downloadAgreementFileSaga ({ payload: templateId }) {
  const { fetchAgreementTemplate } = api

  try {
    const { data: url } = yield call(fetchAgreementTemplate, templateId)

    if (url) {
      window.open(url)
      yield put(downloadAgreementFileSuccess())
    } else {
      yield put(downloadAgreementFileError())
    }
  } catch {
    yield put(downloadAgreementFileError())
  }
}

export function * getPepNumbersSaga () {
  const personalData = yield select(selectPersonalDataSaleSim)

  yield call(getPepNumbersSagaDecorator, { personalData })
}

export function * getSmsCodeSaga () {
  const activePepNumber = yield select(selectActivePepNumber)

  const requestBody = {
    msisdn: activePepNumber
  }

  yield call(getSmsCodeSagaDecorator, { requestBody })
}

export function * getDocumentCodeSaga () {
  yield call(getDocumentCodeSagaDecorator, { preflightGetDocumentCode })
}

function * preflightGetDocumentCode () {
  const { fetchPrepareSimSellDocument } = api

  const { soldSims, documentData, foundAddresses } = yield select(selectSaleSim)
  const selectedPepMsisdn = yield select(selectActivePepNumber)
  const pepMsisdns = yield select(selectPepNumbers)
  const { simSellId = 1, msisdn } = soldSims[0]

  const hasPepMsisdns = pepMsisdns?.length && pepMsisdns.length > 0
  const { pcdbId } = yield call(getIdentityDocumentInfoById, documentData[FORM_FIELDS.DOCUMENT_TYPE])

  const bodyPrepareSimSellDocument = {
    typeId: 3, // Заявление на присоединение к оферте и выдаче ключа ПЭП
    pepMsisdn: hasPepMsisdns ? selectedPepMsisdn : msisdn,
    isSubscriberCheck: hasPepMsisdns ? undefined : false,
    clientInfo: {
      name: documentData[FORM_FIELDS.FIRST_NAME],
      surname: documentData[FORM_FIELDS.LAST_NAME],
      patronymic: documentData[FORM_FIELDS.MIDDLE_NAME]
    },
    clientIdentityCard: {
      issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
      issuedDate: createStringFromDate(documentData[FORM_FIELDS.DOCUMENT_DATE]),
      issuedCode: documentData[FORM_FIELDS.DOCUMENT_CODE],
      number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
      series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
      typeId: pcdbId
    },
    clientAddress: createClientAddressRequestData(foundAddresses, documentData[FORM_FIELDS.REGISTRATION_ADDRESS]),
    subscriberInfo: {
      msisdn
    }
  }

  return {
    request: fetchPrepareSimSellDocument,
    params: [simSellId, bodyPrepareSimSellDocument],
    title: DOCUMENT_TYPE_IDS_MAP[bodyPrepareSimSellDocument.typeId]
  }
}

export function * checkPepCodeSaga ({ payload: code }) {
  const addedSims = yield select(selectAddedSimsSaleSim)
  const msisdn = addedSims[0].number

  const requestData = { code, msisdn }

  yield call(checkPepCodeSagaDecorator, { requestData })
}

export function * getPaperDocumentsSaga () {
  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

function * preflightGetPaperDocuments () {
  const {
    sallingProcessType,
    addedSims,
    soldSims,
    documentData,
    foundAddresses,
    transferNumberOld,
    submittedTransferTimeSlot
  } = yield select(selectSaleSim)
  const simsInOrder = yield select(selectSimsInOrderSaleSim)
  const isMnpOrder = yield select(selectIsMnpOrderProcessTypeSaleSim)
  const mnpMsisdnOrder = yield select(selectOrderMnpMsisdnSaleSim)

  const isTransferToTele2 = sallingProcessType === SallingProcessTypes.TRANSFER
  const isOrderProcess = sallingProcessType === SallingProcessTypes.ORDER
  const { simSellId = 1, msisdn } = soldSims[0]
  const { icc, tariff, msisdnCategory, salePrice: msisdnPrice } = addedSims.find(sim => sim.number === msisdn)

  const tariffName = isOrderProcess ? simsInOrder[0]?.tariff : tariff?.name

  const clientAddress = createClientAddressRequestData(foundAddresses, documentData[FORM_FIELDS.REGISTRATION_ADDRESS])

  const agreements = yield select(selectAgreements)
  const isInformation = yield call(mapAgreementsRequest, agreements)

  const { pcdbId } = yield call(getIdentityDocumentInfoById, documentData[FORM_FIELDS.DOCUMENT_TYPE])

  const effectsArgs = []

  const bodyMainDocument = {
    typeId: 1, // RFA, Договор об оказании услуг связи
    clientInfo: {
      name: documentData[FORM_FIELDS.FIRST_NAME],
      surname: documentData[FORM_FIELDS.LAST_NAME],
      patronymic: documentData[FORM_FIELDS.MIDDLE_NAME],
      birthDate: createStringFromDate(documentData[FORM_FIELDS.BIRTH_DATE]),
      birthPlace: documentData[FORM_FIELDS.BIRTH_PLACE],
      gender: documentData[FORM_FIELDS.SEX],
      contactPhone: documentData[FORM_FIELDS.CONTACT_NUMBER],
      email: documentData[FORM_FIELDS.EMAIL]
    },
    clientIdentityCard: {
      issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
      issuedDate: createStringFromDate(documentData[FORM_FIELDS.DOCUMENT_DATE]),
      issuedCode: documentData[FORM_FIELDS.DOCUMENT_CODE],
      number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
      series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
      citizenship: documentData[FORM_FIELDS.CITIZENSHIP],
      typeId: pcdbId
    },
    clientAddress,
    clientMigrationCard: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER]
      ? {
        numberMigrationCard: documentData[FORM_FIELDS.MIGRATION_CARD_NUMBER],
        dateFrom: createStringFromDate(documentData[FORM_FIELDS.ARRIVING_DATE]),
        dateUntil: createStringFromDate(documentData[FORM_FIELDS.DEPARTURE_DATE])
      }
      : undefined,
    subscriberInfo: {
      msisdn,
      tariffName,
      ICC: icc
    },
    isInformation
  }
  effectsArgs.push([simSellId, bodyMainDocument])

  const hasBeautifulNumber = addedSims?.some(({ hasBeautifulNumber }) => hasBeautifulNumber)
  if (hasBeautifulNumber) {
    const bodyBeautifulNumberDocument = {
      typeId: 2, // Соглашение на оказание услуги «Красивый номер»
      subscriberInfo: {
        msisdn,
        msisdnCategory,
        msisdnPrice
      },
      clientInfo: {
        name: documentData[FORM_FIELDS.FIRST_NAME],
        surname: documentData[FORM_FIELDS.LAST_NAME],
        patronymic: documentData[FORM_FIELDS.MIDDLE_NAME]
      },
      clientIdentityCard: {
        issuedBy: documentData[FORM_FIELDS.DOCUMENT_ADDRESS],
        issuedDate: createStringFromDate(documentData[FORM_FIELDS.DOCUMENT_DATE]),
        issuedCode: documentData[FORM_FIELDS.DOCUMENT_CODE],
        number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
        series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
        typeId: pcdbId
      },
      clientAddress
    }
    effectsArgs.push([simSellId, bodyBeautifulNumberDocument])
  }

  if (isTransferToTele2 || isMnpOrder) {
    const bodyMnpDocument = {
      typeId: 5, // Заявление о перенесении номера
      clientInfo: {
        mnpMsisdn: isMnpOrder ? mnpMsisdnOrder : transferNumberOld,
        portingDate: submittedTransferTimeSlot,
        name: documentData[FORM_FIELDS.FIRST_NAME],
        surname: documentData[FORM_FIELDS.LAST_NAME],
        patronymic: documentData[FORM_FIELDS.MIDDLE_NAME]
      },
      clientIdentityCard: {
        number: documentData[FORM_FIELDS.DOCUMENT_NUMBER],
        series: documentData[FORM_FIELDS.DOCUMENT_SERIES],
        typeId: pcdbId
      }
    }
    effectsArgs.push([simSellId, bodyMnpDocument])
  }

  const { fetchPrepareSimSellDocument } = api

  return effectsArgs.map(args => ({
    request: fetchPrepareSimSellDocument,
    params: args,
    title: DOCUMENT_TYPE_IDS_MAP[args[1].typeId]
  }))
}

function * prepareAndDownloadDocument (effectArgs, sockets) {
  const { fetchPrepareSimSellDocument } = api
  const [simSellId, bodyDocument] = effectArgs
  const { data } = yield call(fetchPrepareSimSellDocument, simSellId, bodyDocument)
  const requestId = data || {}

  if (requestId) {
    return yield call(
      () =>
        new Promise((resolve, reject) => {
          const token = getAuthToken().split(' ')[1]
          const socket = new WebSocket(`${WS_DOCUMENT_SERVICE}/api/v1/Documents/${requestId}`, ['client', token])

          if (sockets) {
            sockets.push(socket)
          }

          socket.onmessage = event => {
            const responseBody = JSON.parse(event.data)
            const document = {
              title: DOCUMENT_TYPE_IDS_MAP[bodyDocument.typeId],
              ...responseBody
            }
            resolve(document)
          }
          socket.onerror = () => {
            reject(new Error())
          }
          socket.onclose = () => {
            reject(new Error())
          }
        })
    )
  }
}

export function * registerSimsSaga () {
  const { addedSims, sallingProcessType, soldSims } = yield select(selectSaleSim)
  const isOrderProcess = yield select(selectIsOrderProcessTypeSaleSim)

  const isTransferToTele2 = sallingProcessType === SallingProcessTypes.TRANSFER

  yield all(
    addedSims.map((addedSim, idx) => {
      const effect = isUntemplatedSim(addedSim.partyTypeId)
        ? registerUntemplatedSim
        : isTransferToTele2
          ? registerTemplatedSimMnp
          : registerTemplatedSim

      const soldSim = soldSims[idx] || {}

      const sim = {
        ...addedSim,
        ...soldSim,
        id: addedSim.id
      }

      if (isOrderProcess) {
        sim.simCardId = soldSim.id
      }

      return call(effect, sim)
    })
  )
}

function * registerTemplatedSim (sim) {
  const { fetchRegisterTemplatedSim } = api

  try {
    const body = yield call(createRequestBodyRegisterTemplatedSim, sim)
    const { status } = yield call(fetchRegisterTemplatedSim, body)

    if (validateStatusDefault(status)) {
      yield put(
        setRegistrationSimData({
          id: sim.id,
          data: { statusId: RegistrationStatusIds.SUCCESS }
        })
      )

      if (isUseSmev && isAvailableScanUploadSmev) {
        yield put(sendDocumentSmev())
      }
    } else {
      yield put(
        setRegistrationSimData({
          id: sim.id,
          data: { statusId: RegistrationStatusIds.ERROR }
        })
      )
    }
  } catch {
    yield put(
      setRegistrationSimData({
        id: sim.id,
        data: { statusId: RegistrationStatusIds.ERROR }
      })
    )
  }
}

function * registerTemplatedSimMnp (sim) {
  const { fetchRegisterTemplatedSimMnp } = api

  try {
    const body = yield call(createRequestBodyRegisterTemplatedSimMnp, sim)
    const { status } = yield call(fetchRegisterTemplatedSimMnp, body)

    if (validateStatusDefault(status)) {
      yield put(
        setRegistrationSimData({
          id: sim.id,
          data: { statusId: RegistrationStatusIds.SUCCESS }
        })
      )

      if (isUseSmev && isAvailableScanUploadSmev) {
        yield put(sendDocumentSmev())
      }

      const signingType = yield select(selectSigningType)
      const isPaperDocumentsSigning = signingType === SigningType.PAPER_DOCUMENTS
      if (isPaperDocumentsSigning) {
        yield put(createMnpOrderSaleSim())
      }
    } else {
      yield put(
        setRegistrationSimData({
          id: sim.id,
          data: { statusId: RegistrationStatusIds.ERROR }
        })
      )
    }
  } catch {
    yield put(
      setRegistrationSimData({
        id: sim.id,
        data: { statusId: RegistrationStatusIds.ERROR }
      })
    )
  }
}

function * registerUntemplatedSim (sim) {
  // TODO add convertBase64ToBlob for paymentQr
  const { fetchRegisterUntemplatedSim, fetchOrderStatusCompleted } = api

  try {
    const body = yield call(createRequestBodyRegisterUntemplatedSim, sim)
    const { status } = yield call(fetchRegisterUntemplatedSim, body)

    if (validateStatusDefault(status)) {
      const SERVICE_HOST_WS = `${fromEnv('REACT_APP_APPSELLER_BACKEND_HOST_WS')}/simsellservice`
      const token = getAuthToken().split(' ')[1]
      const socket = new WebSocket(`${SERVICE_HOST_WS}/api/v1/SimSale/SimStatus/ws`, ['client', token])

      socket.onopen = () => {
        const body = JSON.stringify({
          simCardIds: [sim.simCardId]
        })
        socket.send(body)
      }

      const createSocketChannel = (socket, simId) =>
        eventChannel(emit => {
          socket.onmessage = event => {
            const responseBody = JSON.parse(event.data)
            const registrationSimData = responseBody?.simCards?.[0]

            if (registrationSimData) {
              emit({
                id: simId,
                data: registrationSimData
              })
            }
          }

          socket.onerror = () => {
            emit({
              id: sim.id,
              data: { statusId: RegistrationStatusIds.ERROR }
            })
            socket.close()
          }

          const unsubscribe = () => {
            socket.close()
          }

          return unsubscribe
        })

      const socketChannel = yield call(createSocketChannel, socket, sim.id)

      let isSuccessStatus = false
      let isFinalStatus = false
      while (!isFinalStatus) {
        const simData = yield take(socketChannel)
        yield put(setRegistrationSimData(simData))

        const status = simData.data.statusId
        isFinalStatus = isFinalRegistartionSimStatus(status)
        isSuccessStatus = isSuccessRegistrationSimStatus(status)
      }

      const typeSaleSim = yield select(selectTypeSaleSim)
      const signingType = yield select(selectSigningType)

      const isMnp = typeSaleSim === SallingProcessTypes.TRANSFER || typeSaleSim === SallingProcessTypes.MNP_ORDER
      const isOrderSelling = typeSaleSim === SallingProcessTypes.ORDER
      const isPaperDocumentsSigning = signingType === SigningType.PAPER_DOCUMENTS

      if (isSuccessStatus && isOrderSelling) {
        try {
          const eshopOrderId = yield select(selectOrderIdSaleSim)
          const requestBody = yield call(createRequestBodyCompleteOrderStatus)

          yield call(fetchOrderStatusCompleted, eshopOrderId, requestBody)
        } catch {
          // фоново, ошибка не отображается
        }
      }

      if (isSuccessStatus && isUseSmev && isAvailableScanUploadSmev) {
        yield put(sendDocumentSmev())
      }
      if (isSuccessStatus && isMnp && isPaperDocumentsSigning) {
        yield put(createMnpOrderSaleSim())
      }

      socket.close()
    } else {
      yield put(
        setRegistrationSimData({
          id: sim.id,
          data: { statusId: RegistrationStatusIds.ERROR }
        })
      )
    }
  } catch {
    yield put(
      setRegistrationSimData({
        id: sim.id,
        data: { statusId: RegistrationStatusIds.ERROR }
      })
    )
  }
}

export function * createMnpOrderSaleSimSaga () {
  const { fetchCreateMnpOrder } = api

  try {
    const requestBody = yield call(createRequestBodyMnpOrder)
    yield call(fetchCreateMnpOrder, requestBody)
  } catch {
    // фоново, ошибка не отображается
  }
}

export function * downloadRegisterSimInstructionSaga () {
  const { addedSims, soldSims } = yield select(selectSaleSim)

  const { simSellId, msisdn } = soldSims[0]
  const { icc } = addedSims.find(sim => sim.number === msisdn)

  const body = {
    typeId: 6, // Инструкция по установке eSIM,
    simSellId,
    subscriberInfo: {
      icc
    }
  }

  try {
    const instruction = yield call(prepareAndDownloadDocument, [simSellId, body])

    if (instruction?.url) {
      window.open(instruction.url)
      yield put(downloadRegisterSimInstructionSuccess())
    } else {
      throw new Error()
    }
  } catch {
    yield put(downloadRegisterSimInstructionError())
    notification.error({
      message: 'Ошибка при загрузке инструкции по установке eSIM'
    })
  }
}

export function * saleSimSaga () {
  try {
    const addedSims = yield select(selectAddedSimsSaleSim)
    const soldSims = yield select(selectSoldSimsSaleSim)

    // Вызываем метод Sale только при новом icc
    const isChangedIcc = addedSims[0].icc !== soldSims?.[0]?.icc
    if (!isChangedIcc) {
      yield put(skipSaleSim())
      return
    }

    const { fetchSaleSim } = api

    const eShopOrderId = yield select(selectOrderIdSaleSim)
    const simsInOrder = yield select(selectSimsInOrderSaleSim)

    const requestData = {
      eShopOrderId,
      simCards: simsInOrder.map(({ icc, msisdn }) => ({ icc, msisdn }))
    }

    const { data: simSell, status } = yield call(fetchSaleSim, requestData)

    if (validateStatusDefault(status)) {
      yield put(saleSimSuccess({ simSell, saleSimBody: requestData }))
    } else {
      throw new BussinessLogicError()
    }
  } catch {
    yield put(saleSimError())
    notification.error({
      message: 'Ошибка при выдаче SIM'
    })
  }
}

export function * addPersonalAccountNumberSaga ({ payload }) {
  const { createReservedAppSellerAbonent } = api
  const { addedSims } = yield select(selectSaleSim)
  const sim = addedSims[0]
  try {
    const { data, status } = yield call(createReservedAppSellerAbonent, {
      IccId: sim.icc,
      Msisdn: sim.number,
      BranchId: sim.branchId,
      MainClientPersonalAccountNumber: payload,
      MainClientBranchId: null
    })

    if (status === 404) {
      yield put(addPersonalAccountNumberError('Введен некорректный номер ГК ЛС'))
    } else if (validateStatusDefault(status)) {
      yield put(addPersonalAccountNumberSuccess(data))
    } else {
      yield put(addPersonalAccountNumberError())
    }
  } catch {
    yield put(addPersonalAccountNumberError())
  }
}

export function * checkAddressSaga () {
  const { checkAddress } = api
  const { documentData, foundAddresses } = yield select(selectSaleSim)
  const { user } = yield select(state => state.internal.userState)

  try {
    const clientAddress = createClientAddressRequestData(foundAddresses, documentData[FORM_FIELDS.REGISTRATION_ADDRESS])

    const { data } = yield call(checkAddress, {
      UserName: user.msisdn,
      SystemId: 16,
      Region: clientAddress?.region,
      City: clientAddress?.city,
      Street: clientAddress?.street,
      House: clientAddress?.house,
      Flat: clientAddress?.flat || '0',
      Entrance: clientAddress?.entrance || '1',
      Floor: clientAddress?.floor || '1',
      // Фиктивные параметры абонента, необходимые для заявки в РТК (при проверке адреса в CRM создается заявка на подключение в РТК)
      Name: 'ASCHECK',
      Surname: 'ASCHECK',
      Channel: 16,
      IsDeleteOrder: false,
      Msisdn: '79058000000'
    })

    const { StatusId, StatusName: statusName, MaxSpeed: maxSpeed } = data?.Data || {}
    const statusId = Number(StatusId)

    const isAvailableBroadbandConnect = statusId === 1 || statusId === 2
    if (isAvailableBroadbandConnect) {
      let messageBroadbandConnect = null
      switch (statusId) {
        case 1: {
          messageBroadbandConnect = `По адресу регистрации абонента имеется возможность подключить домашний интернет со скоростью до ${maxSpeed} Мб/с`
          break
        }

        case 2: {
          messageBroadbandConnect = statusName
          break
        }
      }

      yield put(checkAddressSuccess(messageBroadbandConnect))
    } else {
      throw new BussinessLogicError('Подключение домашнего интернета недоступно')
    }
  } catch {
    yield put(checkAddressError())
  }
}

export function * connectBroadbandSaleSimSaga () {
  const addedSims = yield select(selectAddedSimsSaleSim)
  const personalData = yield select(selectPersonalDataSaleSim)

  // TODO аналитика мультипродажа
  const msisdn = addedSims[0].number
  const documentNumber = personalData[FORM_FIELDS.DOCUMENT_NUMBER]

  const searchData = {
    [WebSellerSearchMainTabsKeys.MSISDN]: msisdn,
    [WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER]: documentNumber
  }

  yield put(createNewSession({ isCreateOrder: true, searchData }))
}
