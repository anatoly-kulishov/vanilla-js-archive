import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Checkbox } from 'antd'

import { Title } from 'webseller/components'
import { changeAgreement as changeAgreementAction } from '../reducer'
import { agreementsMap } from '../helpers'
import { selectAgreements } from '../selectors'

export default function Agreements ({ availableAgreementKeys = [] }) {
  const agreements = useSelector(selectAgreements)

  const dispatch = useDispatch()

  const changeAgreement = payload => dispatch(changeAgreementAction(payload))

  const availableAgreements = Object.entries(agreementsMap).filter(([agreementKey]) => {
    return availableAgreementKeys.includes(agreementKey)
  })

  const onClickAgreement = e => {
    const { key } = e.target.dataset
    changeAgreement(key)
  }

  return (
    <Container>
      <Title bold fontSize={16}>
        Вы подтверждаете следующее:
      </Title>
      <List onClick={onClickAgreement}>
        {availableAgreements.map(([key, value]) => {
          return (
            <Agreement key={key}>
              <Checkbox checked={agreements[key]} data-key={key} />
              <Title data-key={key}>{value}</Title>
            </Agreement>
          )
        })}
      </List>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const List = styled.ul`
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
`

const Agreement = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin: 0 0 16px;
  padding: 0;
  cursor: pointer;
`
