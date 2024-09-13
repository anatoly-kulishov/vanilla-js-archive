import { element, number } from 'prop-types'
import React, { cloneElement } from 'react'
import styled from 'styled-components'

const propTypes = { component: element, width: number }

const SkeletonLoader = props => {
  const { component, width } = props

  return <StyledSkeleton width={width} component={component} />
}

SkeletonLoader.propTypes = propTypes

export default SkeletonLoader

const StyledSkeleton = styled(({ component, ...props }) => cloneElement(component, props))`
  width: ${props => props.width}px !important;
`
