import React from 'react'
import { Space } from 'antd'
import { element, func, number } from 'prop-types'

import SkeletonLoader from './SkeletonLoader'

const propTypes = { component: element, length: number, getWidth: func }

const SkeletonLoaderList = props => {
  const { component, length, getWidth } = props

  return (
    <Space direction='vertical'>
      {Array.from(Array(length), (__, index) => (
        <SkeletonLoader width={getWidth()} component={component} key={index} />
      ))}
    </Space>
  )
}

SkeletonLoaderList.propTypes = propTypes

export default SkeletonLoaderList
