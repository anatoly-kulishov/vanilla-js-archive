import React from 'react'
import { message } from 'antd'

import msisdnFormatter from 'utils/helpers/msisdnFormatter'

export default function MsisdnComponent ({ children }) {
  return <div onClick={() => {
    window.navigator.clipboard.writeText(children)
    message.success('Номер скопирован')
  }}>
    {msisdnFormatter(children)}
  </div>
}
