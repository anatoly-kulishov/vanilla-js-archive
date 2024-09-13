import { combineReducers } from 'redux'
import moment from 'moment'

// Using
import internal from './internal'
import personalInfo from './personalInfo'
import services from './services'
import subscriptions from './subscriptions'
import finance from './finance'
import comments from './comments'
import massProblems from './massProblems'
import smsSending from './smsSendingReducer'
import reasonsRegistering from './reasonsRegisteringReducer'
import manualSearch from './manualSearchReducer'
import reasonsCategories from './reasonsCategories'
import tickets from './tickets'
import offers from './offersReducer'
import feedback from './feedbackReducer'
import lines from './lines'
import likes from './likes'
import mnp from './mnp'
import changeSim from './changeSim'
import searching from './searching'
import diagnosticManager from './diagnosticManager'
import questionary from './questionary'
import twinspot from './twinspot'
import promo from './promo'
import charge from './charge'

import notesReasonCategoryGrid from './notes/notesReasonCategoryGridDataReducer'

import historyInteractions from './history/historyInteractionsReducer'
import wgHistory from './history/wgHistoryReducer'
import mnpHistoryState from './history/mnpHistoryReducer'

// Modal
import chooseRegionModal from './chooseRegionModalReducer'

import commentTemplateModalReducer from './commentaryTemplateModalReducer'
import smsHistory from './sms/getSmsHistoryReducer'

import editCommentModal from './editCommentModalReducer'
import changeCommentTemplate from './commentaryTemplateFieldsReducer'

import smsTemplates from './sms/getSmsTemplatesReducer'
import escalationSettingsModal from './escalationSettingsModalReducer'

import commentTemplates from './commentTemplates/commentTemplatesReducer'
import reasonCategoryCommentTemplate from './commentTemplates/reasonCategoryCommentTemplatesReducer'

import linkedHandlingModal from './linkedHandlingModalReducer'

import diagnostics from './diagnostics'
import compensations from './compensations'
import compensation from './compensation'

import sms from './sms'
import margin from './margin'
import shopOrder from './shopOrderReducer'

import webim from './webim'

import mnpJournal from './mnpJournal'
import mnpOrder from './mnpOrder'
import person from './person'

// WebSeller
import saleSim from './saleSim'
import salesOffice from './salesOffice'
import documentIdentity from './documentIdentity'
import giveOrder from './giveOrder'
import customersCheck from 'webseller/features/webSellerSearch/reducer'
import recreateClient from 'webseller/features/recreateClient/reducer'
import correctionData from 'webseller/features/correctionData/reducer'
import replaceSim from 'webseller/features/replaceSim/reducer'
import signing from 'webseller/common/signing/reducer'
import transferTime from 'webseller/common/transferTimeStep/reducer'
import duplicateRfa from 'webseller/features/duplicateRfa/reducer'
import agreements from 'webseller/common/agreements/reducer'
import verification from 'webseller/common/verification/reducer'
import terminationClient from 'webseller/features/terminationClient/reducer'
import checkSmev from './checkSmev'
import changingClientStatus from 'webseller/features/changingClientStatus/reducer'
import numberRoleManagment from 'webseller/features/numberRoleManagment/reducer'
import changeCodeWord from 'webseller/features/changeCodeWord/reducer'
import changingTariffPlan from 'webseller/features/changingTariffPlan/reducer'
import mpnOrderStepper from 'webseller/features/mpnOrderStepper/reducer'
import rfaReport from 'webseller/features/rfaReport/reducer'
import additionalPersonalData from 'webseller/integration/phoneNumberCategory/reducer'
import structureOfExpenses from 'webseller/features/structureOfExpenses/reducer'

const historyRequestsDates = () => ({
  startDate: moment()
    .subtract(7, 'days')
    .utc()
    .set({ hour: 0, minute: 0, second: 0 })
    .format(),
  endDate: moment()
    .utc()
    .set({ hour: 23, minute: 59, second: 59 })
    .format()
})

export const reducers = {
  categoryIdForTemplateAdminState: commentTemplateModalReducer,
  checkSmev,
  changeCommentTemplateState: changeCommentTemplate,
  changeSim,
  chooseRegionModalState: chooseRegionModal,
  comments,
  commentTemplates,
  compensation,
  compensations,
  diagnosticManager,
  diagnostics,
  editCommentModalState: editCommentModal,
  escalationSettingsModal,
  feedback,
  finance,
  historyInteractions,
  historyRequestsDates,
  internal,
  likes,
  lines,
  linkedHandlingModalState: linkedHandlingModal,
  manualSearch,
  massProblems,
  mnp,
  mnpOrder,
  mnpHistoryState,
  mnpJournal,
  questionary,
  twinspot,
  notesReasonCategoryGridState: notesReasonCategoryGrid,
  offers,
  personalInfo,
  reasonCategoryCommentTemplate,
  reasonIdForTemplateAdminState: commentTemplateModalReducer,
  reasonsCategories,
  reasonsRegistering,
  searching,
  services,
  showcommentTemplateModalState: commentTemplateModalReducer,
  sms,
  smsHistoryState: smsHistory,
  smsSending,
  smsTemplatesState: smsTemplates,
  subscriptions,
  tickets,
  wgHistory,
  promo,
  margin,
  charge,
  shopOrder,
  webim,
  person,

  // WebSeller
  saleSim,
  salesOffice,
  documentIdentity,
  giveOrder,
  recreateClient,
  correctionData,
  signing,
  replaceSim,
  duplicateRfa,
  agreements,
  verification,
  terminationClient,
  changingClientStatus,
  customersCheck,
  numberRoleManagment,
  changeCodeWord,
  changingTariffPlan,
  mpnOrderStepper,
  transferTime,
  additionalPersonalData,
  rfaReport,
  structureOfExpenses
}

const rootReducer = combineReducers(reducers)

export default rootReducer
