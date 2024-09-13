import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  resetCorrectionDataProcess,
  editPersonalData,
  addSignedDocumentsToRequest
} from 'webseller/features/correctionData/reducer'
import { Button, OperationResult, PersonalDataInfo } from 'webseller/components'
import { resetSigning } from 'webseller/common/signing/reducer'
import { OperationStatus } from 'webseller/helpers'
import { selectSigningType } from 'webseller/common/signing/selectors'
import { SigningType } from 'webseller/common/signing/helpers'
import {
  selectErrorCorrectionData,
  selectIsLoadingOperationCorrectionData,
  selectOperationStatusCorrectionData,
  selectPersonalDataCorrectionData,
  selectTicketNumberCorrectionData
} from '../../selectors'
import { clearFoundAddresses } from 'reducers/saleSim/saleSimReducer'
import selectorsWebSellerRemote from 'webseller/remote/selectors'
import featureConfig from 'webseller/featureConfig'
import { actionSigningRemote, selectorsSigningRemote } from 'websellerRemote/Signing'

export default function ResultStep () {
  const signingType = useSelector(
    featureConfig.isUseRemoteSigning
      ? selectorsSigningRemote.selectSigningType
      : selectSigningType
  )
  const personalData = useSelector(selectPersonalDataCorrectionData)
  const status = useSelector(selectOperationStatusCorrectionData)
  const isLoading = useSelector(selectIsLoadingOperationCorrectionData)
  const errorMessage = useSelector(selectErrorCorrectionData)
  const ticketNumber = useSelector(selectTicketNumberCorrectionData)
  const docIdentityTypes = useSelector(
    featureConfig.isUseRemoteDocumentIdentity
      ? selectorsWebSellerRemote.documentIdentity.selectDocumentTypes
      : state => state.documentIdentity.documentIdentityTypes
  )

  const dispatch = useDispatch()

  const executeCorrectionData = () => {
    dispatch(editPersonalData())
  }

  const onClickUploadAgain = () => {
    dispatch(addSignedDocumentsToRequest())
  }

  const onOk = () => {
    dispatch(clearFoundAddresses())
    dispatch(resetCorrectionDataProcess())
    dispatch(featureConfig.isUseRemoteSigning ? actionSigningRemote.resetState() : resetSigning())
    window.location.reload()
  }

  const renderTitle = () => {
    switch (status) {
      case OperationStatus.SUCCESSFUL:
      case OperationStatus.PARTIALLY_SUCCESSFUL: {
        return signingType === SigningType.PAPER_DOCUMENTS
          ? `Заявка на актуализацию персональный данных абонента ${ticketNumber} успешно создана`
          : 'Персональные данные абонента успешно скорректированы'
      }

      case OperationStatus.FAILURE: {
        return 'Ошибка при корректировке данных абонента'
      }

      default: {
        return null
      }
    }
  }

  const renderMessage = () => {
    switch (status) {
      case OperationStatus.PARTIALLY_SUCCESSFUL: {
        return 'При загрузке файле произошла ошибка. Попробуйте загрузить файл еще раз'
      }

      case OperationStatus.FAILURE: {
        return errorMessage
      }

      default: {
        return null
      }
    }
  }

  const renderAdditional = () => {
    switch (status) {
      case OperationStatus.SUCCESSFUL: {
        return <PersonalDataInfo personalData={personalData} docIdentityTypes={docIdentityTypes} />
      }

      case OperationStatus.PARTIALLY_SUCCESSFUL: {
        return (
          <Fragment>
            <PersonalDataInfo personalData={personalData} docIdentityTypes={docIdentityTypes} />
            <Button type='primary' onClick={onClickUploadAgain}>
              Загрузить еще раз
            </Button>
          </Fragment>
        )
      }

      default: {
        return null
      }
    }
  }

  return (
    <OperationResult
      status={status}
      isLoading={isLoading}
      loadingText='Выполняется корректировка данных абонента'
      title={renderTitle()}
      message={renderMessage()}
      additional={renderAdditional()}
      executeOperation={executeCorrectionData}
      onOk={onOk}
    />
  )
}
