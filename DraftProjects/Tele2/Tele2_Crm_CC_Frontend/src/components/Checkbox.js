import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Spin } from 'antd'

const Checkbox = props => {
  const { id, isVisible, isChecked, onChange, label, disabled, loading } = props
  return (
    <Wrapper id={id} isVisible={isVisible} disabled={disabled}>
      <div className='control-group'>
        <Spin spinning={Boolean(loading)} size='small'>
          <label className='control control-checkbox'>
            {label}
            <input type='checkbox' onChange={onChange} checked={isChecked} />
            <div className='control_indicator' />
          </label>
        </Spin>
      </div>
    </Wrapper>
  )
}

Checkbox.propTypes = {
  id: PropTypes.string,
  isVisible: PropTypes.bool,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
}

export default Checkbox

const Wrapper = styled.div`
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  pointer-events: ${props => (props.disabled ? 'none' : 'unset')};
  opacity: ${props => (props.disabled ? '0.5' : '1')};

  .control {
    font-family: arial;
    display: block;
    position: relative;
    padding-left: 24px;
    padding-top: 20px;
    cursor: pointer;
    font-size: 16px;
  }

  .control-group {
  }

  .control input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .control_indicator {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 22px;
    background: #fff;
    border: 1px solid #d4d4d4;
  }

  .control-radio .control_indicator {
    border-radius: none;
  }

  .control:hover input ~ .control_indicator {
    background: #fff;
    border: 1px solid #48bfec;
  }

  .control:hover input ~ .control_indicator:after {
    background-color: #48bfec;
  }

  .control:hover input ~ .control_indicator:before {
    background-color: #48bfec;
  }

  .control input:checked ~ .control_indicator {
    background: #48bfec;
    border: 1px solid #48bfec;
  }

  .control:hover input:not([disabled]):checked ~ .control_indicator,
  .control input:checked:focus ~ .control_indicator {
    background: #0e6647;
  }

  .control input:disabled ~ .control_indicator {
    background: #e6e6e6;
    opacity: 2;
    pointer-events: none;
  }

  .control input:checked ~ .control_indicator:after {
    background-color: #fff;
  }

  .control input:checked ~ .control_indicator:before {
    background-color: #fff;
  }

  .control-checkbox .control_indicator:after {
    left: 4px;
    top: 8px;
    width: 12px;
    height: 1px;
    background-color: #fff;
    display: block;
    box-sizing: unset;
    content: '';
    position: absolute;
  }

  .control-checkbox .control_indicator:before {
    left: 4px;
    top: 8px;
    width: 12px;
    height: 1px;
    background-color: #fff;
    transform: rotate(90deg);
    display: block;
    box-sizing: unset;
    content: '';
    position: absolute;
  }

  .control-checkbox input:disabled ~ .control_indicator:after {
    /* border-color: #7b7b7b; */
  }
`
