import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  fetchReasonsList,
  fetchFilteredReasonsList,
  fetchClientCategories,
  fetchChannels
} from 'reducers/reasonsCategories/reasonsListReducer'
import {
  ReasonProps,
  ClientCategoryProps,
  ChannelProps
} from 'constants/reasonsList'
import ReasonSelector from 'components/ReasonSelector'

const mapStateToProps = state => ({
  reasons: state.reasonsCategories.reasonsListState.reasons,
  filteredReasons: state.reasonsCategories.reasonsListState.filteredReasons,
  clientCategories: state.reasonsCategories.reasonsListState.clientCategories,
  channels: state.reasonsCategories.reasonsListState.channels,
  isReasonsLoading: state.reasonsCategories.reasonsListState.isReasonsLoading,
  isFilteredReasonsLoading: state.reasonsCategories.reasonsListState.isFilteredReasonsLoading,
  isClientCategoriesLoading: state.reasonsCategories.reasonsListState.isClientCategoriesLoading,
  isChannelsLoading: state.reasonsCategories.reasonsListState.isChannelsLoading,
  MinLength: state.reasonsCategories.reasonsListState.MinLength,
  MaxLength: state.reasonsCategories.reasonsListState.MaxLength
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchReasonsList,
  fetchFilteredReasonsList,
  fetchClientCategories,
  fetchChannels
}, dispatch)

class ReasonSelectorContainer extends PureComponent {
  static propTypes = {
    // external props
    value: PropTypes.number, // ReasonId
    onChange: PropTypes.func,
    clientCategoryId: PropTypes.string,
    channelId: PropTypes.string,
    directionId: PropTypes.string,
    isAdmin: PropTypes.bool,
    // container props
    reasons: PropTypes.arrayOf(
      ReasonProps
    ).isRequired,
    filteredReasons: PropTypes.arrayOf(
      ReasonProps
    ).isRequired,
    clientCategories: PropTypes.arrayOf(
      ClientCategoryProps
    ).isRequired,
    channels: PropTypes.arrayOf(
      ChannelProps
    ).isRequired,
    isReasonsLoading: PropTypes.bool.isRequired,
    isFilteredReasonsLoading: PropTypes.bool.isRequired,
    isClientCategoriesLoading: PropTypes.bool.isRequired,
    isChannelsLoading: PropTypes.bool.isRequired,
    fetchReasonsList: PropTypes.func.isRequired,
    fetchFilteredReasonsList: PropTypes.func.isRequired,
    fetchClientCategories: PropTypes.func.isRequired,
    fetchChannels: PropTypes.func.isRequired,
    MinLength: PropTypes.number,
    MaxLength: PropTypes.number
  }

  componentDidMount () {
    const {
      // clientCategoryId,
      // channelId,
      // directionId,
      fetchReasonsList,
      // fetchFilteredReasonsList,
      fetchClientCategories,
      fetchChannels
    } = this.props

    fetchReasonsList({ viewType: 1 })
    // fetchFilteredReasonsList({ viewType: 1, clientCategoryId, channelId, directionId })
    fetchClientCategories({ isFull: true })
    fetchChannels({ isFull: true })
  }

  handleReasonsSearch = params => {
    const { directionId, fetchFilteredReasonsList } = this.props
    fetchFilteredReasonsList({ directionId, ...params })
  }

  render () {
    return (
      <ReasonSelector onSearch={this.handleReasonsSearch} {...this.props} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReasonSelectorContainer)
