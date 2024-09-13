import { connect } from 'react-redux'

import {
  validatePaydServiceAvailable,
  validatePaydServiceHistory,
  validatePaydServiceEnabled,
  getMarginServiceTypeRelate,
  getMarginServiceSizeRelate,
  addServiceCompensation
} from 'reducers/compensation/compensationPackageReducer'

import {
  onStartValidatePaydServiceAvailable,
  onStartValidatePaydServiceEnabled,
  fetchPaydComments
} from 'reducers/compensation/compensationReducer'

import CompensationsPackages from './CompensationsPackages'

import autoInteractionData from 'selectors/autoInteractionSelector'

const mapStateToProps = state => ({
  ...state.compensation.compensationPackage,
  ...state.compensation.compensationGeneral,
  paydPostLimit: state.compensation.compensationGeneral.validatePaydPostLimit,
  autoInteractionData: autoInteractionData(state)
})

const mapDispatchToProps = {
  validatePaydServiceAvailable,
  onStartValidatePaydServiceAvailable,
  fetchPaydComments,
  validatePaydServiceHistory,
  validatePaydServiceEnabled,
  onStartValidatePaydServiceEnabled,
  getMarginServiceTypeRelate,
  getMarginServiceSizeRelate,
  addServiceCompensation
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationsPackages)
