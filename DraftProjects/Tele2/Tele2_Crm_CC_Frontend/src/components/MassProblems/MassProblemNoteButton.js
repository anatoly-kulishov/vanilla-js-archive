/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { isNil } from 'lodash'
import { Popconfirm, Popover } from 'antd'
import MassProblemPopoverContent from './MassProblemPopoverContent'
import { MassProblemMsisdnStatusProps } from 'constants/massProblems'

import { Message, MessageO } from 'assets'

const createNoteButton = props => {
  const {
    value,
    handlingId,
    registerMtpNote,
    personalAccount: { ClientId, BillingBranchId, Msisdn, Email, SubscriberId, SubscriberStatus },
    isNoteCreating,
    fetchSubscriberInfo,
    msisdnStatusArray,
    changeMsisdnStatusArray,
    maxInteractionIssuesMsisdn
  } = props
  if (value.IsCommentRequired) {
    return (
      <Popover
        placement='bottom'
        title={'Зарегистрировать причину обращения'}
        content={
          <MassProblemPopoverContent
            handlingId={handlingId}
            clientId={ClientId}
            billingBranchId={BillingBranchId}
            msisdn={Msisdn}
            email={Email}
            subscriberId={SubscriberId}
            subscriberStatus={SubscriberStatus}
            registerMtpNote={registerMtpNote}
            value={value}
            isNoteCreating={isNoteCreating}
            fetchSubscriberInfo={fetchSubscriberInfo}
            msisdnStatusArray={msisdnStatusArray}
            changeMsisdnStatusArray={changeMsisdnStatusArray}
            maxInteractionIssuesMsisdn={maxInteractionIssuesMsisdn}
          />
        }
        trigger='click'
      >
        <IconWrapper>
          <MessageOIcon />
        </IconWrapper>
      </Popover>
    )
  } else {
    return (
      <IconWrapper
        onClick={() =>
          registerMtpNote({
            problemId: value.ProblemId,
            handlingId: handlingId,
            clientId: ClientId,
            clientBranchId: BillingBranchId,
            msisdn: Msisdn,
            email: Email,
            subscriberId: SubscriberId,
            subscriberBranchId: BillingBranchId,
            subscriberTypeId: '',
            subscriberStatus: SubscriberStatus,
            clientInteraction: ''
          })
        }
      >
        <MessageOIcon />
      </IconWrapper>
    )
  }
}

const MassProblemNoteButton = ({
  _record,
  value,
  interactions,
  handlingId,
  deleteInteraction,
  registerMtpNote,
  personalAccount,
  isNoteCreating,
  fetchSubscriberInfo,
  msisdnStatusArray,
  changeMsisdnStatusArray,
  maxInteractionIssuesMsisdn
}) => {
  const foundNote =
    interactions &&
    interactions.filter(interaction => interaction.TroubleId > 0).find(item => item.TroubleId === value.ProblemId)
  return (
    <Fragment>
      {isNil(foundNote) ? (
        createNoteButton({
          value,
          handlingId,
          registerMtpNote,
          personalAccount,
          isNoteCreating,
          fetchSubscriberInfo,
          msisdnStatusArray,
          changeMsisdnStatusArray,
          maxInteractionIssuesMsisdn
        })
      ) : (
        <Popconfirm
          placement='bottom'
          title={
            `Удалить причину обращения: \n${foundNote.ReasonName}` +
            ` | ${foundNote.CategoryName} | ${foundNote.Msisdn}?`
          }
          onConfirm={() => {
            deleteInteraction({ interactionId: foundNote.InteractionNoteId })
          }}
          okText='Да'
          cancelText='Нет'
        >
          <IconWrapper>
            <MessageIcon />
          </IconWrapper>
        </Popconfirm>
      )}
    </Fragment>
  )
}

export default MassProblemNoteButton

MassProblemNoteButton.propTypes = {
  _record: PropTypes.object,
  value: PropTypes.object,
  interactions: PropTypes.arrayOf(PropTypes.object),
  handlingId: PropTypes.number,
  deleteInteraction: PropTypes.func.isRequired,
  registerMtpNote: PropTypes.func,
  personalAccount: PropTypes.object,
  isNoteCreating: PropTypes.bool,
  fetchSubscriberInfo: PropTypes.func,
  changeMsisdnStatusArray: PropTypes.func,
  msisdnStatusArray: PropTypes.arrayOf(MassProblemMsisdnStatusProps).isRequired,
  maxInteractionIssuesMsisdn: PropTypes.number
}

const MessageIcon = styled(Message)`
  margin-top: 2px;
  &:hover {
    cursor: pointer;
  }
`
const MessageOIcon = styled(MessageO)`
  margin-top: 2px;
  &:hover {
    cursor: pointer;
  }
`
const IconWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`
