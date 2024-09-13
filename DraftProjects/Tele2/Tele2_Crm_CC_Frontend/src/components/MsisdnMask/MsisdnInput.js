/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled, { css } from 'styled-components'
import InputMask from './InputMask'
import PropTypes from 'prop-types'

export default function MsisdnInput (props) {
  MsisdnInput.propTypes = {
    onChange: PropTypes.func,
    onPaste: PropTypes.func,
    value: PropTypes.string,
    className: PropTypes.string,
    onKeyPress: PropTypes.func,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    placeholder: PropTypes.string,
    searchfield: PropTypes.string,
    onClickRemove: PropTypes.func,
    anonimCard: PropTypes.bool,
    noAutoFocus: PropTypes.bool,
    hidden: PropTypes.bool,
    isOneClickCopyAllowed: PropTypes.bool,
    dataTid: PropTypes.string
  }

  const {
    value,
    className,
    onKeyPress,
    disabled,
    readOnly,
    placeholder,
    searchfield,
    onClickRemove,
    anonimCard,
    noAutoFocus,
    onChange,
    onPaste,
    hidden,
    isOneClickCopyAllowed,
    dataTid = null
  } = props

  const onChangeHandler = (event) => {
    if (onChange) {
      const reg = /^([0-9])*$/
      const valueInput = event.target.value.replace(/[\s_()+-]+/g, '')
      if (!Number.isNaN(valueInput) && reg.test(valueInput)) {
        onChange(valueInput)
      }
    }
  }

  const onPasteHandler = (elem) => {
    const inputText = elem.clipboardData.getData('Text')
    elem.preventDefault()
    const str = (inputText || '').replace(/\D/g, '')
    let pasteNumber = ''
    if (str.length <= 10) {
      pasteNumber = '7' + str
    } else if (str.match(/^(7|8)\d{10}$/)) {
      pasteNumber = '7' + str.slice(1)
    } else if (str.match(/^\+7\d{10}$/)) {
      pasteNumber = '7' + str.slice(2)
    } else {
      pasteNumber = '7' + inputText
    }
    if (onPaste) {
      onPaste(pasteNumber)
    } else {
      onChange(pasteNumber)
    }
  }

  const onCopyHandler = (event) => {
    const selection = document.getSelection()
    event.clipboardData.setData('text', selection.toString().replace(/\D/g, ''))
    event.preventDefault()
  }

  const onOneClickCopyHandler = async () => {
    await navigator.clipboard.writeText(value)
  }

  return (
    <StyledReactInputMask
      autoFocus={(!anonimCard && !searchfield && !noAutoFocus) || (searchfield && anonimCard)}
      searchfield={searchfield}
      disabled={disabled}
      readOnly={readOnly}
      className={className}
      hidden={hidden}
      value={value || ''}
      onChange={onChangeHandler}
      onPaste={onPasteHandler}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      onClickRemove={onClickRemove}
      onCopy={onCopyHandler}
      isOneClickCopyAllowed={isOneClickCopyAllowed}
      onOneClickCopyHandler={onOneClickCopyHandler}
      data-tid={dataTid}
    />
  )
}

const StyledReactInputMask = styled(InputMask)`
  ${props =>
    props.searchfield === 'true' &&
    css`
      margin: 4px;
    `};
`
