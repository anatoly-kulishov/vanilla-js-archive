import React, { Fragment, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import moment from 'moment'
import { Button, Col, Collapse, Popover, Row, Spin, Tag, Tooltip } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { get } from 'lodash'

import { clientCategories } from 'constants/personalAccountStrings'
import FrozenTariffInfo from 'components/FreezedTariffInfo'
import { copyElementTextToClipboard } from 'utils/helpers'
import LoadingSpinner from 'components/LoadingSpinner'
import { getTypeCard } from 'webseller/helpers'
import { cardModes } from 'constants/cardModes'
import open from 'utils/helpers/windowOpener'
import { PhoneNumberCategory } from 'webseller/integration'

const PASSPORT_KEY = '1'

const setDotColor = status => {
  switch (status) {
    case 1:
      return '#52C41A'
    case 2:
      return '#F5222D'
    case 3:
      return 'black'
    case 4:
      return '#FFDE03'
    case 0:
      return '#bbb'
    default:
      return 'white'
  }
}

const setRatePlanDotColor = status => {
  switch (status) {
    case 'active':
    case 'unblocked':
      return '#52C41A'
    case 'unactive':
    case 'blocked':
    case 'canceled':
    case 'expired':
      return '#F5222D'
    case 'testing':
    case 'archived':
    case '__unknown__':
      return '#bbb'

    default:
      return ''
  }
}

const chargeDots = counter => {
  const chargeDots = []
  for (let idx = 0; idx < 3; idx++) {
    chargeDots.push(<RatePlanDot color={idx < counter ? '#52C41A' : '#bbb'} />)
  }
  return chargeDots
}

const buttonStyle = { width: '50%' }

const propTypes = {
  cardMode: PropTypes.number,
  personalAccount: PropTypes.object,
  mnpMarkers: PropTypes.object,
  isMissingPassword: PropTypes.bool,
  changeAbonentsModalVisibility: PropTypes.func,
  trustCreditInfo: PropTypes.object,
  handleVisibleTariffModal: PropTypes.func,
  isTariffManagementPermission: PropTypes.string,
  isMnpSupportPermission: PropTypes.bool,
  personalData: PropTypes.object,
  fetchPersonalData: PropTypes.func,

  virtualNumbers: PropTypes.array,
  IsActiveVirtualNumber: PropTypes.bool,
  handleTogglingStatusModal: PropTypes.func,
  handleToggleRatePlanModal: PropTypes.func,
  handleVisibleHistoryIccModal: PropTypes.func,
  isReplacementSimPermission: PropTypes.bool,
  subscriberListState: PropTypes.bool,
  unpaidChargeData: PropTypes.object,

  fetchBlacklistInfo: PropTypes.func.isRequired,
  fetchWebimBlacklistInfo: PropTypes.func.isRequired,
  isBlacklistInfoLoading: PropTypes.bool,
  isWebimBlacklistInfoLoading: PropTypes.bool,
  blacklistInfo: PropTypes.object,
  webimBlacklistInfo: PropTypes.object,

  fetchHandlingStatus: PropTypes.func.isRequired,
  handlingStatus: PropTypes.bool,
  isHandlingStatusLoading: PropTypes.bool,

  vipSegmentation: PropTypes.object,
  subscriberMarginMarker: PropTypes.object,
  chargeCounter: PropTypes.object,
  whoIsIt: PropTypes.object,
  isPersonalDataPermission: PropTypes.bool,
  tariffInfoPreview: PropTypes.object,
  isReadTariffGuaranteedPrice: PropTypes.bool,
  isASSeller: PropTypes.bool
}

const AbonentContent = props => {
  const {
    cardMode,
    personalAccount,
    mnpMarkers,
    isMissingPassword,
    changeAbonentsModalVisibility,
    trustCreditInfo,
    handleVisibleTariffModal,
    isTariffManagementPermission,
    personalData: { passport, isPassportLoading },
    fetchPersonalData,

    virtualNumbers,
    IsActiveVirtualNumber,
    handleTogglingStatusModal,
    handleToggleRatePlanModal,
    handleVisibleHistoryIccModal,
    isReplacementSimPermission,
    isMnpSupportPermission,
    subscriberListState: { isSubscriberListLoading },
    unpaidChargeData,

    isBlacklistInfoLoading,
    isWebimBlacklistInfoLoading,
    fetchBlacklistInfo,
    fetchWebimBlacklistInfo,
    blacklistInfo,
    webimBlacklistInfo,

    fetchHandlingStatus,
    handlingStatus,
    isHandlingStatusLoading,
    vipSegmentation,
    subscriberMarginMarker,
    chargeCounter,
    whoIsIt,
    isPersonalDataPermission,
    tariffInfoPreview,
    isReadTariffGuaranteedPrice,
    isASSeller
  } = props
  const segment = vipSegmentation?.Segment
  const segmentLink = vipSegmentation?.SegmentLink

  const { GuaranteedPriceInfo } = tariffInfoPreview ?? {}
  const { IsGuaranteedPrice, PeriodGuaranteedPriceEnd } = GuaranteedPriceInfo ?? {}

  const {
    SubscriberFullInfo,
    ClientCategory: clientCategory,
    Msisdn: msisdn,
    Email: email,
    PersonalEmail: personalEmail
  } = personalAccount

  const { Esim: esim, BirthDate: birthDate } = mnpMarkers ?? {}
  const {
    Enviroment: enviroment,
    Region: subscriberRegion,
    LinkedPersonalAccount: linkedPersonalAccount,
    ManagerFullName: managerFullName,
    ManagerIdentityDocument: managerIdentityDocument,
    JurClientTypeName,
    ClientTypeName
  } = SubscriberFullInfo?.SubscriberClientInfo ?? {}
  const {
    SubscriberStatusId: subscriberStatusId,
    SubscriberStatus: subscriberStatus,
    SubscriberFullName: name,
    RateName: rateName,
    SpkName: spkName,
    Password: password,
    ActivationDate: activationDate,
    StatusChangeReason: statusChangeReason,
    CityPhone,
    WebCareLevelAccess
  } = SubscriberFullInfo?.SubscriberInfo ?? {}
  const {
    Puk1: puk1,
    Pin1: pin1,
    Imsi: imsi,
    Iccid: iccid,
    Puk2: puk2,
    Pin2: pin2,
    UType: uType
  } = SubscriberFullInfo?.USIProfile ?? {}

  const virtualNumbersList =
    virtualNumbers &&
    virtualNumbers.map(virtualNumber => {
      return <div>{virtualNumber}</div>
    })

  const getMarginInfoCol = () => {
    if (subscriberMarginMarker) {
      const { Data, MessageText, status: marginMarkerStatus } = subscriberMarginMarker
      const Description = Data?.Description
      switch (marginMarkerStatus) {
        case 200:
          return Description ? (
            <Col span={12}>
              <StyledRow>Маржинальность</StyledRow>
              <PersonalDataLabel>{Description}</PersonalDataLabel>
            </Col>
          ) : null
        case 406:
        case 409:
          return (
            <Col span={12}>
              <StyledRow>Маржинальность</StyledRow>
              <PersonalDataLabel>{MessageText}</PersonalDataLabel>
            </Col>
          )

        default:
          return null
      }
    }
  }

  const disabledReplacementSim = () => {
    const searchParams = new URLSearchParams(window.location.search)
    return !searchParams.has('linkedHandlingTechId') || !handlingStatus
  }

  const isLoading = 'Загрузка данных чёрного списка...'
  const isBlacklistInfo = 'Нажмите для получения информации по чёрному списку'

  const BlackListPopover = (
    <div>
      <p>
        {(blacklistInfo && blacklistInfo.MessageText) ||
          (isBlacklistInfoLoading ? `CallClient: ${isLoading}` : isBlacklistInfo)}
      </p>
      <p>
        {(webimBlacklistInfo && webimBlacklistInfo.MessageText) ||
          (isWebimBlacklistInfoLoading ? `Чат-платформа: ${isLoading}` : isBlacklistInfo)}
      </p>
    </div>
  )

  const isSubscriber = cardMode === cardModes.subscriber
  const isLeon = cardMode === cardModes.leon
  const SubscriberTotalCount = get(personalAccount, 'SubscriberCounts.SubscriberTotalCount')
  const ServiceStatusName = get(unpaidChargeData, 'ServiceStatusName', '')
  const ServiceStatusText = get(unpaidChargeData, 'ServiceStatusText', '')
  const ServiceStatus = get(unpaidChargeData, 'ServiceStatus', '')
  const WarningMessage = get(unpaidChargeData, 'WarningMessage', '')
  const RateNonPaymentData = get(unpaidChargeData, 'RateNonPaymentData', {})
  const { UnpaidChargeOffText, IsUnpaidPlanRate } = RateNonPaymentData

  const isBlacklistInfoBlocked = useMemo(() => blacklistInfo?.Data?.IsBlocked, [blacklistInfo])
  const isWebimBlacklistInfoBlocked = useMemo(() => webimBlacklistInfo?.Data?.IsBlocked, [webimBlacklistInfo])
  const isBlacklistInfoBlockedValue = useMemo(
    () =>
      (blacklistInfo?.Data.IsBlocked === null || webimBlacklistInfo?.Data.IsBlocked === null) &&
      (blacklistInfo?.Data.IsBlocked !== true || webimBlacklistInfo?.Data.IsBlocked !== true)
  )
  const isBlacklistInfoCheck = useMemo(
    () => (isBlacklistInfoBlockedValue ? 'null' : false),
    [isBlacklistInfoBlockedValue]
  )
  const isBlacklistInfoNotArrived = useMemo(
    () => (webimBlacklistInfo?.IsSuccess === false || blacklistInfo?.IsSuccess === false ? 'null' : false),
    [webimBlacklistInfo]
  )

  const handleOnChange = useCallback(openedKeys => {
    if (openedKeys.includes(PASSPORT_KEY)) {
      fetchPersonalData()
    }
  })

  const handleCopyPhoneNumber = useCallback(event => copyElementTextToClipboard(event.target, 'Номер скопирован'))
  const handleReplacementSimCardButtonClick = useCallback(() =>
    fetchHandlingStatus({ shouldToggleReplacementSimModal: true })
  )
  const handleSegmentLinkClick = useCallback(() => open(segmentLink, '_blank'), [segmentLink])
  const handleRatePlanDotClick = useCallback(
    () => IsUnpaidPlanRate && !WarningMessage && handleToggleRatePlanModal(),
    [IsUnpaidPlanRate, WarningMessage]
  )
  const handleBlackListInfoClick = useCallback(() => {
    fetchBlacklistInfo({ msisdn })
    fetchWebimBlacklistInfo({ msisdn })
  }, [msisdn])

  const {
    isAnonymousCard,
    isNonSubscriberCard,
    isPersonalAccountCard
  } = getTypeCard(isASSeller)

  const isB2c = clientCategory?.toUpperCase() === clientCategories.B2C

  const actualRegion = isLeon ? whoIsIt?.RegionName : null
  const operator = isLeon ? whoIsIt?.OperatorName : null

  const showFrozenTariffInfo = isReadTariffGuaranteedPrice && IsGuaranteedPrice

  const { isb2b, isSubscriberFirstLevelCard } = getTypeCard(isASSeller)

  return (
    <AbonentContentPanel>
      <AbonentMainData>
        {(isSubscriber || isLeon) && (
          <SubscriberStatus>
            {msisdn && <PhoneNumber onClick={handleCopyPhoneNumber}>{msisdn}</PhoneNumber>}
            {!isLeon && !isAnonymousCard && (
              <Popover
                content={
                  <ContentPopover>{statusChangeReason || 'Нет данных о причине изменения статуса'}</ContentPopover>
                }
                title={subscriberStatus}
              >
                <DotWrapper clickable onClick={handleTogglingStatusModal}>
                  <Dot color={setDotColor(subscriberStatusId)} />
                </DotWrapper>
              </Popover>
            )}
          </SubscriberStatus>
        )}
        {isSubscriber && !isASSeller && (
          <Popover
            title={
              <>
                <strong>Чёрный список</strong>
                <BlaskListNotificationText>
                  Внимание! Нельзя говорить клиенту о Черном списке, нельзя намекать на любые возможные ограничения.
                </BlaskListNotificationText>
              </>
            }
            content={BlackListPopover}
            trigger='click'
            placement='top'
          >
            <BlackListIcon
              isLoading={isBlacklistInfoLoading || isWebimBlacklistInfoLoading}
              isBlocked={
                isBlacklistInfoNotArrived ||
                isBlacklistInfoCheck ||
                isWebimBlacklistInfoBlocked ||
                isBlacklistInfoBlocked
              }
              onClick={handleBlackListInfoClick}
            />
          </Popover>
        )}
        <>
          {!isASSeller && name && <Name>{name}</Name>}
          {isASSeller && name && !isAnonymousCard && <Name>{name}</Name>}
        </>
        <>
          {!isASSeller && !isLeon && (
            <Spin spinning={isSubscriberListLoading} indicator={<LoadingSpinner spin />}>
              {SubscriberTotalCount && SubscriberTotalCount !== '0' && (
                <AbonentsTitle isClickable={SubscriberTotalCount > 1} onClick={changeAbonentsModalVisibility}>
                Абоненты {SubscriberTotalCount}
                </AbonentsTitle>
              )}
            </Spin>
          )}
          {isASSeller && !isAnonymousCard && !(isb2b && isSubscriberFirstLevelCard) && (
            <Spin spinning={isSubscriberListLoading} indicator={<LoadingSpinner spin />}>
              {SubscriberTotalCount && SubscriberTotalCount !== '0' && (
                <AbonentsTitle isClickable={SubscriberTotalCount >= 1} onClick={changeAbonentsModalVisibility}>
                Абоненты {SubscriberTotalCount}
                </AbonentsTitle>
              )}
            </Spin>
          )}
        </>
        <PersonalDataTable>
          <Row>
            <>
              {(isASSeller && !(isb2b && isSubscriberFirstLevelCard) && spkName) && (
                <Col span={12}>
                  <StyledRow>Объём трафика</StyledRow>
                  <AdditionalInfo>
                    <PersonalDataLabel>{spkName}</PersonalDataLabel>
                  </AdditionalInfo>
                </Col>
              )}
              {(!isASSeller && spkName) && (
                <Col span={12}>
                  <StyledRow>Объём трафика</StyledRow>
                  <AdditionalInfo>
                    <PersonalDataLabel>{spkName}</PersonalDataLabel>
                  </AdditionalInfo>
                </Col>
              )}
              {(isASSeller && isb2b) && <PhoneNumberCategory />}
            </>
            <>
              {isASSeller && (!(isb2b && isSubscriberFirstLevelCard) || isPersonalAccountCard) && enviroment && (
                <Col span={12}>
                  <StyledRow>Способ обслуживания</StyledRow>
                  <AdditionalInfo>
                    <PersonalDataLabel>{enviroment}</PersonalDataLabel>
                  </AdditionalInfo>
                </Col>
              )}
              {(!isASSeller && enviroment) && (
                <Col span={12}>
                  <StyledRow>Способ обслуживания</StyledRow>
                  <AdditionalInfo>
                    <PersonalDataLabel>{enviroment}</PersonalDataLabel>
                  </AdditionalInfo>
                </Col>
              )}
            </>
            {(isASSeller && isB2c) && (
              <Fragment>
                <Col span={12}>
                  <StyledRow>Тип клиента</StyledRow>
                  <PersonalDataLabel>{ClientTypeName}</PersonalDataLabel>
                </Col>
                {JurClientTypeName && (
                  <Col span={12}>
                    <StyledRow>Юр. тип клиента</StyledRow>
                    <PersonalDataLabel>{JurClientTypeName}</PersonalDataLabel>
                  </Col>
                )}
                {spkName && !isASSeller && (
                  <Col span={12}>
                    <StyledRow>Объём трафика</StyledRow>
                    <PersonalDataLabel>{spkName}</PersonalDataLabel>
                  </Col>
                )}
                {segment && (
                  <Col span={12}>
                    <BigInnerRow>Программа обслуживания</BigInnerRow>
                    <PersonalDataLink onClick={handleSegmentLinkClick}>{segment}</PersonalDataLink>
                  </Col>
                )}
                <PhoneNumberCategory />
                {enviroment && (
                  <Col span={12}>
                    <StyledRow>Способ обслуживания</StyledRow>
                    <PersonalDataLabel>{enviroment}</PersonalDataLabel>
                  </Col>
                )}
              </Fragment>
            )}
            {isMnpSupportPermission && !isASSeller && getMarginInfoCol()}
          </Row>
          <Row>
            {rateName && !isLeon && !isNonSubscriberCard && (
              <Col span={24} style={{ marginBottom: '6px' }}>
                <RatePlanTitle>
                  <RatePlan>Тарифный план</RatePlan>
                  <Popover
                    title={ServiceStatusName}
                    content={
                      <ContentPopover>
                        {ServiceStatusText && <TextWrapper>{ServiceStatusText}</TextWrapper>}
                        {UnpaidChargeOffText && <TextWrapper>{UnpaidChargeOffText}</TextWrapper>}
                        {WarningMessage && <TextWrapper>{WarningMessage}</TextWrapper>}
                      </ContentPopover>
                    }
                  >
                    <RatePlanDotWrapper
                      isClickable={IsUnpaidPlanRate && !WarningMessage}
                      onClick={handleRatePlanDotClick}
                    >
                      <RatePlanDot color={setRatePlanDotColor(ServiceStatus)} />
                    </RatePlanDotWrapper>
                  </Popover>
                </RatePlanTitle>
                <Row align='middle'>
                  <Col>
                    <TariffDataLabel disabled={!isTariffManagementPermission} onClick={handleVisibleTariffModal}>
                      {rateName}
                    </TariffDataLabel>
                  </Col>
                  {showFrozenTariffInfo && (
                    <FrozenTariffInfoWrapper>
                      <FrozenTariffInfo frozenUntil={PeriodGuaranteedPriceEnd} />
                    </FrozenTariffInfoWrapper>
                  )}
                </Row>
              </Col>
            )}
          </Row>
          {chargeCounter?.IsVisible && (
            <Row>
              <StyledRow>
                Статус оплаты АП по тарифу
                <Tooltip title={chargeCounter?.Description}>{chargeDots(chargeCounter?.Counter ?? 0)}</Tooltip>
              </StyledRow>
            </Row>
          )}
          <Row>
            {WebCareLevelAccess && !isASSeller && (
              <div>
                <StyledRow>Доступ ЛК</StyledRow>
                <PersonalDataLabel>{WebCareLevelAccess}</PersonalDataLabel>
              </div>
            )}
          </Row>
          <Row>
            <Col span={12}>
              {subscriberRegion && (
                <div>
                  <StyledRow>Регион</StyledRow>
                  <RegionlDataLabel>{subscriberRegion}</RegionlDataLabel>
                </div>
              )}
              {actualRegion && (
                <div>
                  <StyledRow>Фактический регион</StyledRow>
                  <PersonalDataLabel>{actualRegion}</PersonalDataLabel>
                </div>
              )}
              {password && (
                <div>
                  <StyledRow>Кодовое слово</StyledRow>
                  <PasswordWrapper isMissingPassword={isMissingPassword}>{
                    password.split('').map(item => 'X')}
                  </PasswordWrapper>
                </div>
              )}
              {operator && (
                <div>
                  <StyledRow>Оператор</StyledRow>
                  <p>{operator}</p>
                </div>
              )}
            </Col>
            <Col span={12}>
              {(personalEmail || email) && !isAnonymousCard && (
                <div>
                  <StyledRow>Email</StyledRow>
                  <PersonalDataLabel>{personalEmail || email}</PersonalDataLabel>
                </div>
              )}
            </Col>
          </Row>
          {CityPhone && (
            <div>
              <StyledRow>Городской номер</StyledRow>
              <TariffDataLabel>{CityPhone}</TariffDataLabel>
            </div>
          )}
          {trustCreditInfo && trustCreditInfo.isFinBlock && (
            <Row>
              <Col span={12}>
                <Tag color='red'>Есть задолженность</Tag>
              </Col>
            </Row>
          )}
          <Row>
            {linkedPersonalAccount && (
              <div>
                <StyledRow>ГК ЛС</StyledRow>
                <PersonalDataLabel>{linkedPersonalAccount}</PersonalDataLabel>
              </div>
            )}
          </Row>
        </PersonalDataTable>
      </AbonentMainData>
      <AbonentIdentityData>
        {/* There is two IdentityCollapse because of ERROR 99378. We need controled component there. It will be here until refactor. */}
        {!isLeon && isPersonalDataPermission && !isASSeller && (
          <IdentityCollapse onChange={handleOnChange} bordered={false}>
            <Panel header='Паспорт' key={PASSPORT_KEY}>
              <Spin spinning={isPassportLoading} indicator={<LoadingSpinner spin />}>
                <PersonalDataLabel>{passport}</PersonalDataLabel>
              </Spin>
              {birthDate && (
                <Row>
                  <BirthDateWrapper>
                    Дата рождения: <BirthDateLabel>{moment.parseZone(birthDate).format('DD.MM.YYYY')}</BirthDateLabel>
                  </BirthDateWrapper>
                </Row>
              )}
            </Panel>
          </IdentityCollapse>
        )}
        <IdentityCollapse bordered={false}>
          {isASSeller && !isNonSubscriberCard && !(isb2b && isSubscriberFirstLevelCard) && (managerFullName || managerIdentityDocument) && (
            <Panel bordered={false} header='Руководитель' key='2'>
              <PassportData>{managerFullName}</PassportData>
              <PassportData>{managerIdentityDocument}</PassportData>
            </Panel>
          )}
          {!isASSeller && (managerFullName || managerIdentityDocument) && !isNonSubscriberCard && (
            <Panel bordered={false} header='Руководитель' key='2'>
              <PassportData>{managerFullName}</PassportData>
              <PassportData>{managerIdentityDocument}</PassportData>
            </Panel>
          )}
          {SubscriberFullInfo?.USIProfile && !isLeon && (
            <Panel header={esim ? 'ESIM' : 'SIM-карта'} key='3'>
              {!isAnonymousCard && (
                <>
                  <StyledRow>Дата активации</StyledRow>
                  <PersonalDataLabel>{activationDate}</PersonalDataLabel>
                </>
              )}
              <Row>
                {!isAnonymousCard && (
                  <Col span={12}>
                    <StyledRow>PUK1</StyledRow>
                    <PersonalDataLabel>{puk1}</PersonalDataLabel>
                    <StyledRow>PIN</StyledRow>
                    <PersonalDataLabel>{pin1}</PersonalDataLabel>
                    {!isASSeller && (
                      <Fragment>
                        <StyledRow>IMSI</StyledRow>
                        <PersonalDataLabel>{imsi}</PersonalDataLabel>
                      </Fragment>
                    )}
                    <StyledRow>ICC</StyledRow>
                    <PersonalDataLabel>{iccid}</PersonalDataLabel>
                  </Col>
                )}
                <Col span={12}>
                  {!isASSeller && (
                    <Fragment>
                      <StyledRow>PUK2</StyledRow>
                      <PersonalDataLabel>{puk2}</PersonalDataLabel>
                      <StyledRow>PIN 2</StyledRow>
                      <PersonalDataLabel>{pin2}</PersonalDataLabel>
                    </Fragment>
                  )}
                  <StyledRow>Поддержка 4G</StyledRow>
                  <PersonalDataLabel>{uType || 'Нет'}</PersonalDataLabel>
                </Col>
              </Row>
              <ButtonGroup>
                {!isASSeller && (
                  <>
                    <Button
                      style={buttonStyle}
                      type='primary'
                      isHandlingStatusLoading
                      onClick={handleReplacementSimCardButtonClick}
                      loading={isHandlingStatusLoading}
                      disabled={disabledReplacementSim() || !isReplacementSimPermission}
                    >
                      Замена
                    </Button>
                    {!isAnonymousCard && (
                      <Button style={buttonStyle} type='primary' onClick={handleVisibleHistoryIccModal}>
                        История
                      </Button>
                    )}
                  </>
                )}
                {isASSeller && !isAnonymousCard && (
                  <Button style={buttonStyle} type='primary' onClick={handleVisibleHistoryIccModal}>
                    История
                  </Button>
                )}
              </ButtonGroup>
            </Panel>
          )}
          {virtualNumbers && virtualNumbers.length && (
            <Panel header='Дополнительные номера' key='4'>
              <Row>
                <VirtualNumbersLabel>Виртуальные номера</VirtualNumbersLabel>
                <Dot color={setDotColor(IsActiveVirtualNumber ? 1 : 4)} />
              </Row>
              <div>{virtualNumbersList}</div>
            </Panel>
          )}
        </IdentityCollapse>
      </AbonentIdentityData>
    </AbonentContentPanel>
  )
}

AbonentContent.propTypes = propTypes

export default AbonentContent

const Panel = Collapse.Panel

const AbonentContentPanel = styled.div`
  background-color: white;
  border-radius: 10px;
`

const AbonentMainData = styled.div`
  padding-top: 13px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 4px;
  width: 100%;
`

const AbonentIdentityData = styled.div`
  font-size: 13px;
`

const IdentityCollapse = styled(Collapse)`
  background-color: white;
  .ant-collapse-content.ant-collapse-content-active {
    margin: 0 0 10px 0;
  }
  .ant-collapse-content-box {
    padding-bottom: 0px;
  }
`

const PhoneNumber = styled.div`
  min-width: 100px;
  font-family: T2HalvarBreit_ExtraBold;
  color: black;
  font-size: 16px;
  cursor: pointer;
`

const Name = styled.div`
  color: black;
  font-size: 13px;
  font-weight: bolder;
  margin-bottom: 6px;
`

const AdditionalInfo = styled.div`
  color: grey;
  font-size: 13px;
`

const PersonalDataTable = styled.div`
  padding-top: 10px;
  width: 100%;
  word-break: break-all;
`

const StyledRow = styled(Row)`
  color: #8e97a0;
`

const PersonalDataLabel = styled(Row)`
  margin-bottom: 6px;
  font-size: 14px;
  color: black;
`
const PersonalDataLink = styled.a`
  font-size: 13px;
  color: black;
  border-bottom: ${({ disabled }) => (disabled ? css`none` : css`1px dashed #7F8285`)};
  :hover {
    color: black;
  }
`

const TariffDataLabel = styled(Row)`
  font-size: 13px;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  border-bottom: ${({ disabled }) => (disabled ? css`none` : css`1px dashed #7F8285`)};
  display: inline;
  pointer-events: ${({ disabled }) => (disabled ? css`none` : css`unset`)};
`

const RatePlan = styled.div`
  width: 100px;
  color: #8e97a0;
`

const RegionlDataLabel = styled(Row)`
  color: black;
  font-weight: bolder;
  margin-bottom: 6px;
`

const PasswordWrapper = styled.div`
  color: black;
  background-color: ${({ isMissingPassword }) => (isMissingPassword ? css`white` : css`#FFF1F0`)};
  border: ${({ isMissingPassword }) => (isMissingPassword ? css`0` : css`1px solid #FFA39E`)};
  border-radius: 4px;
  padding: 2px;
  margin-right: 4px;
`

const PassportData = styled.div`
  font-size: 13px;
  color: black;
`

const SubscriberStatus = styled.div`
  display: inline-flex;
`

const DotWrapper = styled.div`
  height: 25px;
  width: 20px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'auto')};
`

const Dot = styled.span`
  margin: 8px 0 0 10px;
  height: 8px;
  width: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
`

const TextWrapper = styled.div``
const RatePlanDotWrapper = styled.div`
  height: 20px;
  width: 20px;
  cursor: ${props => (props.isClickable ? 'pointer' : 'initial')};
`
const RatePlanDot = styled.span`
  margin: 6px 0 0 10px;
  height: 8px;
  width: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
`

const RatePlanTitle = styled(Row)`
  display: flex;
`

const ContentPopover = styled.div`
  max-width: 300px;
  > div:not(:first-child) {
    margin-top: 12px;
  }
`

const AbonentsTitle = styled.span`
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 14px;
  color: #000;
  margin: 0px 0px 0px 0px;
  border-bottom: 1px dashed #7f8285;
  cursor: ${props => (props.isClickable ? 'pointer' : 'initial')};
  pointer-events: ${props => (props.isClickable ? 'initial' : 'none')};
`

const VirtualNumbersLabel = styled.h4`
  font-weight: bolder;
  display: inline;
`

const ButtonGroup = styled(Button.Group)`
  width: 100%;
  margin: 5px 0;
`

const BirthDateLabel = styled.div`
  color: black;
  font-size: 13px;
  margin: 1px 0 0 5px;
`

const BirthDateWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(64,191,238, 0.4);
  }
  70% {
      box-shadow: 0 0 0 10px rgba(64,191,238, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(64,191,238, 0);
  }
`

const BlaskListNotificationText = styled.p`
  margin: 0;
`

const BlackListIcon = styled(WarningOutlined)`
  margin-left: 5px;
  font-size: 20px;
  box-shadow: 0 0 0 rgba(64, 191, 238, 0.4);
  animation: none;
  border-radius: 30%;
  ${({ isBlocked }) => {
    switch (isBlocked) {
      case true:
        return css`
          color: #f5222d;
        `
      case false:
        return css`
          color: #52c41a;
        `
      case 'null':
        return css`
          color: #d3d61c;
        `
      default:
        return css`
          color: #bbb;
        `
    }
  }}
  ${({ isLoading }) =>
    isLoading &&
    css`
      color: rgba(64, 191, 238, 1);
      animation: ${pulse} 1s infinite;
    `}
  transition: color .15s ease-in-out;
`

const BigInnerRow = styled(Row)`
  color: #8e97a0;
  word-break: break-word;
`

const FrozenTariffInfoWrapper = styled.div`
  display: flex;
  margin-left: 5px;
`
