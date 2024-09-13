/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Alert, notification } from 'antd'
import open from 'utils/helpers/windowOpener'
import { NONE, CARD, GLOBAL, MODAL, WEBSELLER_OPERATION } from 'constants/redirectTypes'
import OperationMarkerWebSeller from 'webseller/integration/markers/components/OperationMarkerWebSeller'

export default function NotificationMarker (props) {
  NotificationMarker.propTypes = {
    item: PropTypes.object,
    isModalToggled: PropTypes.bool,
    setModalToggled: PropTypes.func,
    type: PropTypes.number,
    personalAccount: PropTypes.shape({
      BillingBranchId: PropTypes.number,
      ClientTypeId: PropTypes.number,
      Msisdn: PropTypes.string
    })
  }
  const { item, isModalToggled, setModalToggled, type, personalAccount } = props

  const renderDescription = () => {
    const { pathName, redirectType, description, modalProps = {}, disabled, disabledText, markerId } = item
    const { modalName } = modalProps
    const { Msisdn, BillingBranchId, ClientTypeId } = personalAccount

    const handleClick = () => {
      const toKms = pathName +
        '&externalFilter=GF_REGION%3A' + BillingBranchId +
        '&externalFilter=GF_CUSTOMER_TYPE%3A' + ClientTypeId +
        '&MSISDN=' + Msisdn

      open(toKms)
    }

    const openModal = () => {
      setModalToggled({
        ...isModalToggled,
        [modalName]: true
      })
    }

    if (disabled) {
      const onClickDisabled = disabledText
        ? () => {
          notification.warning({
            message: disabledText
          })
        }
        : undefined

      return <Disabled onClick={onClickDisabled}>{description}</Disabled>
    }

    switch (redirectType) {
      case NONE:
        return <div>{description}</div>
      case CARD:
        return (
          <StyledLink
            to={{
              pathname: pathName,
              search: location.search
            }}
          >
            {description}
          </StyledLink>
        )
      case GLOBAL:
        return <Redirect onClick={handleClick}>{description}</Redirect>
      case MODAL:
        return <ModalLink onClick={openModal}>{description}</ModalLink>
      case WEBSELLER_OPERATION:
        return <OperationMarkerWebSeller markerId={markerId}>{description}</OperationMarkerWebSeller>
      default:
        return <div />
    }
  }

  return (
    <Item
      key={item.message}
      message={item.message}
      description={renderDescription(item)}
      type={type}
      showIcon={false}
    />
  )
}

const Item = styled(Alert)`
  height: auto;
  flex-grow: 1;
  min-height: 80px;
  white-space: pre-wrap;
  border-radius: 10px;
  margin-right: 5px;

  > :last-of-type {
    margin-right: unset;
  }
  :hover {
    box-shadow: 0 0px 10px rgba(32, 33, 36, 0.2);
  }
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.05);
  transition: box-shadow 0.3s ease-in-out;
`

const Redirect = styled.a`
  color: rgba(0, 0, 0, 0.65);
  text-decoration-line: none;
  &:hover {
    color: black;
    cursor: pointer;
    text-decoration-line: underline;
  }
`
const StyledLink = styled(Link)`
  color: rgba(0, 0, 0, 0.65);
  text-decoration-line: none;
  &:hover {
    color: black;
    cursor: pointer;
    text-decoration-line: underline;
  }
`
const ModalLink = styled.span`
  cursor: pointer;
`

const Disabled = styled.span`
  color: grey;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'not-allowed')};
`
