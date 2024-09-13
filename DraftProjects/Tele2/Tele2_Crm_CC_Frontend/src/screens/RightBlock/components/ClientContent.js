/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Collapse, Col, Row, Popover } from 'antd'
import { copyElementTextToClipboard } from 'utils/helpers'
import FrozenTariffInfo from 'components/FreezedTariffInfo'
import { clientCategories } from 'constants/personalAccountStrings'
import { getTypeCard } from 'webseller/helpers'

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

const style = { fontWeight: 'bolder' }

const propTypes = {
  personalAccount: PropTypes.object,
  tariffInfoPreview: PropTypes.object,
  isReadTariffGuaranteedPrice: PropTypes.bool,
  isASSeller: PropTypes.bool
}

const ClientContent = props => {
  const {
    personalAccount: { ParentClientInfo, SubscriberFullInfo, ClientCategory, Is2BG: isB2G },
    tariffInfoPreview,
    isReadTariffGuaranteedPrice,
    isASSeller
  } = props
  const {
    ClientName,
    ClientStatus,
    ClientStatusName,
    ParentClientName,
    ClientCodeword,
    BillingBranch,
    RatePlanName,
    AgentFullName,
    IsReceivables,
    AgentIdentityDocument,
    RemoteServiceEmailAddress,
    ParentManagerFullName,
    ParentManagerIdentityDocument,
    PersonalAccountId,
    ParentJurClientType,
    ParentClientTypeId,
    ParentClientType
  } = ParentClientInfo ?? {}
  const { StatusChangeReason } = SubscriberFullInfo?.SubscriberInfo ?? {}
  const { Enviroment } = SubscriberFullInfo?.SubscriberClientInfo ?? {}

  const { GuaranteedPriceInfo } = tariffInfoPreview ?? {}
  const { IsGuaranteedPrice, PeriodGuaranteedPriceEnd } = GuaranteedPriceInfo ?? {}

  const showFrozenTariffInfo = isReadTariffGuaranteedPrice && IsGuaranteedPrice
  const isB2b = ClientCategory?.toUpperCase() === clientCategories.B2B

  const { isPersonalAccountCard, isSubscriberFirstLevelCard, isSubscriberCard } = getTypeCard(isASSeller)

  const ParentClientNameWrapper = () => (
    <Row>
      <SubscriberStatus>
        <ParentCompanyName>{ParentClientName}</ParentCompanyName>
        {ClientStatus && ParentClientTypeId !== 13 && (
          <Popover title={ClientStatusName}>
            <DotWrapper>
              <Dot color={setDotColor(ClientStatus)} />
            </DotWrapper>
          </Popover>
        )}
      </SubscriberStatus>
    </Row>
  )

  const ClientNameWrapper = () => (
    <Row>
      <SubscriberStatus>
        <CompanyName>{ClientName}</CompanyName>
        {ClientStatus && (ParentClientTypeId === 13 || !ParentClientName) && (
          <Popover
            content={<ContentPopover>{StatusChangeReason || 'Нет данных о причине изменения статуса'}</ContentPopover>}
            title={ClientStatusName}
          >
            <DotWrapper>
              <Dot color={setDotColor(ClientStatus)} />
            </DotWrapper>
          </Popover>
        )}
      </SubscriberStatus>
    </Row>
  )

  return (
    <AbonentContentPanel>
      <AbonentMainData>
        {ParentClientName ? <ParentClientNameWrapper /> : <ClientNameWrapper />}
        <Row>
          <Col span={12}>
            <StyledRow>Тип клиента</StyledRow>
            <PersonalDataLabel>{ParentClientType}</PersonalDataLabel>
          </Col>
          {!isASSeller && ParentJurClientType && (
            <Col span={12}>
              <StyledRow>Юр. тип клиента</StyledRow>
              <PersonalDataLabel>{ParentJurClientType}</PersonalDataLabel>
            </Col>
          )}
          {isASSeller && !(isB2b && isSubscriberFirstLevelCard) && ParentJurClientType && (
            <Col span={12}>
              <StyledRow>Юр. тип клиента</StyledRow>
              <PersonalDataLabel>{ParentJurClientType}</PersonalDataLabel>
            </Col>
          )}
          {ClientCategory && (
            <Col span={12}>
              <StyledRow>Категория клиента</StyledRow>
              <PersonalDataLabel>{ClientCategory}</PersonalDataLabel>
            </Col>
          )}
          {isASSeller && isB2G && (
            <Col span={12}>
              <StyledRow>Признак гос.контракта</StyledRow>
              <PersonalDataLabel>B2G</PersonalDataLabel>
            </Col>
          )}
        </Row>
        {ParentClientName && ClientName && <ClientNameWrapper />}
        <PersonalDataTable>
          <Row>
            <Col span={12}>
              {isASSeller && ClientCodeword && (
                <div>
                  <StyledRow>Кодовое слово</StyledRow>
                  <PasswordWrapper isMissingPassword={false}>
                    {ClientCodeword.split('').map(() => 'X')}
                  </PasswordWrapper>
                </div>
              )}
              {!isASSeller && ClientCodeword && (
                <div>
                  <StyledRow>Кодовое слово</StyledRow>
                  <PasswordWrapper isPassportVisible={false}>{ClientCodeword}</PasswordWrapper>
                </div>
              )}
              {PersonalAccountId && (
                <div>
                  <Col>
                    <Row>Лицевой счёт</Row>
                    <PersonalAccountLabel
                      onClick={event => {
                        copyElementTextToClipboard(event.target, 'Номер ЛС скопирован')
                      }}
                    >
                      {PersonalAccountId}
                    </PersonalAccountLabel>
                  </Col>
                </div>
              )}
              {(isASSeller && !isB2b && RatePlanName) && (
                <div>
                  <Row>Тарифный план</Row>
                  <Row align='middle'>
                    <PersonalDataLabel>{RatePlanName}</PersonalDataLabel>
                    {showFrozenTariffInfo && (
                      <FrozenTariffInfoWrapper>
                        <FrozenTariffInfo frozenUntil={PeriodGuaranteedPriceEnd} />
                      </FrozenTariffInfoWrapper>
                    )}
                  </Row>
                </div>
              )}
              {(!isASSeller && RatePlanName) && (
                <div>
                  <Row>Тарифный план</Row>
                  <Row align='middle'>
                    <PersonalDataLabel>{RatePlanName}</PersonalDataLabel>
                    {showFrozenTariffInfo && (
                      <FrozenTariffInfoWrapper>
                        <FrozenTariffInfo frozenUntil={PeriodGuaranteedPriceEnd} />
                      </FrozenTariffInfoWrapper>
                    )}
                  </Row>
                </div>
              )}
            </Col>
            <Col span={12}>
              {!isASSeller && BillingBranch && (
                <div>
                  <Row>Регион</Row>
                  <PersonalDataLabel style={style}>{BillingBranch}</PersonalDataLabel>
                  <Row>
                    {IsReceivables && (
                      <PasswordWrapper isMissingPassword={false}>{'Есть задолженность'}</PasswordWrapper>
                    )}
                  </Row>
                </div>
              )}
              {isASSeller && !(isB2b && isSubscriberFirstLevelCard) && BillingBranch && (
                <div>
                  <Row>Регион</Row>
                  <PersonalDataLabel style={style}>{BillingBranch}</PersonalDataLabel>
                  <Row>
                    {IsReceivables && (
                      <PasswordWrapper isMissingPassword={false}>{'Есть задолженность'}</PasswordWrapper>
                    )}
                  </Row>
                </div>
              )}
            </Col>
          </Row>
          <Row>
            {!isASSeller && RemoteServiceEmailAddress && (
              <div>
                <StyledRow>E-mail дистанц. обслуживания</StyledRow>
                <PersonalDataLabel>{RemoteServiceEmailAddress}</PersonalDataLabel>
              </div>
            )}
            {isASSeller && !(isB2b && isSubscriberFirstLevelCard) && RemoteServiceEmailAddress && (
              <div>
                <StyledRow>E-mail дистанц. обслуживания</StyledRow>
                <PersonalDataLabel>{RemoteServiceEmailAddress}</PersonalDataLabel>
              </div>
            )}
          </Row>
        </PersonalDataTable>
      </AbonentMainData>
      <AbonentIdentityData>
        <IdentityCollapse bordered={false}>
          <>
            {!isASSeller && (ParentManagerFullName || ParentManagerIdentityDocument) && (
              <Panel bordered={false} header='Руководитель' key='1'>
                <PassportData>{(isASSeller && isB2b) ? ParentManagerFullName.replace(/;.*$/, '') : ParentManagerFullName}</PassportData>
                {(isASSeller && !isB2b) && <PassportData>{ParentManagerIdentityDocument}</PassportData>}
                {(!isASSeller) && <PassportData>{ParentManagerIdentityDocument}</PassportData>}
              </Panel>
            )}
            {isASSeller && !(isB2b && isSubscriberFirstLevelCard) && (ParentManagerFullName || ParentManagerIdentityDocument) && (
              <Panel bordered={false} header='Руководитель' key='1'>
                <PassportData>{(isASSeller && isB2b) ? ParentManagerFullName.replace(/;.*$/, '') : ParentManagerFullName}</PassportData>
                {(isASSeller && !isB2b) && <PassportData>{ParentManagerIdentityDocument}</PassportData>}
                {(!isASSeller) && <PassportData>{ParentManagerIdentityDocument}</PassportData>}
              </Panel>
            )}
          </>
          {AgentFullName && AgentIdentityDocument && (
            <Panel bordered={false} header='Доверенное лицо' key='2'>
              <AgentDataLabel>{AgentFullName}</AgentDataLabel>
              <AgentDataLabel>{AgentIdentityDocument}</AgentDataLabel>
            </Panel>
          )}
        </IdentityCollapse>
      </AbonentIdentityData>
      {isASSeller && (isB2b && !isSubscriberCard && !isPersonalAccountCard) && (
        <DataContainer>
          <Row>
            {Enviroment && (
              <Col span={12}>
                <StyledRow>Способ обслуживания</StyledRow>
                <PersonalDataLabel>{Enviroment}</PersonalDataLabel>
              </Col>
            )}
          </Row>
        </DataContainer>
      )}
    </AbonentContentPanel>
  )
}

ClientContent.propTypes = propTypes

export default ClientContent

const Panel = Collapse.Panel

const AbonentContentPanel = styled.div`
  background-color: white;
  padding-bottom: 5px;
  border-bottom: 1px solid #d9d9d9;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
const AbonentMainData = styled.div`
  padding-top: 13px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 4px;
  width: 100%;
`
const DataContainer = styled.div`
    padding: 0 16px 4px;
    width: 100%;
`
const AbonentIdentityData = styled.div`
  font-size: 13px;
`
const IdentityCollapse = styled(Collapse)`
  background-color: white;
  .ant-collapse-item {
    border: 0;
  }
  border: 0;
`
const ParentCompanyName = styled.div`
  font-family: T2HalvarBreit_ExtraBold;
  color: black;
  font-size: 16px;
`
const CompanyName = styled.div`
  font-family: T2HalvarBreit_ExtraBold;
  color: black;
  font-size: 14px;
`
const PersonalDataTable = styled.div`
  width: 100%;
  word-break: break-all;
`
const PersonalDataLabel = styled(Row)`
  font-size: 13px;
  color: black;
`
const PersonalAccountLabel = styled(PersonalDataLabel)`
  cursor: pointer;
`
const AgentDataLabel = styled(Row)`
  font-size: 13px;
  color: black;
`
const PassportData = styled.div`
  font-size: 13px;
  color: black;
`
const SubscriberStatus = styled.div`
  display: inline-flex;
  padding-right: 20px;
`
const DotWrapper = styled.div`
  height: 25px;
  width: 20px;
  &:hover {
    cursor: pointer;
  }
`
const Dot = styled.span`
  margin: 8px 0 0 10px;
  height: 8px;
  width: 8px;
  background-color: ${props => props.color};
  border-radius: 50%;
  display: inline-block;
`
const PasswordWrapper = styled.div`
  color: black;
  background-color: ${props => (props.isMissingPassword ? 'white' : '#FFF1F0')};
  border: ${props => (props.isMissingPassword ? '0' : '1px solid #FFA39E')};
  border-radius: 4px;
  padding: 2px;
  margin-right: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  width: 120px;
  font-size: 13px;
`
const ContentPopover = styled.div`
  max-width: 300px;
`

const StyledRow = styled(Row)`
  color: #8e97a0;
`

const FrozenTariffInfoWrapper = styled.div`
  display: flex;
  margin-left: 5px;
`
