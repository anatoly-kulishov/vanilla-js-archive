import React, { useEffect } from 'react'
import { DatePicker as AntdDatePicker } from 'antd'
import styled from 'styled-components'

const DatePicker = props => {
  const { id, inputRef, format = 'DD.MM.YYYY' } = props

  const reformatDate = (event, separator = '.') => {
    const strippedInput = event.target.value.replaceAll(separator, '')
    let newInput = ''

    for (let char = 0; char < strippedInput.length; char += 1) {
      if (char === 2 || char === 4) newInput += separator
      newInput += strippedInput.charAt(char)
    }

    event.target.value = newInput
  }

  useEffect(() => {
    if (id) {
      const input = document.getElementById(id)
      input?.addEventListener('keyup', reformatDate)

      if (input) {
        input.maxLength = 10
      }

      return () => {
        input?.removeEventListener('keyup', reformatDate)
      }
    }
  }, [])

  return <AntdDatePickerStyled inputRef={inputRef} id={id} format={format} suffixIcon={null} allowClear={false} {...props} />
}

const AntdDatePickerStyled = styled(AntdDatePicker)`
  border-radius: 12px;
  padding: 12px 16px;

  & input {
    font-family: T2_Rooftop_Regular;
    font-weight: 400;
    font-size: 14px;
    line-height: normal;
  }
`

export default DatePicker
