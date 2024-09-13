import React from 'react'
import { object } from 'prop-types'
import { Row, Skeleton } from 'antd'
import styled from 'styled-components'

import { setDotColor } from '../helpers'

import SkeletonLoader from 'components/SkeletonLoader'

const propTypes = { record: object }

const SubscriberStatusColumn = props => {
  const { record } = props
  const { SubscriberStatus, SubscriberStatusId, isLoading } = record

  if (isLoading) {
    return <SkeletonLoader width={100} component={<Skeleton.Button active size='small' />} />
  }

  return (
    <Row align='middle' gutter={5} wrap={false}>
      <DotWrapper>
        <Dot color={setDotColor(SubscriberStatusId)} />
      </DotWrapper>
      <div>{SubscriberStatus}</div>
    </Row>
  )
}

SubscriberStatusColumn.propTypes = propTypes

export default SubscriberStatusColumn

const DotWrapper = styled.div`
  height: 25px;
  width: 20px;
  cursor: pointer;
  margin-right: 5px;
`

const Dot = styled.span`
  margin: 8px 0 0 10px;
  height: 8px;
  width: 8px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
`
