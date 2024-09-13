import React, { Component } from 'react'
import styled from 'styled-components'
import { Col } from 'antd'
import PropTypes from 'prop-types'

export default class ContactInformationClient extends Component {
  static propTypes = {
    dataClientSubscriber: PropTypes.object
  }

  render () {
    const { dataClientSubscriber } = this.props
    const { dataClient: { ContractInfo } } = dataClientSubscriber
    return (
      <Wrapper>
        <Col span={12}>
          <KeyValueField>
            <Field>Тип оплаты</Field>
            <Valuefield>{ContractInfo.PayClientTypeId}</Valuefield>
          </KeyValueField>
        </Col>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding-left: 20px;
  font-size: 14px;
`

const KeyValueField = styled.div`
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const Field = styled.div`
  width: 45%;
  color: #000;
`

const Valuefield = styled.div`
  margin-left: 10px;
  width: 52%;
`
