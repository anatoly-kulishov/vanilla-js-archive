import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Button, Form } from 'antd'
import RangePicker from './RangePicker'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'

const { Item } = Form

const SubscriptionsFilter = props => {
  const { hidden, onSubmit, onKeyDown, onPaste, onClickRemove, form } = props

  return (
    <Form form={form}>
      <FilterWrapper hidden={hidden}>
        <Row gutter={16}>
          <Col span={5}>
            <Item name='msisdn'>
              <MsisdnMaskInput
                isActive
                placeholder='MSISDN'
                onKeyPress={onKeyDown}
                onPaste={onPaste}
                onClickRemove={onClickRemove}
              />
            </Item>
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          <Col span={16}>
            <Item name='dateRange' initialValue={{ from: '', to: '' }}>
              <RangePicker />
            </Item>
          </Col>
          <Col span={8}>
            <Controls>
              <ControlBtn type='primary' onClick={onSubmit}>
                Найти
              </ControlBtn>
            </Controls>
          </Col>
        </Row>
      </FilterWrapper>
    </Form>
  )
}

export default SubscriptionsFilter

SubscriptionsFilter.propTypes = {
  hidden: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onPaste: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired
}

const FilterWrapper = styled.div`
  padding: 0 16px 20px;
  border-bottom: 1px solid #e4e4e9;
`
const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ControlBtn = styled(Button)`
  margin-left: 20px;
`
const MsisdnMaskInput = styled(MsisdnMaskedInput)`
  height: 32px;
  flex: true;
  width: 100%;
  font-size: 14px;
  text-align: left;

  & input {
    border-radius: 4px;
    border-width: 1px;
    border-color: ${props => (props.isActive ? 'rgb(217, 217, 217)' : '#F5222D')};
    border-style: solid;

    &:hover {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${props => (props.isActive ? 'rgb(110, 219, 255)' : '#F5222D')};
      border-style: solid;
      outline-color: transparent;
    }

    &:focus {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${props => (props.isActive ? 'rgb(110, 219, 255)' : '#F5222D')};
      outline-color: transparent;
      box-shadow: ${props => (props.isActive ? 'none' : '0 0 0 2px rgba(245, 34, 45, 0.2)')};
      border-style: solid;
    }
  }
`
