/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Select, DatePicker, Button } from 'antd'

const ButtonGroup = Button.Group

const datesFormatsArray = [
  'DD.MM.YYYY',
  'YYYY',
  'MMYYYY',
  'DDMMYYYY',
  'MM.YYYY',
  'YYYY-MM-DD',
  'YYYY-MM',
  'DD-MM-YYYY',
  'MM-YYYY',
  'YYYY/MM/DD',
  'YYYY/MM',
  'DD/MM/YYYY',
  'MM/YYYY'
]

const RANGE_OPTIONS = [
  { value: 'any', label: 'Произвольный', disabled: true },
  { value: 'day', label: 'За день', disabled: false },
  { value: 'week', label: 'За неделю', disabled: false },
  { value: 'month', label: 'За месяц', disabled: false }
]

export default class RangePicker extends PureComponent {
  static propTypes = {
    value: PropTypes.shape({
      from: PropTypes.instanceOf(moment),
      to: PropTypes.instanceOf(moment)
    }),
    title: PropTypes.string,
    onChange: PropTypes.func,
    limitMonth: PropTypes.number,
    isYearAvailable: PropTypes.bool,
    isMonthOnly: PropTypes.bool,
    className: PropTypes.string,
    isControls: PropTypes.bool,
    isDisablePrevChangeButton: PropTypes.bool
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
      case 'year':
        onChange({ from: moment().subtract(1, 'year'), to: currentDate })
        break
      default:
        break
    }
  }

  get selectedRange () {
    const {
      isMonthOnly,
      isYearAvailable,
      value: { from, to }
    } = this.props

    if (!from || !to) {
      return 'any'
    }

    if (from.isSame(to, 'day')) {
      return 'day'
    }

    if (from.isSame(to.clone().subtract(7, 'days'), 'day')) {
      return 'week'
    }

    if (from.isSame(to.clone().subtract(1, 'month'), 'day')) {
      return 'month'
    }

    if (isYearAvailable && from.isSame(to.clone().subtract(1, 'year'), 'day')) {
      return 'year'
    }

    if (isMonthOnly && from.isSame(to.clone().add(1, 'day').subtract(1, 'month'), 'day')) {
      return 'month'
    }

    return 'any'
  }

  handleFromChange = from => {
    const { value: { to }, onChange, limitMonth } = this.props
    if (from) {
      if (limitMonth && moment.duration(to.diff(from)).asMonths() > limitMonth) {
        onChange({ to: moment(from).add(limitMonth, 'months'), from })
      } else {
        onChange({ to, from })
      }
    }
  }

  handleToChange = to => {
    const { value: { from }, onChange, limitMonth } = this.props
    if (to) {
      if (limitMonth && moment.duration(to.diff(from)).asMonths() > limitMonth) {
        onChange({ from: moment(to).subtract(limitMonth, 'months'), to })
      } else {
        onChange({ to, from })
      }
    }
  }

  checkFromDateDisabled = date => date.isAfter(this.props.value.to, 'day')

  checkToDateDisabled = date => date.isBefore(this.props.value.from, 'day') || date.isAfter(moment(), 'day')

  blurHandle = edge => {
    const { value: { from, to }, onChange, limitMonth } = this.props
    if (limitMonth && moment.duration(to.diff(from)).asMonths() > limitMonth) {
      if (edge === 'from') {
        onChange({ to: moment(from).add(limitMonth, 'months'), from })
      } else {
        onChange({ from: moment(to).subtract(limitMonth, 'months'), to })
      }
    }
  }

  handleArrowChangePeriod = step => {
    const {
      value: { from, to },
      onChange,
      isMonthOnly
    } = this.props

    if (isMonthOnly) {
      if (step === 'previous') {
        onChange({ to: moment(from).subtract(1, 'day'), from: moment(from).subtract(1, 'month') })
      } else {
        const newFrom = moment(from).add(1, 'month')
        const newTo = moment(newFrom).add(1, 'month').subtract(1, 'day')
        if (moment().isAfter(newTo)) {
          onChange({ to: newTo, from: newFrom })
        } else {
          onChange({ to: moment(), from: newFrom })
        }
      }
    } else {
      const period = this.selectedRange
      const difference = period === 'week' ? '7' : '1'
      let dimension
      switch (period) {
        case 'day':
        case 'week':
          dimension = 'day'
          break
        case 'month':
          dimension = 'month'
          break
        case 'year':
          dimension = 'year'
          break
        default:
          break
      }
      if (step === 'previous') {
        onChange({ to: moment(to).subtract(difference, dimension), from: moment(from).subtract(difference, dimension) })
      } else {
        const newTo = moment(to).add(difference, dimension)
        if (moment().isAfter(newTo)) { // проверка на доступность даты
          onChange({ to: newTo, from: moment(from).add(difference, dimension) })
        } else {
          onChange({ to: moment(), from: moment().subtract(difference, dimension) })
        }
      }
    }
  }

  render () {
    const {
      value: { from, to },
      isMonthOnly,
      isYearAvailable,
      className,
      isControls = true,
      title,
      isDisablePrevChangeButton
    } = this.props
    const isSelectedAny = this.selectedRange === 'any' && !isMonthOnly
    const disabledPrevChange = isSelectedAny || (isMonthOnly && (moment().diff(from, 'month') === 5)) || isDisablePrevChangeButton
    const disabledNextChange = isSelectedAny || to.isSame(moment(), 'day')
    const currentRangeOptions = isYearAvailable
      ? [...RANGE_OPTIONS, { value: 'year', label: 'За год', disabled: false }]
      : RANGE_OPTIONS
    return (
      <Wrapper className={className}>
        {title && <Title>{title}</Title>}
        <InputWrapper>
          {isControls &&
            <ControlsSelect
              value={this.selectedRange}
              onChange={this.handleRangeChange}
              disabled={isMonthOnly}
            >
              {currentRangeOptions.map(option => (
                <Select.Option value={option.value} disabled={option.disabled} key={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </ControlsSelect>
          }
          <Label>
            с
            <StyledPicker
              allowClear={false}
              disabled={isMonthOnly}
              disabledDate={this.checkFromDateDisabled}
              value={from}
              onChange={this.handleFromChange}
              format={datesFormatsArray}
              showToday={false}
              onBlur={() => this.blurHandle('from')}
            />
          </Label>
          <Label>
            по
            <StyledPicker
              allowClear={false}
              disabled={isMonthOnly}
              disabledDate={this.checkToDateDisabled}
              value={to}
              onChange={this.handleToChange}
              format={datesFormatsArray}
              showToday={false}
              onBlur={() => this.blurHandle('to')}
            />
          </Label>
          {isControls &&
            <StyleButtonGroup>
              <Button disabled={disabledPrevChange} onClick={() => this.handleArrowChangePeriod('previous')}><LeftOutlined /></Button>
              <Button disabled={disabledNextChange} onClick={() => this.handleArrowChangePeriod('next')}><RightOutlined /></Button>
            </StyleButtonGroup>
          }
        </InputWrapper>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
`

const InputWrapper = styled.div`
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

const Title = styled.h4`
  font-weight: bolder;
`

const StyledPicker = styled(DatePicker)`
  margin-left: 10px;
  width: 140px;
`

const StyleButtonGroup = styled(ButtonGroup)`
  margin-left: 10px;
  display: inherit;
  & button {
    width: 30px;
    padding: 0;
    padding-top: 2px;
  }
`

const ControlsSelect = styled(Select)`
  width: 130px;
`
