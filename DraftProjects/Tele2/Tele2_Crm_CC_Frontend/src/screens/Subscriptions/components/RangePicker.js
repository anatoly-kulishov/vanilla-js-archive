import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Select, DatePicker } from 'antd'

const datesFormatsArray = ['DD.MM.YYYY', 'YYYY-MM-DD', 'YYYYMMDD', 'YYYY', 'YYYY-MM']

const RANGE_OPTIONS = [
  { value: 'any', label: 'Произвольный', disabled: true },
  { value: 'day', label: 'За день', disabled: false },
  { value: 'week', label: 'За неделю', disabled: false },
  { value: 'month', label: 'За месяц', disabled: false },
  { value: 'all', label: 'Все даты', disabled: false }
]

export default class RangePicker extends PureComponent {
  static propTypes = {
    value: PropTypes.shape({
      from: PropTypes.instanceOf(moment),
      to: PropTypes.instanceOf(moment)
    }),
    onChange: PropTypes.func
  }
  state = {
    isTimeChooserOpen: false
  }

  handleRangeChange = value => {
    const { onChange } = this.props
    const currentDate = moment()

    switch (value) {
      case 'day':
        onChange({ from: moment(), to: currentDate })
        break
      case 'week':
        onChange({ from: moment().subtract(7, 'days'), to: currentDate })
        break
      case 'month':
        onChange({ from: moment().subtract(1, 'month'), to: currentDate })
        break
      case 'all':
        onChange({ from: '', to: '' })
        break
      default:
        break
    }
  }

  get selectedRange () {
    const { from, to } = this.props.value

    if (to === '') return 'all'

    if (!to.isSame(moment(), 'day')) return 'any'

    if (from.isSame(moment(), 'day')) return 'day'

    if (from.isSame(moment().subtract(7, 'days'), 'day')) return 'week'

    if (from.isSame(moment().subtract(1, 'month'), 'day')) return 'month'

    return 'any'
  }

  handleFromChange = from => {
    const { value: { to }, onChange } = this.props
    onChange({ to, from })
  }

  handleToChange = to => {
    const { value: { from }, onChange } = this.props
    onChange({ to, from })
  }

  handleChooseTime = () => {
    this.setState({ isTimeChooserOpen: !this.state.isTimeChooserOpen })
  }

  renderExtraFooter = () => (
    <ExtraFooter>
      <a onClick={this.handleChooseTime}>
        {this.state.isTimeChooserOpen ? 'Убрать время' : 'Выбрать время'}
      </a>
    </ExtraFooter>
  )

  checkFromDateDisabled = date => date.isAfter(this.props.value.to, 'day')

  checkToDateDisabled = date => date.isBefore(this.props.value.from, 'day') || date.isAfter(moment(), 'day')

  formatTime = { format: 'HH:mm:ss' }

  render () {
    const { from, to } = this.props.value
    const { isTimeChooserOpen } = this.state

    return (
      <Wrapper>
        <Select value={this.selectedRange} onChange={this.handleRangeChange}>
          {RANGE_OPTIONS.map(option => (
            <Select.Option value={option.value} disabled={option.disabled} key={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
        <Label>
          с
          <StyledPicker
            allowClear={false}
            disabledDate={this.checkFromDateDisabled}
            value={from}
            onChange={this.handleFromChange}
            format={datesFormatsArray}
            showToday={false}
            disabled={from === ''}
            showTime={isTimeChooserOpen ? this.formatTime : false}
            renderExtraFooter={this.renderExtraFooter}
          />
        </Label>
        <Label>
          по
          <StyledPicker
            allowClear={false}
            disabledDate={this.checkToDateDisabled}
            value={to}
            onChange={this.handleToChange}
            format={datesFormatsArray}
            showToday={false}
            disabled={from === ''}
          />
        </Label>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled.label`
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin: 0;
  display: flex;
  align-items: center;
  margin-left: 10px;
`

const StyledPicker = styled(DatePicker)`
  margin-left: 10px;
  width: 140px;
`

const ExtraFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
