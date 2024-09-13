import { AddressTypes } from 'constants/address'
import { OrderLoadingStatus } from 'constants/form'
import { NumberModalTypes } from 'constants/number'

export const StateStatus = {
  NeedAction: 'NeedAction',
  NotAvailable: 'NotAvailable',
  Done: 'Done'
}

export const documentInitialState = {
  DocumentTypeId: null,
  Series: null,
  Number: null,
  IssueDate: null,
  EndDate: null,
  IssueBy: null,
  UnitCode: null,
  IsMain: true,
  IsApproved: true,
  Comment: ''
}

export const orderState = {
  RtcOrderId: undefined,
  RtcOrderNum: undefined,
  OrderId: undefined,
  Msisdn: undefined,
  SubscriberId: undefined,
  SubscriberBranchId: undefined,
  NickName: null,
  BcTechnologyId: undefined,
  BcSpeedId: undefined,
  ExpectedDateTime: undefined,
  EquipmentCodeList: [],
  Comment: undefined,
  SystemId: null,
  ChannelId: null,
  ContactPoint: null,
  IsOnlime: false,
  AvailableSpeedValue: undefined,
  AvailableTechnology: undefined,
  OrderRegionCode: undefined,
  Address: undefined,
  Contact: null,
  Person: {
    LastName: undefined,
    FirstName: undefined,
    MiddleName: undefined,
    Sex: undefined,
    Birthday: undefined,
    BirthPlace: undefined,
    IsCitizen: true,
    Comment: undefined
  },
  Document: undefined,
  Agreement: { Tariff: [], TotalCost: undefined },
  TimeSlotDate: undefined,
  TimeSlotTime: undefined,
  TimeSlotTimeEnd: undefined,
  TimeSlotComment: undefined,
  Duration: undefined,
  TimeSlotId: undefined,
  RtcTimeSlotId: undefined,
  IsTimeSlotReserveCRM: undefined,
  IsNewSubscriber: undefined,
  IsMnp: undefined,
  ReservedMsisdn: undefined,
  MnpMsisdn: undefined,
  IsDraft: undefined,
  KladrRegion: undefined,
  BusinessChannelKey: undefined,
  IsWinkSetting: undefined,
  Relocation: undefined,
  OldRtcAccountNumber: undefined,
  CrmOrderId: undefined
}

export const initialState = {
  isFormChanged: false,
  orderLoadingStatus: OrderLoadingStatus.NotLoaded,
  // State for order actions requests (e.g. perform, transfer, cancel, reject)
  orderState: orderState,
  orderStatusState: {
    statusId: 0,
    statusName: 'Черновик'
  },
  orderReasonState: {
    reasonId: undefined,
    reasonName: undefined
  },
  reasonsState: {
    ReasonId: null,
    ReasonComment: null
  },
  // Prices for showing on form
  prices: {
    fullPrice: 0
  },
  callDate: {
    start: null,
    end: null
  },
  selectedTimeslotData: null,
  selectedChangeTimeslotData: null,
  // Address suggestion data for address state logic
  addressSuggestion: {
    [AddressTypes.Installation]: null,
    [AddressTypes.Registration]: null
  },
  // requests results
  order: { isLoading: false, data: null },
  modifyOrderState: { isLoading: false, isSuccess: false },
  orderChangeHistory: { data: null, isLoading: false, isSuccess: false },
  orderEditSessionHistory: { data: null, isLoading: false, isSuccess: false },
  orderEditSessionState: { data: null, isLoading: false, isSuccess: false },
  createOrderEditSessionState: { data: null, isLoading: false, isSuccess: false },
  modifyOrderEditSessionState: { data: null, isLoading: false, isSuccess: false },
  deleteOrderEditSessionState: { data: null, isLoading: false, isSuccess: false },
  changedOrder: { data: null, isLoading: false, isSuccess: false },
  changeOrder: { isLoading: false, isSuccess: false },
  orderCommentHistory: { data: null, isLoading: false },
  rtcKey: null,
  relocationInfo: { isLoading: false, data: null, status: OrderLoadingStatus.NotLoaded },
  // equipment
  speedToTechnology: null,
  upSaleSpeedToTechnology: null,
  equipmentTypes: null,
  upSaleEquipmentTypes: null,
  // timeslots
  timeslots: {
    get: { isLoading: false, isError: false, data: null, type: null, message: null, warnings: null },
    reserve: { isLoading: false, data: null, message: null },
    delete: { isLoading: false, data: null },
    checkAutoInterval: { isLoading: false, isError: false, data: null },
    change: { isLoading: false, data: null }
  },
  operationReasons: null,
  checkAddressState: {
    isLoading: false,
    isError: false,
    data: null,
    message: null
  },
  broadbandTariffsState: { isLoading: false, data: null },
  macroRegions: [],
  regions: null,
  regionIsoCodeState: null,
  rtcStatuses: null,
  perform: { isLoading: false, data: null },
  handbooks: null,
  statusReasons: { data: [], isLoading: false, isError: false },
  orderList: { data: null, isLoading: false },
  documentData: null,
  documentTypes: null,
  orderHistory: null,
  formInitData: null,
  isCreating: null,
  availableTariffsState: { isLoading: false, data: null, isError: false },
  servicesForSellState: { isLoading: false, data: null, isError: false },
  invoiceHistoryState: { isLoading: false, data: null },
  tariffConstructorCosts: { isLoading: false, data: null },
  subscriberTariffState: { isLoading: false, data: null },
  isOrderActionLoading: false,
  isTariffModalVisible: false,
  isNumberModalVisible: false,
  numberModalType: NumberModalTypes.NewNumber,
  // Number
  msisdnState: { isLoading: false, data: null },
  reserveMsisdnState: { isLoading: false, isSuccess: false },
  checkMsisdnState: { isLoading: false },
  isManualUpSaleModalVisible: false,
  isAutoUpSaleModalVisible: false,
  isCancelAutoUpSaleModalVisible: false,
  isRescheduleModalVisible: false,
  // Sessions
  sessionsInfoState: { isLoading: false, data: null },
  createSessionState: { isLoading: false, data: null },
  closeSessionState: { isLoading: false, data: null, isSuccess: null },
  sessionTypeTasks: null,
  sessionCloseReasons: null,
  operatorShifts: {
    get: { isLoading: false, data: null, isSuccess: null },
    create: { isLoading: false, data: null, isSuccess: null },
    delete: { isLoading: false, data: null, isSuccess: null }
  },
  autoOrderSession: { data: null, isLoading: false, message: null },
  // Actions
  autoActions: {
    checkAddress: StateStatus.Done,
    reserveTimeslot: StateStatus.Done,
    afterChangeTimeslot: StateStatus.Done,
    afterPerform: StateStatus.Done,
    recheckAddress: {
      [AddressTypes.Installation]: StateStatus.Done,
      [AddressTypes.Registration]: StateStatus.Done
    },
    reserveMsisdn: StateStatus.Done,
    sessionInfo: StateStatus.Done,
    closeAfterAction: StateStatus.Done,
    refetchOperatorShifts: StateStatus.Done,
    afterCreateShifts: StateStatus.Done,
    afterCreateAutoOrderSession: StateStatus.Done,
    afterGetOperatorShifts: StateStatus.Done,
    regionIsoCode: StateStatus.Done,
    fillEquipments: StateStatus.Done,
    refillForm: StateStatus.Done,
    afterRelocationInfo: StateStatus.Done,
    afterSpeedToTechnology: StateStatus.Done,
    afterEquipmentType: StateStatus.Done
  },
  isChangeManualUpSaleLoading: false,
  isChangeAutoUpSaleLoading: false
}
