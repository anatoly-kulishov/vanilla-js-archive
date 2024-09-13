import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Col, Row, Radio, Tooltip } from 'antd'
import { InfoCircleOutlined, ToolOutlined } from '@ant-design/icons'
import RubSvg from './assets/rub.svg'

export default class Head extends Component {
  static propTypes = {
    availableTariffs: PropTypes.array,
    selectedTariff: PropTypes.number,
    selectRadioTariff: PropTypes.func
  }

  overlayStyle = { whiteSpace: 'pre-line' }

  onChange = (event) => {
    this.props.selectRadioTariff(event)
  }

  render () {
    const { availableTariffs, selectedTariff } = this.props

    return (
      <StyleRadioGroup
        onChange={this.onChange}
        value={selectedTariff}
      >
        {availableTariffs.map((tariff, index) => {
          return (
            <StyleRow type='flex' key={index}>
              <StyleCol justifyContent='space-between' span={10}>
                <StyleRadio value={index}>{tariff.RateName}</StyleRadio>
                <StyleSpan display='flex'>
                  {tariff.IsConstructor && (
                    <Tooltip placement='bottom' title={'Конструктор'}>
                      <ToolIcon />
                    </Tooltip>
                  )}
                  {tariff.Description ? (
                    <Tooltip placement='bottom' title={tariff.Description}>
                      <InfoCircleIcon />
                    </Tooltip>
                  ) : (
                    <StyleSpan width='26px' />
                  )}
                </StyleSpan>
              </StyleCol>
              <StyleCol span={7} justifyContent='space-between'>
                <Tooltip
                  placement='bottom'
                  overlayStyle={this.overlayStyle}
                  title={`Сумма параметров:\n Плата за смену тарифа\n АП за тариф\n АП за доп. пакеты\n АП за доп. опции`}
                >
                  {tariff.ChangeTrplCost.toFixed(2) + ' ' + tariff.Currency}
                </Tooltip>
                {tariff.NotEnoughMoney && (
                  <Tooltip placement='bottom' title='Недостаточно средств для смены тарифа'>
                    <RubSvg />
                  </Tooltip>
                )}
              </StyleCol>
              <StyleCol span={7}>
                <Tooltip
                  placement='bottom'
                  title='Сумма абонентской платы (АП) по услуге в следующем расчетном периоде с налогом и со скидками'
                >
                  {tariff.ChargeSumNext
                    ? tariff.ChargeSumNext + ' ' + tariff.Currency + ' в ' + tariff.PeriodName
                    : '0.00'}
                </Tooltip>
              </StyleCol>
            </StyleRow>
          )
        })}
      </StyleRadioGroup>
    )
  }
}

const StyleCol = styled(Col)`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: ${props => props.justifyContent};
  padding-left: 15px;

  @media (max-width: 1400px) {
    font-size: 14px;
  }
`

const ToolIcon = styled(ToolOutlined)`
  font-size: 21px;
  display: flex;
  align-items: center;
  :nth-child(2) {
    margin-left: 5px;
  }
`
const InfoCircleIcon = styled(InfoCircleOutlined)`
  font-size: 21px;
  display: flex;
  align-items: center;
  :nth-child(2) {
    margin-left: 5px;
  }
`

const StyleRow = styled(Row)`
  margin-left: 1px;
  transition: background-color 0.15s ease-in-out;

  :hover {
    background-color: rgba(72, 191, 236, 0.5);
  }
`

const StyleRadio = styled(Radio)`
  line-height: 20px;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  font-size: 16px;

  @media (max-width: 1400px) {
    font-size: 14px;
  }
`

const StyleRadioGroup = styled(Radio.Group)`
  width: 100%;
`

const StyleSpan = styled.span`
  display: ${props => props.display};
  width: ${props => props.width};
`
