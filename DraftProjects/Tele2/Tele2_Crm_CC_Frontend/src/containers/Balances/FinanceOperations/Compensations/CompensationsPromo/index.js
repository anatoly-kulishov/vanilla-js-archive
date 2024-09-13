import { connect } from 'react-redux'

import { fetchPaydComments } from 'reducers/compensation/compensationReducer'
import {
  getPromocodeServiceType,
  getPromocodeType,
  getMarginServiceSizeRelateInPromo,
  addPromocodeCompensation
} from 'reducers/compensation/compensationPromoReducer'

import autoInteractionData from 'selectors/autoInteractionSelector'

import CompensationsPromo from './CompensationsPromo'

const mapStateToProps = state => ({
  ...state.compensation.compensationGeneral,
  ...state.compensation.compensationPromo,
  autoInteractionData: autoInteractionData(state),
  msisdn: state.personalInfo.personalAccountState?.personalAccount?.Msisdn,
  handlingTechId: state.internal.queryParamsState?.queryParams?.handlingTechId
})

const mapDispatchToProps = {
  getPromocodeType,
  getPromocodeServiceType,
  getMarginServiceSizeRelateInPromo,
  fetchPaydComments,
  addPromocodeCompensation
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationsPromo)
