import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Col, Modal, Row, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { get } from 'lodash'

import Head from './components/Head'
import LeftBlock from './components/LeftBlock'
import AvailableTariffs from './components/AvailableTariffs'
import Constructor from './components/Constructor'

import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_CLOSE, MODAL_OPEN } from 'constants/logTypes'
import { RARIFF_MODAL } from 'constants/logModalNames'
import { getTypeCard } from 'webseller/helpers'

const maskStyle = { backgroundColor: 'rgba(0, 0, 0, 0)' }
export default class TariffModal extends Component {
  static propTypes = {
    personalAccountState: PropTypes.object,
    tariffState: PropTypes.object,
    fetchTariffInfo: PropTypes.func,
    handleVisibleModal: PropTypes.func,
    fetchAvailableTariffs: PropTypes.func,
    changeTariff: PropTypes.func,
    fetchAvailableTariffDetails: PropTypes.func,
    changeServices: PropTypes.func,
    fetchEnabledTariffDetails: PropTypes.func,
    HandlingId: PropTypes.object,
    CCSubscriberTariffHistory: PropTypes.bool,
    tariffInfo: PropTypes.object,
    CCReadTariffGuaranteedPrice: PropTypes.bool,
    initChangingTariffPlan: PropTypes.func,
    user: PropTypes.object
  }

  state = {
    isViewSettings: false,
    isTariffChange: false,
    selectedData: 0
  }

  componentDidMount () {
    const { fetchAvailableTariffs, personalAccountState, fetchTariffInfo } = this.props
    const { Msisdn: msisdn } = personalAccountState.personalAccount
    fetchTariffInfo({ msisdn })
    fetchAvailableTariffs({ msisdn })
    logIfEnabled({ type: MODAL_OPEN, log: RARIFF_MODAL })
  }

  handleCloseModal = () => {
    this.props.handleVisibleModal()
    logIfEnabled({ type: MODAL_CLOSE, log: RARIFF_MODAL })
  }

  handleSelectData = newData => {
    this.setState({
      selectedData: newData
    })
  }

  handleTariffSettings = (rateType, trplId) => {
    const {
      personalAccountState,
      fetchAvailableTariffDetails,
      fetchEnabledTariffDetails,
      tariffState: { tariffInfo }
    } = this.props
    const { Msisdn: msisdn } = personalAccountState.personalAccount

    const personalizingServices = tariffInfo?.AdditionalServices?.map(as => as.BillingServiceIdAddServices)

    switch (rateType) {
      case 1:
        fetchEnabledTariffDetails({ msisdn })
        this.setState({
          isViewSettings: true,
          isTariffChange: false
        })
        break
      case 0:
        fetchAvailableTariffDetails({ msisdn, trplId, personalizingServices })
        this.setState({
          isViewSettings: true,
          isTariffChange: true
        })
        break
      default:
        this.setState({
          isViewSettings: false,
          isTariffChange: false
        })
        break
    }
  }

  renderRightBlock = () => {
    const { isViewSettings, selectedData } = this.state
    const { tariffState, changeTariff, personalAccountState, changeServices, HandlingId, user } = this.props
    const { isTariffChange } = this.state
    const tariffs = get(tariffState, 'availableTariffs.Tariffs', null)
    const {
      tariffSettingsLoading,
      tariffSettingsError,
      tariffSettings,
      availableTariffsLoading,
      availableTariffsError
    } = tariffState
    const isLoadingTariffSettings = tariffSettingsLoading
    const isSuccesTariffSettings = !tariffSettingsError && !isLoadingTariffSettings && tariffSettings
    const isAvailableTariffsLoading = availableTariffsLoading
    const isASSeller = user?.isASSeller

    if (isViewSettings) {
      if (isSuccesTariffSettings) {
        return (
          <Constructor
            tariffState={tariffState}
            isTariffChange={isTariffChange}
            changeTariff={changeTariff}
            personalAccountState={personalAccountState}
            changeServices={changeServices}
            HandlingId={HandlingId}
            selectedData={selectedData}
            handleSelectData={this.handleSelectData}
            handleInitChangingTariffPlan={this.props.initChangingTariffPlan}
            isASSeller={isASSeller}
          />
        )
      } else if (isLoadingTariffSettings) {
        return <StyleIcon />
      } else {
        return <Fragment>{tariffSettingsError}</Fragment>
      }
    } else {
      if (tariffs) {
        return (
          <AvailableTariffs
            handleTariffSettings={this.handleTariffSettings}
            tariffState={tariffState}
            changeTariff={changeTariff}
            personalAccountState={personalAccountState}
            HandlingId={HandlingId}
            selectedData={selectedData}
            handleSelectData={this.handleSelectData}
            handleInitChangingTariffPlan={this.props.initChangingTariffPlan}
            isASSeller={isASSeller}
          />
        )
      } else if (isAvailableTariffsLoading) {
        return <StyleIcon />
      } else {
        return <Fragment>{availableTariffsError}</Fragment>
      }
    }
  }

  render () {
    const { tariffState, CCSubscriberTariffHistory, CCReadTariffGuaranteedPrice, user } = this.props
    const { tariffInfo, tariffInfoLoading, tariffInfoError, changeTariffLoading, changeServicesLoading, isVisible } =
      tariffState

    const isASSeller = user?.isASSeller
    const { isAnonymousCard, isb2b, isUnionEnv, isSubscriberFirstLevelCard } = getTypeCard(isASSeller)
    const isUnionB2b = isb2b && isSubscriberFirstLevelCard && !isUnionEnv

    return (
      <TariffsModal
        title={
          <Head
            isTariffHistoryButtonVisible={CCSubscriberTariffHistory}
            isViewSettings={this.state.isViewSettings}
            handleTariffSettings={this.handleTariffSettings}
            tariffState={tariffState}
          />
        }
        visible={isVisible}
        onCancel={this.handleCloseModal}
        width={'73vw'}
        maskStyle={maskStyle}
        footer={null}
        zIndex={999}
      >
        <StyleSpin
          spinning={tariffInfoLoading || changeTariffLoading || changeServicesLoading}
          indicator={<LoadingIcon spin />}
        >
          <StyleRow>
            {tariffInfo && (
              <Fragment>
                <Line />
                <Wrapper span={12}>
                  <LeftBlock tariffState={tariffState} CCReadTariffGuaranteedPrice={CCReadTariffGuaranteedPrice} />
                </Wrapper>
                {(!isAnonymousCard && !isUnionB2b) && <Wrapper span={12}>{this.renderRightBlock()}</Wrapper>}
              </Fragment>
            )}
            {tariffInfoError && <Fragment>Ошибка загрузки</Fragment>}
          </StyleRow>
        </StyleSpin>
      </TariffsModal>
    )
  }
}

const StyleRow = styled(Row)`
  position: relative;
  height: calc(100vh - 125px);
`

const TariffsModal = styled(Modal)`
  position: absolute;
  padding: 0;
  top: 180px;
  left: 0;

  & .ant-modal-body {
    padding: 0;
  }
`

const Line = styled.div`
  z-index: 2;
  bottom: 0;
  left: 50%;
  position: absolute;
  border-right: 1px solid #e8e8e8;
  height: calc(100vh - 125px);
`

const StyleIcon = styled(LoadingOutlined)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 24px;
  color: #69c0ff;
`

const StyleSpin = styled(Spin)`
  width: 100%;
  margin: 50px 0;
`

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24px;
`

const Wrapper = styled(Col)`
  height: 100%;
  overflow-y: scroll;
`
