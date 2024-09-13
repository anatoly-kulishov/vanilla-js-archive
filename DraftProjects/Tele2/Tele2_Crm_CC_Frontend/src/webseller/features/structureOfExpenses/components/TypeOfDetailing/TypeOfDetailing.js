import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Radio } from 'webseller/components'

import styled from 'styled-components'

import { changeStepStructureOfExpenses } from '../../reducer'

import { StructureOfExpensesStep } from '../../helpers'
import { TypesOfDetailing } from './helpers'

const TypeOfDetailing = () => {
  const dispatch = useDispatch()
  const [detailType, setDetailType] = useState(TypesOfDetailing.EXPENSES)

  const handleDetailTypeChange = event => {
    setDetailType(event.target.value)
  }

  const isNextButtonDisabled = !detailType

  const onClickGoForward = () => {
    dispatch(changeStepStructureOfExpenses(StructureOfExpensesStep.PERIOD_SELECTION))
  }
  return (
    <Container>
      <Radio.Group onChange={handleDetailTypeChange} value={detailType}>
        <Radio value={TypesOfDetailing.EXPENSES}>Сформировать структуру расходов</Radio>
        {/*  другие типы наполнения детализации */}
      </Radio.Group>
      <Footer>
        <Button type='primary' onClick={onClickGoForward} disabled={isNextButtonDisabled}>
          Далее
        </Button>
      </Footer>
    </Container>
  )
}

export default TypeOfDetailing

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  width: 60%;
  height: 80%;
  max-width: 600px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: -20px;
`
