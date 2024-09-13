/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { Row, Col, Input } from 'antd'
import styled from 'styled-components'
import { fields as defaultfields } from './notesLeftBlockFields.json'
import { fields as additionalfields } from './notesLeftBlockAdditionalFields.json'
import { get } from 'lodash'
import PropTypes from 'prop-types'

const { TextArea } = Input

const LeftValuesBlock = (props) => {
  LeftValuesBlock.propTypes = {
    historyTicketsState: PropTypes.object
  }
  const { historyTicketsState } = props

  const dataSource = get(historyTicketsState, 'ticket.incidents', null)
  if (Array.isArray(dataSource)) {
    return (
      <MainTable>
        <ContainerHolder style={{ order: 3 }}>
          <ControlHolder>
            <ReasonTitle>
              <b>Причина и категория заявки</b>
            </ReasonTitle>
            <ReasonText>
              {dataSource && dataSource[0] && dataSource[0].techServiceServiceName}
            </ReasonText>
          </ControlHolder>
        </ContainerHolder>
        {
          additionalfields.map(field => {
            return (
              <ContainerHolder style={{ order: field.order }}>
                <ControlHolder>
                  <InfoTextLabel>
                    <b>{field.name}</b>
                  </InfoTextLabel>
                  <TextArea rows={1} value={dataSource && dataSource[0] && dataSource[0][field.dataSource]} autoSize />
                </ControlHolder>
              </ContainerHolder>
            )
          })
        }
        {
          defaultfields.map(field => {
            return (
              <ContainerHolder style={{ order: field.order }}>
                <ControlHolder>
                  <InfoTextLabel span={14}>
                    <b>{field.name}</b>
                  </InfoTextLabel>
                  <InfoTextLabel span={10}>
                    {dataSource && dataSource[0] && dataSource[0][field.dataSource]}
                  </InfoTextLabel>
                </ControlHolder>
              </ContainerHolder>
            )
          })
        }

      </MainTable>
    )
  } else {
    return dataSource && [dataSource]
  }
}

export default LeftValuesBlock

const InfoTextLabel = styled(Col)`
  font-size: 14px;
  padding: 5px 0px 5px 0px;
`
const ContainerHolder = styled.div`
  width: 100%;
`
const ControlHolder = styled(Row)`
  margin-left: 5px;
  margin-right: 5px;
`
const MainTable = styled.div`
  margin-bottom: 5px;
  display: flex;
  width: 50%;
  flex-wrap: wrap;
  & > div > div > .ant-form-item {
    margin-bottom: 0;
  }
`
const ReasonText = styled.div`
  font-size: 14px;
`
const ReasonTitle = styled.div`
  font-size: 14px;
  padding: 0px 0px 0px 0px;
`
