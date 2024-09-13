/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Select, Button, TimePicker, Checkbox } from 'antd'
import TextArea from 'components/TextArea'

import { get, isEqual } from 'lodash'
import moment from 'moment'
import momentTZ from 'moment-timezone'
import 'moment/locale/ru'

const { Option } = Select

class SmsSendingForm extends Component {
  static propTypes = {
    senders: PropTypes.object,
    periodOfSilence: PropTypes.object,
    selectedTemplate: PropTypes.object,
    onRemoveSmsRequest: PropTypes.func,
    isAdvertisingAllowed: PropTypes.bool,
    selectedReason: PropTypes.object,
    onSendSms: PropTypes.func,
    smsStatus: PropTypes.object,
    commentTemplate: PropTypes.object,
    isReasonCategoryCommentTemplates: PropTypes.bool,
    selectedCategory: PropTypes.object,
    smsTextEditRights: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      sender: null,
      date: null,
      message: '',
      isLateSending: false,
      isLateSendingToday: false,
      isLateSendingTomorrow: false,
      isDataSet: false,
      isSendersSet: false,
      selectedTemplate: {
        Id: null
      }
    }
  }

  componentDidMount () {
    const { senders } = this.props
    const isSenders = senders && !!senders.length

    if (isSenders) {
      this.setState({
        sender: senders.find(sender => sender.Default).Name
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { selectedTemplate, senders, periodOfSilence } = nextProps
    const { isSendersSet } = this.state
    const isSenders = senders && !!senders.length

    if (selectedTemplate && !isEqual(selectedTemplate.Id, this.state.selectedTemplate.Id)) {
      this.setState({
        message: get(selectedTemplate, 'Text', ''),
        selectedTemplate
      })
    }

    if (isSenders && !isSendersSet) {
      if (!selectedTemplate || !selectedTemplate.sender) {
        this.setState({
          sender: senders.find(sender => sender.Default).Name,
          isSendersSet: true
        })
      }
    }

    if (Object.keys(periodOfSilence).length) {
      const currentDateHours = moment(momentTZ.tz('Europe/Moscow').add(periodOfSilence.TimeShift, 'hours').format('HH'), 'HH:mm')
      const { DefaultDateFrom, DefaultDateTo } = periodOfSilence
      const fromDate = moment(DefaultDateFrom, 'HH:mm')
      const toDate = moment(DefaultDateTo, 'HH:mm')
      if (currentDateHours < toDate || currentDateHours >= fromDate) {
        this.setState({ IgnorePeriodOfSilence: true })
      }
    }
  }

  onChangeField = (value, type) => {
    this.setState({
      [type]: value
    })
  }

  onSetDate = (value, day) => {
    if (value) {
      this.setState({
        IgnorePeriodOfSilence: false,
        date: value,
        isLateSending: true,
        isLateSendingToday: day,
        isLateSendingTomorrow: !day
      })
    } else {
      this.setState({
        IgnorePeriodOfSilence: false,
        date: value,
        isLateSending: false,
        isLateSendingToday: false,
        isLateSendingTomorrow: false
      })
    }
  }

  onSetTime = (value) => {
    this.setState({
      date: value
    })
  }

  onResetDate = () => {
    const { periodOfSilence: { TimeShift, DefaultDateFrom, DefaultDateTo } } = this.props
    const currentDateHours = moment(momentTZ.tz('Europe/Moscow').add(TimeShift, 'hours').format('HH'), 'HH:mm')
    const fromDate = moment(DefaultDateFrom, 'HH:mm')
    const toDate = moment(DefaultDateTo, 'HH:mm')
    if (currentDateHours < toDate || currentDateHours >= fromDate) {
      this.setState({ IgnorePeriodOfSilence: true })
    }

    this.setState({
      date: null,
      isLateSending: false,
      isLateSendingToday: false,
      isLateSendingTomorrow: false,
      selectedTemplate: {}
    })
  }

  onResetState = () => {
    const { onRemoveSmsRequest, senders } = this.props
    const isSenders = senders && senders.length

    this.onResetDate()
    onRemoveSmsRequest()

    this.setState({
      message: '',
      sender: isSenders && senders.find(sender => sender.Default).Name,
      IgnorePeriodOfSilence: false,
      IgnoreAdvertisingAgreement: false,
      date: null
    })
  }

  range = (start, end) => {
    const result = []
    for (let item = start; item < end; item++) {
      result.push(item)
    }
    return result
  }

  disabledTime = () => {
    const { date } = this.state
    const { periodOfSilence: { TimeShift } } = this.props
    let checkingDateTime = date

    if (!checkingDateTime) {
      checkingDateTime = momentTZ.tz('Europe/Moscow')
    }

    const today = momentTZ.tz('Europe/Moscow').add('hours', TimeShift).startOf('day')
    const isToday = checkingDateTime.isSame(today, 'd')

    const selectedHour = moment(date).get('hour')
    const currentHour = momentTZ.tz('Europe/Moscow').add('hours', TimeShift).get('hour')
    const currentMinute = momentTZ.tz('Europe/Moscow').get('minute')

    const isSelectedHourEqualNow = currentHour === selectedHour

    const disabledHours =
      isToday
        ? this.range(0, currentHour)
        : this.range(currentHour + 1, 24)

    const disabledMinutes =
      isToday
        ? isSelectedHourEqualNow ? this.range(0, currentMinute) : this.range(0, 0)
        : isSelectedHourEqualNow ? this.range(currentMinute + 1, 60) : this.range(0, 0)

    return {
      disabledHours: () => disabledHours,
      disabledMinutes: () => disabledMinutes
    }
  }

  checkPeriod = () => {
    const { date } = this.state
    const { periodOfSilence } = this.props

    let currentDateHours = null

    if (!date) {
      currentDateHours = moment(momentTZ.tz('Europe/Moscow').add(periodOfSilence.TimeShift, 'hours').format('HH'), 'HH:mm')
    } else {
      currentDateHours = moment(moment(date).format('HH'), 'HH:mm')
    }

    if (currentDateHours && Object.keys(periodOfSilence).length) {
      const { DefaultDateFrom, DefaultDateTo } = periodOfSilence

      const fromDate = moment(DefaultDateFrom, 'HH:mm')
      const toDate = moment(DefaultDateTo, 'HH:mm')

      return currentDateHours < toDate || currentDateHours >= fromDate
    }

    return false
  }

  renderCheckboxes = () => {
    const { periodOfSilence, isAdvertisingAllowed } = this.props
    const { IgnorePeriodOfSilence, IgnoreAdvertisingAgreement } = this.state

    return (
      <BottomTextWrapper>
        {
          this.checkPeriod() && (
            <div>
              <Label>
                SMS будет отправлено в {periodOfSilence.DefaultDateTo}
                (период молчания {periodOfSilence.DefaultDateFrom + '-' + periodOfSilence.DefaultDateTo})
              </Label>
              <CheckBoxWrapper
                checked={IgnorePeriodOfSilence}
                onChange={() => this.onChangeField(!IgnorePeriodOfSilence, 'IgnorePeriodOfSilence')}
              >
                Игнорировать период молчания
              </CheckBoxWrapper>
              { IgnorePeriodOfSilence &&
                <Attention>
                  <div>
                    Внимание! Выбранное время попадает в Период молчания (время клиента): 21:00 - 9:00
                  </div>
                </Attention>
              }
              { !IgnorePeriodOfSilence &&
                <Attention>
                  <div>
                    Внимание! Выбранное время попадает в Период молчания (время клиента): 21:00 - 9:00
                    <br />Сообщение будет отослано после окончания периода молчания
                  </div>
                </Attention>
              }
            </div>
          )
        }
        {
          isAdvertisingAllowed && (
            <CheckBoxWrapper
              checked={IgnoreAdvertisingAgreement}
              onChange={() => this.onChangeField(!IgnoreAdvertisingAgreement, 'IgnoreAdvertisingAgreement')}
            >
              Абонент отказался от рекламных SMS, отправить SMS, несмотря на это?
            </CheckBoxWrapper>
          )
        }
      </BottomTextWrapper>
    )
  }

  style = { marginTop: '15px', justifyContent: 'space-between' }

  renderBottom = () => {
    const {
      selectedReason,
      isAdvertisingAllowed,
      onSendSms,
      smsStatus,
      commentTemplate,
      isReasonCategoryCommentTemplates,
      selectedCategory
    } = this.props
    const { IgnoreAdvertisingAgreement, message } = this.state

    const noComments = !isReasonCategoryCommentTemplates && selectedCategory && !selectedCategory.IsCommentFree
    const isCommentText = commentTemplate && commentTemplate.CommentText

    let isSendingDisabled =
      !selectedReason ||
      (isAdvertisingAllowed && !IgnoreAdvertisingAgreement)

    if (!isSendingDisabled && !noComments) {
      isSendingDisabled = !isCommentText
    }

    return (
      <ButtonGroup style={this.style}>
        <Button
          disabled={isSendingDisabled || !message}
          autoFocus
          loading={smsStatus.isLoading}
          type='primary'
          onClick={() => onSendSms(this.state)}
        >
          Отправить
        </Button>
        <Button type='submit' onClick={() => this.onResetState()}>Очистить</Button>
      </ButtonGroup>
    )
  }

  autoSize = { minRows: 1, maxRows: null }

  render () {
    const {
      sender,
      message,
      date,
      isLateSending,
      isLateSendingToday,
      isLateSendingTomorrow
    } = this.state

    const { senders, smsTextEditRights, periodOfSilence: { TimeShift } } = this.props

    const isSenders = senders && senders.length
    const today = momentTZ.tz('Europe/Moscow').add(TimeShift, 'hours')
    const tomorrow = momentTZ.tz('Europe/Moscow').add(24 + TimeShift, 'hours')
    const { disabledHours, disabledMinutes } = this.disabledTime()

    return (
      <Wrapper autoFocus>
        <Label>От кого</Label>
        <SelectWrapper
          onChange={value => this.onChangeField(value, 'sender')}
          value={sender}
          placeholder='Выберите отправителя'
        >
          {
            isSenders &&
              senders.map((item, id) => (
                <Option key={id} value={item.Name}>
                  {item.Name}
                </Option>
              ))
          }
        </SelectWrapper>

        <Label>Сообщение</Label>
        <TextArea
          resize='none'
          autoSize={this.autoSize}
          onChange={elem => this.onChangeField(elem.currentTarget.value, 'message')}
          placeholder='Сообщение'
          value={message}
          disabled={!smsTextEditRights}
        />
        <TimeWrapper>
          <Label>Отправить позже</Label>
          <Label>Время клиента: { today.format('DD.MM.YYYY HH:mm') }</Label>
          <ButtonGroup>
            <ButtonWrapper islatesending={isLateSending.toString()} onClick={() => this.onResetDate()}>
              Сейчас
            </ButtonWrapper>
            <DayChanger
              onClick={() => this.onSetDate(today, true)}
              isactive={(isLateSending && isLateSendingToday).toString()}
            >
              Сегодня
            </DayChanger>
            <DayChanger
              onClick={() => this.onSetDate(tomorrow, false)}
              isactive={(isLateSending && isLateSendingTomorrow).toString()}
            >
              Завтра
            </DayChanger>
            <TimePickerWrapper
              format='HH:mm'
              placeholder='Позже'
              value={date}
              disabled={!isLateSending}
              onChange={value => this.onSetTime(value)}
              islatesending={isLateSending.toString()}
              disabledHours={disabledHours}
              disabledMinutes={disabledMinutes}
              allowClear={false}
              inputReadOnly
            />
          </ButtonGroup>
        </TimeWrapper>
        {this.renderCheckboxes()}
        {this.renderBottom()}
      </Wrapper>
    )
  }
}

export default SmsSendingForm

const Wrapper = styled.form`
`

const SelectWrapper = styled(Select)`
  width: 300px !important;
  margin-bottom: 15px;
`

const Label = styled.div`
  font-size: 14px;
  color: black;
  margin-bottom: 10px;
`

const TimeWrapper = styled.div`
  margin-top: 15px;
`

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
`

const ButtonWrapper = styled(Button)`
  width: 120px;
  background: ${props => props.islatesending !== 'true' ? '#40bfee' : '#fff'};
  border-color: ${props => props.islatesending !== 'true' ? '#fff' : '#d9d9d9'};
  color: ${props => props.islatesending !== 'true' ? '#fff' : '#d9d9d9'};

  &:focus {
    background: ${props => props.islatesending !== 'true' ? '#40bfee' : '#fff'};
    border-color: ${props => props.islatesending !== 'true' ? '#fff' : '#d9d9d9'};
    color: ${props => props.islatesending !== 'true' ? '#fff' : '#d9d9d9'};
  }
`

const TimePickerWrapper = styled(TimePicker)`
  width: 165px;

  & > div > input {
    color: ${props => props.islatesending === 'true' ? '#40bfee' : '#000'};
    border-color: ${props => props.islatesending === 'true' ? '#40bfee' : '#d9d9d9'};
  }

  &::placeholder {
    color: #000 !important;
  }
`

const CheckBoxWrapper = styled(Checkbox)`
  font-size: 14px;
  font-weight: normal;
  color: black;
  margin-bottom: 10px;
  margin-left: 0 !important;
`

const BottomTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const DayChanger = styled.a`
  margin: 0 15px;
  transition: transform 0.3s ease;
  color: ${props => props.isactive === 'true' ? '#40bfee' : '#999999'};
  transform: translateY(${props => props.isactive === 'true' ? 'unset' : '15%'});
`

const Attention = styled.div`
  color: red;
`
