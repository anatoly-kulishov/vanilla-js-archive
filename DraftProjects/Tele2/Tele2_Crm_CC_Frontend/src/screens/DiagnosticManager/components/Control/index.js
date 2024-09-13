import React from 'react'
import Control from './Control'
import { ControlProvider } from '../../ControlContext'

export default (props) => (
  <ControlProvider>
    <Control {...props} />
  </ControlProvider>
)
