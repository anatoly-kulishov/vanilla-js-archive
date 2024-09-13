import React from 'react'
import styled from 'styled-components'

export default function MessageSeparator () {
  return <Separator>Предыдущие операции</Separator>
}

const Separator = styled.div`
  border-top: solid #c4c4c4 1px;
  text-align: center;
  padding: 5px 0 30px 0;
`
