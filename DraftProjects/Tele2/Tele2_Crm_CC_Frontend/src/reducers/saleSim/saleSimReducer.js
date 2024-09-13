import { produce } from 'immer'
import { createAction, handleActions, combineActions } from 'redux-actions'
import { v4 as uuid } from 'uuid'
import { SALLING_PROCESS_STEPS, SallingProcessTypes, StatusGetExistingPersonalData } from 'webseller/features/saleSim/helpers'
import { getNextStepAfterSaleSim } from './helpers'

export const INIT_SELL_SIM = 'saleSim/INIT_SELL_SIM'
export const INIT_SELL_ESIM = 'saleSim/INIT_SELL_ESIM'
export const INIT_TRANSFER_TO_TELE2 = 'saleSim/INIT_TRANSFER_TO_TELE2'
export const INIT_GIVING_ORDER = 'saleSim/INIT_GIVING_ORDER'

export const ADD_SIM_IN_ORDER = 'saleSim/ADD_SIM_IN_ORDER'
export const ADD_SIM_IN_ORDER_SUCCESS = 'saleSim/ADD_SIM_IN_ORDER_SUCCESS'
export const ADD_SIM_IN_ORDER_ERROR = 'saleSim/ADD_SIM_IN_ORDER_ERROR'

export const SALE_SIMS = 'saleSim/SALE_SIMS'
export const SALE_SIMS_SUCCESS = 'saleSim/SALE_SIMS_SUCCESS'
export const SALE_SIMS_ERROR = 'saleSim/SALE_SIMS_ERROR'
export const SKIP_SALE_SIM = 'saleSim/SKIP_SALE_SIM'

export const OPEN_DOCUMENT_EDIT_MODAL = 'saleSim/OPEN_DOCUMENT_EDIT_MODAL'
export const CLOSE_DOCUMENT_EDIT_MODAL = 'saleSim/CLOSE_DOCUMENT_EDIT_MODAL'

export const GET_SELL_AVAILABILITY = 'saleSim/GET_SELL_AVAILABILITY'
export const GET_SELL_AVAILABILITY_SUCCESS = 'saleSim/GET_SELL_AVAILABILITY_SUCCESS'
export const GET_SELL_AVAILABILITY_ERROR = 'saleSim/GET_SELL_AVAILABILITY_ERROR'

export const GET_SALES_REPORT_FULL = 'saleSim/GET_SALES_REPORT_FULL'
export const GET_SALES_REPORT_FULL_SUCCESS = 'saleSim/GET_SALES_REPORT_FULL_SUCCESS'
export const GET_SALES_REPORT_FULL_ERROR = 'saleSim/GET_SALES_REPORT_FULL_ERROR'

export const GET_SALES_REPORT_SHORT = 'saleSim/GET_SALES_REPORT_SHORT'
export const GET_SALES_REPORT_SHORT_SUCCESS = 'saleSim/GET_SALES_REPORT_SHORT_SUCCESS'
export const GET_SALES_REPORT_SHORT_ERROR = 'saleSim/GET_SALES_REPORT_SHORT_ERROR'
export const SET_SALES_REPORT_SHORT_LOADING = 'saleSim/SET_SALES_REPORT_SHORT_LOADING'

export const GET_SHOP_TARIFFS = 'saleSim/GET_SHOP_TARIFFS'
export const GET_SHOP_TARIFFS_SUCCESS = 'saleSim/GET_SHOP_TARIFFS_SUCCESS'
export const GET_SHOP_TARIFFS_ERROR = 'saleSim/GET_SHOP_TARIFFS_ERROR'

export const GET_SHOP_NUMBERS = 'saleSim/GET_SHOP_NUMBERS'
export const GET_SHOP_NUMBERS_SUCCESS = 'saleSim/GET_SHOP_NUMBERS_SUCCESS'
export const GET_SHOP_NUMBERS_ERROR = 'saleSim/GET_SHOP_NUMBERS_ERROR'
export const SET_SHOP_NUMBERS_INDEX_SEED = 'saleSim/SET_SHOP_NUMBERS_INDEX_SEED'
export const SEARCH_SHOP_NUMBERS = 'saleSim/SEARCH_SHOP_NUMBERS'
export const SEARCH_SHOP_NUMBERS_SUCCESS = 'saleSim/SEARCH_SHOP_NUMBERS_SUCCESS'
export const SEARCH_SHOP_NUMBERS_ERROR = 'saleSim/SEARCH_SHOP_NUMBERS_ERROR'

export const SET_SALLING_PROCESS_STEP = 'saleSim/SET_SALLING_PROCESS_STEP'
export const ADD_SIM = 'saleSim/ADD_SIM'
export const ADD_SIM_SUCCESS = 'saleSim/ADD_SIM_SUCCESS'
export const ADD_ESIM_FROM_STORAGE = 'saleSim/ADD_ESIM_FROM_STORAGE'
export const SET_ADD_SIM_ERROR = 'saleSim/SET_ADD_SIM_ERROR'
export const CHANGE_SIM_TARIFF = 'saleSim/CHANGE_SIM_TARIFF'
export const CHANGE_SIM_NUMBER = 'saleSim/CHANGE_SIM_NUMBER'
export const DELETE_SIM = 'saleSim/DELETE_SIM'
export const CLEAR_ADDED_SIMS = 'saleSim/CLEAR_ADDED_SIMS'

export const SELL_ADDED_SIMS = 'saleSim/SELL_ADDED_SIMS'
export const SELL_ADDED_SIMS_SUCCESS = 'saleSim/SELL_ADDED_SIMS_SUCCESS'
export const SELL_ADDED_SIMS_ERROR = 'saleSim/SELL_ADDED_SIMS_ERROR'

export const CHECK_SIM_MNP = 'saleSim/CHECK_SIM_MNP'
export const CHECK_SIM_MNP_SUCCESS = 'saleSim/CHECK_SIM_MNP_SUCCESS'
export const CHECK_SIM_MNP_ERROR = 'saleSim/CHECK_SIM_MNP_ERROR'

export const GET_TRANSFER_EARLIEST_TIME_SLOT = 'saleSim/GET_TRANSFER_EARLIEST_TIME_SLOT'
export const GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS = 'saleSim/GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS'
export const GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR = 'saleSim/GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR'
export const GET_TRANSFER_TIME_SLOTS = 'saleSim/GET_TRANSFER_TIME_SLOTS'
export const GET_TRANSFER_TIME_SLOTS_SUCCESS = 'saleSim/GET_TRANSFER_TIME_SLOTS_SUCCESS'
export const GET_TRANSFER_TIME_SLOTS_ERROR = 'saleSim/GET_TRANSFER_TIME_SLOTS_ERROR'
export const SUBMIT_TRANSFER_TIME_SLOT = 'saleSim/SUBMIT_TRANSFER_TIME_SLOT'
export const SUBMIT_TRANSFER_ADDITIONAL_INFO_NUMBER = 'saleSim/SUBMIT_TRANSFER_ADDITIONAL_INFO_NUMBER'
export const RETURN_FROM_TRANSFER_TIME_STEP = 'saleSim/RETURN_FROM_TRANSFER_TIME_STEP'

export const SEARCH_COUNTRIES = 'saleSim/SEARCH_COUNTRIES'
export const SEARCH_COUNTRIES_SUCCESS = 'saleSim/SEARCH_COUNTRIES_SUCCESS'
export const SEARCH_COUNTRIES_ERROR = 'saleSim/SEARCH_COUNTRIES_ERROR'

export const SEARCH_CODE_UFMS = 'saleSim/SEARCH_CODE_UFMS'
export const SEARCH_CODE_UFMS_SUCCESS = 'saleSim/SEARCH_CODE_UFMS_SUCCESS'
export const SEARCH_CODE_UFMS_ERROR = 'saleSim/SEARCH_CODE_UFMS_ERROR'
export const CLEAR_CODE_UFMS = 'saleSim/CLEAR_CODE_UFMS'

export const SEARCH_ADDRESSES = 'saleSim/SEARCH_ADDRESSES'
export const SEARCH_ADDRESSES_SUCCESS = 'saleSim/SEARCH_ADDRESSES_SUCCESS'
export const SEARCH_ADDRESSES_ERROR = 'saleSim/SEARCH_ADDRESSES_ERROR'
export const SET_MANUAL_REGISTRATION_ADDRESS = 'saleSim/SET_MANUAL_REGISTRATION_ADDRESS'

export const GET_EXISTING_PERSONAL_DATA = 'saleSim/GET_EXISTING_PERSONAL_DATA'
export const GET_EXISTING_PERSONAL_DATA_SUCCESS = 'saleSim/GET_EXISTING_PERSONAL_DATA_SUCCESS'
export const GET_EXISTING_PERSONAL_DATA_ERROR = 'saleSim/GET_EXISTING_PERSONAL_DATA_ERROR'
export const CANCEL_GET_EXISTING_PERSONAL_DATA = 'saleSim/CANCEL_GET_EXISTING_PERSONAL_DATA'

export const SET_DOCUMENT_DATA = 'saleSim/SET_DOCUMENT_DATA'
export const SET_REGISTRATION_ADDRESS_DATA = 'saleSim/SET_REGISTRATION_ADDRESS_DATA'

export const CHECK_SIM_SALE_AVAILABILITY = 'saleSim/CHECK_SIM_SALE_AVAILABILITY'
export const CHECK_SIM_SALE_AVAILABILITY_SUCCESS = 'saleSim/CHECK_SIM_SALE_AVAILABILITY_SUCCESS'
export const CHECK_SIM_SALE_AVAILABILITY_ERROR = 'saleSim/CHECK_SIM_SALE_AVAILABILITY_ERROR'

export const GET_AGREEMENT_FILES = 'saleSim/GET_AGREEMENT_FILES'
export const GET_AGREEMENT_FILES_SUCCESS = 'saleSim/GET_AGREEMENT_FILES_SUCCESS'
export const GET_AGREEMENT_FILES_ERROR = 'saleSim/GET_AGREEMENT_FILES_ERROR'
export const DOWNLOAD_AGREEMENT_FILE = 'saleSim/DOWNLOAD_AGREEMENT_FILE'
export const DOWNLOAD_AGREEMENT_FILE_SUCCESS = 'saleSim/DOWNLOAD_AGREEMENT_FILE_SUCCESS'
export const DOWNLOAD_AGREEMENT_FILE_ERROR = 'saleSim/DOWNLOAD_AGREEMENT_FILE_ERROR'

export const GET_PEP_NUMBERS = 'saleSim/GET_PEP_NUMBERS'
export const GET_SMS_CODE = 'saleSim/GET_SMS_CODE'
export const GET_DOCUMENT_CODE = 'saleSim/GET_DOCUMENT_CODE'
export const CHECK_PEP_CODE = 'saleSim/CHECK_PEP_CODE'
export const GET_PAPER_DOCUMENTS = 'saleSim/GET_PAPER_DOCUMENTS'

export const SET_SIGNING_TYPE = 'saleSim/SET_SIGNING_TYPE'

export const REGISTER_SIMS = 'saleSim/REGISTER_SIMS'
export const REGISTER_SIMS_SUCCESS = 'saleSim/REGISTER_SIMS_SUCCESS'
export const REGISTER_SIMS_ERROR = 'saleSim/REGISTER_SIMS_ERROR'

export const SET_REGISTRATION_SIM_DATA = 'saleSim/SET_REGISTRATION_SIM_DATA'

export const CHECK_ADDRESS = 'saleSim/CHECK_ADDRESS'
export const CHECK_ADDRESS_SUCCESS = 'saleSim/CHECK_ADDRESS_SUCCESS'
export const CHECK_ADDRESS_ERROR = 'saleSim/CHECK_ADDRESS_ERROR'

export const DOWNLOAD_REGISTER_SIM_INSTRUCTION = 'saleSim/DOWNLOAD_REGISTER_SIM_INSTRUCTION'
export const DOWNLOAD_REGISTER_SIM_INSTRUCTION_SUCCESS = 'saleSim/DOWNLOAD_REGISTER_SIM_INSTRUCTION_SUCCESS'
export const DOWNLOAD_REGISTER_SIM_INSTRUCTION_ERROR = 'saleSim/DOWNLOAD_REGISTER_SIM_INSTRUCTION_ERROR'

export const ADD_PERSONAL_ACCOUNT_STEP = 'saleSim/ADD_PERSONAL_ACCOUNT_STEP'

export const ADD_PERSONAL_ACCOUNT_NUMBER = 'saleSim/ADD_PERSONAL_ACCOUNT_NUMBER'
export const ADD_PERSONAL_ACCOUNT_NUMBER_SUCCESS = 'saleSim/ADD_PERSONAL_ACCOUNT_NUMBER_SUCCESS'
export const ADD_PERSONAL_ACCOUNT_NUMBER_ERROR = 'saleSim/ADD_PERSONAL_ACCOUNT_NUMBER_ERROR'

export const CONNECT_BROADBAND = 'saleSim/CONNECT_BROADBAND'

export const RESET_PERSONAL_ACCOUNT_NUMBER = 'saleSim/RESET_PERSONAL_ACCOUNT_NUMBER'

export const CREATE_MNP_ORDER = 'saleSim/CREATE_MNP_ORDER'

export const CLEAR_FOUND_ADDRESSES = 'saleSim/CLEAR_FOUND_ADDRESSES'
export const RESET_SALE_SIM_PROCESS = 'saleSim/RESET_SALE_SIM_PROCESS'

const initialState = {
  sallingProcessType: SallingProcessTypes.DEFAULT,

  sellAvailability: null,
  isSellAvailabilityLoading: false,
  isSellAvailabilityError: false,

  salesReportShort: null,
  isSalesReportShortLoading: false,
  isSalesReportShortError: false,

  salesReportFull: null,
  isSalesReportFullLoading: false,
  isSalesReportFullError: false,

  shopTariffs: null,
  isShopTariffsLoading: false,
  isShopTariffsError: false,

  shopNumbers: null,
  shopNumbersIndexSeed: null,
  foundShopNumbers: null,
  isShopNumbersLoading: false,
  isShopNumbersError: false,

  sallingProcessStep: SALLING_PROCESS_STEPS.NONE,
  addedSims: [],
  isAddSimProcessing: false,
  addSimError: null,

  simsInOrder: null,

  soldSims: null,
  isSaleAddedSimsLoading: false,
  isSaleAddedSimsError: false,

  transferNumber: null,
  transferNumberOld: null,
  isCheckSimMnpLoading: false,
  checkSimMnpError: null,

  transferEarliestTimeSlot: null,
  isTransferEarliestTimeSlotLoading: false,
  transferTimeSlots: null,
  isTransferTimeSlotsLoading: false,
  submittedTransferTimeSlot: null,
  transferAdditionalInfoNumber: null,

  countries: null,
  isSearchCountriesLoading: false,
  isSearchCountriesError: false,

  codeUFMS: null,
  isSearchCodeUFMSLoading: false,
  isSearchCodeUFMSError: false,

  foundAddresses: null,
  isSearchAddressLoading: false,
  isSearchAddressError: false,
  isManualAddressSearch: false,

  isExistsIdentityDoc: false,
  statusGetExistingPersonalData: StatusGetExistingPersonalData.NONE,
  existingPersonalData: null,

  documentData: null,
  registrationAddressData: null,

  isCheckSimSaleAvailabilityLoading: false,
  checkSimSaleAvailabilityError: null,

  agreementFiles: null,
  isAgreementFilesLoading: false,
  isAgreementFilesError: false,

  isLoadingRegisterSimInstruction: false,

  isDocumentEditModalOpen: false,

  simSellId: null,
  isAddedNewIcc: true,
  isLoadingSaleSim: false,
  errorSaleSim: false,

  showPersonalAccountStep: false,
  mainClientName: null,
  isAddingPersonalAccountLoading: false,
  addingPersonalAccountError: false,

  checkAddressLoading: false,
  isAvailableBroadbandConnect: false,
  messageBroadbandConnect: null
}

export const initSellSim = createAction(INIT_SELL_SIM)
export const initSellESim = createAction(INIT_SELL_ESIM)
export const initTransferToTele2 = createAction(INIT_TRANSFER_TO_TELE2)
export const initGivingOrder = createAction(INIT_GIVING_ORDER)

export const openDocumentEditModal = createAction(OPEN_DOCUMENT_EDIT_MODAL)
export const closeDocumentEditModal = createAction(CLOSE_DOCUMENT_EDIT_MODAL)

export const getSellAvailability = createAction(GET_SELL_AVAILABILITY)
export const getSellAvailabilitySuccess = createAction(GET_SELL_AVAILABILITY_SUCCESS)
export const getSellAvailabilityError = createAction(GET_SELL_AVAILABILITY_ERROR)

export const getSalesReportFull = createAction(GET_SALES_REPORT_FULL)
export const getSalesReportFullSuccess = createAction(GET_SALES_REPORT_FULL_SUCCESS)
export const getSalesReportFullError = createAction(GET_SALES_REPORT_FULL_ERROR)

export const getSalesReportShort = createAction(GET_SALES_REPORT_SHORT)
export const getSalesReportShortSuccess = createAction(GET_SALES_REPORT_SHORT_SUCCESS)
export const getSalesReportShortError = createAction(GET_SALES_REPORT_SHORT_ERROR)
export const setSalesReportShortLoading = createAction(SET_SALES_REPORT_SHORT_LOADING)

export const getShopTariffs = createAction(GET_SHOP_TARIFFS)
export const getShopTariffsSuccess = createAction(GET_SHOP_TARIFFS_SUCCESS)
export const getShopTariffsError = createAction(GET_SHOP_TARIFFS_ERROR)

export const getShopNumbers = createAction(GET_SHOP_NUMBERS)
export const getShopNumbersSuccess = createAction(GET_SHOP_NUMBERS_SUCCESS)
export const getShopNumbersError = createAction(GET_SHOP_NUMBERS_ERROR)
export const setShopNumbersIndexSeed = createAction(SET_SHOP_NUMBERS_INDEX_SEED)
export const getSearchShopNumbers = createAction(SEARCH_SHOP_NUMBERS)
export const getSearchShopNumbersSuccess = createAction(SEARCH_SHOP_NUMBERS_SUCCESS)

export const setSallingProcessStep = createAction(SET_SALLING_PROCESS_STEP)
export const addSim = createAction(ADD_SIM)
export const addSimSuccess = createAction(ADD_SIM_SUCCESS)
export const addESimFromStorage = createAction(ADD_ESIM_FROM_STORAGE)
export const setAddSimError = createAction(SET_ADD_SIM_ERROR)
export const changeSimTariff = createAction(CHANGE_SIM_TARIFF)
export const changeSimNumber = createAction(CHANGE_SIM_NUMBER)
export const deleteSim = createAction(DELETE_SIM)
export const clearAddedSims = createAction(CLEAR_ADDED_SIMS)

export const addSimInOrder = createAction(ADD_SIM_IN_ORDER)
export const addSimInOrderSuccess = createAction(ADD_SIM_IN_ORDER_SUCCESS)
export const addSimInOrderError = createAction(ADD_SIM_IN_ORDER_ERROR)

export const saleSim = createAction(SALE_SIMS)
export const saleSimSuccess = createAction(SALE_SIMS_SUCCESS)
export const saleSimError = createAction(SALE_SIMS_ERROR)
export const skipSaleSim = createAction(SKIP_SALE_SIM)

export const sellAddedSims = createAction(SELL_ADDED_SIMS)
export const sellAddedSimsSuccess = createAction(SELL_ADDED_SIMS_SUCCESS)
export const sellAddedSimsError = createAction(SELL_ADDED_SIMS_ERROR)

export const checkSimMnp = createAction(CHECK_SIM_MNP)
export const checkSimMnpSuccess = createAction(CHECK_SIM_MNP_SUCCESS)
export const checkSimMnpError = createAction(CHECK_SIM_MNP_ERROR)

export const getTransferEarliestTimeSlot = createAction(GET_TRANSFER_EARLIEST_TIME_SLOT)
export const getTransferEarliestTimeSlotSuccess = createAction(GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS)
export const getTransferEarliestTimeSlotError = createAction(GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR)
export const getTransferTimeSlots = createAction(GET_TRANSFER_TIME_SLOTS)
export const getTransferTimeSlotsSucess = createAction(GET_TRANSFER_TIME_SLOTS_SUCCESS)
export const getTransferTimeSlotsError = createAction(GET_TRANSFER_TIME_SLOTS_ERROR)
export const submitTransferTimeSlot = createAction(SUBMIT_TRANSFER_TIME_SLOT)
export const submitTransferAdditionalInfoNumber = createAction(SUBMIT_TRANSFER_ADDITIONAL_INFO_NUMBER)
export const returnFromTransferTimeStep = createAction(RETURN_FROM_TRANSFER_TIME_STEP)

export const searchCountries = createAction(SEARCH_COUNTRIES)
export const searchCountriesSuccess = createAction(SEARCH_COUNTRIES_SUCCESS)
export const searchCountriesError = createAction(SEARCH_COUNTRIES_ERROR)

export const searchCodeUFMS = createAction(SEARCH_CODE_UFMS)
export const searchCodeUFMSSuccess = createAction(SEARCH_CODE_UFMS_SUCCESS)
export const searchCodeUFMSError = createAction(SEARCH_CODE_UFMS_ERROR)
export const clearCodeUFMS = createAction(CLEAR_CODE_UFMS)

export const searchAddresses = createAction(SEARCH_ADDRESSES)
export const searchAddressesSuccess = createAction(SEARCH_ADDRESSES_SUCCESS)
export const searchAddressesError = createAction(SEARCH_ADDRESSES_ERROR)
export const setRegistrationAddressManually = createAction(SET_MANUAL_REGISTRATION_ADDRESS)

export const getExistingPersonalData = createAction(GET_EXISTING_PERSONAL_DATA)
export const getExistingPersonalDataSuccess = createAction(GET_EXISTING_PERSONAL_DATA_SUCCESS)
export const getExistingPersonalDataError = createAction(GET_EXISTING_PERSONAL_DATA_ERROR)
export const cancelGetExistingPersonalData = createAction(CANCEL_GET_EXISTING_PERSONAL_DATA)

export const setDocumentData = createAction(SET_DOCUMENT_DATA)
export const setRegistrationAddressData = createAction(SET_REGISTRATION_ADDRESS_DATA)

export const checkSimSaleAvailability = createAction(CHECK_SIM_SALE_AVAILABILITY)
export const checkSimSaleAvailabilitySuccess = createAction(CHECK_SIM_SALE_AVAILABILITY_SUCCESS)
export const checkSimSaleAvailabilityError = createAction(CHECK_SIM_SALE_AVAILABILITY_ERROR)

export const getAgreementFiles = createAction(GET_AGREEMENT_FILES)
export const getAgreementFilesSuccess = createAction(GET_AGREEMENT_FILES_SUCCESS)
export const getAgreementFilesError = createAction(GET_AGREEMENT_FILES_ERROR)
export const downloadAgreementFile = createAction(DOWNLOAD_AGREEMENT_FILE)
export const downloadAgreementFileSuccess = createAction(DOWNLOAD_AGREEMENT_FILE_SUCCESS)
export const downloadAgreementFileError = createAction(DOWNLOAD_AGREEMENT_FILE_ERROR)

export const getPepNumbers = createAction(GET_PEP_NUMBERS)
export const getSmsCode = createAction(GET_SMS_CODE)
export const getDocumentCode = createAction(GET_DOCUMENT_CODE)
export const checkPepCode = createAction(CHECK_PEP_CODE)
export const getPaperDocuments = createAction(GET_PAPER_DOCUMENTS)

export const setSigningType = createAction(SET_SIGNING_TYPE)

export const registerSims = createAction(REGISTER_SIMS)
export const registerSimsSuccess = createAction(REGISTER_SIMS_SUCCESS)
export const registerSimsError = createAction(REGISTER_SIMS_ERROR)

export const setRegistrationSimData = createAction(SET_REGISTRATION_SIM_DATA)

export const downloadRegisterSimInstruction = createAction(DOWNLOAD_REGISTER_SIM_INSTRUCTION)
export const downloadRegisterSimInstructionSuccess = createAction(DOWNLOAD_REGISTER_SIM_INSTRUCTION_SUCCESS)
export const downloadRegisterSimInstructionError = createAction(DOWNLOAD_REGISTER_SIM_INSTRUCTION_ERROR)

export const addPersonalAccountStep = createAction(ADD_PERSONAL_ACCOUNT_STEP)
export const addPersonalAccountNumber = createAction(ADD_PERSONAL_ACCOUNT_NUMBER)
export const addPersonalAccountNumberSuccess = createAction(ADD_PERSONAL_ACCOUNT_NUMBER_SUCCESS)
export const addPersonalAccountNumberError = createAction(ADD_PERSONAL_ACCOUNT_NUMBER_ERROR)
export const resetPersonalAccountNumber = createAction(RESET_PERSONAL_ACCOUNT_NUMBER)

export const createMnpOrderSaleSim = createAction(CREATE_MNP_ORDER)

export const checkAddress = createAction(CHECK_ADDRESS)
export const checkAddressSuccess = createAction(CHECK_ADDRESS_SUCCESS)
export const checkAddressError = createAction(CHECK_ADDRESS_ERROR)

export const connectBroadbandSaleSim = createAction(CONNECT_BROADBAND)

export const clearFoundAddresses = createAction(CLEAR_FOUND_ADDRESSES)
export const resetSaleSimProcess = createAction(RESET_SALE_SIM_PROCESS)

export default handleActions({
  [INIT_SELL_SIM]: produce((state) => {
    state.sallingProcessType = SallingProcessTypes.DEFAULT
    state.sallingProcessStep = SALLING_PROCESS_STEPS.ADD
  }),
  [INIT_SELL_ESIM]: produce((state) => {
    const defaultNumber = state.shopNumbers?.[0].numbersList?.[0]
    const { price: defaultNumberPrice, salePrice: defaultNumberSalePrice, categorySlug: numberSlug } = state.shopNumbers?.[0] || {}
    const defaultTariff = state.shopTariffs?.tariffsList?.find((tariff) => tariff.defaultTariffForNumberSets)
    const firstTariff = state.shopTariffs?.tariffsList?.[0]
    const tariff = defaultTariff || firstTariff
    const newESim = {
      id: uuid(),
      simTypeId: 2, // simTypeId = 1 (SIM), simTypeId = 2 (eSIM)
      tariff,
      number: defaultNumber,
      numberPrice: defaultNumberSalePrice || defaultNumberPrice,
      numberSlug,
      hasBeautifulNumber: false,
      partyTypeId: 2
    }
    state.addedSims.push(newESim)
    state.sallingProcessType = SallingProcessTypes.DEFAULT
    state.sallingProcessStep = SALLING_PROCESS_STEPS.SALE
  }),
  [INIT_TRANSFER_TO_TELE2]: produce((state) => {
    state.sallingProcessType = SallingProcessTypes.TRANSFER
    state.sallingProcessStep = SALLING_PROCESS_STEPS.ADD
  }),
  [INIT_GIVING_ORDER]: produce((state, { payload }) => {
    state.simsInOrder = payload.simCards.map((sim) => ({
      id: uuid(),
      tariff: sim.tariff.name,
      tariffPrice: sim.tariff.price,
      msisdn: sim.msisdn.value,
      numberPrice: sim.msisdn.price,
      salePrice: sim.msisdn.salePrice,
      hasBeautifulNumber: sim.msisdn.category > 1,
      msisdnCategory: sim.msisdn.category
    }))
    state.sallingProcessType = payload?.isMnp ? SallingProcessTypes.MNP_ORDER : SallingProcessTypes.ORDER
    state.sallingProcessStep = SALLING_PROCESS_STEPS.SCAN_SIMS_IN_ORDER
  }),

  [OPEN_DOCUMENT_EDIT_MODAL]: produce((state) => {
    state.isDocumentEditModalOpen = true
  }),
  [CLOSE_DOCUMENT_EDIT_MODAL]: produce((state) => {
    state.isDocumentEditModalOpen = false
  }),
  [GET_SELL_AVAILABILITY]: produce((state) => {
    state.isSellAvailabilityLoading = true
  }),
  [GET_SELL_AVAILABILITY_SUCCESS]: produce((state, { payload }) => {
    state.sellAvailability = payload.sellAvailability
    state.isSellAvailabilityLoading = false
    state.isSellAvailabilityError = false
  }),
  [GET_SELL_AVAILABILITY_ERROR]: produce((state) => {
    state.isSellAvailabilityLoading = false
    state.isSellAvailabilityError = true
  }),

  [GET_SALES_REPORT_FULL]: produce((state) => {
    state.isSalesReportFullLoading = true
  }),
  [GET_SALES_REPORT_FULL_SUCCESS]: produce((state, { payload }) => {
    state.salesReportFull = payload.salesReportFull
    state.isSalesReportFullLoading = false
    state.isSalesReportFullError = false
  }),
  [GET_SALES_REPORT_FULL_ERROR]: produce((state) => {
    state.isSalesReportFullLoading = false
    state.isSalesReportFullError = true
  }),

  [GET_SALES_REPORT_SHORT]: produce((state) => {
    state.isSalesReportShortLoading = true
  }),
  [GET_SALES_REPORT_SHORT_SUCCESS]: produce((state, { payload }) => {
    state.salesReportShort = payload.salesReportShort
    state.isSalesReportShortLoading = false
    state.isSalesReportShortError = false
  }),
  [GET_SALES_REPORT_SHORT_ERROR]: produce((state) => {
    state.isSalesReportShortLoading = false
    state.isSalesReportShortError = true
  }),
  [SET_SALES_REPORT_SHORT_LOADING]: produce((state, payload) => {
    state.isSalesReportShortLoading = payload
  }),

  [GET_SHOP_TARIFFS]: produce((state) => {
    state.isShopTariffsLoading = true
  }),
  [GET_SHOP_TARIFFS_SUCCESS]: produce((state, { payload }) => {
    state.shopTariffs = payload.shopTariffs
    state.isShopTariffsLoading = false
    state.isShopTariffsError = false
  }),
  [GET_SHOP_TARIFFS_ERROR]: produce((state) => {
    state.isShopTariffsLoading = false
    state.isShopTariffsError = true
  }),

  [GET_SHOP_NUMBERS]: produce((state) => {
    state.isShopNumbersLoading = true
  }),
  [GET_SHOP_NUMBERS_SUCCESS]: produce((state, { payload }) => {
    state.shopNumbers = payload.shopNumbers
    state.isShopNumbersLoading = false
    state.isShopNumbersError = false
  }),
  [GET_SHOP_NUMBERS_ERROR]: produce((state) => {
    state.isShopNumbersLoading = false
    state.isShopNumbersError = true
  }),
  [SET_SHOP_NUMBERS_INDEX_SEED]: produce((state, { payload }) => {
    state.shopNumbersIndexSeed = payload
  }),
  [SEARCH_SHOP_NUMBERS]: produce((state) => {
    state.isShopNumbersLoading = false
    state.isShopNumbersError = true
  }),
  [SEARCH_SHOP_NUMBERS_SUCCESS]: produce((state, { payload }) => {
    state.foundShopNumbers = payload.shopNumbers
    state.isShopNumbersLoading = false
    state.isShopNumbersError = true
  }),

  [SET_SALLING_PROCESS_STEP]: produce((state, { payload }) => {
    state.sallingProcessStep = payload
  }),
  [ADD_SIM]: produce((state) => {
    state.isAddSimProcessing = true
  }),
  [ADD_SIM_SUCCESS]: produce((state, { payload }) => {
    const isAlreadyAddedIcc = state.addedSims.some((sim) => sim.icc === payload.icc)
    state.isAddedNewIcc = !isAlreadyAddedIcc

    if (isAlreadyAddedIcc) {
      state.addSimError = 'SIM-карта уже была добавлена'
      state.isAddSimProcessing = false
      return
    }
    const isUntemplatedSIM = payload.partyTypeId === 2 || payload.partyTypeId === 4
    if (isUntemplatedSIM) {
      const defaultNumber = state.shopNumbers?.[0].numbersList?.[0]
      const { price: defaultNumberPrice, salePrice: defaultNumberSalePrice, categorySlug: numberSlug } = state.shopNumbers?.[0] || {}
      const defaultTariff = state.shopTariffs?.tariffsList?.find((tariff) => tariff.defaultTariffForNumberSets)
      const firstTariff = state.shopTariffs?.tariffsList?.[0]
      const tariff = defaultTariff || firstTariff
      const newSim = {
        id: uuid(),
        simTypeId: payload.simTypeId,
        icc: payload.icc,
        branchId: payload.branchId,
        partyTypeId: payload.partyTypeId,
        tariff,
        number: defaultNumber,
        numberPrice: defaultNumberSalePrice || defaultNumberPrice,
        numberSlug,
        hasBeautifulNumber: false,
        balance: payload.balance
      }
      state.addedSims.push(newSim)
      if (!state.showPersonalAccountStep) {
        state.sallingProcessStep = SALLING_PROCESS_STEPS.SALE
      }
    } else {
      const tariffName = payload.trplName
      const number = payload.msisdn
      if (tariffName && number) {
        const newSim = {
          id: uuid(),
          simTypeId: payload.simTypeId,
          icc: payload.icc,
          branchId: payload.branchId,
          partyTypeId: payload.partyTypeId,
          tariff: { name: tariffName },
          number,
          hasBeautifulNumber: false,
          balance: payload.balance
        }
        state.addedSims.push(newSim)
        if (!state.showPersonalAccountStep) {
          state.sallingProcessStep = SALLING_PROCESS_STEPS.SALE
        }
      } else {
        state.addSimError = 'SIM-карта недоступна для продажи'
      }
    }
    state.isAddSimProcessing = false
  }),
  [ADD_ESIM_FROM_STORAGE]: produce((state) => {
    const defaultNumber = state.shopNumbers?.[0].numbersList?.[0]
    const { price: defaultNumberPrice, salePrice: defaultNumberSalePrice, categorySlug: numberSlug } = state.shopNumbers?.[0] || {}
    const defaultTariff = state.shopTariffs?.tariffsList?.find((tariff) => tariff.defaultTariffForNumberSets)
    const firstTariff = state.shopTariffs?.tariffsList?.[0]
    const tariff = defaultTariff || firstTariff
    const newESim = {
      id: uuid(),
      simTypeId: 2, // simTypeId = 1 (SIM), simTypeId = 2 (eSIM)
      tariff,
      number: defaultNumber,
      numberPrice: defaultNumberSalePrice || defaultNumberPrice,
      numberSlug,
      hasBeautifulNumber: false,
      partyTypeId: 2
    }
    state.addedSims.push(newESim)
    state.sallingProcessStep = SALLING_PROCESS_STEPS.SALE
  }),
  [SET_ADD_SIM_ERROR]: produce((state, { payload }) => {
    state.addSimError = payload
    state.isAddSimProcessing = false
  }),

  [ADD_SIM_IN_ORDER]: produce((state, { payload }) => {
    const foundSim = state.simsInOrder.find(sim => sim.id === payload.id)
    if (foundSim) {
      foundSim.isLoadingAddSim = true
      foundSim.errorAddSim = null
    }
  }),
  [ADD_SIM_IN_ORDER_SUCCESS]: produce((state, { payload }) => {
    const foundSim = state.simsInOrder.find(sim => sim.id === payload.id)
    if (foundSim) {
      const isAlreadyAddedIcc = state.addedSims.some((sim) => sim.icc === payload.availability.icc)
      if (isAlreadyAddedIcc) {
        foundSim.isLoadingAddSim = false
        foundSim.errorAddSim = 'SIM-карта уже была добавлена'
        return
      }
      // const tariff = state.shopTariffs?.tariffsList?.find((tariff) => tariff.name === payload.tariff)
      const tariff = { name: payload.tariff }
      const number = payload.availability.msisdn || foundSim.msisdn
      const { hasBeautifulNumber, msisdnCategory, salePrice } = foundSim
      const newSim = {
        id: uuid(),
        simTypeId: payload.availability.simTypeId,
        icc: payload.availability.icc,
        branchId: payload.availabilitybranchId,
        partyTypeId: payload.availability.partyTypeId,
        tariff,
        number,
        hasBeautifulNumber,
        msisdnCategory,
        salePrice,
        balance: payload.availability.balance
      }
      state.addedSims = [newSim]
      foundSim.icc = payload.availability.icc
      foundSim.isLoadingAddSim = false
      foundSim.errorAddSim = null
    }
  }),
  [ADD_SIM_IN_ORDER_ERROR]: produce((state, { payload }) => {
    const foundSim = state.simsInOrder.find(sim => sim.id === payload.id)
    if (foundSim) {
      foundSim.icc = null
      foundSim.isLoadingAddSim = false
      foundSim.errorAddSim = payload.message
    }
  }),

  [CHANGE_SIM_TARIFF]: produce((state, { payload }) => {
    const foundSim = state.addedSims.find(sim => sim.id === payload.simId)
    if (foundSim) {
      const newTariff = state.shopTariffs?.tariffsList?.find((tariff) => tariff.name === payload.tariffName)
      if (newTariff) {
        foundSim.tariff = newTariff
      }
    }
  }),
  [CHANGE_SIM_NUMBER]: produce((state, { payload }) => {
    const { number, slug, price, salePrice, simId } = payload
    const foundSim = state.addedSims.find(sim => sim.id === simId)
    if (foundSim) {
      foundSim.number = number
      foundSim.numberPrice = Number(salePrice || price)
      if (slug !== 'normal') {
        foundSim.hasBeautifulNumber = true
        foundSim.numberSlug = slug
      }
    }
  }),
  [DELETE_SIM]: produce((state, { payload }) => {
    state.addedSims = state.addedSims.filter((sim) => sim.id !== payload)
  }),
  [CLEAR_ADDED_SIMS]: produce((state) => {
    state.addedSims = []
  }),

  [SELL_ADDED_SIMS]: produce((state) => {
    state.isSaleAddedSimsLoading = true
    state.isSaleAddedSimsError = false
  }),
  [SELL_ADDED_SIMS_SUCCESS]: produce((state, { payload }) => {
    const nextStep = state.sallingProcessType === SallingProcessTypes.TRANSFER
      ? SALLING_PROCESS_STEPS.TRANSFER_NUMBER
      : SALLING_PROCESS_STEPS.DOCUMENT_DATA

    state.isSaleAddedSimsLoading = false
    state.soldSims = payload
    state.addedSims.forEach(sim => {
      sim.soldData = {
        number: sim.number,
        tariff: sim.tariff
      }
    })
    state.sallingProcessStep = nextStep
  }),
  [SELL_ADDED_SIMS_ERROR]: produce((state) => {
    state.isSaleAddedSimsLoading = false
    state.isSaleAddedSimsError = true
  }),

  [CHECK_SIM_MNP]: produce((state) => {
    state.isCheckSimMnpLoading = true
    state.checkSimMnpError = null
  }),
  [CHECK_SIM_MNP_SUCCESS]: produce((state, { payload }) => {
    const { newNumber, oldNumber } = payload
    state.transferNumber = newNumber
    state.transferNumberOld = oldNumber
    state.isCheckSimMnpLoading = false
    state.sallingProcessStep = SALLING_PROCESS_STEPS.TRANSFER_TIME
  }),
  [CHECK_SIM_MNP_ERROR]: produce((state, { payload }) => {
    state.isCheckSimMnpLoading = false
    state.checkSimMnpError = payload
  }),

  [GET_TRANSFER_EARLIEST_TIME_SLOT]: produce((state) => {
    state.isTransferEarliestTimeSlotLoading = true
  }),
  [GET_TRANSFER_EARLIEST_TIME_SLOT_SUCCESS]: produce((state, { payload }) => {
    state.transferEarliestTimeSlot = payload
    state.isTransferEarliestTimeSlotLoading = false
  }),
  [GET_TRANSFER_EARLIEST_TIME_SLOT_ERROR]: produce((state) => {
    state.isTransferEarliestTimeSlotLoading = false
  }),
  [GET_TRANSFER_TIME_SLOTS]: produce((state) => {
    state.isTransferTimeSlotsLoading = true
  }),
  [GET_TRANSFER_TIME_SLOTS_SUCCESS]: produce((state, { payload }) => {
    state.transferTimeSlots = payload
    state.isTransferTimeSlotsLoading = false
  }),
  [GET_TRANSFER_TIME_SLOTS_ERROR]: produce((state) => {
    state.isTransferTimeSlotsLoading = false
  }),
  [SUBMIT_TRANSFER_TIME_SLOT]: produce((state, { payload }) => {
    state.submittedTransferTimeSlot = payload
    state.sallingProcessStep = SALLING_PROCESS_STEPS.DOCUMENT_DATA
  }),
  [RETURN_FROM_TRANSFER_TIME_STEP]: produce((state) => {
    const isMnpOrder = state.sallingProcessType === SallingProcessTypes.MNP_ORDER
    const nextStep = isMnpOrder ? SALLING_PROCESS_STEPS.SCAN_SIMS_IN_ORDER : SALLING_PROCESS_STEPS.TRANSFER_NUMBER

    state.sallingProcessStep = nextStep
  }),

  [SEARCH_COUNTRIES]: produce((state) => {
    state.isSearchCountriesLoading = true
  }),
  [SEARCH_COUNTRIES_SUCCESS]: produce((state, { payload }) => {
    state.countries = payload
    state.isSearchCountriesLoading = false
    state.isSearchCountriesError = false
  }),
  [SEARCH_COUNTRIES_ERROR]: produce((state) => {
    state.countries = null
    state.isSearchCountriesLoading = false
    state.isSearchCountriesError = true
  }),

  [SEARCH_CODE_UFMS]: produce((state) => {
    state.isSearchCodeUFMSLoading = true
  }),
  [SEARCH_CODE_UFMS_SUCCESS]: produce((state, { payload }) => {
    state.codeUFMS = payload
    state.isSearchCodeUFMSLoading = false
    state.isSearchCodeUFMSError = false
  }),
  [SEARCH_CODE_UFMS_ERROR]: produce((state) => {
    state.countries = null
    state.isSearchCodeUFMSLoading = false
    state.isSearchCodeUFMSError = true
  }),
  [CLEAR_CODE_UFMS]: produce((state) => {
    state.codeUFMS = null
  }),

  [SEARCH_ADDRESSES]: produce((state) => {
    state.isSearchAddressLoading = true
  }),
  [SEARCH_ADDRESSES_SUCCESS]: produce((state, { payload }) => {
    state.foundAddresses = payload
    state.isSearchAddressLoading = false
    state.isSearchAddressError = false
    state.isManualAddressSearch = false
  }),
  [SEARCH_ADDRESSES_ERROR]: produce((state) => {
    state.foundAddresses = null
    state.isSearchAddressLoading = false
    state.isSearchAddressError = true
    state.isManualAddressSearch = false
  }),
  [SET_MANUAL_REGISTRATION_ADDRESS]: produce((state, { payload }) => {
    state.foundAddresses = payload
    state.isSearchAddressLoading = false
    state.isSearchAddressError = false
    state.isManualAddressSearch = true
  }),

  [GET_EXISTING_PERSONAL_DATA_SUCCESS]: produce((state, { payload }) => {
    state.isExistsIdentityDoc = payload.isExists
    state.statusGetExistingPersonalData = StatusGetExistingPersonalData.SUCCESS
    state.existingPersonalData = payload.personalData
  }),
  [GET_EXISTING_PERSONAL_DATA_ERROR]: produce((state) => {
    state.statusGetExistingPersonalData = StatusGetExistingPersonalData.ERROR
  }),

  [SET_DOCUMENT_DATA]: produce((state, { payload }) => {
    state.documentData = payload
  }),
  [SET_REGISTRATION_ADDRESS_DATA]: produce((state, { payload }) => {
    state.registrationAddressData = payload
  }),

  [CHECK_SIM_SALE_AVAILABILITY]: produce((state) => {
    state.isCheckSimSaleAvailabilityLoading = true
    state.checkSimSaleAvailabilityError = null
  }),
  [CHECK_SIM_SALE_AVAILABILITY_SUCCESS]: produce((state) => {
    state.sallingProcessStep = SALLING_PROCESS_STEPS.SIGNING
    state.isCheckSimSaleAvailabilityLoading = false
  }),
  [CHECK_SIM_SALE_AVAILABILITY_ERROR]: produce((state, { payload }) => {
    state.isCheckSimSaleAvailabilityLoading = false
    state.checkSimSaleAvailabilityError = payload
  }),

  [GET_AGREEMENT_FILES]: produce((state) => {
    state.isAgreementFilesLoading = true
    state.isAgreementFilesError = false
  }),
  [GET_AGREEMENT_FILES_SUCCESS]: produce((state, { payload }) => {
    state.agreementFiles = payload
    state.isAgreementFilesLoading = false
  }),
  [GET_AGREEMENT_FILES_ERROR]: produce((state) => {
    state.agreementFiles = null
    state.isAgreementFilesLoading = false
    state.isAgreementFilesError = true
  }),

  [SET_SIGNING_TYPE]: produce((state, { payload }) => {
    state.signingType = payload
  }),

  [DOWNLOAD_REGISTER_SIM_INSTRUCTION]: produce((state) => {
    state.isLoadingRegisterSimInstruction = true
  }),
  [combineActions(DOWNLOAD_REGISTER_SIM_INSTRUCTION_SUCCESS, DOWNLOAD_REGISTER_SIM_INSTRUCTION_ERROR)]: produce((state) => {
    state.isLoadingRegisterSimInstruction = false
  }),

  [SET_REGISTRATION_SIM_DATA]: produce((state, { payload }) => {
    const sim = state.addedSims.find(({ id }) => id === payload.id)

    if (sim) {
      sim.registration = payload.data
      sim.icc = payload.data.icc || sim.icc
    }
  }),

  [SALE_SIMS]: produce((state) => {
    state.isLoadingSaleSim = true
  }),
  [SALE_SIMS_SUCCESS]: produce((state, { payload }) => {
    const { simSellId, simCards } = payload.simSell
    const simsWithIcc = payload.saleSimBody.simCards
    state.simSellId = simSellId
    state.soldSims = simCards.map((sim) => ({
      ...sim,
      simSellId,
      number: sim.msisdn,
      icc: simsWithIcc.find(({ msisdn }) => (sim.msisdn === msisdn)).icc
    }))
    state.isLoadingSaleSim = false
    state.sallingProcessStep = getNextStepAfterSaleSim(state.sallingProcessType)
  }),
  [SALE_SIMS_ERROR]: produce((state) => {
    state.isLoadingSaleSim = false
    state.errorSaleSim = true
  }),
  [SKIP_SALE_SIM]: produce((state) => {
    state.isLoadingSaleSim = false
    state.sallingProcessStep = getNextStepAfterSaleSim(state.sallingProcessType)
  }),

  [ADD_PERSONAL_ACCOUNT_STEP]: produce((state) => {
    state.showPersonalAccountStep = true
  }),
  [ADD_PERSONAL_ACCOUNT_NUMBER]: produce((state) => {
    state.isAddingPersonalAccountLoading = true
  }),
  [ADD_PERSONAL_ACCOUNT_NUMBER_SUCCESS]: produce((state, { payload }) => {
    state.mainClientName = payload?.mainClientName
    state.isAddingPersonalAccountLoading = false
    state.addingPersonalAccountError = false
    state.sallingProcessStep = SALLING_PROCESS_STEPS.SALE
  }),
  [ADD_PERSONAL_ACCOUNT_NUMBER_ERROR]: produce((state, { payload }) => {
    state.isAddingPersonalAccountLoading = false
    state.addingPersonalAccountError = true
    if (payload) {
      state.addingPersonalAccountError = payload
    } else {
      state.sallingProcessStep = SALLING_PROCESS_STEPS.SALE
    }
  }),
  [RESET_PERSONAL_ACCOUNT_NUMBER]: produce((state) => {
    state.showPersonalAccountStep = false
    state.mainClientName = null
    state.isAddingPersonalAccountLoading = false
    state.addingPersonalAccountError = false
  }),

  [CHECK_ADDRESS]: produce((state) => {
    state.checkAddressLoading = true
  }),
  [CHECK_ADDRESS_SUCCESS]: produce((state, { payload }) => {
    state.checkAddressLoading = false
    state.isAvailableBroadbandConnect = true
    state.messageBroadbandConnect = payload
  }),
  [CHECK_ADDRESS_ERROR]: produce((state) => {
    state.checkAddressLoading = false
    state.isAvailableBroadbandConnect = false
    state.messageBroadbandConnect = null
  }),

  [CLEAR_FOUND_ADDRESSES]: produce((state) => {
    state.foundAddresses = null
    state.isSearchAddressLoading = false
    state.isSearchAddressError = false
  }),

  [RESET_SALE_SIM_PROCESS]: produce((state) => {
    state.simSellId = null
    state.addedSims = []
    state.addSimError = null
    state.transferNumberOld = null
    state.isExistsIdentityDoc = false
    state.statusGetExistingPersonalData = StatusGetExistingPersonalData.NONE
    state.existingPersonalData = null
    state.documentData = null
    state.registrationAddressData = null
    state.isManualAddressSearch = false
    state.codeUFMS = null
    state.isAddSimProcessing = false
    state.pepCode = undefined
    state.pepMsisdns = null
    state.selectedPepMsisdn = null
    state.errorPepDocuments = false
    state.showPersonalAccountStep = false
    state.mainClientName = null
    state.isAddingPersonalAccountLoading = false
    state.addingPersonalAccountError = false
    state.checkAddressLoading = false
    state.isAvailableBroadbandConnect = false
    state.messageBroadbandConnect = null
    state.sallingProcessStep = SALLING_PROCESS_STEPS.NONE
  })

}, initialState)
