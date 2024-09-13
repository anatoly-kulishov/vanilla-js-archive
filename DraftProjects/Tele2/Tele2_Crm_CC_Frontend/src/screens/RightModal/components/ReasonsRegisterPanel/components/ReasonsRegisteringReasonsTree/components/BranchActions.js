import React from 'react'
import styled from 'styled-components'
import BranchActionsPopup from 'components/Popup'
import PropTypes from 'prop-types'

const BranchActions = (props) => {
  BranchActions.propTypes = {
    actions: PropTypes.object,
    reason: PropTypes.object,
    interactions: PropTypes.object,
    isVisible: PropTypes.bool,
    isCategorySelected: PropTypes.bool
  }
  const {
    actions,
    reason,
    interactions,
    isVisible,
    isCategorySelected
  } = props
  return (
    <Container isVisible={actions && !!actions.length && isVisible}>
      <BranchActionsPopup
        actions={actions}
        interactions={interactions}
        reason={reason}
        isCategorySelected={isCategorySelected}
      >
        <Wrapper>
          <Round />
          <Round />
          <Round />
        </Wrapper>
      </BranchActionsPopup>
    </Container>
  )
}

export default BranchActions

const Container = styled.div`
  z-index: 1;
  opacity: ${props => props.isVisible ? '1' : '0'};
  pointer-events: ${props => props.isVisible ? 'unset' : 'none'};

  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    width: 50px;
  }
`

const Wrapper = styled.div`
  width: 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const Round = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin: 0 1px;
  background-color: ${props => props.isActive ? '#4abfe5' : '#7f8285'};
`
