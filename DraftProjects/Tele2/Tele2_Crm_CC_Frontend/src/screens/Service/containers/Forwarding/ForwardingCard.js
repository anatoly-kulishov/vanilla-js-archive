/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Select, Button } from 'antd'
import PropTypes from 'prop-types'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'

const Option = Select.Option

class CallForwardingCard extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    msisdn: PropTypes.string,
    status: PropTypes.string,
    statuses: PropTypes.array,
    timer: PropTypes.string,
    times: PropTypes.array,
    type: PropTypes.string,
    handlingMsisdn: PropTypes.string,
    changeHlr: PropTypes.func,
    isForwardingHlr: PropTypes.bool,
    handlingId: PropTypes.string,
    paramsForInteraction: PropTypes.object,
    isMailbox: PropTypes.bool,
    disabled: PropTypes.bool,
    isWebSellerView: PropTypes.bool
  }

  static getDerivedStateFromProps (props, state) {
    const { status, timer, isFirstRender } = state
    const { isMailbox } = props

    if (status === null && timer === null) {
      return {
        msisdn: props.msisdn,
        status: isFirstRender && isMailbox ? 'Voice' : props.status,
        timer: props.timer,
        isMailbox: props.isMailbox,
        isFirstRender: false
      }
    }

    return null
  }

  state = {
    msisdn: null,
    status: null,
    timer: null,
    isFirstRender: true
  }

  handleChangeHlr = () => {
    const { changeHlr, type, handlingMsisdn, handlingId, paramsForInteraction } = this.props
    const { status, msisdn, timer } = this.state

    const isEnable = status === 'Active'
    const isVoiceMailBox = status === 'Voice'

    changeHlr({
      commandId: `set${type}Number`,
      msisdn: handlingMsisdn,
      enable: isEnable || isVoiceMailBox,
      voicemailbox: isVoiceMailBox,
      forwardMsisdn: msisdn,
      timer: timer,
      handlingId: handlingId,
      ...paramsForInteraction
    })
  }

  handleFieldChange = (field, value) => {
    const { isForwardingHlr } = this.props

    if (isForwardingHlr) {
      this.setState({
        [field]: value
      })
    }
  }

  onClickRemove = () => {
    this.setState({
      msisdn: ''
    })
  }

  renderTimerSelect = () => {
    const { times, isWebSellerView } = this.props
    const { timer } = this.state

    if (!timer) {
      return <Space />
    }

    return (
      <CallForwardingCardTimeSelect
        value={timer}
        onChange={value => this.handleFieldChange('timer', value)}
        disabled={isWebSellerView}
      >
        <Option key={-1} value={'Inactive'}>
          Неактивен
        </Option>
        {times.map((item, index) => {
          return (
            <Option key={index} value={item}>
              {item + ' ' + 'cек'}
            </Option>
          )
        })}
      </CallForwardingCardTimeSelect>
    )
  }

  render () {
    const { title, isForwardingHlr, disabled, statuses, handlingId, isWebSellerView } = this.props
    const { msisdn, status, timer } = this.state

    const isInactiveStatus = status === 'Inactive' || status === 'Voice'

    let statusColor
    switch (status) {
      case 'Active':
        statusColor = '#52C41A'
        break
      case 'Voice':
        statusColor = '#40bfee'
        break
      case 'Inactive':
        statusColor = '#D9DADB'
        break
      default:
        statusColor = '#D9DADB'
    }

    return (
      <CallForwardingCardWrapper disabled={disabled}>
        <CallForwardingCardTitleWrapper>
          <CallForwardingCardTitle>{title}</CallForwardingCardTitle>
          <CallForwardingCardStatus status={statusColor} />
        </CallForwardingCardTitleWrapper>
        <MsisdnMaskInput
          value={msisdn}
          disabled={isInactiveStatus || isWebSellerView}
          onChange={value => this.handleFieldChange('msisdn', value)}
          onPaste={value => this.handleFieldChange('msisdn', value)}
          onClickRemove={this.onClickRemove}
        />
        <CallForwardingCardStatusSelect
          istimer={(!!timer).toString()}
          value={status}
          onChange={value => this.handleFieldChange('status', value)}
          disabled={isWebSellerView}
        >
          {statuses.map((item, index) => {
            return (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            )
          })}
        </CallForwardingCardStatusSelect>
        {this.renderTimerSelect()}
        {!isWebSellerView && (
          <CallForwardingCardButton disabled={!handlingId} onClick={isForwardingHlr && this.handleChangeHlr}>
            Выполнить
          </CallForwardingCardButton>
        )}
      </CallForwardingCardWrapper>
    )
  }
}

export default CallForwardingCard

const CallForwardingCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(25% - 30px);
  padding: 15px;
  box-sizing: content-box;
  border-right: 1px solid rgb(228, 228, 233);

  &:last-child {
    border-right: none;
  }

  opacity: ${props => (props.disabled ? '0.5' : '1')};
  pointer-events: ${props => (props.disabled ? 'none' : 'unset')};
`

const CallForwardingCardTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`

const CallForwardingCardTitle = styled.div`
  font-family: PT_Sans-Web-Bold, sans-serif;
  font-size: 15px;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.85);
  margin-right: 10px;
`

const CallForwardingCardStatus = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.status};
`

const MsisdnMaskInput = styled(MsisdnMaskedInput)`
  padding-bottom: 5px;
`

const CallForwardingCardStatusSelect = styled(Select)`
  width: 100%;
  margin-bottom: ${props => (props.istimer === 'true' ? '10px' : '20px')};
`

const CallForwardingCardTimeSelect = styled(Select)`
  align-self: flex-end;
  width: 50%;
  margin-bottom: 20px;

  &:before {
    content: 'Через';
    position: absolute;
    left: -45%;
    top: 7px;
    color: #696f76;
    font-size: 12px;
  }
`

const Space = styled.div`
  flex: 1;
`

const CallForwardingCardButton = styled(Button)`
  width: 70%;
  align-self: flex-end;
  color: black;
  font-family: T2HalvarBreit_ExtraBold;
`
