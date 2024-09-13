/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { createRef } from 'react'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import { formatCoordinates } from 'utils/helpers'
import { isNil } from 'lodash'

const CoordinatesMask = props => {
  CoordinatesMask.propTypes = {
    focusOnUpdate: PropTypes.func,
    onChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    onBlur: PropTypes.func,
    hidden: PropTypes.bool,
    id: PropTypes.string,

    value: PropTypes.string,
    onPaste: PropTypes.func
  }

  const inputRef = createRef()

  const onChangeHandler = event => {
    const { onChange } = props
    onChange(event.target.value)
  }

  const onPasteHandler = elem => {
    const { onPaste } = props
    const inputText = elem.clipboardData.getData('Text')

    elem.preventDefault()
    const result = formatCoordinates(inputText)
    onPaste(result)
  }

  const { value, onKeyPress, id, onBlur } = props
  const maskValue = isNil(value) ? '' : value

  return (
    <InputMask
      hidden={props.hidden}
      mask='- 999.99999999999999, - 999.99999999999999'
      value={maskValue}
      onChange={onChangeHandler}
      onPaste={onPasteHandler}
      onKeyPress={onKeyPress}
      disabled={false}
      onBlur={onBlur}
      formatChars={{
        '9': '[0-9]',
        '-': '[- ]'
      }}
    >
      {inputProps => <Input {...inputProps} id={id} allowClear ref={inputRef} />}
    </InputMask>
  )
}

export default CoordinatesMask
