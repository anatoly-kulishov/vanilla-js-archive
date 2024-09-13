import React from 'react'
import styled from 'styled-components'
import { Col, Row, Tooltip } from 'antd'
import { HddOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { bool, object } from 'prop-types'
import moment from 'moment'

import MiniBlock from './MiniBlock'
import FrozenTariffInfo from 'components/FreezedTariffInfo'

const fieldsTitle = ['Интернет', 'Звонки', 'SMS']
const giftsFieldsTitle = ['Интернет', 'Остаток', 'Дата окончания']

const propTypes = { tariffState: object, CCReadTariffGuaranteedPrice: bool }

const LeftBlock = props => {
  const { tariffState, CCReadTariffGuaranteedPrice } = props
  const { tariffInfo } = tariffState ?? {}
  const { EnabledTariff, Delay, CurrentAvailable, AdditionalServices, Fee, Unlim } = tariffInfo ?? {}
  const { GuaranteedPriceInfo } = EnabledTariff ?? {}

  const fieldsValue = [
    tariffInfo.EnabledTariffPackVolume?.PackVolumeTariffData,
    tariffInfo.EnabledTariffPackVolume?.PackVolumeTariffVoice,
    tariffInfo.EnabledTariffPackVolume?.PackVolumeTariffSms
  ]

  const microPackageField = (PackVolume, CostMonth) => {
    if (PackVolume) {
      if (CostMonth) {
        return `${PackVolume}/${CostMonth} в мес.`
      } else {
        return PackVolume
      }
    } else {
      return ''
    }
  }

  const microPackageFieldsValue = [
    microPackageField(
      tariffInfo.EnabledMicroPackVolume?.PackVolumeMicroData,
      tariffInfo.EnabledMicroPackVolume?.CostMonthMicroData
    ),
    microPackageField(
      tariffInfo.EnabledMicroPackVolume?.PackVolumeMicroVoice,
      tariffInfo.EnabledMicroPackVolume?.CostMonthMicroVoice
    ),
    microPackageField(
      tariffInfo.EnabledMicroPackVolume?.PackVolumeMicroSms,
      tariffInfo.EnabledMicroPackVolume?.CostMonthMicroSms
    )
  ]

  const packageCosts = [
    tariffInfo.CurrentSpent?.CurrentSpentData,
    tariffInfo.CurrentSpent?.CurrentSpentVoice,
    tariffInfo.CurrentSpent?.CurrentSpentSms
  ]

  const previousPeriodBalanceValue = [
    tariffInfo.PreviousResidue?.ResiduePreviousData,
    tariffInfo.PreviousResidue?.ResiduePreviousVoice,
    tariffInfo.PreviousResidue?.ResiduePreviousSms
  ]

  const giftFieldsValue = [
    tariffInfo.Gift?.LimitGiftData,
    tariffInfo.Gift?.ResidueGiftData,
    tariffInfo.Gift?.ETimeGiftData
  ]

  const isActive = EnabledTariff?.ServiceStatus === 'Активно'
  const isBaseTariffing = EnabledTariff?.ServiceStatus === 'Базовая тарификация'
  const formatData = 'DD.MM.YYYY, HH.mm'

  const showFrozenTariffInfo = CCReadTariffGuaranteedPrice && GuaranteedPriceInfo?.IsGuaranteedPrice

  return (
    <>
      <LineColor>
        <NameTariff>{EnabledTariff?.RateName}</NameTariff>
        <Tooltip placement='bottom' title={EnabledTariff?.Description}>
          <InfoCircleIcon />
        </Tooltip>
        {isActive ? (
          <Box color='green'>активно</Box>
        ) : isBaseTariffing ? (
          <Tooltip placement='bottom' title='Необходимо внести сумму, достаточную для списания абонентской платы'>
            <Box color='red'>базовая тарификация</Box>
          </Tooltip>
        ) : (
          ''
        )}
        {showFrozenTariffInfo && <FrozenTariffInfo frozenUntil={GuaranteedPriceInfo?.PeriodGuaranteedPriceEnd} />}
      </LineColor>
      <StyleRow>
        <StyleDiv>
          <SubRow>
            <LeftCol span={12}>Базовая АП</LeftCol>
            <Col span={12}>{Fee?.CostMonthWithTaxBasic ? Fee.CostMonthWithTaxBasic + ' в мес.' : ''}</Col>
          </SubRow>

          <SubRow>
            <LeftCol span={12}>Рассрочка АП</LeftCol>
            <Col span={12}>
              {Delay?.DelayIsGiven
                ? 'Оплатить ' + Delay?.ToChargeSumm + ' руб. до ' + moment(Delay?.DelayEndDate).format(formatData)
                : 'Не предоставляется'}
            </Col>
          </SubRow>
        </StyleDiv>

        <StyleDiv>
          <MiniBlock title={'Объем пакетов по тарифу'} fieldsTitle={fieldsTitle} fieldsValue={fieldsValue} />
          <MiniBlock
            title={'Текущий остаток за предыдущий период'}
            fieldsTitle={fieldsTitle}
            fieldsValue={previousPeriodBalanceValue}
          />
          <MiniBlock title={'Микропакеты'} fieldsTitle={fieldsTitle} fieldsValue={microPackageFieldsValue} />
          <MiniBlock title={'Подарено'} fieldsTitle={giftsFieldsTitle} fieldsValue={giftFieldsValue} />
          <MiniBlock
            title={'Расход в текущем периоде по всем пакетам'}
            fieldsTitle={fieldsTitle}
            fieldsValue={packageCosts}
          />
          <MiniBlock
            title={'Доступно в текущем периоде по всем пакетам'}
            fieldsTitle={fieldsTitle}
            fieldsValue={(() => {
              if (isBaseTariffing) {
                return ['', '', '']
              } else {
                switch (Unlim?.TrafficTypeUnlimData) {
                  case 3:
                    return ['Безлимит', CurrentAvailable?.CurrentAvailableVoice, CurrentAvailable?.CurrentAvailableSms]
                  case 2:
                    return [CurrentAvailable?.CurrentAvailableData, CurrentAvailable?.CurrentAvailableVoice, 'Безлимит']
                  case 1:
                    return [CurrentAvailable?.CurrentAvailableData, 'Безлимит', CurrentAvailable?.CurrentAvailableSms]
                  default:
                    return [
                      CurrentAvailable?.CurrentAvailableData,
                      CurrentAvailable?.CurrentAvailableVoice,
                      CurrentAvailable?.CurrentAvailableSms
                    ]
                }
              }
            })()}
          />
        </StyleDiv>

        <TitleRow>Дополнительные услуги</TitleRow>
        {AdditionalServices?.map((el, iter) => {
          return (
            <SubRow key={iter}>
              <LeftCol span={12}>
                {el.ServiceNameAddServices + ' '}
                {el.IsParentService && (
                  <Tooltip title='Управление мультиподпиской доступно в разделе услуг'>
                    <HddOutlined style={{ fontSize: 18 }} />
                  </Tooltip>
                )}
              </LeftCol>
              <Col span={12}>{el.CostMonthWithTaxAddServices + ' в ' + el.PeriodNameAddServices}</Col>
            </SubRow>
          )
        })}

        <TitleRow span={24}>
          <LeftCol span={12}>Абонентская плата (итого)</LeftCol>
          <Col span={12}>{Fee?.FeeSum ? Fee.FeeSum + ' в мес.' : ''}</Col>
        </TitleRow>
        <SubRow>
          <LeftCol span={12}>Предыдущее списание абонентской платы</LeftCol>
          <Col span={12}>{Fee?.PaydChargeDate && moment(Fee.PaydChargeDate).format(formatData)}</Col>
        </SubRow>
        <SubRow>
          <LeftCol span={12}>Следующее списание абонентской платы</LeftCol>
          <Col span={12}>{Fee?.ChargeNextDate && moment(Fee.ChargeNextDate).format(formatData)}</Col>
        </SubRow>
        <SubRow>
          <LeftCol span={12}>Cмена тарифа была</LeftCol>
          <Col span={12}>{Fee?.SwitchOnDate && moment(Fee.SwitchOnDate).format(formatData)}</Col>
        </SubRow>
      </StyleRow>
    </>
  )
}

LeftBlock.propTypes = propTypes

export default LeftBlock

const StyleRow = styled(Row)`
  padding: 10px 30px 25px 30px;
`

const LineColor = styled.div`
  min-height: 43px;
  padding: 9px 40px 10px 30px;
  background: rgb(236, 249, 255);
  display: flex;
  flex-flow: row;
  align-items: center;
`

const StyleDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const NameTariff = styled.span`
  line-height: 20px;
  font-size: 16px;
  color: #000;
  margin-right: 10px;
`

const InfoCircleIcon = styled(InfoCircleOutlined)`
  margin-right: 10px;
  & svg {
    width: 20px;
    height: 20px;
  }
`

const Box = styled.span`
  display: inline-block;
  max-height: '22px';
  background-color: ${props => (props.color === 'red' ? '#FFF1F0' : '#F6FFED')};
  border: 1px solid;
  border-color: ${props => (props.color === 'red' ? '#FFA39E' : '#B7EB8F')};
  color: ${props => (props.color === 'red' ? '#F5222D' : '#52C41A')};
  border-radius: 4px;
  line-height: 17px;
  font-size: 12px;
  padding: 1px 4px 1px 4px;
`

const TitleRow = styled(Row)`
  font-weight: bold;
  line-height: 26px;
  font-size: 16px;
  color: #000;
  margin-top: 16px;
  width: 100%;

  @media (max-width: 1400px) {
    font-size: 14px;
  }
`

const SubRow = styled(Row)`
  line-height: 18px;
  font-size: 16px;
  margin-top: 6px;
  width: 100%;

  @media (max-width: 1400px) {
    font-size: 14px;
  }
`

const LeftCol = styled(Col)`
  padding-right: 15px;
`
