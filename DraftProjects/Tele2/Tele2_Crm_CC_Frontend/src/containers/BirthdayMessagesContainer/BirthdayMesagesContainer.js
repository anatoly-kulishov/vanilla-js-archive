/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BirthdayMessage from './BirthdayMessage'

const mapStateToProps = state => ({
  personalAccount: state.personalInfo.personalAccountState.personalAccount
})

export const BirthdayMessagesContainer = (props) => {
  const { personalAccount, messages } = props

  return <div>
    {messages.map(message => (
      <BirthdayMessage text={message.Value} accountId={personalAccount?.PersonalAccountId} />
    ))}
  </div>
}

export default connect(mapStateToProps)(BirthdayMessagesContainer)

BirthdayMessagesContainer.propTypes = {
  personalAccount: PropTypes.object,
  messages: PropTypes.array
}
