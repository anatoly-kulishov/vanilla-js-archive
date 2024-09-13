import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function SmsReasonCategory ({ selectedReasonCategory }) {
  SmsReasonCategory.propTypes = {
    selectedReasonCategory: PropTypes.string
  }
  // ==START=
  // took out this into a standalone component due to SmsSendingPanel sections structure
  // + might be easier to add functionality later (I know they want it ;))
  return <ReasonCategory>{selectedReasonCategory}</ReasonCategory>
  // ==END=
}

const ReasonCategory = styled.p`
  color: #000;
  font-weight: 400;
`
