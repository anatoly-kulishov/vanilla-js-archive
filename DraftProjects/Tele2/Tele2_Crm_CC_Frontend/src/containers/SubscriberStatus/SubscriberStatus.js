/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { isNil } from 'lodash'
import { Modal, Row, Col, Select, Table, Button, Spin } from 'antd'
import LoadingSpinner from 'components/LoadingSpinner'

import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { SUBSCRIBER_STATUS_MODAL } from 'constants/logModalNames'
import NotificationMarker from 'components/NotificationMarker'
import { GLOBAL } from 'constants/redirectTypes'
import { logIfEnabled } from 'utils/helpers/logger'

const MAX_BLOCKS_COUNT = 5

const statuses = {
  isPrepared: 0,
  isActive: 1,
  isBlocked: 2,
  isClosed: 3,
  isPaused: 4
}

class SubscriberStatus extends PureComponent {
  static propTypes = {
    isSubscriberStatusToggled: PropTypes.bool,
    isSubscriberHistoryError: PropTypes.bool,
    isSubscriberHistoryLoading: PropTypes.bool,
    Id: PropTypes.number,
    subscriberHistory: PropTypes.object,
    personalAccount: PropTypes.object,
    handleTogglingStatusModal: PropTypes.func,
    fetchSubscriberStatusHistory: PropTypes.func,
    fetchSubscriberStatusUpdate: PropTypes.func,
    isAdminChangeStatusSubsPermission: PropTypes.bool,
    fetchRecommendationChangeStatus: PropTypes.func,
    fetchSubscriberStatusList: PropTypes.func,
    recommendationChangeStatus: PropTypes.object,
    DiagnosticParams: PropTypes.array,
    subscriberStatusList: PropTypes.array,
    isWebSeller: PropTypes.bool,
    submitChangingClientStatusParams: PropTypes.func
  }

  state = {
    newStatus: 1,
    subscriberCscId: null,
    disableDerived: false,
    history: [],
    blocksCount: 0,
    blockMessage: '',
    isChangeStatusForbidden: true,
    isAcceptDisabled: false
  }

  static getDerivedStateFromProps (props, state) {
    const { disableDerived } = state
    const {
      subscriberHistory,
      isSubscriberHistoryError,
      isSubscriberHistoryLoading,
      personalAccount: { SubscriberStatus: subscriberStatus }
    } = props
    if (!disableDerived && !isSubscriberHistoryError && !isSubscriberHistoryLoading && subscriberHistory) {
      return {
        history: subscriberHistory.History,
        blocksCount: subscriberHistory.BlocksCount,
        blockMessage: subscriberHistory.BlockMessage,
        isChangeStatusForbidden: subscriberHistory.IsChangeStatusForbidden,
        disableDerived: true,
        newStatus: subscriberStatus,
        isAcceptDisabled: true
      }
    } else {
      return null
    }
  }

  componentDidMount () {
    const {
      fetchSubscriberStatusHistory,
      fetchRecommendationChangeStatus,
      fetchSubscriberStatusList,
      personalAccount: { Msisdn: msisdn }
    } = this.props
    fetchSubscriberStatusList()
    fetchSubscriberStatusHistory({ msisdn })
    fetchRecommendationChangeStatus({ msisdn })
    logIfEnabled({ type: MODAL_OPEN, log: SUBSCRIBER_STATUS_MODAL })
  }

  handleCloseModal = () => {
    this.props.handleTogglingStatusModal()
    logIfEnabled({ type: MODAL_CLOSE, log: SUBSCRIBER_STATUS_MODAL })
  }
  handleFilterChange = params => {
    const {
      fetchRecommendationChangeStatus,
      personalAccount: { SubscriberStatus: subscriberStatus, Msisdn: msisdn }
    } = this.props

    if (params.newStatus === statuses.isBlocked || params.newStatus === statuses.isPaused) {
      fetchRecommendationChangeStatus({ msisdn, statusId: params.newStatus })
    }

    this.setState(
      {
        ...this.state,
        ...params
      },
      () => {
        this.setState({ isAcceptDisabled: params.newStatus === subscriberStatus })
      }
    )
  }

  handleAccept = () => {
    const { isWebSeller } = this.props
    const { newStatus, subscriberCscId } = this.state

    if (isWebSeller) {
      const { submitChangingClientStatusParams } = this.props

      submitChangingClientStatusParams({ newStatus, subscriberCscId })
    } else {
      const {
        fetchSubscriberStatusUpdate,
        personalAccount: {
          SubscriberFullInfo,
          Msisdn: msisdn,
          BillingBranchId: branchId,
          SubscriberId: subscriberId,
          ClientId: clientId,
          Email: email,
          SubscriberStatus: subscriberStatus
        },
        subscriberHistory: { CurrentStatusReason: currentStatusReason },
        Id: handlingId
      } = this.props

      const { SubscriberTypeId: subscriberTypeId } = SubscriberFullInfo?.SubscriberInfo ?? {}

      fetchSubscriberStatusUpdate({
        branchId,
        subscriberId,
        statId: newStatus,
        subscriberCscId,
        currentSubscriberStatus: subscriberStatus,
        handlingId,
        clientId,
        email: !msisdn ? email : msisdn,
        msisdn,
        subscriberTypeId,
        currentStatusReason
      })
    }
  }

  render () {
    const {
      isSubscriberHistoryLoading,
      isSubscriberStatusToggled,
      isAdminChangeStatusSubsPermission,
      recommendationChangeStatus,
      DiagnosticParams,
      subscriberStatusList,
      isWebSeller
    } = this.props

    const {
      newStatus,
      history,
      isAcceptDisabled,
      blocksCount,
      blockMessage,
      isChangeStatusForbidden,
      subscriberCscId
    } = this.state
    const blockSubscriberStatusMarker = DiagnosticParams?.find(item => item.IsBlockSubscriberStatus === true)

    const isRecommendationChangeStatuses = !isNil(recommendationChangeStatus)
    const currentReason = subscriberStatusList?.find(item => item.Id === newStatus)
    const isBlockingDisabledByCount =
      !isAdminChangeStatusSubsPermission &&
      blocksCount >= MAX_BLOCKS_COUNT &&
      isChangeStatusForbidden &&
      newStatus !== statuses.isActive

    const Wrapper = ({ children }) =>
      isWebSeller ? (
        <div>{children}</div>
      ) : (
        <StyledModal
          width={800}
          title='Изменение статуса абонента'
          visible={isSubscriberStatusToggled}
          onCancel={this.handleCloseModal}
          footer={null}
        >
          {children}
        </StyledModal>
      )

    return (
      <Wrapper>
        <Fragment>
          {blockSubscriberStatusMarker && (
            <NotificationWrapper>
              <NotificationMarker
                item={{
                  pathName: blockSubscriberStatusMarker.Url,
                  redirectType: GLOBAL,
                  description: blockSubscriberStatusMarker.Value
                }}
                key={blockSubscriberStatusMarker.message}
                type='info'
              />
            </NotificationWrapper>
          )}
          <ChangeStatusWrapper>
            <Row gutter={16}>
              <Col span={12}>
                <Label>
                  Новый статус
                  <StyledSelect
                    value={newStatus}
                    disabled={!!blockSubscriberStatusMarker || isChangeStatusForbidden}
                    onChange={value =>
                      this.handleFilterChange({
                        newStatus: value,
                        subscriberCscId: subscriberStatusList?.find(item => item.Id === value).ChangeReasonId
                      })
                    }
                  >
                    {subscriberStatusList
                      ?.filter(item => item.IsAvailableForChange || item.Id === newStatus)
                      ?.map(item => (
                        <Select.Option disabled={!item.IsAvailableForChange} value={item.Id} key={item.Id}>
                          {item.Name}
                        </Select.Option>
                      ))}
                  </StyledSelect>
                </Label>
              </Col>
              <Col span={12}>
                <Label>
                  Причина нового статуса
                  <StyledSelect
                    disabled
                    value={subscriberCscId}
                    // disabled={IsActive} TODO: не забыть когда это поле будет разблокировано, оставить это условие
                    // TODO: Получать список с бекенда (метод не готов)
                    // onChange={value => this.onFilterChange({ enrollmentType: value })}
                  >
                    <Select.Option value={subscriberCscId} key={subscriberCscId}>
                      {currentReason?.ChangeReasonName}
                    </Select.Option>
                  </StyledSelect>
                </Label>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <BlockInfo isRed={blocksCount >= MAX_BLOCKS_COUNT}>
                  Блокировок в текущем календарном месяце: {blocksCount}.
                </BlockInfo>
                <BlockInfo isRed>
                  {(isChangeStatusForbidden || isBlockingDisabledByCount) && blockMessage && blockMessage}
                </BlockInfo>
              </Col>
              <Col span={4}>
                <Controls>
                  <ControlBtn
                    disabled={
                      isAcceptDisabled ||
                      !!blockSubscriberStatusMarker ||
                      isBlockingDisabledByCount ||
                      isChangeStatusForbidden
                    }
                    type='primary'
                    onClick={this.handleAccept}
                  >
                    Применить
                  </ControlBtn>
                </Controls>
              </Col>
            </Row>
            {isRecommendationChangeStatuses && (
              <Row>
                <Col span={24}>
                  {(newStatus === statuses.isBlocked || newStatus === statuses.isPaused) && (
                    <Fragment>
                      <RecommendationText>{recommendationChangeStatus.RecommendationMobileBank}</RecommendationText>
                      <RecommendationText>{recommendationChangeStatus.RecommendationCityPhone}</RecommendationText>
                    </Fragment>
                  )}
                </Col>
              </Row>
            )}
          </ChangeStatusWrapper>
          <Spin spinning={isSubscriberHistoryLoading} indicator={<LoadingSpinner spin />}>
            <StatusTable
              locale={{ emptyText: 'Нет истории изменения статуса' }}
              rowKey='Key'
              dataSource={history}
              pagination={false}
            >
              <Table.Column
                dataIndex='CreateDateTime'
                title='Дата изменения'
                width='20%'
                render={value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')}
              />
              <Table.Column dataIndex='StatName' title='Статус' width='20%' />
              <Table.Column dataIndex='CscName' title='Причина смены статуса' width='40%' />
              <Table.Column dataIndex='CreateUserName' title='Пользователь' width='20%' />
            </StatusTable>
          </Spin>
        </Fragment>
      </Wrapper>
    )
  }
}

export default SubscriberStatus

const StyledModal = styled(Modal)`
  .ant-modal-header {
    padding: 14px 24px 10px 24px;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
`
const ChangeStatusWrapper = styled.div`
  padding: 13px;
`
const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin: 0;
  line-height: 36px;
`
const StyledSelect = styled(Select)`
  width: 100%;
`
const StatusTable = styled(Table)`
  font-size: 14px;
`
const ControlBtn = styled(Button)`
  margin-left: 20px;
`
const Controls = styled.div`
  padding-top: 7px;
  display: flex;
  justify-content: flex-end;
`

const BlockInfo = styled.div`
  padding-top: 7px;
  color: ${props => (props.isRed ? 'red' : 'black')};
`

const RecommendationText = styled.div`
  margin-top: 10px;
  background-color: #fffde7;
`

const NotificationWrapper = styled.div`
  padding-left: 5px;
`
