/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
import { CloseCircleOutlined, DownOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
const Icons = props => {
  Icons.propTypes = {
    value: PropTypes.object,
    onClear: PropTypes.func
  }
  const { value, onClear } = props
  return (
    <Fragment>
      {value && <CloseCircleIcon className='close-icon' onClick={onClear} />}
      <DownIcon className='arrow-icon' />
    </Fragment>
  )
}

const PreviewInput = props => {
  PreviewInput.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
    isOpen: PropTypes.bool
  }
  const { value, onChange, isOpen } = props
  const handleClear = event => {
    event.preventDefault()
    onChange(undefined)
  }

  return (
    <StyledInput
      value={value}
      onChange={onChange}
      isOpen={isOpen}
      suffix={<Icons value={value} onClear={handleClear} />}
      readOnly
      {...props}
    />
  )
}

export default PreviewInput

const StyledInput = styled(({ isOpen, ...props }) => <Input {...props} />)`
  width: 100%;

  input {
    cursor: pointer;
  }

  .close-icon {
    display: none;
  }

  .arrow-icon {
    ${props => props.isOpen && 'transform: rotate(180deg);'};
  }

  &:hover {
    .arrow-icon {
      display: ${props => (props.value ? 'none' : 'inline-block')};
    }

    .close-icon {
      display: ${props => (props.value ? 'inline-block' : 'none')};
    }
  }
`

const CloseCircleIcon = styled(CloseCircleOutlined)`
  cursor: pointer;
  font-size: 12px;
  opacity: 0.4;
`
const DownIcon = styled(DownOutlined)`
  cursor: pointer;
  font-size: 12px;
  opacity: 0.4;
`
