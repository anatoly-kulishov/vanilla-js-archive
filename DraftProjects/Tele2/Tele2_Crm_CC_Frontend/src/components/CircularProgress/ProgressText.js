import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export default function ProgressText ({ color, progress, dataSource }) {
  ProgressText.propTypes = {
    color: PropTypes.string,
    progress: PropTypes.number,
    dataSource: PropTypes.number
  }

  return (
    <Wrapper>
      <Title style={{ color: `${color}` }}>{progress}</Title>
      <Description style={{ color: `${color}` }}>
        {dataSource}
        <span>м</span>
      </Description>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  color: white;
  padding-top: 4px;
`

const Title = styled.h3`
  margin-bottom: 5px;
`

const Description = styled.span`
  font-size: 14px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`
