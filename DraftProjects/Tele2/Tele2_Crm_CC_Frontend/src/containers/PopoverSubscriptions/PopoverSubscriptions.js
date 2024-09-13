/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, Fragment } from 'react'
import { Popover, Button, Radio } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PopoverSubscriptions = props => {
  PopoverSubscriptions.propTypes = {
    title: PropTypes.string,
    children: PropTypes.object,
    confirm: PropTypes.func,
    unsubscribeReasons: PropTypes.array,
    handlingId: PropTypes.number,
    isUnsubscribeLoading: PropTypes.bool
  }

  const [isVisible, handleVisible] = useState(false)
  const [selectedReason, handleReason] = useState(null)

  const { title, children, confirm, unsubscribeReasons, handlingId, isUnsubscribeLoading } = props

  const handleConfirm = () => {
    confirm(selectedReason)
    handleVisible(false)
    handleReason(null)
  }

  const radioStyle = {
    display: 'block',
    height: '25px',
    lineHeight: '25px'
  }

  return (
    <Popover
      trigger='click'
      visible={!isUnsubscribeLoading && handlingId && isVisible}
      onVisibleChange={handleVisible}
      content={
        <Fragment>
          <div>{title}</div>
          <Reason>Укажите причину:</Reason>
          <Radio.Group value={selectedReason} onChange={event => handleReason(event.target.value)}>
            {unsubscribeReasons && unsubscribeReasons.map(item => (
              <Radio value={item.Id} key={item.Id} style={radioStyle}>
                {item.Name}
              </Radio>
            ))}
          </Radio.Group>
          <Footer>
            <Button size='small' onClick={() => handleVisible(false)}>Нет</Button>
            <StyledButton
              size='small'
              type='primary'
              onClick={handleConfirm}
              disabled={!selectedReason}
            >
              Да
            </StyledButton>
          </Footer>
        </Fragment>
      }
    >
      {children}
    </Popover>
  )
}

export default PopoverSubscriptions

const Reason = styled.div`
  margin: 5px 0;
`

const Footer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
`

const StyledButton = styled(Button)`
  margin-left: 8px;
`
