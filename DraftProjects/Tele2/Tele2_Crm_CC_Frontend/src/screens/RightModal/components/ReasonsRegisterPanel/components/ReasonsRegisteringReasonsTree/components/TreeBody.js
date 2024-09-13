import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { LoadingOutlined } from '@ant-design/icons'

import Branch from './Branch'

const style = { fontSize: '90px', color: '#44CAFF' }

const TreeBody = props => {
  TreeBody.propTypes = {
    isTreeCollapsed: PropTypes.bool,
    columns: PropTypes.object,
    rowActions: PropTypes.object,
    onChangeReasonCategory: PropTypes.func,
    deleteInteraction: PropTypes.func,
    reasons: PropTypes.object,
    changedReasonsCategories: PropTypes.object,
    interactions: PropTypes.object,
    isReasonsLoading: PropTypes.bool
  }

  const {
    isTreeCollapsed,
    rowActions,
    reasons,
    changedReasonsCategories,
    columns,
    onChangeReasonCategory,
    interactions,
    deleteInteraction,
    isReasonsLoading
  } = props

  if (isReasonsLoading) {
    return (
      <Wrapper>
        <LoaderWrapper>
          <LoadingOutlined style={style} />
        </LoaderWrapper>
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
              changedReasonsCategories={changedReasonsCategories}
              nesting={0}
              onChangeReasonCategory={onChangeReasonCategory}
              deleteInteraction={deleteInteraction}
              interactions={interactions}
            />
          )
        })
      ) : (
        <NoResults>{!isTreeCollapsed && 'Нет результатов'}</NoResults>
      )}
    </Wrapper>
  )
}

export default TreeBody

const Wrapper = styled.div`
  display: ${props => (props.isTreeCollapsed ? 'none' : 'block')};
  overflow-y: scroll;
  height: 100%;
`

const LoaderWrapper = styled.div`
  padding: 40px 0;
  text-align: center;
`

const NoResults = styled.div`
  padding-left: 25px;
  padding-top: 15px;
`
