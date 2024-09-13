import React from 'react'
import PropTypes from 'prop-types'
import DialogPreview from './components/DialogPreview'
import conversationPropType from 'constants/conversationPropType'

function InactiveDialogs (props) {
  InactiveDialogs.propTypes = {
    opened: PropTypes.arrayOf(conversationPropType),
    closed: PropTypes.arrayOf(conversationPropType),
    login: PropTypes.string,
    isLoading: PropTypes.bool
  }

  const { opened, closed, login, isLoading } = props

  return (
    <div>
      <DialogPreview isLoading={isLoading} login={login} dialog={opened} />
      {closed?.length !== 0 && (
        <DialogPreview isLoading={isLoading} login={login} dialog={closed} closed />
      )}
    </div>
  )
}

export default InactiveDialogs
