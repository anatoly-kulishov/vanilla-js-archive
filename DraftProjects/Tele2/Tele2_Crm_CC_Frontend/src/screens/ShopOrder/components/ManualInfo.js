import React from 'react'
import styled from 'styled-components'
import shopOrderManual from '../assets/images/shopOrderManual.png'

const ManualInfo = () => (
  <ManualInfoWrapper>
    <ManualInfoImage src={shopOrderManual} alt='Информация по использованию ИМ' />
  </ManualInfoWrapper>
)

export default ManualInfo

const ManualInfoWrapper = styled.div`
  height: 100%;
  background: #fafafa;
`

const ManualInfoImage = styled.img`
  width: 100%;
  max-width: 1059px;
`
