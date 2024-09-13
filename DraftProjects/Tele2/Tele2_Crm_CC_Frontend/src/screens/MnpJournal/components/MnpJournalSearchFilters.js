import { Row, Form, Col, Input, Button } from 'antd'
import MsisdnInput from 'components/MsisdnMask/MsisdnInput'
import React, { useCallback, useMemo } from 'react'
import InputMask from 'react-input-mask'
import styled from 'styled-components'
import RangePicker from 'components/RangePicker'
import { func, object } from 'prop-types'

const handleCopy = event => {
  const selection = document.getSelection()
  event.clipboardData.setData('text', selection.toString().replace(/\D/g, ''))
  event.preventDefault()
}

const removeSpaces = value => value.replace(/\s/g, '')

const MnpJournalSearchFilters = props => {
  const { onClear, rangeDate, onChangeDate, onSubmit } = props

  const value = useMemo(() => ({ from: rangeDate.from, to: rangeDate.to }), [rangeDate])
  const handleChangeDate = useCallback(({ from, to }) => onChangeDate({ from, to }), [onChangeDate])

  return (
    <>
      <Row gutter={64}>
        <Col span={6}>
          <Form.Item noStyle dependencies={['TemporaryMsisdn']}>
            {({ resetFields }) => (
              <Form.Item label='Временный MSISDN' name='TemporaryMsisdn'>
                <MsisdnInput noAutoFocus onClickRemove={() => resetFields(['TemporaryMsisdn'])} />
              </Form.Item>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item noStyle dependencies={['NumberPortabilityId']}>
            {({ resetFields }) => (
              <Form.Item label='NPId' name='NumberPortabilityId' normalize={removeSpaces}>
                <InputMask
                  mask='9 999 999 999 999 999'
                  maskChar={null}
                  onCopy={handleCopy}
                  onClickRemove={() => resetFields(['NumberPortabilityId'])}
                >
                  {inputProps => <Input {...inputProps} allowClear />}
                </InputMask>
              </Form.Item>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Wrapper>
        <Row align='middle' gutter={64}>
          <Col>
            <RangePicker value={value} onChange={handleChangeDate} />
          </Col>
          <Col>
            <DateControls>
              <ControlBtn type='primary' onClick={onSubmit}>
                Найти
              </ControlBtn>
              <ControlBtn type='primary' onClick={onClear}>
                Очистить
              </ControlBtn>
            </DateControls>
          </Col>
        </Row>
      </Wrapper>
    </>
  )
}

export default MnpJournalSearchFilters

MnpJournalSearchFilters.propTypes = {
  onClear: func,
  rangeDate: object,
  onChangeDate: func,
  onSubmit: func
}

const Wrapper = styled.div`
  padding: 0 0 20px 0;
`

const ControlBtn = styled(Button)`
  margin-left: 20px;
`
const DateControls = styled.div`
  display: flex;
  justify-content: flex-end;
`
