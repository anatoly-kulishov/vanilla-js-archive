/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Input } from 'antd'
import { CloseCircleFilled, CopyFilled } from '@ant-design/icons'
import ReactInputMask from 'react-input-mask'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import SearchIcon from './assets/search-icon.svg'

class InputMask extends React.Component {
  static propTypes = {
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    formatChars: PropTypes.object,
    alwaysShowMask: PropTypes.bool,
    inputRef: PropTypes.func,
    value: PropTypes.string,
    onClickRemove: PropTypes.func,
    searchfield: PropTypes.string,
    disabled: PropTypes.bool,
    isOneClickCopyAllowed: PropTypes.bool,
    onOneClickCopyHandler: PropTypes.func
  }
  state = {
    focused: ''
  }

  onFocusHandler = () => {
    this.setState({
      focused: true
    })
  }

  onBlurHandler = () => {
    this.setState({
      focused: false
    })
  }

  render () {
    const { value, searchfield, disabled, onClickRemove, isOneClickCopyAllowed, onOneClickCopyHandler, mask } = this.props
    const { focused } = this.state
    let isFocused
    if (focused) {
      isFocused = 1
    } else {
      isFocused = 0
    }
    const suffix = value && value !== '7' ? <StyledCloseIcon focus={isFocused} onClick={onClickRemove} /> : <span />
    let prefix = searchfield && !focused ? <SearchIcon /> : null
    if (prefix === null && isOneClickCopyAllowed) {
      prefix = <CopyFilled onClick={onOneClickCopyHandler} />
    }
    return (
      <ReactInputMask
        {...this.props}
        mask={mask || '+7 (999) 999-99-99'}
        maskChar={null}
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
        suffix={suffix}
        prefix={prefix}
        ref={(input) => { this.input = input }}
      >
        {inputProps => (
          <StyledInput
            {...inputProps}
            searchfield={searchfield}
            disabled={disabled}
          />
        )}
      </ReactInputMask>
    )
  }
}

const StyledInput = styled(Input)`
  & input {
    ${props => props.searchfield === 'true' && css`
      background: #40bfee;
      border-color: #40bfee;
      color: #40bfee;
    `}

    &:focus {
      color: rgba(0, 0, 0, 0.65);
      background: white;
    }
  }
`

const StyledCloseIcon = styled(CloseCircleFilled)`
  cursor: ${props => props.focus === 1 ? 'pointer' : 'default'};
  opacity: ${props => props.focus === 1 ? '1' : '0'};
`

export default InputMask
