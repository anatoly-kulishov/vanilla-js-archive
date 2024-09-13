import React, { useEffect } from 'react'
import { Col, Form, Input, Radio, Row, Select, Switch } from 'antd'
import InputMask from 'react-input-mask'
import MsisdnInput from 'components/MsisdnMask/MsisdnInput'
import { arrayOf, string, func, shape, bool } from 'prop-types'
import styled from 'styled-components'

const formatChars = {
  9: '[0-9]',
  '-': '[- ]'
}

const shouldUpdate = (cur, next) => cur.OrderId !== next.OrderId

const removeSpaces = value => value.replace(/\s/g, '')

const handleCopy = event => {
  const selection = document.getSelection()
  event.clipboardData.setData('text', selection.toString().replace(/\D/g, ''))
  event.preventDefault()
}

const MnpJournalFilters = props => {
  const {
    fetchECommerceTypes,
    eCommerceTypesState: { eCommerceTypes },
    withValidation
  } = props

  useEffect(() => {
    fetchECommerceTypes()
  }, [])

  return (
    <>
      {withValidation && (
        <Row gutter={64}>
          <Col span={6}>
            <Form.Item label='Оператор-реципиент' name='OperatorRecipient'>
              <Select disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='Статус заявления' name='OrderStatus'>
              <Select disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='Тип клиента' name='ClientType'>
              <Select disabled />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label='Регион' name='RegionName'>
              <Select disabled />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Row gutter={64}>
        <Col span={6}>
          <Form.Item noStyle dependencies={['Msisdn']}>
            {({ resetFields }) => (
              <Form.Item label='Переносимый MSISDN' name='Msisdn'>
                <MsisdnInput noAutoFocus onClickRemove={() => resetFields(['Msisdn'])} />
              </Form.Item>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item noStyle shouldUpdate={shouldUpdate}>
            {({ resetFields }) => (
              <Form.Item label='Номер заявления' name='OrderId' normalize={removeSpaces}>
                <InputMask
                  mask='999 999 999 999'
                  disabled={false}
                  maskChar={null}
                  onCopy={handleCopy}
                  onClickRemove={() => resetFields('OrderId')}
                  formatChars={formatChars}
                >
                  {inputProps => {
                    return <Input {...inputProps} allowClear />
                  }}
                </InputMask>
              </Form.Item>
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label name='EcommerceTypeCode'>
            <Radio.Group>
              {eCommerceTypes?.map(type => (
                <Radio.Button key={type} label={type} value={type}>
                  {type}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>
        {withValidation && (
          <Col span={6}>
            <Form.Item label name='Validation'>
              <SwitchWrapper>
                <SwitchLabel>Валидация</SwitchLabel>
                <Switch />
              </SwitchWrapper>
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  )
}

export default MnpJournalFilters

const SwitchWrapper = styled.div`
  display: flex;
`

const SwitchLabel = styled.p`
  margin: 0 10px 0 0;
`

MnpJournalFilters.propTypes = {
  fetchECommerceTypes: func,
  eCommerceTypesState: shape({ eCommerceTypes: arrayOf(string) }),
  withValidation: bool
}
