import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Popconfirm } from 'antd'

const ConfirmButton = ({ text, confirmText, hidden, onConfirm }) => (
  <Popconfirm placement='top' title={confirmText} onConfirm={onConfirm} okText='Да' cancelText='Нет'>
    <Button hidden={hidden}>{text}</Button>
  </Popconfirm>
)

export default ConfirmButton

ConfirmButton.propTypes = {
  text: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired
}

const Button = styled.label`
  display: block;
  color: black;
  text-align: center;
  text-decoration: none;
  font-weight: normal;
  border-bottom: 1px solid rgb(127, 130, 133);
  padding-bottom: 1px;
  
  &:hover {
    color: black;
    cursor: pointer;
    border-bottom: 1px solid  #40BFEE;
  }
`
