import React from 'react'
import ReactInputMask from 'react-input-mask'

const PhoneMask = ({ children, ...props }) => {
  const beforeMsisdnChange = (newState, _, userInput) => {
    let { value } = newState
    const selection = newState.selection

    if (!userInput) {
      return { value, selection }
    }

    let newUserInput = userInput.replace(/\D/g, '')
    const newUserInputLen = newUserInput?.length
    if (newUserInputLen > 10) {
      newUserInput = newUserInput.slice(newUserInputLen - 10, newUserInputLen)
      value = `+7 ${newUserInput.slice(0, 3)} ${newUserInput.slice(3, 6)}-${newUserInput.slice(6, 8)}-${newUserInput.slice(8, 10)}`
    }

    return { value, selection }
  }

  return (
    <ReactInputMask
      mask='+7 999 999-99-99'
      type='tel'
      beforeMaskedValueChange={beforeMsisdnChange}
      {...props}
    >
      {children}
    </ReactInputMask>
  )
}

export default PhoneMask
