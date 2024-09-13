/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import { Button, Col, Row, Modal, notification, Alert, Spin } from 'antd'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { checkRight } from 'utils/helpers'
import { bool, func, object } from 'prop-types'

import MirIcon from './assets/mir.svg'
import VisaSvg from './assets/visa.svg'
import McSvg from './assets/mc_symbol.svg'
import { cardModes } from '../../../constants/cardModes'

const { confirm } = Modal

const showConfirm = (deleteT2PayCard, T2PayCardId) => {
  confirm({
    title: 'Вы действительно хотите отвяать платежную карту?',
    centered: true,
    onOk () {
      deleteT2PayCard({ T2PayCardId })
    }
  })
}

const iconPeymentCard = (typeCard) => {
  switch (typeCard) {
    case 'Visa':
      return <VisaIcon />
    case 'MC':
      return <MCIcon />
    case 'Mir':
      return <MirIcon />
  }
}

const PaymentInformation = ({
  userState: { user },
  lastPayment,
  getLastPayment,
  deleteT2PayCard,
  isErrorLastPayment,
  isLoadingLastPayment,
  cardMode
}) => {
  useEffect(() => {
    getLastPayment()
  }, [])

  const handleButton = () => {
    if (!checkRight(user, 'CC:DeleteT2PayCard')) {
      showConfirm(deleteT2PayCard, lastPayment?.T2PayCardId)
    } else {
      notification.error({
        message: 'Недостаточно прав'
      })
    }
  }

  const isLeon = cardMode === cardModes.leon

  return <Wrapper>
    <Spin spinning={isLoadingLastPayment}>
      <StyledRow align='middle'>
        <Col span={10}>Карта</Col>
        <Col span={14}>{iconPeymentCard(lastPayment?.CardType)}</Col>
      </StyledRow>
      <StyledRow align='middle'>
        <Col span={10}>Последние 4 цифры карты</Col>
        <Col span={14}>{lastPayment?.CardNumber}</Col>
      </StyledRow>
      {!isLeon && <StyledRow align='middle'>
        <Col span={10}>Последний платеж</Col>
        <Col span={14}>{lastPayment ? moment(lastPayment?.LastPayment).format('DD.MM.YYYY') : ''}</Col>
      </StyledRow>}
      {isErrorLastPayment === 404 && <Alert message='Платежная информация не найдена' type='info' />}
      <Row style={{ marginTop: '40px' }}>
        <Button type='link'><Link to={`/card/finance/balance/payments${location.search}`}>Финансовая история</Link></Button>
        <Button type='primary' onClick={handleButton}>Отвязать платежную карту</Button>
      </Row>
    </Spin>
  </Wrapper>
}

export default PaymentInformation

PaymentInformation.propTypes = {
  userState: object,
  lastPayment: object,
  getLastPayment: func,
  deleteT2PayCard: func,
  isErrorLastPayment: bool,
  isLoadingLastPayment: bool
}

const Wrapper = styled.div`
  padding: 17px 22px 17px 25px;
`

const VisaIcon = styled(VisaSvg)`
  width: 60px;
  height: 50px;
`
const MCIcon = styled(McSvg)`
  width: 40px;
  height: 30px;
`
const StyledRow = styled(Row)`
  height: 50px;
`
