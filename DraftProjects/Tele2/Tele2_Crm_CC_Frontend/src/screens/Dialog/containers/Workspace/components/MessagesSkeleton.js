import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Skeleton } from 'antd'

const rows = { rows: 3 }

export default function MessagesSkeleton () {
  return (
    <Fragment>
      <Wrapper>
        <Skeleton paragraph={rows} />
      </Wrapper>
      <Wrapper>
        <Skeleton paragraph={rows} />
      </Wrapper>
    </Fragment>
  )
}

const Wrapper = styled.div`
  background: white;
  box-shadow: 0 0px 10px rgba(32,33,36,0.05);
  border-radius: 10px;
  padding: 0 16px;
  margin: 16px;
  :last-child {
    border-bottom: none;
  }
`
