import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LoadingSpinner from 'components/LoadingSpinner'
import ReasonFilter from './ReasonFilter'
import ReasonsTree from './ReasonsTree'
import {
  ReasonProps,
  ClientCategoryProps,
  ChannelProps
} from 'constants/reasonsList'

class ReasonPopover extends Component {
  static propTypes = {
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
    onSelect: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool,
    MinLength: PropTypes.number,
    MaxLength: PropTypes.number,
    clientCategoryId: PropTypes.string,
    channelId: PropTypes.string
  }

  static defaultProps = {
    isAdmin: false
  }

  state = {
    openTree: false
  }

  handleChangeState = (value) => {
    this.setState({ openTree: value })
  }

  render () {
    const {
      filteredReasons,
      clientCategories,
      channels,
      isFilteredReasonsLoading,
      isClientCategoriesLoading,
      isChannelsLoading,
      onSelect,
      onSearch,
      isAdmin,
      MinLength,
      MaxLength,
      clientCategoryId,
      channelId
    } = this.props

    return (
      <Wrapper>
        <ReasonFilter
          clientCategories={clientCategories}
          channels={channels}
          isFilteredReasonsLoading={isFilteredReasonsLoading}
          isClientCategoriesLoading={isClientCategoriesLoading}
          isChannelsLoading={isChannelsLoading}
          isAdmin={isAdmin}
          MinLength={MinLength}
          MaxLength={MaxLength}
          clientCategoryId={clientCategoryId}
          channelId={channelId}
          onSearch={onSearch}
          handleChangeState={this.handleChangeState}
        />
        <Header>
          <HeaderCell>Название причины</HeaderCell>
          { isAdmin && <HeaderCell isMnemo>Мнемо</HeaderCell> }
        </Header>
        <TreeWrapper>
          { isFilteredReasonsLoading &&
            <Overlay>
              <LoadingSpinner size={32} spin />
            </Overlay>
          }
          { !isFilteredReasonsLoading &&
            <ReasonsTree filteredReasons={filteredReasons} onSelect={onSelect} isAdmin={isAdmin} openTree={this.state.openTree} />
          }
        </TreeWrapper>
      </Wrapper>
    )
  }
}

export default ReasonPopover

const Wrapper = styled.div`
  height: 500px;
  width: 600px;
  margin: -12px -16px;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  width: 100%;
  background-color: rgba(63, 203, 255, 0.1);
`

const HeaderCell = styled.div`
  height: 40px;
  font-size: 13px;
  color: #8E97A0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  width: ${props => props.isMnemo ? '100px' : 'auto'};
  padding-left: ${props => props.isMnemo ? '0' : '20px'};
`

const TreeWrapper = styled.div`
  height: 100%;
  overflow-y: scroll;
`

const Overlay = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
