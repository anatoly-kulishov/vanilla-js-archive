import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import moment from 'moment'
import { TimePicker } from 'antd'

export default class TimeRangePicker extends PureComponent {
  static propTypes = {
    value: PropTypes.objectOf(
      PropTypes.shape({
        from: PropTypes.instanceOf(moment),
        to: PropTypes.instanceOf(moment)
      })
    ),
    format: PropTypes.string,
    title: PropTypes.string,
    onChange: PropTypes.func
  }

  render () {
    const {
      value: { from, to },
      format,
      onChange,
      title,
      ...rest
    } = this.props

    const handleChange = (date, time, type) => {
      switch (type) {
        case 'from':
          onChange({ from: date, to })
          break
        case 'to':
          onChange({ from, to: date })
          break
        default:
          break
      }
    }

    return (
      <div {...rest}>
        {title && <Title>{title}</Title>}
        <InputWrapper>
          <Label htmlFor='time-from'>
            с
            <StyledTimePicker
              id='time-from'
              value={from}
              format={format}
              allowClear={false}
              onChange={(date, time) => handleChange(date, time, 'from')}
            />
          </Label>
          <Label htmlFor='time-to'>
            по
            <StyledTimePicker id='time-to' value={to} format={format} allowClear={false} onChange={(date, time) => handleChange(date, time, 'to')} />
          </Label>
        </InputWrapper>
      </div>
    )
  }
}

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

const StyledTimePicker = styled(TimePicker)`
  margin-left: 10px;
  width: 140px;
`
