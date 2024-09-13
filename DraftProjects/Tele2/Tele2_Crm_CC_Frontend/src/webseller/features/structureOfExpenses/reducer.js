import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { StructureOfExpensesStep } from './helpers'
import { OperationStatus } from 'webseller/helpers'

const RESET_PROCESS = 'structureOfExpenses/RESET_PROCESS'
const CHANGE_STEP = 'structureOfExpenses/CHANGE_STEP'

const CREATE_INTERACTION = 'structureOfExpenses/CREATE_INTERACTION'

const CHECK_IS_AVAILABLE = 'structureOfExpenses/CHECK_IS_AVAILABLE'
const CHECK_IS_AVAILABLE_SUCCESS = 'structureOfExpenses/CHECK_IS_AVAILABLE_SUCCESS'
const CHECK_IS_AVAILABLE_FAILURE = 'structureOfExpenses/CHECK_IS_AVAILABLE_FAILURE'

const GET_POOLING_DETALIZATION = 'structureOfExpenses/GET_POOLING_DETALIZATION'

const GET_URL_STRUCTURE_OF_EXPENSES = 'structureOfExpenses/GET_URL_STRUCTURE_OF_EXPENSES'
const GET_URL_STRUCTURE_OF_EXPENSES_SUCCESS = 'structureOfExpenses/GET_URL_STRUCTURE_OF_EXPENSES_SUCCESS'
const GET_URL_STRUCTURE_OF_EXPENSES_FAILURE = 'structureOfExpenses/GET_URL_STRUCTURE_OF_EXPENSES_FAILURE'

const initialState = {
  activeStep: StructureOfExpensesStep.NONE,

  startDate: '',
  endDate: '',
  typeId: 1,
  isDateRangeChanged: false,

  url: '',

  isLoadingExecuteOperation: false,
  operationStatus: OperationStatus.NONE
}
export const resetStructureOfExpenses = createAction(RESET_PROCESS)
export const changeStepStructureOfExpenses = createAction(CHANGE_STEP)

export const createInteractionStructureOfExpenses = createAction(CREATE_INTERACTION)

export const checkIsAvailableStructureOfExpenses = createAction(CHECK_IS_AVAILABLE)
export const checkIsAvailableStructureOfExpensesSuccess = createAction(CHECK_IS_AVAILABLE_SUCCESS)
export const checkIsAvailableStructureOfExpensesError = createAction(CHECK_IS_AVAILABLE_FAILURE)

export const getPoolingDetalizationStructureOfExpensesParams = createAction(GET_POOLING_DETALIZATION)

export const getUrlStructureOfExpenses = createAction(GET_URL_STRUCTURE_OF_EXPENSES)
export const getUrlStructureOfExpensesSuccess = createAction(GET_URL_STRUCTURE_OF_EXPENSES_SUCCESS)
export const getUrlStructureOfExpensesError = createAction(GET_URL_STRUCTURE_OF_EXPENSES_FAILURE)

export default handleActions(
  {
    [CHECK_IS_AVAILABLE]: produce((state) => {
      state.isLoadingExecuteOperation = true
    }),
    [CHECK_IS_AVAILABLE_SUCCESS]: produce((state) => {
      state.isLoadingExecuteOperation = false
      state.activeStep = StructureOfExpensesStep.TYPE_OF_DETAILING
    }),
    [CHECK_IS_AVAILABLE_FAILURE]: produce((state) => {
      state.isLoadingExecuteOperation = false
    }),
    [CHANGE_STEP]: produce((state, { payload }) => {
      state.activeStep = payload
    }),
    [GET_URL_STRUCTURE_OF_EXPENSES]: produce((state, { payload }) => {
      const { formattedStartDate, formattedEndDate } = payload

      const isStartDateChanged = state.startDate !== formattedStartDate
      const isEndDateChanged = state.endDate !== formattedEndDate
      state.isDateRangeChanged = isStartDateChanged || isEndDateChanged

      state.isLoadingExecuteOperation = isStartDateChanged || isEndDateChanged
      state.activeStep = StructureOfExpensesStep.RESULT
      state.startDate = formattedStartDate
      state.endDate = formattedEndDate
    }),
    [GET_URL_STRUCTURE_OF_EXPENSES_SUCCESS]: produce((state, { payload }) => {
      state.url = payload
      state.operationStatus = OperationStatus.SUCCESSFUL
      state.isLoadingExecuteOperation = false
    }),
    [GET_URL_STRUCTURE_OF_EXPENSES_FAILURE]: produce((state) => {
      state.operationStatus = OperationStatus.FAILURE
      state.isLoadingExecuteOperation = false
    }),
    [RESET_PROCESS]: produce(() => initialState)
  },
  initialState
)
