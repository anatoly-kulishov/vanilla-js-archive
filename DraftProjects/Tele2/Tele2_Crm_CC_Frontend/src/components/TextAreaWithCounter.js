import React from 'react'
import styled from 'styled-components'
import { Input } from 'antd'
import PropTypes from 'prop-types'
const { TextArea } = Input

const TextAreaWithCounter = props => {
  TextAreaWithCounter.propTypes = {
    error: PropTypes.object,
    errorText: PropTypes.string,
    onChange: PropTypes.func,
    maxLength: PropTypes.number,
    rows: PropTypes.number,
    value: PropTypes.string
  }
  const { error, errorText, onChange, maxLength, rows, value } = props
  return (
    <Wrapper>
      <Text value={value} onChange={onChange} maxLength={maxLength} rows={rows} error={error} />
      <ErrorText hidden={!error}>{errorText}</ErrorText>
      <Counter error={error}>
        {value.length}/{maxLength}
      </Counter>
    </Wrapper>
  )
}

TextAreaWithCounter.defaultProps = {
  value: '',
  errorText: ''
}

export default TextAreaWithCounter

const Wrapper = styled.div`
  position: relative;
`
const Counter = styled.div`
  font-size: 12px;
  color: ${props => (props.error ? '#f5222d' : 'lightgrey')};
  position: absolute;
  bottom: -20px;
  right: 5px;
`
const ErrorText = styled.div`
  font-size: 12px;
  color: #f5222d;
  position: absolute;
  bottom: -20px;
  left: 0;
`
const Text = styled(TextArea)`
  padding-right: 15px;
  resize: none;
  border-color: ${props => (props.error ? '#f5222d' : '#6edbff')};
`
