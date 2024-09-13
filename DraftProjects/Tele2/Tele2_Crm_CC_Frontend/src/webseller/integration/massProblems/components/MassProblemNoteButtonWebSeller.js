import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Popconfirm, Popover } from 'antd'

import { MassProblemMsisdnStatusProps } from 'constants/massProblems'
import { Message, MessageO } from 'assets'
import MassProblemPopoverContent from 'components/MassProblems/MassProblemPopoverContent'
import { Button } from 'webseller/components'

const REGISTER_NOTE_TEXT = 'Отметить обращение по массовой проблеме'
const DELETE_NOTE_TEXT = 'Удалить причину обращения'

const MassProblemNoteButtonWebSeller = ({
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
  const { ClientId, BillingBranchId, Msisdn, Email, SubscriberId, SubscriberStatus } = personalAccount || {}
  const foundNote = interactions
    .filter(interaction => interaction.TroubleId > 0)
    .find(item => item.TroubleId === value.ProblemId)

  if (foundNote) {
    return (
      <Popconfirm
        placement='bottom'
        title={`${DELETE_NOTE_TEXT}: \n${foundNote.ReasonName}` + ` | ${foundNote.CategoryName} | ${foundNote.Msisdn}?`}
        onConfirm={() => {
          deleteInteraction({ interactionId: foundNote.InteractionNoteId })
        }}
        okText='Да'
        cancelText='Нет'
      >
        <NoteButton text={DELETE_NOTE_TEXT} icon={<Message />} />
      </Popconfirm>
    )
  }

  if (value.IsCommentRequired) {
    return (
      <Popover
        placement='bottom'
        title={REGISTER_NOTE_TEXT}
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
        <NoteButton text={REGISTER_NOTE_TEXT} icon={<MessageO />} />
      </Popover>
    )
  }

  return (
    <NoteButton
      text={REGISTER_NOTE_TEXT}
      icon={<MessageO />}
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
    />
  )
}

export default MassProblemNoteButtonWebSeller

MassProblemNoteButtonWebSeller.propTypes = {
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

const NoteButton = ({ text, icon, ...buttonProps }) => (
  <Button {...buttonProps}>
    <NoteButtonContent>
      {text}
      {icon}
    </NoteButtonContent>
  </Button>
)

const NoteButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
