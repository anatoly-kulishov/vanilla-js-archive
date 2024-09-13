import { connect } from 'react-redux'
import {
  setStepOfChangingActiveSalesOffice,
  getPotentialActiveSalesOfficeInfo,
  resetStateChangingActiveSalesOffice,
  changeActiveSalesOffice
} from 'reducers/salesOffice/salesOfficeReducer'
import WebSellerHeader from './WebSellerHeader'

const mapStateToProps = state => ({
  user: state.internal.userState.user,
  ...state.salesOffice
})

const mapDispatchToProps = {
  setStepOfChangingActiveSalesOffice,
  getPotentialActiveSalesOfficeInfo,
  resetStateChangingActiveSalesOffice,
  changeActiveSalesOffice
}

export default connect(mapStateToProps, mapDispatchToProps)(WebSellerHeader)
