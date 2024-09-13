import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import CorrectionDataModal from 'webseller/features/correctionData/components/CorrectionDataModal'
import DuplicateRfa from 'webseller/features/duplicateRfa/components/DuplicateRfa'
import ReplaceSimModal from 'webseller/features/replaceSim/components/ReplaceSimModal'
import { selectIsShowCorrectionData } from 'webseller/features/correctionData/selectors'
import { selectIsShowDuplicateRfa } from 'webseller/features/duplicateRfa/selectors'
import { selectIsShowReplaceSim } from 'webseller/features/replaceSim/selectors'

// TODO temporary для операций из маркеров, убрать после переноса операций в микрофронт
const WebSellerModals = () => {
  const isShowCorrectionData = useSelector(selectIsShowCorrectionData)
  const isShowDuplicateRfa = useSelector(selectIsShowDuplicateRfa)
  const isShowReplaceSim = useSelector(selectIsShowReplaceSim)

  return (
    <Fragment>
      {isShowCorrectionData && <CorrectionDataModal />}
      {isShowDuplicateRfa && <DuplicateRfa />}
      {isShowReplaceSim && <ReplaceSimModal />}
    </Fragment>
  )
}

export default WebSellerModals
