import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReasonsAdminModalTreeFilters from './ReasonsAdminModalTreeFilters'

import {
  setAdminModalReasonsFiltersFields
} from '../../../reducers/reasonsAdmin/reasonsAdminModalReducer'

const mapStateToProps = state => {
  return {
    clientCategories: state.ram.clientCategories,
    channels: state.ram.channels,

    clientCategoryId: state.ram.filterFields.clientCategoryId,
    channelId: state.ram.filterFields.channelId,
    mnemoCode: state.ram.filterFields.mnemoCode,
    reasonName: state.ram.filterFields.reasonName
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setAdminModalReasonsFiltersFields
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReasonsAdminModalTreeFilters)
