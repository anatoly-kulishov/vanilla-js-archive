import React, { useMemo } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, Popover, Row, Skeleton } from 'antd'
import { object } from 'prop-types'
import styled from 'styled-components'

import HtmlRender from 'components/HtmlRender'
import SkeletonLoader from 'components/SkeletonLoader'

import { getRandomIntInRange } from 'utils/helpers'

const { Button: SkeletonButton } = Skeleton

const propTypes = { marker: object, record: object }

const UpsaleMarker = props => {
  const { marker, record } = props
  const { Name, Description } = marker
  const { Check } = record

  const width = useMemo(() => getRandomIntInRange(100, 200), [])

  let innerContent

  if (!Check) {
    innerContent = <SkeletonLoader width={width} component={<SkeletonButton active shape='round' size='small' />} />
  } else {
    const popoverContent = Description && (
      <PopoverContentWrapper>
        <HtmlRender value={Description} />
      </PopoverContentWrapper>
    )

    innerContent = (
      <>
        <Col>{Name}</Col>
        <Col>
          {popoverContent && (
            <Popover content={popoverContent}>
              <InfoCircleOutlined />
            </Popover>
          )}
        </Col>
      </>
    )
  }

  if (!Name && Check) return null

  return (
    <Row align='middle' gutter={5} wrap={false}>
      {innerContent}
    </Row>
  )
}

UpsaleMarker.propTypes = propTypes

export default UpsaleMarker

const PopoverContentWrapper = styled.div`
  max-width: 500px;
  max-height: 400px;
  overflow-y: auto;
`
