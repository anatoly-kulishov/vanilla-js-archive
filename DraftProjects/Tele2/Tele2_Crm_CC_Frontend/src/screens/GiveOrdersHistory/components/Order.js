import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const dayFormat = 'D MMMM'

export default function Order ({ order }) {
  const {
    eshopOrderId,
    createdOn,
    statusNameDisplay,
    clientName,
    clientPhone,
    isMnp
  } = order

  return (
    <Container>
      <div><Bold>{eshopOrderId}</Bold> от {moment(createdOn).format(dayFormat)}</div>
      <Recipient>{clientPhone}, {clientName}</Recipient>
      <LabelsRow>
        <Label>{statusNameDisplay}</Label>
        {isMnp && <Label>Перевод в Tele2</Label>}
      </LabelsRow>
    </Container>
  )
}

const Container = styled.div`
  border-radius: 14px;
  padding: 12px;
  box-shadow: 0px 4px 14px 1px #00000014;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

const LabelsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`

const Label = styled.div`
  border-radius: 14px;
  background: #D9D9D9;
  padding: 2px 9px 3px 9px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
`

const Bold = styled.span`
  font-weight: bold;
`

const Recipient = styled.div`
  margin-top: 10px;
`
