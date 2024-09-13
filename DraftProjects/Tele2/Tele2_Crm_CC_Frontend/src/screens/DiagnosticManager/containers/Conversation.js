import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { isNil } from 'lodash'
import { toggleRap } from 'reducers/internal/rightModalReducer'
import { stepDiagnostic } from 'reducers/diagnosticManager/diagnosticManagerReducer'
import { changeModalVisibility } from 'reducers/tickets/createTicketReducer'
import { getReasonCategoryForEscalation } from 'reducers/reasonsCategories/reasonCategoryForEscalationReducer'

import MessagesArea from './MessagesArea'
import Control from '../components/Control'

import { DONE, SERVICES, REASONCATEGORY, TICKET, RESTRICTIONS } from '../constants/ManagerActionTypes'

const steps = []

function Conversation (props) {
  Conversation.propTypes = {
    ScenarioData: PropTypes.object,
    StepData: PropTypes.object,
    stepDiagnostic: PropTypes.func,
    toggleRap: PropTypes.func, // FUC DA POLICE COMIN' STRAIGHT FROM THE UNDREGROUND
    changeModalVisibility: PropTypes.func,
    getReasonCategoryForEscalation: PropTypes.func,
    history: PropTypes.object,
    IsDiagnosticLoading: PropTypes.bool
  }

  const {
    ScenarioData: { ScenarioName },
    StepData,
    stepDiagnostic,
    toggleRap,
    changeModalVisibility,
    getReasonCategoryForEscalation,
    history,
    IsDiagnosticLoading
  } = props

  function handleAction (controls, action) {
    let StepResult = {
      Slot: action.Slot
    }
    switch (action.Params) {
      case DONE:
        for (const control in controls) {
          StepResult = {
            ...StepResult,
            ...{ [control]: controls[control].value }
          }
        }
        stepDiagnostic({ StepResult })
        break
      case SERVICES:
        history.push(`/services/connected${location.search}`)
        break
      case RESTRICTIONS:
        history.push(`/client-restrictions${location.search}`)
        break
      case REASONCATEGORY:
        toggleRap({ section: 'reasons' })
        break
      case TICKET:
        changeModalVisibility()
        getReasonCategoryForEscalation()
        break
      default:
        stepDiagnostic({ StepResult })
        break
    }
  }

  function getConfiguration () {
    if (StepData) {
      const { Configuration } = StepData
      return !isNil(Configuration) && Object.entries(Configuration).length !== 0
        ? { actions: Configuration.Actions, controls: Configuration.Controls }
        : { actions: [], controls: [] }
    }
    return { actions: [], controls: [] }
  }

  return (
    <Fragment>
      <Title>{ScenarioName}</Title>
      <Wrapper>
        <Control
          configuration={getConfiguration()}
          handleAction={handleAction}
          IsDiagnosticLoading={IsDiagnosticLoading}
        />
        <MessagesArea steps={steps} />
      </Wrapper>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  ...state.diagnosticManager.diagnosticManager
})

const mapDispatchToProps = {
  stepDiagnostic,
  toggleRap,
  changeModalVisibility,
  getReasonCategoryForEscalation
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Conversation))

const Wrapper = styled.div`
  min-height: 60vh;
  max-height: 70vh;
  display: flex;
  flex-direction: column-reverse;
  align-content: flex-end;
  max-width: 800px;
  margin: 0 auto;
`
const Title = styled.div`
  padding-left: 21px;
  padding-bottom: 10px;
  color: black;
  font-weight: bold;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
