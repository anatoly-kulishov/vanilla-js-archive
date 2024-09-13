import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { denormalizeNumber } from 'webseller/helpers'

const dayFormat = 'D MMMM'

export default function Order ({ order, selectOrderNumber }) {
  const {
    eshopOrderId,
    createdOn,
    statusNameDisplay,
    clientName,
    clientPhone,
    isMnp
  } = order

  return (
    <Container onClick={() => selectOrderNumber(eshopOrderId)}>
      <div>
        <Bold>{eshopOrderId}</Bold> от {moment(createdOn).format(dayFormat)}
      </div>
      <Column>
        <Recipient>
          {denormalizeNumber(clientPhone)}, {clientName}
        </Recipient>
        <LabelsRow>
          <Label>{statusNameDisplay}</Label>
          {isMnp && <Label>Перевод в Tele2</Label>}
        </LabelsRow>
      </Column>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 14px;
  padding: 14px;
  box-shadow: 0px 4px 14px 1px #00000014;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 6px;
`

const LabelsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`

const Label = styled.div`
  border-radius: 14px;
  background: #d9d9d9;
  padding: 2px 9px 3px 9px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
`

const Bold = styled.span`
  font-weight: bold;
`

const Recipient = styled.div`
  margin-top: 10px;
`

const Column = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
