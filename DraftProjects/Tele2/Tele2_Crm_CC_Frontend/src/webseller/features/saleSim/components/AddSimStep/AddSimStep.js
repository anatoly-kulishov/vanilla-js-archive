import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Title } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { selectHasAllRequiredDataForSaleUntemplatedSim } from 'reducers/saleSim/selectors'
import AddSearchSimParameters from './AddSearchSimParameters'
import AddPersonalAccountNumber from './AddPersonalAccountNumber'

export default function AddSimStep () {
  const user = useSelector(state => state.internal.userState.user)
  const sellAvailability = useSelector(state => state.saleSim.sellAvailability)
  const hasAllRequiredDataForSaleUntemplatedSim = useSelector(selectHasAllRequiredDataForSaleUntemplatedSim)
  const addSimError = useSelector(state => state.saleSim.addSimError)
  const isAddSimProcessing = useSelector(state => state.saleSim.isAddSimProcessing)
  const showPersonalAccountStep = useSelector(state => state.saleSim.showPersonalAccountStep)
  const personalAccountLoading = useSelector(state => state.saleSim.isAddingPersonalAccountLoading)
  const personalAccountError = useSelector(state => state.saleSim.personalAccountError)

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        {showPersonalAccountStep
          ? 'Укажи номер головного лицевого счета'
          : 'Укажи параметры для поиска комплекта подключения'
        }
      </Title>
      <Main>
        { showPersonalAccountStep ? (
          <AddPersonalAccountNumber
            personalAccountLoading={personalAccountLoading}
            personalAccountError={personalAccountError}
          />
        ) : (
          <AddSearchSimParameters
            user={user}
            sellAvailability={sellAvailability}
            hasAllRequiredDataForSaleUntemplatedSim={hasAllRequiredDataForSaleUntemplatedSim}
            addSimError={addSimError}
            isAddSimProcessing={isAddSimProcessing}
          />
        )}
      </Main>
    </Container>
  )
}

const Container = styled.div`
  width: 60%;
  max-width: 600px;
`

const Main = styled.div`
  margin-top: 24px;
`
