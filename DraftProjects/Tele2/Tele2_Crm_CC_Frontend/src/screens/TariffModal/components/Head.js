import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import TariffHistoryModal from '../containers/tariffHistoryModal'

import { Row, Col, Button, Tooltip } from 'antd'

export default function Head ({ isViewSettings, handleTariffSettings, isTariffHistoryButtonVisible, tariffState }) {
  Head.propTypes = {
    isViewSettings: PropTypes.bool,
    tariffState: PropTypes.object,
    isTariffHistoryButtonVisible: PropTypes.bool,
    handleTariffSettings: PropTypes.func.isRequired
  }

  const [isTariffHistoryModalVisible, setTariffHistoryModalVisible] = useState(false)

  const { tariffInfo } = tariffState
  const isDelayGiven = tariffInfo?.Delay?.DelayIsGiven ?? false
  const isConstructor = tariffInfo?.EnabledTariff?.IsConstructor ?? false

  const isSettingsDisabled = isDelayGiven

  const buildCurrentTariffTooltipContent = () => {
    if (isDelayGiven) {
      return `Операция настройки текущего тарифного плана недоступна для абонента, имеющего рассрочку абон. платы. Необходимо доплатить ${tariffInfo.Delay.ToChargeSumm} руб. до ${tariffInfo.Delay.DelayEndDate}`
    } else {
      return ''
    }
  }

  function onModalOpen () {
    setTariffHistoryModalVisible(true)
  }

  function onModalClose () {
    setTariffHistoryModalVisible(false)
  }

  function handleSettings () {
    handleTariffSettings(1)
  }

  return (
    <Fragment>
      <StyleRow>
        <Col span={12}>
          <Box>Текущий Тариф</Box>
          {isConstructor && (
            <Tooltip placement='bottom' title={buildCurrentTariffTooltipContent()}>
              <Button type='primary' disabled={isSettingsDisabled} onClick={handleSettings}>
                Настроить
              </Button>
            </Tooltip>
          )}
        </Col>
        <StyleCol span={12}>
          {isViewSettings && (
            <Fragment>
              <Box>Настройка тарифа</Box>
              <TariffSettings onClick={handleTariffSettings}>К списку тарифов</TariffSettings>
            </Fragment>
          )}
          <Fragment>
            {!isViewSettings && <Box>Новый тариф</Box>}
            <Tooltip placement='bottom' title={'История тарифов'}>
              <Button
                hidden={!isTariffHistoryButtonVisible}
                type='secondary'
                onClick={onModalOpen}
              >
                История
              </Button>
            </Tooltip>
          </Fragment>
        </StyleCol>
      </StyleRow>
      <TariffHistoryModal isVisible={isTariffHistoryModalVisible} onClose={onModalClose} />
    </Fragment>
  )
}

const TariffSettings = styled.span`
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid rgba(99, 95, 95, 0.41);
  margin-right: 13px;
`

const StyleRow = styled(Row)`
  display: flex;
  align-items: center;
  height: 32px;
`

const Box = styled.span`
  margin-right: 13px;
  font-weight: bold;
`

const StyleCol = styled(Col)`
  padding-left: 24px;
`
