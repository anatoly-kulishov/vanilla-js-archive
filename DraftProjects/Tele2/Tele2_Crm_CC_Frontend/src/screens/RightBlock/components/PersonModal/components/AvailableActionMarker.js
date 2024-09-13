import React, { useCallback, useMemo } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Col, Popover, Row, Skeleton } from 'antd'
import { func, object } from 'prop-types'
import styled from 'styled-components'

import PersonMarker from 'components/PersonMarker'
import { getRandomIntInRange } from 'utils/helpers'
import SkeletonLoader from 'components/SkeletonLoader'

const { Button: SkeletonButton } = Skeleton

const propTypes = { marker: object, record: object, onClickMarker: func }

const AvailableActionMarker = props => {
  const { marker, record, onClickMarker } = props
  const { Name, CommentLink, LinkComment, Comment, ScenarioCode, Check, Value } = marker ?? {}

  const width = useMemo(() => getRandomIntInRange(70, 140), [])

  const handleClick = useCallback(
    () => onClickMarker({ record, marker, markerType: ScenarioCode }),
    [record, marker, ScenarioCode]
  )

  let innerContent

  if (!Check) {
    innerContent = <SkeletonLoader width={width} component={<SkeletonButton active shape='round' size='small' />} />
  } else {
    const popoverContent = Comment && (
      <PopoverContentWrapper>
        {Comment}
        <br />
        {CommentLink && LinkComment && (
          <a href={LinkComment} target='_blank' rel='noreferrer noopener'>
            {CommentLink}
          </a>
        )}
      </PopoverContentWrapper>
    )

    innerContent = (
      <>
        <Col>{<PersonMarker name={Name} type={ScenarioCode} isBig onClick={handleClick} />}</Col>
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

  if (!Value && Check) return null

  return (
    <Row align='middle' gutter={5} wrap={false}>
      {innerContent}
    </Row>
  )
}

AvailableActionMarker.propTypes = propTypes

export default AvailableActionMarker

const PopoverContentWrapper = styled.div`
  max-width: 500px;
  max-height: 400px;
  overflow-y: auto;
`
