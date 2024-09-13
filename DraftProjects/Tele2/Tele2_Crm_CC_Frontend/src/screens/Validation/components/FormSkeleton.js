import { Skeleton } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { getRandomIntInRange } from 'utils/helpers'

const MIN = 1
const MAX = 4

const FIELDS_AMOUNT = 14

const leftRows = { rows: MIN, width: '100%' }

const skeletonProps = { active: true, title: false, size: 'large' }

const FormSkeleton = () => {
  const renderSkeleton = (__, index) => {
    const rightRows = { rows: getRandomIntInRange(MIN, MAX), width: '100%' }

    return (
      <SkeletonWrapper key={index}>
        <StyledSkeleton loading paragraph={leftRows} {...skeletonProps} />
        <StyledSkeleton loading paragraph={rightRows} {...skeletonProps} />
      </SkeletonWrapper>
    )
  }

  const skeletons = Array.from(Array(FIELDS_AMOUNT), renderSkeleton)

  return <>{skeletons}</>
}

export default FormSkeleton

const StyledSkeleton = styled(Skeleton)`
  .ant-skeleton-content .ant-skeleton-paragraph > li {
    height: 20px;
  }
`

const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  gap: 20px;

  border-bottom: 2px solid #f0f0f0;
  padding: 10px 15px 10px;

  .ant-skeleton-paragraph {
    margin-bottom: 0;
  }
`
