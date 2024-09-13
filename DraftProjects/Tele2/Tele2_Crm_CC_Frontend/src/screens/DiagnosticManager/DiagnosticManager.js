import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from 'components/Card'
import Conversation from './containers/Conversation'
import ScenariosSelect from './containers/ScenariosSelect'
import RatingMenu from 'containers/RatingMenu'
import { shouldRate } from 'containers/RatingMenu/shouldRate'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
const { diagnosticFeatureId } = ratingFeatureIds

export default function DiagnosticManager (props) {
  DiagnosticManager.propTypes = {
    changeDiagnosticScenario: PropTypes.func.isRequired,
    fetchDiagnosticScenarios: PropTypes.func.isRequired,
    IsScenariosListVisible: PropTypes.bool.isRequired
  }

  const { changeDiagnosticScenario, fetchDiagnosticScenarios, IsScenariosListVisible } = props

  useEffect(() => {
    fetchDiagnosticScenarios()
  }, [])

  const defaultAdditionals = [shouldRate(diagnosticFeatureId) && { content: <RatingMenu currentFeatureId={diagnosticFeatureId} /> }]

  const additional = IsScenariosListVisible
    ? defaultAdditionals
    : [
      ...defaultAdditionals,
      { content: IsScenariosListVisible ? 'Скрыть' : 'К выбору сценариев', onClick: () => changeDiagnosticScenario() }
    ]

  return (
    <Card
      header='Диагностика'
      isContentLoading={false}
      isNotColored
      content={IsScenariosListVisible ? <ScenariosSelect /> : <Conversation />}
      additional={additional}
    />
  )
}
