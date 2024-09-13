/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState } from 'react'
import { Popover, Button } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Popup = props => {
  Popup.propTypes = {
    interactions: PropTypes.array,
    reason: PropTypes.object,
    actions: PropTypes.array,
    isCategorySelected: PropTypes.bool,
    children: PropTypes.object
  }
  const [isPopupVisible, setPopupVisible] = useState(false)

  const changePopupVisibility = () => {
    setPopupVisible(!isPopupVisible)
  }
  const {
    interactions,
    reason,
    actions,
    isCategorySelected,
    children
  } = props

  const handlePopup = item => {
    setPopupVisible(false)
    item.handler(interactions, reason)
  }

  const content = () => {
    return (
      <BranchActionsContent>
        {
          actions && actions.length && actions.map((item, index) =>
            <MoreActionsButton key={index} disabled={!isCategorySelected} onClick={() => handlePopup(item)}>
              {item.name}
            </MoreActionsButton>
          )
        }
      </BranchActionsContent>
    )
  }

  return (
    <Popover
      content={content()}
      visible={isPopupVisible}
      onVisibleChange={() => changePopupVisibility()}
      placement='bottomRight'
    >
      {children}
    </Popover>
  )
}

export default Popup

const BranchActionsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MoreActionsButton = styled(Button)`
  border: none;
`
