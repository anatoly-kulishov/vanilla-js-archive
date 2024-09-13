import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'
import { Input, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import PropTypes from 'prop-types'

const FormItem = Form.Item
const TextArea = Input.TextArea

const RightBlockContent = props => {
  const { ticketsState, getFieldDecorator } = props
  const addParamsArray = get(ticketsState, 'addParamsList.bpmTicketAddParam', [])

  return (
    <StyledSpin indicator={<AntIcon spin />} spinning={ticketsState.isAddParamsListLoading}>
      <Wrapper>
        {addParamsArray.map((record, index) => (
          <>
            <FormItem key={record.parameterId} hidden>
              <Title>{record.parameterName}</Title>
              {getFieldDecorator(`addParams.[${index}].key`, { initialValue: record.parameterId })(<Input hidden />)}
            </FormItem>
            <FormItem key={record.parameterId}>
              <Title>{record.parameterName}</Title>
              {getFieldDecorator(`addParams.[${index}].value`, {
                rules: [
                  {
                    required: true,
                    message: 'Введите ответ'
                  }
                ]
              })(<TextArea />)}
            </FormItem>
          </>
        ))}
      </Wrapper>
    </StyledSpin>
  )
}

export default RightBlockContent

RightBlockContent.propTypes = {
  ticketsState: PropTypes.object,
  getFieldDecorator: PropTypes.func
}

const Wrapper = styled.div`
  padding: 15px 10px 0;
  height: calc(93vh - 165px);
  overflow-y: scroll;
`
const StyledSpin = styled(Spin)`
  margin-top: 100px;
`
const AntIcon = styled(LoadingOutlined)`
  font-size: 24px;
`
const Title = styled.div`
  font-weight: bold;
  line-height: 21px;
`
