/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import Icon from '@ant-design/icons'
import IconAsset from './more-icon.svg'

export default function MoreIcon () {
  return <Icon component={IconAsset} style={{ fontSize: 24 }} />
}
