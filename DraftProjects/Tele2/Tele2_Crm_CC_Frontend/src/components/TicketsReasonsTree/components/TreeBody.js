/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import Branch from './Branch'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import {
  CreateTicketModalReasonsProps
} from 'constants/tickets'

class TreeBody extends Component {
  static propTypes = {
    reasons: PropTypes.arrayOf(PropTypes.shape(CreateTicketModalReasonsProps)),
    isReasonsCategoriesLoading: PropTypes.bool,
    isReasonsCategoriesError: PropTypes.bool,

    isTreeCollapsed: PropTypes.bool,
    rowActions: PropTypes.object,
    columns: PropTypes.array,
    onSelectReasonCategory: PropTypes.func
  }
  render () {
    const {
      isTreeCollapsed,
      rowActions,
      reasons,
      isReasonsCategoriesLoading,
      isReasonsCategoriesError,
      columns,
      onSelectReasonCategory
    } = this.props

    if (isReasonsCategoriesLoading) {
      return (
        <Wrapper>
          <LoaderWrapper>
            <LoadingOutlined style={{ fontSize: '90px', color: '#44CAFF' }} />
          </LoaderWrapper>
        </Wrapper>
      )
    }

    if (isReasonsCategoriesError) {
      return (
        <Wrapper>
          <NoResults>Произошла ошибка!</NoResults>
        </Wrapper>
      )
    }

    return (
      <Wrapper isTreeCollapsed={isTreeCollapsed}>
        {reasons.length ? (
          reasons.map(item => {
            return (
              <Branch
                key={item.ReasonId}
                rowActions={rowActions}
                reason={item}
                columns={columns}
                nesting={0}
                onSelectReasonCategory={onSelectReasonCategory}
              />
            )
          })
        ) : (
          <NoResults>{!isTreeCollapsed && 'Нет результатов'}</NoResults>
        )}
      </Wrapper>
    )
  }
}

export default TreeBody

const Wrapper = styled.div`
  display: ${props => (props.isTreeCollapsed ? 'none' : 'block')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
  }
`

const LoaderWrapper = styled.div`
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const NoResults = styled.div`
  padding-left: 25px;
  padding-top: 15px;
`
