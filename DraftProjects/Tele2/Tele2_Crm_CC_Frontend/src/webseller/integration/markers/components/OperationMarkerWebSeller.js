import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { initDuplicateRfa } from 'webseller/features/duplicateRfa/reducer'
import { initCorrectionDataProcess } from 'webseller/features/correctionData/reducer'
import { initReplaceSimProcess } from 'webseller/features/replaceSim/reducer'

import { isDuplicateRfaMarker, isCorrectionDataMarker, isReplaceSimMarker } from '../helpers'

const OperationMarkerWebSeller = ({ children, markerId }) => {
  const dispatch = useDispatch()

  const createClickHandler = markerId => () => {
    if (isDuplicateRfaMarker(markerId)) {
      dispatch(initDuplicateRfa({ isFromMarkers: true }))
      return
    }
    if (isCorrectionDataMarker(markerId)) {
      dispatch(initCorrectionDataProcess({ isFromMarkers: true }))
      return
    }
    if (isReplaceSimMarker(markerId)) {
      dispatch(initReplaceSimProcess({ isFromMarkers: true }))
    }
  }

  return (
    <Wrapper onClick={createClickHandler(markerId)}>
      {children}
    </Wrapper>
  )
}

export default OperationMarkerWebSeller

const Wrapper = styled.span`
  cursor: pointer;
`
