import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Table, Modal } from 'antd'
import { DownOutlined, UpOutlined, InfoCircleOutlined } from '@ant-design/icons'
import FinanceOperations from 'containers/Balances/FinanceOperations'
// import TemporaryPay from 'containers/Balances/BalancesSubscriber/TemporaryPay'
import PromisePay from 'containers/Balances/BalancesSubscriber/PromisePay'
// import ECommerce from 'containers/Balances/BalancesSubscriber/ECommerce'
import { compensationsMethods } from 'constants/compensations'

import {
  getBalance,
  getTrustCreditInfo,
  activateCreditInfo,
  deactivateCreditInfo,
  getTrustCreditHistory,
  addContentBalance,
  closeContentBalance,
  getContentBalanceHistory
} from 'reducers/finance/balanceReducer'
import { getRemainsDetailsData, getQuantumData } from 'reducers/finance/remainsReducer'
import { fetchPaymentsUrl } from 'reducers/finance/paymentsReducer'
import { getTemporaryPayNew, addPayment } from 'reducers/finance/temporaryPayReducer'
import { changeCompensationsHistoryModalVisibility } from 'reducers/compensations/compensationsReducer'
import CompensationsHistoryModal from 'containers/Balances/FinanceOperations/Compensations/CompensationsHistoryModal'

const currentCompensationMethod = compensationsMethods.package

const InfoItem = ({ label, value }) => {
  InfoItem.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any
  }

  return (
    <InfoItemWrapper gutter={24}>
      <InfoItemLabel span={16}>{label}</InfoItemLabel>
      <InfoItemValue span={8}>{value}</InfoItemValue>
    </InfoItemWrapper>
  )
}

const tableColumns = [
  {
    title: 'Операция',
    dataIndex: 'operation',
    key: 'operation',
    width: '20%'
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
    width: '20%'
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    width: '20%'
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    key: 'sum',
    width: '20%'
  },
  {
    title: 'Баланс',
    dataIndex: 'balance',
    key: 'balance',
    width: '20%'
  }
]

const tableDataSource = [
  { operation: '(ПД) Мой онлайн SP', type: 'Списание', date: '22.02.2020', sum: '-262.5', balance: '1,77' },
  { operation: 'ЕСПП', type: 'Пополнение', date: '20.02.2020', sum: '+262.5', balance: '264,27' }
]

const FinanceCard = ({
  balance: { subscriber: { balance105, subscriberBalances, promisePay, quota, pseudoQuota, mounthly, ecommerce } = {} },
  // temporaryPay,
  changeCompensationsHistoryModalVisibility
}) => {
  FinanceCard.propTypes = {
    balance: PropTypes.object,
    changeCompensationsHistoryModalVisibility: PropTypes.func
  }

  const [isVisible, setIsVisible] = useState(true)
  const [isOperationsOpen, setIsOperationOpen] = useState(false)

  const toggleIsVisble = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Wrapper>
      <CompensationsHistoryModal currentCompensationMethod={currentCompensationMethod} />
      <Modal
        footer={null}
        destroyOnClose
        title='Операции'
        visible={isOperationsOpen}
        width='90%'
        onCancel={() => setIsOperationOpen(false)}
      >
        <FinanceOperations />
      </Modal>
      <BlocksWrapper>
        <BalanceBlock>
          <BlockHeader>
            <BlockTitle onClick={toggleIsVisble}>Финансы</BlockTitle>
            <BlockTools>
              <MakeCompensation>Предоставить отчетные документы</MakeCompensation>
              <MakeCompensation onClick={() => setIsOperationOpen(true)}>Сделать компенсацию</MakeCompensation>
            </BlockTools>
          </BlockHeader>
          {isVisible && (
            <BlockContent columns={2}>
              <InfoItem label='Основной баланс' value='-100.00' />
              <InfoItem label='Административный' value='-347.99' />
              <InfoItem label='Сумма' value='-447.99' />
              <InfoItem label='*105#' value='-447.99' />
              <InfoItem label='E-commerce' value={<PromisePay promisePay={promisePay} />} />
              <InfoItem label='Обещанный платеж' value={<InfoCircleIcon />} />
              {/* <InfoItem
                label='Временный платеж'
                value={
                  <TemporaryPay {...temporaryPay} addPayment={addPayment} getTemporaryPayNew={getTemporaryPayNew} />
                }
              /> */}

              <InfoItem label='На доверии' value={<InfoCircleIcon isRed />} />
              <InfoItem label='Кредитный лимит' value='0' />
              <InfoItem label='Размер АП' value='-' />
              <InfoItem label='Доплата до АП' value='-' />
            </BlockContent>
          )}
        </BalanceBlock>
        <RemainsBlock>
          <BlockHeader>
            <BlockTitle onClick={toggleIsVisble}>Остатки</BlockTitle>
            <BlockTools>
              {isVisible ? <UpOutlined onClick={toggleIsVisble} /> : <DownOutlined onClick={toggleIsVisble} />}
            </BlockTools>
          </BlockHeader>
          {isVisible && (
            <BlockContent>
              <InfoItem label='Минут, шт.' value='-' />
              <InfoItem label='SMS, шт.' value='2' />
              <InfoItem label='Интернет, Мб.' value='-' />
              <InfoItem label='Следующее списание' value='-' />
              <InfoItem label='Дней до обнуления' value='-' />
            </BlockContent>
          )}
        </RemainsBlock>
      </BlocksWrapper>
      {isVisible && (
        <CompensationsWrapper>
          <Table
            pagination={false}
            dataSource={tableDataSource}
            columns={tableColumns}
          />
          <MoreOperationLink onClick={() => changeCompensationsHistoryModalVisibility()}>Показать больше последних операций</MoreOperationLink>
        </CompensationsWrapper>
      )}
    </Wrapper>
  )
}

const mapStateToProps = state => {
  return {
    quantumData: state.finance.remains.quantumData,
    detailsData: state.finance.remains.detailsData,

    balance: state.finance.balance.balance,
    trustCreditInfo: state.finance.balance.trustCreditInfo,

    ...state.personalInfo.personalAccountState,

    ...state.finance,
    ...state.internal.userState,
    handlingId: state.internal.handlingState.Id
  }
}
const mapDispatchToProps = {
  getBalance,
  getTrustCreditInfo,
  getRemainsDetailsData,
  getQuantumData,
  activateCreditInfo,
  deactivateCreditInfo,
  fetchPaymentsUrl,

  addPayment,
  getTemporaryPayNew,
  getTrustCreditHistory,
  addContentBalance,
  closeContentBalance,
  getContentBalanceHistory,
  changeCompensationsHistoryModalVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanceCard)

const Wrapper = styled.div`
  margin: 0 30px 15px 0;
  background: white;
`

const BlocksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`
const Block = styled.div`
  display: flex;
  flex-flow: column nowrap;
`

const BalanceBlock = styled(Block)`
  width: 70%;
  @media (max-width: 1280px) {
    width: 50%;
  }
`
const RemainsBlock = styled(Block)`
  width: 30%;
  @media (max-width: 1280px) {
    width: 50%;
  }
`

const BlockHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #e4e4e9;
  padding: 15px 21px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`
const BlockContent = styled.div`
  column-count: ${props => props.columns || 1};
  padding: 15px 0;

  @media (max-width: 1280px) {
    column-count: 1;
  }
`
const BlockTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: black;
`

const InfoItemWrapper = styled(Row)`
  flex-flow: row nowrap;
  padding: 0 21px;

  @media (max-width: 1280px) {
    max-width: 400px;
  }
`
const InfoItemLabel = styled(Col)``
const InfoItemValue = styled(Col)`
  text-align: right;
`

const CompensationsWrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
`

const MoreOperationLink = styled.span`
  color: black;
  text-align: center;
  text-decoration: none;
  font-weight: normal;
  border-bottom: 1px solid rgb(127, 130, 133);
  margin: 20px 16px;

  &:hover {
    color: black;
    cursor: pointer;
    border-bottom: 1px solid #40bfee;
  }
`

const BlockTools = styled.div``

const MakeCompensation = styled(MoreOperationLink)`
  margin: 0;
  :not(:last-of-type) {
    margin-right: 8px;
  }
`

const InfoCircleIcon = styled(InfoCircleOutlined)`
  cursor: pointer;
  margin-right: 3px;

  & svg {
    width: 20px;
    height: 20px;
  }

  color: ${props => (props.isRed ? `red` : `rgba(0, 0, 0, 0.65);`)};
`
