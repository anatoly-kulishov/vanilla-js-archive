import { Col, Skeleton, Tag } from 'antd'
import * as moment from 'moment'
import { arrayOf, bool, func, string } from 'prop-types'
import React from 'react'
import { getMnpStatusColor } from 'screens/CommonInformation/helpers/mnpStatusColor'
import styled from 'styled-components'
import { formatNumberWithSeparator } from 'utils/helpers'
import mnpOrderPropType from '../../../constants/propTypes/mnpOrderPropType'

const skeletonParagraph = { rows: 4, width: '100%' }

const OrderData = props => {
  const { order, loading, onClickMsisdn, msisdns } = props
  const {
    OrderDate,
    OrderId,
    PortingDate,
    OrderStatus,
    OrderStatusCode,
    OperatorRecipient,
    MsisdnCount,
    BranchName,
    IsDebt
  } = order ?? {}

  const formattedMsisdnCount = formatNumberWithSeparator(MsisdnCount)

  return (
    <Wrapper>
      <StyledSkeleton title={false} paragraph={skeletonParagraph} active loading={loading}>
        <StyledCol>
          <Item>
            <p>Номер заявления</p>
            <ItemValue color='#FF9900' bold>
              {OrderId && formatNumberWithSeparator(OrderId)}
            </ItemValue>
          </Item>
          <Item>
            <p>Дата заявления</p>
            <ItemValue>{OrderDate && moment(OrderDate).format('DD.MM.YYYY HH:MM')}</ItemValue>
          </Item>
          <Item>
            <p>Регион</p>
            <ItemValue>{BranchName}</ItemValue>
          </Item>
          <Item>
            <p>Переносимые номера {formattedMsisdnCount && `(${formattedMsisdnCount} шт.)`}</p>
            <ItemValue underline onClick={onClickMsisdn}>
              {msisdns?.[0]}
            </ItemValue>
          </Item>
        </StyledCol>
      </StyledSkeleton>

      <StyledSkeleton title={false} paragraph={skeletonParagraph} active loading={loading}>
        <StyledCol>
          <Item>
            <p>Статус заявления</p>
            <ItemValue>
              {OrderStatus && OrderStatusCode && <Tag color={getMnpStatusColor(OrderStatusCode)}>{OrderStatus}</Tag>}
            </ItemValue>
          </Item>

          <Item>
            <p>Дата переноса</p>
            <ItemValue>{PortingDate && moment(PortingDate).format('DD.MM.YYYY HH:MM')}</ItemValue>
          </Item>

          <Item>
            <p>Оператор-реципиент</p>
            <ItemValue>{OperatorRecipient}</ItemValue>
          </Item>

          <Item>
            <p>Наличие задолженности</p>
            <ItemValue>{IsDebt === true ? 'Да' : IsDebt === false ? 'N/A' : null}</ItemValue>
          </Item>
        </StyledCol>
      </StyledSkeleton>
    </Wrapper>
  )
}

export default OrderData

OrderData.propTypes = {
  order: mnpOrderPropType,
  loading: bool,
  onClickMsisdn: func,
  msisdns: arrayOf(string)
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 16px;
  padding: 16px 24px 14px;
`

const Item = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5px;
  & :not(:last-child) {
    margin-bottom: 5px;
  }
  

  font-size: 14px;
  > p {
    margin: 0;
  }
`

const StyledCol = styled(Col)`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
`

const StyledSkeleton = styled(Skeleton)`
  height: 100%;

  .ant-skeleton-content .ant-skeleton-paragraph {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ant-skeleton-content .ant-skeleton-paragraph > li {
    height: 20px;
  }
`

const ItemValue = styled.p`
  color: ${props => props.color};
  font-weight: ${props => (props.bold ? '700' : '400')};
  cursor: ${props => (props.onClick ? 'pointer' : 'unset')};
  text-decoration: ${props => (props.underline ? 'underline' : 'none')};
`
