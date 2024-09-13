import React from 'react'
import styled from 'styled-components'

import { Title } from 'webseller/components'
import LoadingSpinner from 'components/LoadingSpinner'

export default function Loader ({ title }) {
  return (
    <Container>
      <Title bold fontSize={16}>
        {title}
      </Title>
      <LoadingSpinner />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 100%;
`
