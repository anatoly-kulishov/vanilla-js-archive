import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import {
  ReasonProps,
  ClientCategoryProps,
  ChannelProps
} from 'constants/reasonsList'
import { Popover } from 'antd'
import PreviewInput from './PreviewInput'
import ReasonPopover from './ReasonPopover'

export default class RegionsSelector extends PureComponent {
  static propTypes = {
    value: PropTypes.number, // ReasonId
    onChange: PropTypes.func,
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
    isFilteredReasonsLoading: PropTypes.bool.isRequired,
    isClientCategoriesLoading: PropTypes.bool.isRequired,
    isChannelsLoading: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
    MinLength: PropTypes.number,
    MaxLength: PropTypes.number,
    clientCategoryId: PropTypes.string,
    channelId: PropTypes.string
  }

  state = {
    isPopoverVisible: false
  }

  handleVisibleChange = visible => {
    this.setState({ isPopoverVisible: visible })
  }

  handleSelect = values => {
    const value = get(values, '[0]')
    const ReasonId = value ? parseInt(value, 10) : undefined

    this.props.onChange(ReasonId)
    this.handleVisibleChange(false)
  }

  get selectedReasonName () {
    const { reasons, value } = this.props
    const selectedReason = reasons.find(reason => reason.ReasonId === value)

    return get(selectedReason, 'ReasonName')
  }

  render () {
    const {
      onChange,
      filteredReasons,
      clientCategories,
      channels,
      isFilteredReasonsLoading,
      isClientCategoriesLoading,
      isChannelsLoading,
      onSearch,
      isAdmin,
      MinLength,
      MaxLength,
      clientCategoryId,
      channelId
    } = this.props
    const { isPopoverVisible } = this.state

    return (
      <Fragment>
        <Popover
          trigger='click'
          visible={isPopoverVisible}
          onVisibleChange={this.handleVisibleChange}
          content={
            <ReasonPopover
              filteredReasons={filteredReasons}
              clientCategories={clientCategories}
              channels={channels}
              onSelect={this.handleSelect}
              onSearch={onSearch}
              isFilteredReasonsLoading={isFilteredReasonsLoading}
              isClientCategoriesLoading={isClientCategoriesLoading}
              isChannelsLoading={isChannelsLoading}
              isAdmin={isAdmin}
              MinLength={MinLength}
              MaxLength={MaxLength}
              clientCategoryId={clientCategoryId}
              channelId={channelId}
            />
          }
        >
          <PreviewInput
            value={this.selectedReasonName}
            onChange={onChange}
            isOpen={isPopoverVisible}
          />
        </Popover>
      </Fragment>
    )
  }
}
