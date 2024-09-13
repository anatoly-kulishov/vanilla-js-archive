/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent, Fragment } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Modal, Spin, Button, Upload, Popover, Input } from 'antd'
import styled from 'styled-components'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import LeftValuesBlock from './components/leftValuesBlock'
import RightValuesBlock from './components/rightValuesBlock'
import BottomPanelBlock from './components/bottomPanelBlock'
import LoadingSpinner from 'components/LoadingSpinner'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { TICKET_INFO_MODAL } from 'constants/logModalNames'
import { ticketAdmin } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const { TextArea } = Input

export default class TicketInfoModal extends PureComponent {
  static propTypes = {
    modalCardState: PropTypes.object,
    historyTicketsState: PropTypes.object,
    handleVisibleTicketInfoModal: PropTypes.func,
    ticketDeleteFile: PropTypes.func,
    ticketAddFile: PropTypes.func,
    ticketAddComment: PropTypes.func,
    handlingId: PropTypes.number
  }

  state = {
    openTab: 0,
    visiblePopUpComment: false,
    commentToTicketIncident: ''
  }

  componentDidMount = () => {
    logIfEnabled({ type: MODAL_OPEN, log: TICKET_INFO_MODAL })
  }

  closeModal = () => {
    this.props.handleVisibleTicketInfoModal()
    logIfEnabled({ type: MODAL_CLOSE, log: TICKET_INFO_MODAL })
  }

  hideVisiblePopUpComment = () => {
    this.setState({
      visiblePopUpComment: false
    })
  }

  handleVisibleChange = (visiblePopUpComment) => {
    this.setState({
      visiblePopUpComment
    })
  }

  sendTicketCommentToBpm = (ticketId) => {
    const { ticketAddComment, handlingId } = this.props
    ticketAddComment({
      incidentId: ticketId,
      bodyOfCommentary: this.state.commentToTicketIncident,
      HandlingId: handlingId
    })
    this.setState({ commentToTicketIncident: null })
  }

  isFieldChangeHandle = value => {
    this.setState({ commentToTicketIncident: value.currentTarget.value })
  }

  redirectOpenTable = (value) => {
    this.setState({ openTab: value })
  }

  render () {
    const {
      modalCardState,
      historyTicketsState,
      ticketDeleteFile,
      ticketAddFile,
      handlingId
    } = this.props
    const { isVisibleTicketInfoModal, isTicketCommentsLoading } = historyTicketsState
    const {
      openTab,
      visiblePopUpComment,
      commentToTicketIncident
    } = this.state

    const ttNumber = get(historyTicketsState, 'ticket.incidents[0].number', null)
    const requestId = get(historyTicketsState, 'ticket.incidents[0].requestId', null)
    const ticketDataSource = get(historyTicketsState, 'ticket.incidents', null)
    const solutionDate = get(historyTicketsState, 'ticket.incidents[0].solutionDate', null)

    const status = get(historyTicketsState, 'ticket.incidents[0].statusOfIncidentName', null)

    const LoadIcon = <LoadingSpinner spin />

    const sendFile = ({ file }) => {
      ticketAddFile({ file: file, requestId: requestId, ttNumber: ttNumber, handlingId })
    }

    const handleSave = () => {
      this.sendTicketCommentToBpm(requestId)
      this.hideVisiblePopUpComment()
    }

    if (Array.isArray(ticketDataSource) && historyTicketsState !== null) {
      return (
        <TicketModal
          visible={isVisibleTicketInfoModal}
          width={900}
          onCancel={this.closeModal}
          footer={(
            <Fragment>
              <Popover
                title='Введите текст комментария'
                trigger='click'
                visible={visiblePopUpComment}
                onVisibleChange={this.handleVisibleChange}
                content={
                  <Fragment>
                    <TextArea
                      style={{ resize: 'none' }}
                      autoFocus
                      rows={2}
                      maxLength={500}
                      onChange={value => this.isFieldChangeHandle(value)}
                      value={commentToTicketIncident}
                    />
                    <PopoverButton onClick={handleSave}
                    >
                      Сохранить
                    </PopoverButton>
                  </Fragment>
                }
              >
                <FooterButton
                  onClick={() => this.redirectOpenTable(0)}
                  disabled={status === 'Закрыта'}
                >
                  Добавить комментарий
                </FooterButton>
              </Popover>
              <Upload
                action={`${fromEnv('REACT_APP_BE')}:${ticketAdmin}/TicketAdministation/AddFile`}
                showUploadList={false}
                fileList={null}
                onChange={sendFile}
              >
                <FooterButton
                  onClick={() => this.redirectOpenTable(1)}
                  disabled={status === 'Закрыта'}
                >
                  <UploadOutlined />
                  Добавить файл
                </FooterButton>
              </Upload>
            </Fragment>
          )}
        >
          <HeaderHolder>
            <TTLabel>{ttNumber}</TTLabel>
            {solutionDate && <TextLabel>Срок решения: {solutionDate}</TextLabel>}
          </HeaderHolder>
          <MainTable>
            <LeftValuesBlock historyTicketsState={historyTicketsState} />
            <RightValuesBlock historyTicketsState={historyTicketsState} />
          </MainTable>
          <BottomPanelBlock
            ticketDeleteFile={ticketDeleteFile}
            isTicketCommentsLoading={isTicketCommentsLoading}
            modalCardState={modalCardState}
            historyTicketsState={historyTicketsState}
            openTab={openTab}
            redirect={this.redirectOpenTable}
          />
        </TicketModal>
      )
    } else {
      return (
        <TicketModal
          visible={isVisibleTicketInfoModal}
          width={900}
          footer={false}
          onCancel={this.closeModal}
        >
          <ModalContent>
            <Spin tip='Загрузка данных заявки'
              // spinning={isTicketLoading}      пока вообще не понятно что это и откуда оно должно быть
              indicator={LoadIcon}
            />
          </ModalContent>
        </TicketModal>
      )
    }
  }
}

const TicketModal = styled(Modal)`
  top: 110px;
`
const ModalContent = styled.div`
  text-align: center;
`
const TTLabel = styled.b`
  font-size: 14px;
  font-weight: bold;
`
const TextLabel = styled.div`
  font-size: 13px;
`
const MainTable = styled.div`
  margin-bottom: 5px;
  padding: 15px 20px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  
  & > div > div > .ant-form-item {
    margin-bottom: 0;
  }
`
const HeaderHolder = styled.div`
  padding: 15px 20px;
  margin-left: 5px;
  margin-right: 5px;
`
const FooterButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`

const PopoverButton = styled(Button)`
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  left: 180px;
`
