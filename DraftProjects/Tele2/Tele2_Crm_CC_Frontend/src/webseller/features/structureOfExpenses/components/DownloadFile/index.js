import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

import { selectUrl } from '../../selectors'

import { downloadFile } from 'webseller/helpers'
import { DownloadIcon } from '../../../../../components/assets'

const DownloadFile = () => {
  const url = useSelector(selectUrl)

  const downloadDocument = () => {
    downloadFile(url, `Структура расходов.pdf`, '_blank')
  }

  return (
    <Wrapper>
      <span>Структура расходов</span>
      <Download onClick={downloadDocument} />
    </Wrapper>
  )
}

export default DownloadFile

const iconsStyle = css`
  cursor: pointer;
  width: 28px;
  height: auto;
  padding: 5px;
  transition: transform 0.03s ease-out;
  :hover {
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.97);
  }
`

const Download = styled(DownloadIcon)`
  ${iconsStyle}
  fill: #afafaf;
`

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`
