import React, { Component } from 'react'
import styled from 'styled-components'
import { Col, Row, Collapse } from 'antd'
import PropTypes from 'prop-types'

const Panel = Collapse.Panel

export default class MainDataClient extends Component {
  static propTypes = {
    dataClientSubscriber: PropTypes.object
  }

  defaultActiveKey = ['0']

  render () {
    const { dataClientSubscriber } = this.props
    const { dataClient: { MainData } } = dataClientSubscriber

    return (
      <Wrapper>
        <Row gutter={8}>
          <Col span={12}>
            <KeyValueField>
              <Field>ИНН</Field>
              <Valuefield>{MainData.IndividualTaxId}</Valuefield>
            </KeyValueField>
            <KeyValueField>
              <Field>ОГРН</Field>
              <Valuefield>{MainData.JurPrimaryStateRegistrationNumber}</Valuefield>
            </KeyValueField>
            <KeyValueField>
              <Field>Данные доверенного лица</Field>
              <Valuefield>{MainData.AgentAuthorityDocument}</Valuefield>
            </KeyValueField>
          </Col>
          <Col span={12}>
            <Collapse bordered={false} defaultActiveKey={this.defaultActiveKey}>
              <StyledPanel header='Закон Матвиенко'>
                <KeyValueField>
                  <Field>Проверка</Field>
                  <Valuefield>{MainData.CheckSmev}</Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Причина недействительности</Field>
                  <Valuefield>{MainData.Reason}</Valuefield>
                </KeyValueField>
                <KeyValueField>
                  <Field>Дата проверки</Field>
                  <Valuefield>{MainData.ReviewSmev}</Valuefield>
                </KeyValueField>
              </StyledPanel>
            </Collapse>
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

const StyledPanel = styled(Panel)`
  border: 0 !important;
  /* margin-bottom: 10px; */

  & .ant-collapse-header {
    padding-top: 0 !important; /* Todo: should only be for the first column */
    padding-left: 20px !important;

    & span {
      top: 11px !important; /* Todo: should only be for the first column */
      left: 0 !important;
    }
  }

  & .ant-collapse-content-box {
    padding-left: 20px !important;
  }
`

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
