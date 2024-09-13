import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import SubscriberSearch from './SubscriberSearch'
import SubscriberInfo from './SubscriberInfo'
import SubscriberBalance from './SubscriberBalance'

const SubscriberCard = props => {
  const {
    info,
    isInfoLoading,
    isInfoError,
    balance,
    isBalanceLoading,
    isBalanceError,
    label,
    msisdn,
    onChange,
    disabled
  } = props

  return (
    <Wrapper>
      <SubscriberSearch disabled={disabled} label={label} msisdn={msisdn} onChange={onChange} />
      <SubscriberInfo info={info} isInfoLoading={isInfoLoading} isInfoError={isInfoError} />
      <SubscriberBalance balance={balance} isBalanceLoading={isBalanceLoading} isBalanceError={isBalanceError} />
    </Wrapper>
  )
}

SubscriberCard.propTypes = {
  info: PropTypes.object,
  isInfoLoading: PropTypes.bool,
  isInfoError: PropTypes.bool,
  balance: PropTypes.array,
  isBalanceLoading: PropTypes.bool,
  isBalanceError: PropTypes.bool,
  label: PropTypes.string,
  msisdn: PropTypes.string,
  onChange: PropTypes.func
}

export default SubscriberCard

const Wrapper = styled.div`
  flex: 1;
  max-height: 460px;
  padding: 13px 0 18px;
`
