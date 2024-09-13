import React from 'react'
import styled from 'styled-components'

const TreeHead = () => {
  return (
    <Wrapper>
      <HeadTitle>Название шаблона</HeadTitle>
    </Wrapper>
  )
}

export default TreeHead

const Wrapper = styled.div`
  position: absolute;
  width: calc(100% - 35px);
  z-index: 2;
  background-color: #ecfafe;
  padding: 12px 40px 12px 25px;
  display: flex;
  align-items: center;
`

const HeadTitle = styled.div`
  font-size: 14px;
  color: #999999;
  min-width: 50%;
  max-width: 335px;
`
