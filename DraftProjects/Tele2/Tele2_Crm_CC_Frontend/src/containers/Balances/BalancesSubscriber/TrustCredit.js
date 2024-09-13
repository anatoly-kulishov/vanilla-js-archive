import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import styled from 'styled-components'
import { Popover } from 'antd'
import { InfoCircleOutlined, PlusCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'

const TrustCredit = props => {
  const {
    trustCreditInfo,
    isTrustCreditInfoLoading,
    isTrustCreditInfoError,
    trustCreditInfoMessage,
    handleDetailsModalOpen,
    onCreditLimitHistoryModalOpen
  } = props
  const isActive = get(trustCreditInfo, 'serviceStatusId', 0) === 1

  if (isTrustCreditInfoLoading) {
    return <div>...</div>
  }
  if (isTrustCreditInfoError) {
    return (
      <Wrapper>
        <Popover
          placement='bottom'
          title='На доверии'
          content={<ContentPopover>{trustCreditInfoMessage}</ContentPopover>}
          trigger='click'
        >
          <InfoCircleIcon isRed />
        </Popover>
      </Wrapper>
    )
  } else if (!isActive && !isTrustCreditInfoError) {
    return (
      <Wrapper>
        <PlusCircleIcon onClick={handleDetailsModalOpen} />
      </Wrapper>
    )
  } else {
    return (
      <Wrapper>
        <InfoCircleIcon onClick={handleDetailsModalOpen} />
        <ClockCircleIcon onClick={onCreditLimitHistoryModalOpen} />
      </Wrapper>
    )
  }
}

export default TrustCredit

TrustCredit.propTypes = {
  isTrustCreditInfoLoading: PropTypes.bool,
  isTrustCreditInfoError: PropTypes.bool,
  trustCreditInfo: PropTypes.object,
  trustCreditInfoMessage: PropTypes.string,
  onCreditLimitHistoryModalOpen: PropTypes.func
}

const Wrapper = styled.div`
  height: 21px;
`
const ContentPopover = styled.div`
  max-width: 300px;
`
const PlusCircleIcon = styled(PlusCircleOutlined)`
  cursor: pointer;
  margin-right: 3px;

  & svg {
    width: 20px;
    height: 20px;
  }

  color: ${props => (props.isRed ? `red` : `rgba(0, 0, 0, 0.65);`)};
`
const InfoCircleIcon = styled(InfoCircleOutlined)`
  cursor: pointer;
  margin-right: 3px;

  & svg {
    width: 20px;
    height: 20px;
  }

  color: ${props => (props.isRed ? `red` : `rgba(0, 0, 0, 0.65);`)};
`
const ClockCircleIcon = styled(ClockCircleOutlined)`
  cursor: pointer;
  margin-right: 3px;

  & svg {
    width: 20px;
    height: 20px;
  }

  color: ${props => (props.isRed ? `red` : `rgba(0, 0, 0, 0.65);`)};
`
