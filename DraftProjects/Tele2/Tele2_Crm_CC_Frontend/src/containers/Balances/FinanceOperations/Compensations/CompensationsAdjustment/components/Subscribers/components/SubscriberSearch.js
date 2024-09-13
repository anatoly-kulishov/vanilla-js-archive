import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'

const SubscriberSearch = props => {
  const { label, msisdn, onChange, disabled } = props

  return (
    <Wrapper>
      <Content>
        <InputLabel>{label}</InputLabel>
        <MsisdnMaskedInput
          value={msisdn}
          disabled={disabled}
          onClickRemove={useCallback(() => onChange(null))}
          onPaste={onChange}
          onChange={onChange}
          noAutoFocus
        />
      </Content>
    </Wrapper>
  )
}

SubscriberSearch.propTypes = {
  label: PropTypes.string,
  msisdn: PropTypes.string,
  onChange: PropTypes.func
}

export default SubscriberSearch

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: center;
  padding: 0 30px;
`

const Content = styled.div`
  width: 100%;
`

const InputLabel = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 32px;
  color: #000000;
`
