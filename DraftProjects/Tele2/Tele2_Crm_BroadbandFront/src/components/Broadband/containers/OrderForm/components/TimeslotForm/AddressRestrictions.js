import React from 'react'
import { Col, Collapse, Divider } from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import AddressRestrictionsDescription from './AddressRestrictionsDescription'

const { Panel } = Collapse

const AddressRestrictions = props => {
  const { data, disabled } = props

  return (
    <StyledCollapse size='small' disabled={disabled}>
      <Panel header='Ограничения по адресу'>
        <Wrapper>
          {data?.map((item, index, self) => {
            const isLastElement = self.length - 1 === index

            return (
              <>
                <Row>
                  <Col>
                    <Label>Тип</Label>
                    <Value>{item.MsgType}</Value>
                  </Col>

                  <Col>
                    <Label>Дата</Label>
                    <Value>{moment(item.DateEnd).format('DD.MM.YYYY HH:mm')}</Value>
                  </Col>
                </Row>
                <Col>
                  <Label>Ограничение</Label>
                  <AddressRestrictionsDescription text={item.MsgText} />
                </Col>
                {!isLastElement && <StyledDivider />}
              </>
            )
          })}
        </Wrapper>
      </Panel>
    </StyledCollapse>
  )
}

const StyledCollapse = styled(Collapse)`
  .ant-collapse-content > .ant-collapse-content-box {
    padding: 0px;
  }
`

const Label = styled.div`
  margin-bottom: 5px;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 30px;
  margin-bottom: 10px;
`

const Value = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 0 8px;
  line-height: 32px;
  min-height: 32px;
`

const StyledDivider = styled(Divider)`
  grid-column: 1/4;
  margin: 24px -16px;
  border-top: 5px solid rgba(0, 0, 0, 0.06);
  width: auto;
`

const Wrapper = styled.div`
  padding: 16px;
  max-height: 200px;
  overflow-y: auto;
`

export default AddressRestrictions
