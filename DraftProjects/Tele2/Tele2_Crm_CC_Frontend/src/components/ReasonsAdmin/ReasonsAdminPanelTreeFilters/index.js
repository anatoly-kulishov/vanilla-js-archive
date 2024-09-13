import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReasonsAdminPanelTreeFilters from './ReasonsAdminPanelTreeFilters'

import {
  setAdminPanelFilterFields,
  adminFetchReasonsData
} from '../../../reducers/reasonsAdmin/reasonsAdminPanelReducer'

const mapStateToProps = state => {
  return {
    clientCategories: state.rap.clientCategories,
    channels: state.rap.channels,
    clientCategoryId: state.rap.filterFields.clientCategoryId,
    channelId: state.rap.filterFields.channelId,
    mnemoCode: state.rap.filterFields.mnemoCode,
    activeRecords: state.rap.filterFields.activeRecords,
    deletedRecords: state.rap.filterFields.deletedRecords,
    reasonName: state.rap.filterFields.reasonName,
    reasons: state.rap.reasons
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setAdminPanelFilterFields,
  adminFetchReasonsData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ReasonsAdminPanelTreeFilters)
