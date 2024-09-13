import { func, bool, array, string, object } from 'prop-types'
import { Row } from 'antd/lib/grid'
import { Button, notification, Col, Collapse } from 'antd'
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
// import { Transition } from 'react-transition-group'
import styled from 'styled-components'
import { getQueryParameters } from 'utils/helpers/queryParameters'
// import CompareTable from './components/CompareTable'
import OrderData from './components/OrderData'
import MsisdnsList from './components/MsisdnsList'
// import mnpOrderPropType from '../../constants/propTypes/mnpOrderPropType'
import mnpVerificationPropType from '../../constants/propTypes/mnpVerificationPropType'
// import ScanViewer from 'components/ScanViewer/ScanViewer'
import { checkRight, formatMsisdn } from 'utils/helpers'
import { useLocation } from 'react-router'
import mnpScanFilesPropType from 'constants/propTypes/mnpScanFilesPropType'
import fromEnv from 'config/fromEnv'

const { Panel } = Collapse
const applicationData = 'application_data'
// const ApplicationDataShowed = { y: 420 }
// const ApplicationDataHidden = { y: 564 }

const MnpManualVerification = props => {
  // const history = useHistory()
  const location = useLocation()
  // const rightBlockTitleRef = useRef(null)
  const leftBlockRef = useRef(null)
  // const refTransition = useRef(null)

  const [isMsisdnsListShowed, setIsMsisdnsListShowed] = useState(false)
  // const [selectedCoordinates, setSelectedCoordinates] = useState(undefined)
  // const [isBoxInFocus, setIsBoxInFocus] = useState(false)
  const [isApplicationDataShowed, setIsApplicationDataShowed] = useState(true)
  // const [leftBlockHeight, setLeftBlockHeight] = useState(0)

  const {
    // fetchMnpOrder,
    approveOrder,
    rejectOrder,
    // mnpOrderState: { mnpOrder, isMnpOrderLoading, mnpOrderError },
    mnpVerificationState: { mnpVerification, isMnpVerificationLoading, mnpVerificationError },
    fetchMnpVerification,
    fetchRejectionReasons,
    rejectionInfoState: { rejectionReasons },
    // getScanFiles,
    mnpScanFilesState: { mnpScanFiles }, /* isMnpScanFilesLoading, isMnpScanFilesError */
    user
  } = props

  // const { Msisdns = [] } = mnpOrder ?? {}
  const { rejectReasonCodes, /* compareData, */ Msisdns = [] } = mnpVerification ?? {}

  const width = leftBlockRef.current?.offsetWidth
  // const height = leftBlockHeight - rightBlockTitleRef.current?.offsetHeight

  // useEffect(() => {
  //   leftBlockRef.current && setLeftBlockHeight(leftBlockRef.current.offsetHeight)
  // })

  useEffect(() => {
    if (rejectReasonCodes?.length > 0 && !rejectionReasons) {
      fetchRejectionReasons({
        Code: rejectReasonCodes
      })
    }
  }, [rejectReasonCodes, rejectionReasons])

  useEffect(() => {
    if (rejectionReasons?.length > 0) {
      showRejectReasonsNotifications(rejectionReasons)
    }
  }, [rejectionReasons])

  useEffect(() => {
    document.title = 'CRM: Ручная сверка'

    const { npId, eCommerceTypeCode } = getQueryParameters(location.search)

    fetchMnpVerification({ NpId: npId, EcommerceTypeCode: eCommerceTypeCode })
    // TODO временно убраны вызовы по требованию 511964
    // fetchMnpOrder(npId)
    // getScanFiles(npId)
  }, [])

  const areScansRecognized = useMemo(
    () => mnpScanFiles?.every(({ isRecognized }) => isRecognized === true),
    [mnpScanFiles]
  )
  const isScanValidatingAvailable = useMemo(
    () => checkRight(user, 'CC:MNPScanValidate') && areScansRecognized,
    [areScansRecognized, user]
  )

  const isRejectMnpOrder = useMemo(
    () => checkRight(user, 'CC:RejectMNPOrder'), [user]
  )

  const formattedMsisdns = useMemo(() => Msisdns.map(({ Msisdn }) => formatMsisdn(Msisdn)), [Msisdns])

  const toggleMsisdnsList = useCallback(() => {
    setIsMsisdnsListShowed(prev => !prev)
  }, [])

  const handleOpenCard = useCallback(msisdn => {
    const cleanMsisdn = msisdn.replace(/[\s()+-]+/g, '')
    open(`${fromEnv('REACT_APP_SEARCH')}/main/balance?msisdn=${cleanMsisdn}`)
  }, [])

  const handleClickApprove = useCallback(() => {
    const { npId, orderId } = getQueryParameters(location.search)

    approveOrder({ OrderId: orderId, NumberPortabilityId: npId })
  }, [])
  const handleClickReject = useCallback(() => {
    const { npId, orderId } = getQueryParameters(location.search)

    rejectOrder({
      OrderId: orderId,
      NumberPortabilityId: npId
      // RejectReasonCode: undefined,
      // Comment: undefined
    })
  }, [])

  const showNotification = ({ CodeDescription }) => notification.warn({ description: CodeDescription })

  const showRejectReasonsNotifications = rejectionReasons => {
    rejectionReasons.forEach(showNotification)
  }

  // const handleClickInfo = useCallback(record => {
  //   const { itemId, coordinates } = record

  //   const selectedCoordinates = coordinates?.filter(coord => coord.itemId === itemId)
  //   if (selectedCoordinates?.length > 0) {
  //     setSelectedCoordinates(selectedCoordinates)
  //     setIsBoxInFocus(true)
  //   }
  // }, [])

  // const handleBlurBox = useCallback(() => {
  //   setIsBoxInFocus(false)
  // }, [])

  // const handleFocusBox = useCallback(() => {
  //   setIsBoxInFocus(true)
  // })

  // const handleClickEdit = useCallback(() => {
  //   history.push(`/empty/mnp-order-validation${location.search}`)
  // }, [history, location])

  const toggleApplicationDataShowStatus = useCallback(() => {
    setTimeout(() => setIsApplicationDataShowed(prev => !prev), 500)
  }, [isApplicationDataShowed])

  return (
    <>
      <Content>
        <RowWrapper>
          <Col span={12}>
            <LeftBlock ref={leftBlockRef}>
              <StyledCollapse
                bordered={false}
                defaultActiveKey={applicationData}
                onChange={toggleApplicationDataShowStatus}
              >
                <Panel header='Данные заявления' key={applicationData}>
                  {mnpVerificationError ? (
                    <ErrorContainer width={width}>
                      <p>Ошибка при загрузке заявки</p>
                    </ErrorContainer>
                  ) : (
                    <OrderData
                      order={mnpVerification}
                      msisdns={formattedMsisdns}
                      loading={isMnpVerificationLoading}
                      onClickMsisdn={toggleMsisdnsList}
                    />
                  )}
                </Panel>
              </StyledCollapse>

              {/* TODO временно убрана верстка и соответствующая логика по требованию 511964 */}
              {isMsisdnsListShowed && (
                <MsisdnsList msisdns={formattedMsisdns} onClose={toggleMsisdnsList} onClickMsisdn={handleOpenCard} />
              )}
              {/* : (
                <TableWrapper>
                  <CompareTable
                    data={compareData}
                    rejectionReasons={rejectionReasons}
                    loading={isMnpVerificationLoading}
                    onClickInfo={handleClickInfo}
                    onClickEdit={handleClickEdit}
                    showEditButton={isScanValidatingAvailable}
                    scroll={isApplicationDataShowed ? ApplicationDataShowed : ApplicationDataHidden}
                  />
                </TableWrapper>
              )} */}
              {(isScanValidatingAvailable || isRejectMnpOrder) && (
                <Buttons>
                  <LeaveQueueButton type='primary'>Покинуть очередь</LeaveQueueButton>
                  <div>
                    {
                      isRejectMnpOrder &&
                      <CancelButton type='primary' danger onClick={handleClickReject}>
                        Отклонить
                      </CancelButton>
                    }
                    {
                      isScanValidatingAvailable &&
                      <Button color='#00DEFF' type='primary' onClick={handleClickApprove}>
                        Подтвердить
                      </Button>
                    }
                  </div>
                </Buttons>
              )}
            </LeftBlock>
          </Col>
          {/* <Col span={12}>
            <RightBlock>
              <RightBlockTitle ref={rightBlockTitleRef}>Скан-копия заявления</RightBlockTitle>
              {isMnpScanFilesError ? (
                <ErrorContainer width={width} height={height}>
                  <p>Ошибка при загрузке скана</p>
                </ErrorContainer>
              ) : (
                <Transition nodeRef={refTransition} timeout={1000}>
                  <Spin spinning={isMnpScanFilesLoading}>
                    <ScanViewer
                      ref={refTransition}
                      width={width}
                      height={height - 5}
                      pages={mnpScanFiles}
                      selectedCoordinates={selectedCoordinates}
                      onBlurBox={handleBlurBox}
                      onFocusBox={handleFocusBox}
                      isBoxInFocus={isBoxInFocus}
                    />
                  </Spin>
                </Transition>
              )}
            </RightBlock>
          </Col> */}
        </RowWrapper>
      </Content>
    </>
  )
}

export default MnpManualVerification

MnpManualVerification.propTypes = {
  // fetchMnpOrder: func,
  approveOrder: func,
  rejectOrder: func,
  // mnpOrderState: { mnpOrder: mnpOrderPropType, isMnpOrderLoading: bool },
  mnpVerificationState: { mnpVerification: mnpVerificationPropType, isMnpVerificationLoading: bool },
  fetchMnpVerification: func,
  fetchRejectionReasons: func,
  rejectionInfoState: { rejectionReasons: array },
  // getScanFiles: func,
  mnpScanFilesState: { mnpScanFiles: mnpScanFilesPropType, isMnpScanFilesLoading: bool, isMnpScanFilesError: string },
  user: object
}

const Content = styled.div`
  display: flex;
`

const RowWrapper = styled(Row)`
  padding: 0px 16px 0px 16px;
  width: 100%;
`

const LeftBlock = styled.div`
  margin-right: 20px;
`

// const RightBlock = styled.div`
//   background: #fff;
//   border-radius: 10px;
//   box-shadow: 0 0px 10px rgba(32, 33, 36, 0.05);
// `

// const TableWrapper = styled.div`
//   border-radius: 10px;
//   box-shadow: 0 0px 10px rgba(32, 33, 36, 0.05);
//   overflow: hidden;
// `

// const RightBlockTitle = styled.div`
//   border-bottom: 1px solid #d9d9d9;
//   font-size: 16px;
//   padding: 12px 0px 12px 24px;
//   color: black;
//   font-weight: normal;
//   font-family: T2_DisplaySerif_Bold_Short;
// `

const StyledCollapse = styled(Collapse)`
  background: #fff;
  margin-bottom: 20px;
  box-shadow: 0 0px 10px rgba(32, 33, 36, 0.05);
  border-radius: 10px;

  .ant-collapse-header {
    font-weight: normal;
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
  }

  & > .ant-collapse-item {
    & > .ant-collapse-content {
      border-top: 1px solid #d9d9d9;
      & > .ant-collapse-content-box {
        padding-bottom: 4px;
      }
    }
  }

  .ant-collapse-item {
    border-bottom: 0;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 23px;
`

const LeaveQueueButton = styled(Button)`
  background-color: rgba(177, 177, 177, 1);
  border-color: rgba(177, 177, 177, 1);

  :hover {
    background-color: rgba(177, 177, 177, 0.9);
    border-color: rgba(177, 177, 177, 0.9);
  }
`

const CancelButton = styled(Button)`
  margin-right: 16px;
`

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  & > p {
    margin-top: 1em;
  }
`
