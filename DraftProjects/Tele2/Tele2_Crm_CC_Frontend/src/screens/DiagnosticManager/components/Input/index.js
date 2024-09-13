
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from './Input'

import { connect } from 'react-redux'

import {
  fetchTechnologySubtechnologyLink
} from 'reducers/diagnostics/diagnosticsReducer'

function DiagnosticInput (props) {
  DiagnosticInput.propTypes = {
    item: PropTypes.object
  }
  const {
    item: { Caption: caption }
  } = props

  return (
    <Wrapper>
      {caption}
      <Input {...props} />
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  technologiesGroups: state.diagnostics.diagnosticsState.technologiesGroups
})

const mapDispatchToProps = {
  fetchTechnologySubtechnologyLink
}

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticInput)

const Wrapper = styled.div`
  width: 100%;
  padding: 5px 0px;
`
