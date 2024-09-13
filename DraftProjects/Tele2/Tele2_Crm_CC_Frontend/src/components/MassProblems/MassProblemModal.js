/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import {
  ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM,
  MassProblemListProps,
  MassProblemMsisdnStatusProps
} from 'constants/massProblems'
import { Modal, Row, Col } from 'antd'
import MassProblemNoteButton from './MassProblemNoteButton'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { MASS_PROBLEM_MODAL } from 'constants/logModalNames'
import HtmlRender from 'components/HtmlRender'
import { getChanneledMtpValue } from 'screens/MassProblemsOperator/helpers'
import MassProblemNoteButtonWebSeller from 'webseller/integration/massProblems/components/MassProblemNoteButtonWebSeller'

const formatIsoDate = value => (value ? moment.utc(value).local().format('DD.MM.YYYY HH:mm') : '')

const Title = props => {
  Title.propTypes = {
    openedMtp: PropTypes.bool,
    color: PropTypes.object,
    allowNoteRegistration: PropTypes.bool,
    interactions: PropTypes.object,
    handlingId: PropTypes.number,
    deleteInteraction: PropTypes.func,
    registerMtpNote: PropTypes.func,
    personalAccount: PropTypes.object,
    isNoteCreating: PropTypes.bool,
    fetchSubscriberInfo: PropTypes.func,
    changeMsisdnStatusArray: PropTypes.func,
    msisdnStatusArray: PropTypes.arrayOf(MassProblemMsisdnStatusProps).isRequired,
    maxInteractionIssuesMsisdn: PropTypes.number
  }
  const {
    openedMtp,
    color,
    allowNoteRegistration,
    interactions,
    handlingId,
    deleteInteraction,
    registerMtpNote,
    personalAccount,
    isNoteCreating,
    fetchSubscriberInfo,
    changeMsisdnStatusArray,
    msisdnStatusArray,
    maxInteractionIssuesMsisdn
  } = props

  return (
    <div>
      <Header>
        <ModalTitle>Массовая техническая проблема {openedMtp.ProblemId}</ModalTitle>
        {allowNoteRegistration && (
          <NoteWrapper>
            <MassProblemNoteButton
              value={openedMtp}
              interactions={interactions}
              handlingId={handlingId}
              deleteInteraction={deleteInteraction}
              registerMtpNote={registerMtpNote}
              personalAccount={personalAccount}
              isNoteCreating={isNoteCreating}
              msisdnStatusArray={msisdnStatusArray}
              fetchSubscriberInfo={fetchSubscriberInfo}
              changeMsisdnStatusArray={changeMsisdnStatusArray}
              maxInteractionIssuesMsisdn={maxInteractionIssuesMsisdn}
            />
          </NoteWrapper>
        )}
      </Header>
      <Status color={color}>{openedMtp.StatusName}</Status>
    </div>
  )
}

const MassProblemModal = props => {
  MassProblemModal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    allowNoteRegistration: PropTypes.bool,
    openedMtp: MassProblemListProps,
    changeVisibility: PropTypes.func.isRequired,
    interactions: PropTypes.object,
    handlingId: PropTypes.number,
    deleteInteraction: PropTypes.func,
    registerMtpNote: PropTypes.func,
    personalAccount: PropTypes.object,
    isNoteCreating: PropTypes.bool,
    msisdnStatusArray: PropTypes.arrayOf(MassProblemMsisdnStatusProps).isRequired,
    maxInteractionIssuesMsisdn: PropTypes.number,
    fetchSubscriberInfo: PropTypes.func.isRequired,
    changeMsisdnStatusArray: PropTypes.func.isRequired,
    requestedServiceChannelInterface: PropTypes.string,
    isWebSeller: PropTypes.bool
  }
  const {
    isVisible,
    openedMtp,
    changeVisibility,
    allowNoteRegistration,
    interactions,
    handlingId,
    deleteInteraction,
    registerMtpNote,
    personalAccount,
    isNoteCreating,
    fetchSubscriberInfo,
    msisdnStatusArray,
    maxInteractionIssuesMsisdn,
    changeMsisdnStatusArray,
    requestedServiceChannelInterface,
    isWebSeller
  } = props

  const handleCloseModal = () => {
    changeVisibility()
    logIfEnabled({ type: MODAL_CLOSE, log: MASS_PROBLEM_MODAL })
  }

  useEffect(() => {
    if (isVisible) {
      logIfEnabled({ type: MODAL_OPEN, log: MASS_PROBLEM_MODAL })
    }
  }, [isVisible])

  const renderFooter = () => {
    return isWebSeller ? (
      <MassProblemNoteButtonWebSeller
        value={openedMtp}
        interactions={interactions}
        handlingId={handlingId}
        deleteInteraction={deleteInteraction}
        registerMtpNote={registerMtpNote}
        personalAccount={personalAccount}
        isNoteCreating={isNoteCreating}
        msisdnStatusArray={msisdnStatusArray}
        fetchSubscriberInfo={fetchSubscriberInfo}
        changeMsisdnStatusArray={changeMsisdnStatusArray}
        maxInteractionIssuesMsisdn={maxInteractionIssuesMsisdn}
      />
    ) : null
  }

  return (
    <MtpModal
      width={800}
      zIndex={isWebSeller ? 1001 : undefined}
      centered={isWebSeller || undefined}
      title={
        <Title
          problemId={openedMtp.ProblemId}
          statusName={openedMtp.StatusName}
          openedMtp={openedMtp}
          color={openedMtp.RowTextColor}
          allowNoteRegistration={!isWebSeller && allowNoteRegistration}
          interactions={interactions}
          handlingId={handlingId}
          deleteInteraction={deleteInteraction}
          registerMtpNote={registerMtpNote}
          personalAccount={personalAccount}
          isNoteCreating={isNoteCreating}
          fetchSubscriberInfo={fetchSubscriberInfo}
          msisdnStatusArray={msisdnStatusArray}
          maxInteractionIssuesMsisdn={maxInteractionIssuesMsisdn}
          changeMsisdnStatusArray={changeMsisdnStatusArray}
        />
      }
      visible={isVisible}
      onCancel={handleCloseModal}
      footer={renderFooter()}
    >
      <StyledRow>
        <NameCol span={4}>Название проблемы:</NameCol>
        <Col span={20}>
          {getChanneledMtpValue(
            openedMtp,
            ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.Name,
            requestedServiceChannelInterface
          )}
        </Col>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Города:</NameCol>
        <Col span={20}>{openedMtp.ProblemArea}</Col>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Начало проблемы:</NameCol>
        <Col span={20}>{formatIsoDate(openedMtp.StartDateTime)}</Col>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Окончание проблемы:</NameCol>
        <Col span={20}>{formatIsoDate(openedMtp.FinishDateTime)}</Col>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Что происходит:</NameCol>
        <Col span={20}>
          <StyledHtmlRender
            value={getChanneledMtpValue(
              openedMtp,
              ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.WhatHappens,
              requestedServiceChannelInterface
            )}
          />
        </Col>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Стандартный ответ:</NameCol>
        <Col span={20}>
          <StyledHtmlRender
            value={getChanneledMtpValue(
              openedMtp,
              ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.Answer,
              requestedServiceChannelInterface
            )}
          />
        </Col>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Что проверять:</NameCol>
        <Col span={20}>
          <StyledHtmlRender value={openedMtp.WhatToControl} />
        </Col>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Рекомендации:</NameCol>
        <Col span={20}>
          <StyledHtmlRender value={openedMtp.Recomendation} />
        </Col>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Регионы:</NameCol>
        <Col span={20}>{openedMtp.ProblemRegionsWs}</Col>
      </StyledRow>
      {!isWebSeller && (
        <StyledRow>
          <NameCol span={4}>Номер ТТ:</NameCol>
          <Col span={20}>{openedMtp.TtNumber}</Col>
        </StyledRow>
      )}
    </MtpModal>
  )
}

export default MassProblemModal

const MtpModal = styled(Modal)`
  .ant-modal-header {
    padding: 14px 24px 10px 24px;
  }
  .ant-modal-body {
    padding: 0;
  }
`
const ModalTitle = styled.div`
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 14px;
  color: black;
`
const Status = styled.div`
  font-size: 14px;
  color: ${props => props.color};
`
const StyledRow = styled(Row)`
  padding: 5px 20px;
  border-bottom: 1px solid #e8e8e8;
  &:hover {
    background: #fffbe4;
  }
`
const NameCol = styled(Col)`
  font-size: 12px;
  padding: 4px 0px;
`
const Header = styled.div`
  display: inline-flex;
`
const NoteWrapper = styled.div`
  padding-left: 10px;
`

const StyledHtmlRender = styled(HtmlRender)`
  p {
    margin: 0;
  }
`
