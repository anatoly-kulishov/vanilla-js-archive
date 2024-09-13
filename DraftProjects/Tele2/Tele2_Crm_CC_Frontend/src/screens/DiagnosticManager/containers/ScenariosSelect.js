/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { Modal, Button } from 'antd'
import { startDiagnostic, hideScenarioList } from 'reducers/diagnosticManager/diagnosticManagerReducer'

const { confirm } = Modal

function ScenariosSelect (props) {
  ScenariosSelect.propTypes = {
    diagnosticScenarios: PropTypes.arrayOf(PropTypes.objectOf(
      PropTypes.shape({
        Description: PropTypes.string,
        ScenarioName: PropTypes.ScenarioName
      })
    )).isRequired,
    ScenarioData: PropTypes.objectOf(
      PropTypes.shape({
        ScenarioId: PropTypes.number
      })
    ).isRequired,
    startDiagnostic: PropTypes.func.isRequired,
    hideScenarioList: PropTypes.func.isRequired
  }

  const {
    diagnosticScenarios,
    startDiagnostic,
    hideScenarioList,
    // isDiagnosticLoading,
    ScenarioData: { ScenarioId: selectedScenarioId }
  } = props

  function handleCardClick (scenarioId, isCurrent) {
    if (!isCurrent && selectedScenarioId !== null) {
      confirm({
        title: 'Начать новую диагностику?',
        content: 'Данные текущей диагностики будут потеряны',
        okType: 'danger',
        onOk () {
          startDiagnostic({ selectedScenarioId: scenarioId })
        }
      })
    }
    if (isCurrent) {
      hideScenarioList()
    }
    if (selectedScenarioId === null) {
      startDiagnostic({ selectedScenarioId: scenarioId })
    }
  }

  function handleResetClick (scenarioId) {
    confirm({
      title: 'Начать новую диагностику?',
      content: 'Данные текущей диагностики будут потеряны',
      okType: 'danger',
      onOk () {
        startDiagnostic({ selectedScenarioId: scenarioId })
      }
    })
  }

  return (
    <ScenariosWrapper>
      {Array.isArray(diagnosticScenarios) &&
        diagnosticScenarios.map((item, index) => {
          const { ScenarioId, ScenarioName, Description: ScenarioDescription } = item
          const isCurrent = ScenarioId === selectedScenarioId

          return (
            <Scenario key={index}>
              <div onClick={() => handleCardClick(ScenarioId, isCurrent)}>
                <TitleWrapper>
                  <Title>{ScenarioName}</Title>
                  {isCurrent && <CurrentIdicator>ТЕКУЩИЙ</CurrentIdicator>}
                </TitleWrapper>
                <Description>{ScenarioDescription}</Description>
              </div>
              {isCurrent && <Reset type='link' onClick={() => handleResetClick(ScenarioId)}>НАЧАТЬ ЗАНОВО</Reset>}
            </Scenario>
          )
        })}
    </ScenariosWrapper>
  )
}

const mapStateToProps = state => ({
  ...state.diagnosticManager.diagnosticScenario,
  ...state.diagnosticManager.diagnosticManager
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startDiagnostic,
      hideScenarioList
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ScenariosSelect)

const ScenariosWrapper = styled.div`
  display: block;
  background-color: white;
`
const Scenario = styled.div`
  padding: 10px 21px 6px;
  text-align: left;
  border-bottom: solid #e0e0e0 1px;
  :hover {
    cursor: pointer;
    background: #f5f5f5;
  }
`
const TitleWrapper = styled.div`
  display: flex;
`
const Title = styled.div`
  font-family: T2_Rooftop_Regular;
  color: black;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const CurrentIdicator = styled.div`
  height: 12px;
  padding: 0 6px;
  margin: 4px 8px 0px;
  font-size: 8px;
  background: #40bfee;
  border-radius: 10px;
  color: white;
`
const Description = styled.div`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Reset = styled(Button)`
  padding: 0px
`
