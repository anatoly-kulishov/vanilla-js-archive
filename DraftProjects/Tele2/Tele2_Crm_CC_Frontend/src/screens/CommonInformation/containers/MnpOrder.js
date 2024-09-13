import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button, Tag } from 'antd'
import { CloseCircleTwoTone } from '@ant-design/icons'

import { checkRight, formatDateWithMskZone } from 'utils/helpers'
import {
  cancelMnpOrder,
  getCancellationsNumber,
  getClosedOrders,
  getHistoryOrderIdList,
  getOrderHistory,
  toggleMnpInfoCards
} from 'reducers/mnp/mnpReducer'
import { getQuestionProtocol } from 'reducers/mnp/protocolReducer'
import { fetchQuestionsHistory } from 'reducers/questionary/questionaryHistoryReducer'
import Card from 'components/Card'
import HistoryStatementModal from '../components/HistoryStatementModal/HistoryStatementModal'

import { getMnpStatusColor } from '../helpers/mnpStatusColor'
import MnpCancelationConfirm from '../components/MnpCancelationConfirm'
import ArrowIn from '../assets/arrowIn.svg'
import ArrowOut from '../assets/arrowOut.svg'
import { getMnpRights } from 'utils/helpers/rights'
import ScanModal from '../components/ScanModal/ScanModal'
import { compareDateDiff } from 'webseller/helpers'

export default function MnpOrder () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.internal.userState.user)
  const isMnpOrderVisible = useSelector(state => state.mnp.mnpState.isMnpOrderVisible)
  const isDelayedHandling = useSelector(state => state.internal.queryParamsState.queryParams.delayedHandling)
  const {
    mnpHandlingData,
    isCheckMNPHandlingError,
    isCheckMNPHandlingLoading,
    mnpOrder,
    isMnpOrderError,
    isMnpOrderLoading,
    mnpOrderError,
    isOrderHistoryLoading,
    orderHistoryData,
    cancellationsNumberData,
    closedOrdersData,
    historyOrderIdsDataList
  } = useSelector(state => state.mnp.mnpState)

  const [isMnpOrderCardDefaultHidden, setMnpOrderCardDefaultHidden] = useState(false)
  const [isHistoryStatementModalVisible, setHistoryStatementModalVisible] = useState(false)
  const [scanModalVisibile, setScanModalVisible] = useState(false)

  const mnpRights = useMemo(() => getMnpRights(user), [user])

  const isRejectMnpOrder = useMemo(
    () => checkRight(user, 'CC:RejectMNPOrder'), [user]
  )

  const isApproveMnpOrder = useMemo(
    () => checkRight(user, 'CC:ApproveMNPOrder'), [user]
  )

  const isMnpOrderAvailable = useMemo(() => {
    if (!isMnpOrderVisible || isCheckMNPHandlingError || isCheckMNPHandlingLoading) {
      return false
    }
    return mnpRights.isMnpOutReact || mnpRights.isMnpSupport || mnpRights.isGetCanceledMnpOrder || mnpRights.isReadMnpOrder
  }, [
    user,
    mnpHandlingData,
    isMnpOrderError,
    isMnpOrderLoading,
    isCheckMNPHandlingError,
    isCheckMNPHandlingLoading,
    isMnpOrderVisible
  ])

  const handleCancellation = useCallback(() => {
    const orderId = mnpOrder?.OrderId
    const orderIdCdbpn = mnpOrder?.OrderIdCDBPN
    if (orderId) {
      dispatch(cancelMnpOrder({ orderId, orderIdCdbpn }))
    }
  }, [mnpOrder])

  const handleHistoryStatement = () => {
    setHistoryStatementModalVisible(!isHistoryStatementModalVisible)
  }

  const handleOpenScanModal = useCallback(() => {
    setScanModalVisible(true)
  }, [setScanModalVisible])

  const parsedMnpOrder = useMemo(() => {
    const isOut = mnpHandlingData?.MNPType?.toUpperCase() === 'OUT' || mnpOrder?.MnpType?.toUpperCase() === 'OUT'
    const isIn = mnpHandlingData?.MNPType?.toUpperCase() === 'IN' || mnpOrder?.MnpType?.toUpperCase() === 'IN'

    let orderStatusDescription = mnpOrder?.RejectCodeDescription
    if (!mnpOrder?.RejectCodeDescription && mnpOrder?.RejectCode) {
      orderStatusDescription = `Код отклонения: ${mnpOrder?.RejectCode}`
    }
    if (!mnpOrder?.RejectCodeDescription && !mnpOrder?.RejectCode) {
      orderStatusDescription = mnpOrder?.OrderStatusDescription
    }

    let parsedOrder = {
      msisdn: mnpOrder?.Msisdn,
      isOut: isOut,
      orderId: mnpOrder?.OrderId,
      orderStatusName: mnpOrder?.OrderStatusName?.toLowerCase(),
      orderStatusColor: getMnpStatusColor(mnpOrder?.OrderStatusCode),
      orderStatusDescription,
      contractDate: formatDateWithMskZone(mnpOrder?.ContractDate),
      orderDate: formatDateWithMskZone(mnpOrder?.OrderDate),
      portingRemainingHours: mnpOrder?.PortingRemainingHours,
      portingDate: formatDateWithMskZone(mnpOrder?.PortingDate),
      retentionRemainingHours: mnpOrder?.RetentionRemainingHours,
      retentionDate: formatDateWithMskZone(mnpOrder?.RetentionDate),
      cancellationDate: formatDateWithMskZone(mnpOrder?.CancellationDate),
      isIn: isIn
    }

    if (isOut) {
      parsedOrder.leftOperator = mnpOrder?.DonorOperatorName || mnpOrder?.DonorOperatorCode
      parsedOrder.rightOperator = mnpOrder?.RecipientOperatorName || mnpOrder?.RecipientOperatorCode
      parsedOrder.debtSum = mnpOrder?.DebtSum
      parsedOrder.debtCheckDate = formatDateWithMskZone(mnpOrder?.DebtCheckDate)
      parsedOrder.orderErrorPerYear = mnpOrder?.OrderErrorPerYear
      parsedOrder.orderErrorPerMonth = mnpOrder?.OrderErrorPerMonth
    } else {
      parsedOrder.leftOperator = mnpOrder?.RecipientOperatorName || mnpOrder?.RecipientOperatorCode
      parsedOrder.rightOperator = mnpOrder?.DonorOperatorName || mnpOrder?.DonorOperatorCode
      parsedOrder.debtSum = null
      parsedOrder.debtCheckDate = null
    }
    return parsedOrder
  }, [mnpHandlingData, mnpOrder])

  const additional = useMemo(() => {
    const { isASSeller } = user
    const diffInDays = compareDateDiff(new Date(mnpOrder?.RetentionDate), new Date())
    const isMnpNotAvailable = parsedMnpOrder.isIn || (parsedMnpOrder.isOut && diffInDays <= 2)
    if (mnpRights.isReadMnpOrder && (!mnpHandlingData?.OrderId || !mnpOrder?.OrderId)) {
      return [{ content: 'История заявлений', onClick: handleHistoryStatement }]
    }
    if (isCheckMNPHandlingError || isMnpOrderError) {
      return []
    }
    let additionalContent = []
    if (mnpRights.isCancelMnpOrder && (mnpHandlingData?.OrderId || mnpOrder?.OrderId)) {
      additionalContent.push({
        content: (
          <MnpCancelationConfirm
            handleConfirm={handleCancellation}
            isDelayedHandling={isDelayedHandling}
            isDisabled={isASSeller && isMnpNotAvailable}
          />
        ),
        onClick: null
      })
    }
    if (mnpRights.isReadMnpOrder) {
      additionalContent.push({ content: 'История заявления', onClick: handleHistoryStatement })
    }
    if (mnpOrder?.OrderIdCDBPN && (isApproveMnpOrder || isRejectMnpOrder)) {
      additionalContent.push({ content: 'Скан заявления', onClick: handleOpenScanModal })
    }
    if (parsedMnpOrder.orderStatusName) {
      additionalContent.push({
        content: <Tag color={parsedMnpOrder.orderStatusColor}>{parsedMnpOrder.orderStatusName}</Tag>,
        onClick: null
      })
    }
    return additionalContent
  }, [mnpHandlingData, parsedMnpOrder, isMnpOrderCardDefaultHidden, isCheckMNPHandlingError, isMnpOrderError, mnpOrder])

  useEffect(() => {
    if (parsedMnpOrder.orderId) {
      setMnpOrderCardDefaultHidden(false)
    } else {
      setMnpOrderCardDefaultHidden(
        !(mnpRights.isMnpOutReact || mnpRights.isMnpSupport || mnpRights.isGetCanceledMnpOrder)
      )
    }
  }, [mnpRights, parsedMnpOrder])

  const errorMessage = useMemo(() => {
    const orderId = mnpHandlingData?.OrderId
    const orderIdText = mnpHandlingData?.OrderId ?? 'без номера'

    if (!orderId) {
      return 'Для абонента не найдено активное заявление на переход'
    }

    return mnpOrderError ?? `По заявлению ${orderIdText} данные не получены`
  }, [mnpOrderError, mnpHandlingData])

  useEffect(() => {
    if (isMnpOrderVisible && !cancellationsNumberData && parsedMnpOrder.msisdn) {
      dispatch(getCancellationsNumber({ msisdn: parsedMnpOrder.msisdn }))
    }
  }, [isMnpOrderVisible, parsedMnpOrder])

  return (
    isMnpOrderAvailable && (
      <CardWrapper>
        <Card
          isWidgetsMargin
          header='Заявка перехода'
          isContentLoading={isMnpOrderLoading || isCheckMNPHandlingLoading}
          additional={additional}
          content={
            <Wrapper>
              <HistoryStatementModal
                isVisible={isHistoryStatementModalVisible}
                onCancel={handleHistoryStatement}
                isOrderHistoryLoading={isOrderHistoryLoading}
                orderHistoryData={orderHistoryData}
                getOrderHistory={params => dispatch(getOrderHistory(params))}
                getClosedOrders={params => dispatch(getClosedOrders(params))}
                getHistoryOrderIdList={params => dispatch(getHistoryOrderIdList(params))}
                closedOrdersData={closedOrdersData}
                historyOrderIdsDataList={historyOrderIdsDataList}
                getQuestionProtocol={param => dispatch(getQuestionProtocol(param))}
                fetchQuestionsHistory={param => dispatch(fetchQuestionsHistory(param))}
              />
              {isMnpOrderAvailable && parsedMnpOrder.orderId ? (
                <>
                  <MainMnpOrderInfo>
                    <MnpOrderInfo>
                      <OrderNumber>{parsedMnpOrder.orderId}</OrderNumber>
                      <OrderStatus>
                        <OrderStatusReason>{parsedMnpOrder.orderStatusDescription}</OrderStatusReason>
                      </OrderStatus>
                    </MnpOrderInfo>
                    <div>{parsedMnpOrder.msisdn}</div>
                    <Transition>
                      <Carrier>{parsedMnpOrder.leftOperator}</Carrier>
                      <ArrowWrapper>
                        {parsedMnpOrder.isOut ? (
                          <ArrowOut data-tid='svg__mnp-order__arrow-out' />
                        ) : (
                          <ArrowIn data-tid='svg__mnp-order__arrow-in' />
                        )}
                      </ArrowWrapper>
                      <Carrier>{parsedMnpOrder.rightOperator}</Carrier>
                    </Transition>
                    <OrderInfoBlock>
                      <OrderInfo>
                        <Description>Дата заключение договора</Description>
                        <Info>{parsedMnpOrder?.contractDate}</Info>
                      </OrderInfo>
                      <OrderInfo>
                        <Description>Дата подачи заявления</Description>
                        <Info>{parsedMnpOrder?.orderDate}</Info>
                      </OrderInfo>
                    </OrderInfoBlock>
                  </MainMnpOrderInfo>
                  <AdditionalMnpOrderInfo>
                    <OrderInfoBlock>
                      {!parsedMnpOrder?.isIn && (
                        <OrderInfo>
                          <Description>Перезаводы</Description>
                          <Info>
                            {(parsedMnpOrder?.orderErrorPerYear ?? 0) +
                              ' за год / ' +
                              (parsedMnpOrder?.orderErrorPerMonth ?? 0) +
                              ' за месяц'}
                          </Info>
                        </OrderInfo>
                      )}
                      {parsedMnpOrder?.cancellationDate && (
                        <OrderInfo>
                          <Description>Дата отмены</Description>
                          <Info>{parsedMnpOrder?.cancellationDate ?? 0}</Info>
                        </OrderInfo>
                      )}
                    </OrderInfoBlock>
                    <OrderInfoBlock>
                      {parsedMnpOrder.isOut && (
                        <OrderInfo>
                          <Description>Задолженность</Description>
                          <Info>{parsedMnpOrder?.debtSum ?? 0}</Info>
                        </OrderInfo>
                      )}
                      {parsedMnpOrder?.debtCheckDate && (
                        <OrderInfo>
                          <Description>Проверка задолженности</Description>
                          <Info>{parsedMnpOrder?.debtCheckDate}</Info>
                        </OrderInfo>
                      )}
                    </OrderInfoBlock>
                    <OrderInfoBlock>
                      <OrderInfo>
                        <Description>Дата и время переноса номера</Description>
                        <InfoWrapper>
                          <Info isHighlighted>{`${parsedMnpOrder?.portingRemainingHours} ч.`}</Info>
                          <Info>{parsedMnpOrder?.portingDate}</Info>
                        </InfoWrapper>
                      </OrderInfo>
                      {parsedMnpOrder?.retentionDate && (
                        <OrderInfo>
                          <Description>Удержание до</Description>
                          <InfoWrapper>
                            <Info isHighlighted>{`${parsedMnpOrder?.retentionRemainingHours} ч.`}</Info>
                            <Info>{parsedMnpOrder?.retentionDate}</Info>
                          </InfoWrapper>
                        </OrderInfo>
                      )}
                    </OrderInfoBlock>
                  </AdditionalMnpOrderInfo>
                </>
              ) : (
                <Error>{errorMessage}</Error>
              )}
            </Wrapper>
          }
        />
        {scanModalVisibile && <ScanModal visible={scanModalVisibile} npId={mnpOrder?.OrderIdCDBPN} setModalVisible={setScanModalVisible} />}
        <CloseButton
          type='primary'
          icon={<CloseCircleTwoTone twoToneColor={'#BDBDBD'} />}
          onClick={() => dispatch(toggleMnpInfoCards(false))}
        />
      </CardWrapper>
    )
  )
}

const Wrapper = styled.div`
  padding: 0 21px;
  display: flex;
`
const MainMnpOrderInfo = styled.div`
  flex: 1;
  border-right: 1px solid #d8d8d8;
  padding-right: 16px;
`
const MnpOrderInfo = styled.div`
  display: flex;
`
const OrderNumber = styled.div`
  padding-right: 6px;
  font-weight: bold;
`
const OrderStatus = styled.div`
  display: flex;
`
const OrderStatusReason = styled.div`
  color: #909090;
`
const AdditionalMnpOrderInfo = styled.div`
  flex: 1;
  padding-left: 16px;
`
const Transition = styled.div`
  padding: 6px 0;
  display: flex;
`
const Carrier = styled.div``
const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
`
const OrderInfoBlock = styled.div`
  display: flex;
  padding: 6px 0;
`
const OrderInfo = styled.div`
  flex: 1;
`
const Description = styled.div`
  font-size: 12px;
  color: #909090;
`
const InfoWrapper = styled.div`
  display: flex;
`
const Info = styled.div`
  background-color: ${({ isHighlighted }) => (isHighlighted ? '#EFF0CC' : 'unset')};
  padding: ${({ isHighlighted }) => (isHighlighted ? '0 2px' : 'unset')};
  margin-right: 6px;
`
const Error = styled.div`
  padding-bottom: 16px;
`
const CardWrapper = styled.div`
  display: grid;
  margin-right: 30px;
  margin-bottom: 20px;
  grid-template-columns: auto 40px;
`
const CloseButton = styled(Button)`
  height: auto;
  border-radius: 10px;
  width: 40px;
  background: #eeeeee;
  border-color: #eeeeee;
  color: black;
  :hover {
    background: #eeeeee;
    border-color: #eeeeee;
    box-shadow: 0 0px 10px rgba(32, 33, 36, 0.2);
    color: black;
  }
  transition: box-shadow 0.3s ease-in-out;
`
