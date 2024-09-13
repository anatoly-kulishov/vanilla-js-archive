import React from 'react'
import { bool, func } from 'prop-types'
import styled from 'styled-components'
import { Popconfirm } from 'antd'

export default function MnpCancelationConfirm ({ handleConfirm, isDelayedHandling, isDisabled }) {
  return (
    <Popconfirm
      title='Отменить заявление?'
      disabled={isDelayedHandling || isDisabled}
      onConfirm={handleConfirm}
      okText='Да'
      cancelText='Нет'
    >
      <Text isDisabled={isDelayedHandling || isDisabled}>Отменить заявление</Text>
    </Popconfirm>
  )
}

MnpCancelationConfirm.propTypes = {
  handleConfirm: func,
  isDisabled: bool
}

const Text = styled.label`
  display: block;
  color: ${({ isDelayed }) => isDelayed ? 'gray' : 'black'};
  text-align: center;
  text-decoration: none;
  font-weight: normal;
  border-bottom: 1px solid rgb(127, 130, 133);;
  padding-bottom: 1px;

  &:hover {
    color: ${({ isDisabled }) => isDisabled ? 'gray' : 'black'};
    cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
    border-bottom: ${({ isDisabled }) => isDisabled ? '1px solid gray' : '1px solid  #40BFEE'};;
  }
`
