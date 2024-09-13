/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { Slider, Checkbox, Button, Tooltip } from 'antd'
import { InfoCircleOutlined, HddOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

export default class SettingsTariff extends Component {
  static propTypes = {
    SettingsTariffState: PropTypes.object,
    handleChangeSliders: PropTypes.func,
    currentValues: PropTypes.object,
    handleDefaultValue: PropTypes.func,
    handleChangeServices: PropTypes.func
  }

  onChangeTypeOneSliders = value => this.props.handleChangeSliders(value, 'TrafficTypeOneSliders')
  onChangeTypeTwoSliders = value => this.props.handleChangeSliders(value, 'TrafficTypeTwoSliders')
  onChangeTypeThreeSliders = value => this.props.handleChangeSliders(value, 'TrafficTypeThreeSliders')

  checkDisableService = service =>
    +service.CostMonthWithTaxPs === 0 ||
    service.IsParentService ||
    service.IsChildService ||
    service.AvailableServiceStatusPs === 'Unknown'

  render () {
    const { SettingsTariffState, handleChangeServices, currentValues, handleDefaultValue } = this.props
    const { settings, marksSliders, sliderSettings } = SettingsTariffState

    return (
      <Wrapper>
        {Object.values(sliderSettings).some(value => value.len !== -1) && (
          <Fragment>
            <TitleBlock>Основные параметры</TitleBlock>
            {sliderSettings.TrafficTypeThreeSliders.len !== -1 && (
              <Fragment>
                <SliderTitle>Гб</SliderTitle>
                <StyleSlider
                  marks={marksSliders.TrafficTypeThreeSliders}
                  step={null}
                  sliderLength={sliderSettings.TrafficTypeThreeSliders.len}
                  tipFormatter={null}
                  max={sliderSettings.TrafficTypeThreeSliders.len}
                  value={currentValues.TrafficTypeThreeSliders}
                  onChange={this.onChangeTypeThreeSliders}
                />
              </Fragment>
            )}
            {sliderSettings.TrafficTypeOneSliders.len !== -1 && (
              <Fragment>
                <SliderTitle>Мин</SliderTitle>
                <StyleSlider
                  marks={marksSliders.TrafficTypeOneSliders}
                  step={null}
                  sliderLength={sliderSettings.TrafficTypeOneSliders.len}
                  tipFormatter={null}
                  max={sliderSettings.TrafficTypeOneSliders.len}
                  value={currentValues.TrafficTypeOneSliders}
                  onChange={this.onChangeTypeOneSliders}
                />
              </Fragment>
            )}
            {sliderSettings.TrafficTypeTwoSliders.len !== -1 && (
              <Fragment>
                <SliderTitle>SMS</SliderTitle>
                <StyleSlider
                  marks={marksSliders.TrafficTypeTwoSliders}
                  step={null}
                  sliderLength={sliderSettings.TrafficTypeTwoSliders.len}
                  tipFormatter={null}
                  max={sliderSettings.TrafficTypeTwoSliders.len}
                  value={currentValues.TrafficTypeTwoSliders}
                  onChange={this.onChangeTypeTwoSliders}
                />
              </Fragment>
            )}
          </Fragment>
        )}
        <TitleBlock>Дополнительные услуги</TitleBlock>
        {settings.PersonalizingServices?.map((service, index) => {
          return (
            <CheckboxBox key={index}>
              <div style={{ width: '100%' }}>
                <StyleCheckbox
                  disabled={this.checkDisableService(service)}
                  checked={currentValues.Services[index]}
                  onChange={value =>
                    handleChangeServices(value, index, service.CostMonthWithTaxPs, service.BillingServiceIdPs)
                  }
                >
                  {service.ServiceNamePs}
                </StyleCheckbox>
                {service.IsParentService && (
                  <Tooltip title='Управление мультиподпиской доступно в разделе услуг'>
                    <HddOutlined style={{ fontSize: 18 }} />
                  </Tooltip>
                )}
              </div>
              <StyleDiv>
                <Tooltip title='Базовая тарификация, услуга заблокирована'>
                  {service.ServiceStatusPs.toLowerCase() === 'blocked' && currentValues.Services[index] && (
                    <InfoCircleIcon />
                  )}
                </Tooltip>
                <PaymentForTime>
                  {service.CostMonthWithTaxPs.toFixed(2)} в {service.PeriodNamePs}
                </PaymentForTime>
              </StyleDiv>
            </CheckboxBox>
          )
        })}
        <WrapperButton>
          <Button onClick={handleDefaultValue}>Очистить</Button>
        </WrapperButton>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding: 0 30px 0 30px;
`

const WrapperButton = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: flex-end;
`

const TitleBlock = styled.div`
  font-weight: bold;
  color: #000;
  margin-top: 15px;
`

const CheckboxBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`

const StyleCheckbox = styled(Checkbox)`
  max-width: 65%;
`

const PaymentForTime = styled.div`
  width: 80%;
`

const StyleDiv = styled.div`
  width: 35%;
  display: flex;
  justify-content: space-between;
`

const SliderTitle = styled.div`
  width: 50px;
  padding-top: 10px;
  font-weight: bold;
  color: #000;
`

const InfoCircleIcon = styled(InfoCircleOutlined)`
  & svg {
    width: 20px;
    height: 20px;
  }
  color: #f5222d;
`

const StyleSlider = styled(Slider)`
  width: ${props => `${props.sliderLength * 75}px`};

  @media (max-width: 1400px) {
    width: ${props => `${props.sliderLength * 50}px`};
  }
`
