import React from 'react'
import styled from 'styled-components'

export default function DashboardItem ({ title, children, bordered, onClickTitle, gap }) {
  return (
    <Container bordered={bordered}>
      <Title isTitleClickable={Boolean(onClickTitle)} onClick={onClickTitle} gap={gap}>
        {title}
      </Title>
      <Content gap={gap}>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${({ bordered }) => (bordered ? '#e3e5eb' : 'transparent')};
`

const Title = styled.p`
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 18px;
  cursor: ${({ isTitleClickable }) => (isTitleClickable ? 'pointer' : 'auto')};
  margin-bottom: ${({ gap }) => (gap ? `${gap}px` : '1em')};
`

const Content = styled.div`
  margin-top: ${({ gap }) => (gap || '19')}px;
`
