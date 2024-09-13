/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, Col, Modal, Radio, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import { get } from 'lodash'

import TariffList from './TariffList'

const RadioGroup = Radio.Group
function AvailableTariffs (props) {
  const {
    selectedData,
    personalAccountState,
    tariffState,
    HandlingId,
    handleTariffSettings,
    handleSelectData,
    handleInitChangingTariffPlan,
    isASSeller,
    changeTariff
  } = props

  const [selectedTariff, setSelectedTariff] = useState(0)

  const selectRadioTariff = useCallback((event) => {
    setSelectedTariff(event.target.value)
  }, [setSelectedTariff])

  const handleConfirm = useCallback((currentTariff, chargeNextDate) => {
    const confirm = Modal.confirm
    const {
      personalAccount: {
        SubscriberFullInfo,
        ClientId,
        BillingBranchId,
        Msisdn,
        SubscriberId
      }
    } = personalAccountState

    const {
      SubscriberTypeId,
      SubscriberStatusId
    } = SubscriberFullInfo?.SubscriberInfo ?? {}

    if (isASSeller) {
      handleInitChangingTariffPlan({
        hasTariffSetting: false,
        msisdn: Msisdn,
        rate: currentTariff.BillingRateId,
        targetDate: selectedData === 0 ? moment().format() : chargeNextDate,
        handlingId: HandlingId,
        cliendId: ClientId,
        subscriberId: SubscriberId,
        subscriberBranchId: BillingBranchId,
        subscriberTypeId: SubscriberTypeId,
        subscriberStatusId: SubscriberStatusId,
        rateName: currentTariff.RateName ? currentTariff.RateName : currentTariff.BillingRateName,
        tariffCost: currentTariff?.ChargeSumNext
      })
    } else {
      confirm({
        title: 'Переход на новый тариф',
        content: `Выполнить переход на тариф ${currentTariff.RateName}?`,
        onOk () {
          if (!tariffState.changeTariffLoading) {
            changeTariff({
              msisdn: Msisdn,
              rate: currentTariff.BillingRateId,
              targetDate: selectedData === 0 ? null : chargeNextDate,
              handlingId: HandlingId,
              cliendId: ClientId,
              subscriberId: SubscriberId,
              subscriberBranchId: BillingBranchId,
              subscriberTypeId: SubscriberTypeId,
              subscriberStatusId: SubscriberStatusId,
              rateName: currentTariff.RateName ? currentTariff.RateName : currentTariff.BillingRateName
            })
          }
        }
      })
    }
  }, [personalAccountState, changeTariff, selectedData, tariffState])

  const onSubmit = useCallback((currentTariff, chargeNextDate) => {
    const { IsConstructor, BillingRateId } = currentTariff

    if (IsConstructor) {
      handleTariffSettings(0, BillingRateId)
    } else {
      handleConfirm(currentTariff, chargeNextDate)
    }
  }, [handleConfirm, handleTariffSettings])

  const handleChange = useCallback((event) => handleSelectData(event.target.value), [handleSelectData])

  const [availableTariffs, currentTariff] = useMemo(() => {
    const availableTariffs = get(tariffState, 'availableTariffs.Tariffs', [])
    const currentTariff = get(tariffState, `availableTariffs.Tariffs[${selectedTariff}]`, {})
    return [availableTariffs, currentTariff]
  }, [tariffState, selectedTariff])

  useEffect(() => {
    const initTariffId = tariffState.initSelectedTariffId
    if (initTariffId !== 0 && availableTariffs?.length > 0) {
      const tariffIndex = availableTariffs.findIndex(tariff => tariff.BillingRateId === initTariffId)
      setSelectedTariff(tariffIndex)
    }
  }, [availableTariffs, tariffState])

  const chargeNextDate = useMemo(() => get(tariffState, 'tariffInfo.Fee.ChargeNextDate', ''), [tariffState])

  return (
    <Wrapper>
      <Body>
        <LineColor>
          <StyleCol span={10}>Название тарифа</StyleCol>
          <Tooltip
            placement='bottom'
            title='Полная стоимость перехода на новый ТП (смена ТП + АП за основную услугу + плата за включение основной услуги + АП за все микропакеты)'
          >
            <StyleCol span={7}>Полная стоимость перехода</StyleCol>
          </Tooltip>
          <Tooltip
            placement='bottom'
            title='Сумма абонентской платы (АП) по услуге в следующем расчетном периоде с налогом и со скидками'
          >
            <StyleCol span={7}>Абонентская плата</StyleCol>
          </Tooltip>
        </LineColor>
        <TariffList
          availableTariffs={availableTariffs}
          selectedTariff={selectedTariff}
          selectRadioTariff={selectRadioTariff}
        />
      </Body>
      <Footer>
        <WrapperFooter>
          <RadioGroup value={selectedData} onChange={handleChange}>
            <StyleRadio value={0}>Сейчас</StyleRadio>
            { chargeNextDate &&
              <StyleRadio value={1}>
                Следующее списание АП {moment(chargeNextDate).format('DD.MM.YYYY, HH.mm')}
              </StyleRadio>
            }
          </RadioGroup>
          <Button
            type='primary'
            disabled={Object.keys(currentTariff).length === 0}
            onClick={() => onSubmit(currentTariff, chargeNextDate)}
          >
            Подключить
          </Button>
        </WrapperFooter>
      </Footer>
    </Wrapper>
  )
}

export default AvailableTariffs

AvailableTariffs.propTypes = {
  selectedData: PropTypes.number,
  personalAccountState: PropTypes.object,
  tariffState: PropTypes.object,
  HandlingId: PropTypes.object,
  changeTariff: PropTypes.func,
  handleTariffSettings: PropTypes.func,
  handleSelectData: PropTypes.func,
  handleInitChangingTariffPlan: PropTypes.func,
  isASSeller: PropTypes.bool
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 100%;
  padding-bottom: 20px;
  position: relative;
`

const LineColor = styled.div`
  min-height: 43px;
  background: rgb(236, 249, 255);
  display: flex;
`

const StyleCol = styled(Col)`
  line-height: 18px;
  font-size: 16px;
  color: #000;
  align-items: center;
  padding-left: 15px;
  display: flex;

  @media (max-width: 1400px) {
    font-size: 14px;
  }
`

const Body = styled.div`
  padding-bottom: 60px;
`

const Footer = styled.div`
  z-index: 10;
  width: calc(35vw);
  bottom: 0;
  position: fixed;
  padding: 0 30px 20px;
  margin-left: 2px;
  background-color: white;
`

const WrapperFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`

const StyleRadio = styled(Radio)`
  height: 30px;
  line-height: 20px;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
  font-size: 15px;
`
