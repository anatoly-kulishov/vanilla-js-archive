import { connect } from 'react-redux'

import {
  changeModalVisibility,
  fetchContactLines,
  ticketAddParams,
  createTicket,
  fetchReasonsCategories,
  filterReasons,
  selectReason,
  selectCategory,
  clearAddParams,
  fetchValidatedCoordinates,
  setValidateCoordinateSmartGis,
  saveTicketFormState,
  checkCoverages,
  clearCheckCoverages,
  checkMTPByServiceId,
  clearCheckMTPByServiceId
} from 'reducers/tickets/createTicketReducer'

import { fetchLteNumber } from 'reducers/smsSendingReducer'

import { reasonsChange } from 'reducers/reasonsCategories/reasonCategoryReducer'

import { fetchHandlingCoordinates, setHandlingCoordinates } from 'reducers/internal/handlingReducer'

import { withLogger } from 'utils/helpers/logger'

import CreateTicketModal from './CreateTicketModal'

import { selectIsWebSeller } from 'webseller/common/user/selectors'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'

const mapStateToProps = state => {
  return {
    ticketsState: state.tickets.createTicketState,
    msisdn: state.internal.queryParamsState.queryParams.msisdn,
    handlingTechId: state.internal.queryParamsState?.queryParams?.handlingTechId,
    sms: state.internal.rightModal.sms,
    personalAccount: state.personalInfo.personalAccountState.personalAccount,
    handlingId: state.internal.handlingState.Id,
    lteNumber: state.smsSending.lteNumber,
    coordinates: state.internal.handlingState.coordinates,
    mnpMarkers: state.mnp.mnpMarkersState.mnpMarkers,
    processingParameters: state.internal.processingParametersState,
    cardMode: state.internal.cardMode.cardMode,
    whoIsIt: state.personalInfo.numberOperatorBelonging.whoIsIt,
    isCheckCoveragesError: state.tickets.createTicketState.isCheckCoveragesError,
    checkCoveragesResult: state.tickets.createTicketState.checkCoveragesResult,
    isCheckMTPByServiceIdError: state.tickets.createTicketState.isCheckMTPByServiceIdError,
    checkMTPByServiceIdResult: state.tickets.createTicketState.checkMTPByServiceIdResult,
    isWebSeller: selectIsWebSeller(state),
    activeSaleOffice: selectActiveSalesOffice(state)
  }
}

const mapDispatchToProps = {
  changeModalVisibility,
  fetchContactLines,
  ticketAddParams,
  createTicket,
  selectReason,
  selectCategory,
  reasonsChange,
  fetchLteNumber,
  fetchReasonsCategories,
  filterReasons,
  clearAddParams,
  fetchValidatedCoordinates,
  setHandlingCoordinates,
  setValidateCoordinateSmartGis,
  fetchHandlingCoordinates,
  saveTicketFormState,
  checkCoverages,
  clearCheckCoverages,
  checkMTPByServiceId,
  clearCheckMTPByServiceId
}

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(CreateTicketModal))
