import { findReason } from 'utils/helpers'

export const getHandlingState = state => state.internal.handlingState
export const getHandlingId = state => state.internal.handlingState?.Id
export const getQueryParamsState = state => state.internal.queryParamsState.queryParams
export const getUserState = state => state.internal.userState.user
export const getPersonalAccountState = state => state.personalInfo.personalAccountState.personalAccount
export const getWhoIsIt = state => state.personalInfo.numberOperatorBelonging.whoIsIt
export const getProcessingParametersState = state => state.internal.processingParametersState.processingParameters
export const getCurrentSmsTemplates = state => state.smsSending.templates
export const getSelectedReasonId = state => state.smsSending.selectedReason && state.smsSending.selectedReason.ReasonId
export const getSelectedCategoryId = state =>
  state.smsSending.selectedReason && state.smsSending.selectedCategory.CategoryId
export const getAvailibleOffers = state => state.offers.availableOffers
export const getMnpState = state => state.mnp.mnpState
export const getCardModeSelector = state => state.internal.cardMode.cardMode

// RAP
export const getAdminReasonsPanelFilterFields = state => state.rap.filterFields
export const getAdminReasonsPanelSelectedRow = state => state.rap.selectedRow
export const getAdminReasonsParameters = state => state.rap.parameters

// RAM
export const getAdminReasonsModalFilterFields = state => state.ram.filterFields

// CAP
export const getAdminCategoriesPanelSelectedRow = state => state.cap.selectedRow

// IAP
export const getAdminInteractionTemplatesPanelSelectedRow = state => state.iap.selectedRow
export const getAdminInteractionTemplatesPanelFilterFields = state => state.iap.filterFields

// DestinationGroups
export const getAdminDestinationGroupsFilterFields = state => state.destinationGroupsAdmin.filterFields

// REASONS REGISTERING
export const getRightModalReasonsRegisteringFilterFields = state => state.reasonsRegistering.filterFields
export const getRightModalReasonsRegisteringParameters = state => state.reasonsRegistering.parameters
export const getRightModalReasonsRegisteringReasons = state => state.reasonsRegistering.reasons
export const getRightModalReasonsRegisteringInteractions = state => state.reasonsRegistering.interactions
export const getRightModalReasonsRegisteringSelectedCompanyMarkId = state =>
  state.reasonsRegistering.selectedCompanyMarkId
export const getRightModalReasonsRegisteringMarksToRemove = state => state.reasonsRegistering.marksToRemove
export const getRightModalReasonsRegisteringMarksToAdd = state => state.reasonsRegistering.marksToAdd
export const getRightModalReasonsRegisteringChangedReasonsCategories = state =>
  state.reasonsRegistering.changedReasonsCategories
export const getRightModalReasonsRegisteringCategory = (state, { categoryId }) =>
  state.reasonsRegistering.categories.find(category => category.CategoryId === categoryId)
export const getRightModalReasonsRegisteringReason = (state, { reasonId }) =>
  findReason(state.reasonsRegistering.reasons, reasonId)
export const getInteractions = state => state.reasonsRegistering.interactions

// reasonCategoryForEscalationState
export const getReasonCategoryForEscalation = state =>
  state.reasonsCategories.reasonCategoryForEscalationState.reasonCategoryForEscalation

// SMS SENDING
export const getRightModalSmsSendingReasonsFilterFields = state => state.smsSending.reasonsFilterFields
export const getRightModalSmsSendingTemplatesFilterFields = state => state.smsSending.templatesFilterFields
export const getRightModalSmsSendingReasonsParameters = state => state.smsSending.parameters

// CREATE TICKET MODAL
export const getCreateTicketFilterFields = state => state.tickets.createTicketState.reasonsCategoriesFilterFields
export const getCreateTicketParameters = state => state.tickets.createTicketState.reasonsCategoriesParameters
export const getCreateTicketInitialReasons = state => state.tickets.createTicketState.initialReasons

export const getMsisdnStatusArray = state => state.massProblems.registerMtpNoteState.msisdnStatusArray

// compensations
export const getCompensationsMessagesArray = state => state.compensations.compensationsState.compensationsMessages
export const getValidationMessagesArray = state => state.compensations.validationCompensationsState.validationMessages

// changeSim
export const getChangeSimState = state => state.changeSim.replacementSimCard
// Diagnostics
export const getDiagnosticsState = state => state.diagnostics.diagnosticsState

export const getSubscriberHistory = state => state.personalInfo.subscriberStatus.subscriberHistory
export const getSubscriberStatusList = state => state.personalInfo.subscriberStatus.subscriberStatusList
