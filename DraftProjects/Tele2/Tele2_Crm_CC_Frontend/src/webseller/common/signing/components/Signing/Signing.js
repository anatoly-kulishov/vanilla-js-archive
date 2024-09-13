import React, { Fragment, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, Button } from 'webseller/components'
import { SigningScenario, SigningType } from 'webseller/common/signing/helpers'
import PresencePepNumbers from 'webseller/common/signing/components/PresencePepNumbers'
import PresencePep from 'webseller/common/signing/components/PresencePep'
import PepCode from 'webseller/common/signing/components/PepCode'
import PaperDocuments from 'webseller/common/signing/components/PaperDocuments'
import {
  selectActivePepNumber,
  selectIsErrorGetDocumentCode,
  selectIsErrorGetPaperDocuments,
  selectIsLoadingCheckIsClientHasPep,
  selectIsLoadingCheckPepCode,
  selectIsLoadingGetDocumentCode,
  selectIsLoadingGetPaperDocuments,
  selectIsLoadingGetPepNumbers,
  selectIsLoadingGetSmsCode,
  selectIsSigningSkipped,
  selectIsSuccessfulSigning,
  selectPepNumbers,
  selectSignedDocuments,
  selectSigningPaperDocuments,
  selectSigningType
} from 'webseller/common/signing/selectors'
import {
  checkIsClientHasPep as checkIsClientHasPepAction,
  changeActivePepNumber as changeActivePepNumberAction,
  submitSigning as submitSigningAction,
  skipSigning as skipSigningAction,
  resetSigning as resetSigningAction,
  cancelGetDocumentCode as cancelGetDocumentCodeAction,
  cancelGetPaperDocuments as cancelGetPaperDocumentsAction,
  addSignedDocument as addSignedDocumentAction,
  removeSignedDocument as removeSignedDocumentAction,
  changeCommentary as changeCommentaryAction,
  changeSigningType
} from 'webseller/common/signing/reducer'

export default function Signing ({
  isOnlyPaperDocumentsScenario = false,
  isAllowToSkipSigning = false,
  isNeedToUploadSignedDocuments = false,
  isShowCommentary = false,
  /**
   * Тип сценария,
   * (передается в контейнере Signing конкретной фичи)
   */
  signingScenario = SigningScenario.DEFAULT,
  textGetPaperDocuments = 'Распечатать документы для подписания',
  textUploadSignedDocuments,
  requiredCountOfSignedDocuments,
  getPepNumbers,
  getSmsCode,
  /**
   * Action для получения кода ПЭП в сформированном документе,
   * (передается в контейнере Signing конкретной фичи)
   */
  getDocumentCode,
  checkPepCode,
  /**
   * Action для формирования документов на подпись (отказ от ПЭП),
   * (передается в контейнере Signing конкретной фичи)
   */
  getPaperDocuments,
  handleSigningUnavailable,
  /**
   * Action для перехода к следующему шагу, вызывается после успешного подписания,
   * (передается в контейнере Signing конкретной фичи)
   */
  goForward,
  /**
   * Action для возврата к предыдущему шагу
   * (передается в контейнере Signing конкретной фичи)
   */
  goBack
}) {
  const signingType = useSelector(selectSigningType)
  const isLoadingCheckIsClientHasPep = useSelector(selectIsLoadingCheckIsClientHasPep)
  const pepNumbers = useSelector(selectPepNumbers)
  const activePepNumber = useSelector(selectActivePepNumber)
  const paperDocuments = useSelector(selectSigningPaperDocuments)
  const isSuccessfulSigning = useSelector(selectIsSuccessfulSigning)
  const isLoadingGetPepNumbers = useSelector(selectIsLoadingGetPepNumbers)
  const isLoadingGetSmsCode = useSelector(selectIsLoadingGetSmsCode)
  const isLoadingGetDocumentCode = useSelector(selectIsLoadingGetDocumentCode)
  const isLoadingGetPaperDocuments = useSelector(selectIsLoadingGetPaperDocuments)
  const isLoadingCheckPepCode = useSelector(selectIsLoadingCheckPepCode)
  const isSigningSkipped = useSelector(selectIsSigningSkipped)
  const isErrorGetDocumentCode = useSelector(selectIsErrorGetDocumentCode)
  const isErrorGetPaperDocuments = useSelector(selectIsErrorGetPaperDocuments)
  const signedDocuments = useSelector(selectSignedDocuments)

  const dispatch = useDispatch()

  const checkIsClientHasPep = payload => dispatch(checkIsClientHasPepAction(payload))
  const changeActivePepNumber = payload => dispatch(changeActivePepNumberAction(payload))
  const submitAgreeOnGetSmsCode = () => dispatch(changeSigningType(SigningType.SMS_CODE))
  const submitAgreeOnGetDocumentCode = () => dispatch(changeSigningType(SigningType.DOCUMENT_CODE))
  const submitAgreeOnGetPaperDocuments = () => dispatch(changeSigningType(SigningType.PAPER_DOCUMENTS))
  const cancelGetDocumentCode = payload => dispatch(cancelGetDocumentCodeAction(payload))
  const cancelGetPaperDocuments = payload => dispatch(cancelGetPaperDocumentsAction(payload))
  const addSignedDocument = payload => dispatch(addSignedDocumentAction(payload))
  const removeSignedDocument = payload => dispatch(removeSignedDocumentAction(payload))
  const changeCommentary = payload => dispatch(changeCommentaryAction(payload))
  const submitSigning = payload => dispatch(submitSigningAction(payload))
  const skipSigning = payload => dispatch(skipSigningAction(payload))
  const resetSigning = payload => dispatch(resetSigningAction(payload))

  useLayoutEffect(() => {
    if (isOnlyPaperDocumentsScenario) {
      dispatch(changeSigningType(SigningType.PAPER_DOCUMENTS))
    }
  }, [])

  useLayoutEffect(() => {
    if (isSuccessfulSigning || (isAllowToSkipSigning && isSigningSkipped)) {
      goForward()
    }
  }, [isSuccessfulSigning, isSigningSkipped])

  const isErrorSigning = isErrorGetDocumentCode || isErrorGetPaperDocuments

  const errorSigningTitle = isOnlyPaperDocumentsScenario ? 'Формирование документов недоступно' : 'Подписание в электронном формате недоступно'

  const renderSigning = () => {
    if (isOnlyPaperDocumentsScenario) {
      return (
        <PaperDocuments
          isShowCommentary={isShowCommentary}
          isNeedToUploadSignedDocuments={isNeedToUploadSignedDocuments}
          documents={paperDocuments}
          requiredCountOfSignedDocuments={requiredCountOfSignedDocuments}
          signedDocuments={signedDocuments}
          isLoadingGetDocuments={isLoadingGetPaperDocuments}
          getDocuments={getPaperDocuments}
          submitSigning={submitSigning}
          cancelGetDocuments={cancelGetPaperDocuments}
          addSignedDocument={addSignedDocument}
          removeSignedDocument={removeSignedDocument}
          changeCommentary={changeCommentary}
          goBack={goBack}
        />
      )
    }

    switch (signingType) {
      case SigningType.NONE: {
        if (signingScenario === SigningScenario.PEP_NUMBERS) {
          return (
            <PresencePepNumbers
              textGetPaperDocuments={textGetPaperDocuments}
              pepNumbers={pepNumbers}
              activePepNumber={activePepNumber}
              isLoadingGetPepNumbers={isLoadingGetPepNumbers}
              getPepNumbers={getPepNumbers}
              changeActivePepNumber={changeActivePepNumber}
              submitAgreeOnGetSmsCode={submitAgreeOnGetSmsCode}
              submitAgreeOnGetDocumentCode={submitAgreeOnGetDocumentCode}
              submitAgreeOnGetPaperDocuments={submitAgreeOnGetPaperDocuments}
              goBack={goBack}
            />
          )
        }
        return (
          <PresencePep
            textGetPaperDocuments={textGetPaperDocuments}
            isLoadingCheckIsClientHasPep={isLoadingCheckIsClientHasPep}
            checkIsClientHasPep={checkIsClientHasPep}
            submitAgreeOnGetSmsCode={submitAgreeOnGetSmsCode}
            submitAgreeOnGetPaperDocuments={submitAgreeOnGetPaperDocuments}
            goBack={goBack}
          />
        )
      }

      case SigningType.SMS_CODE: {
        return (
          <PepCode
            isAllowToSendAnotherCode
            isLoadingGetCode={isLoadingGetSmsCode}
            isLoadingCheckCode={isLoadingCheckPepCode}
            placeholder='Код из СМС'
            getCode={getSmsCode}
            checkCode={checkPepCode}
            goBack={resetSigning}
          />
        )
      }

      case SigningType.DOCUMENT_CODE: {
        return (
          <PepCode
            isLoadingGetCode={isLoadingGetDocumentCode}
            isLoadingCheckCode={isLoadingCheckPepCode}
            getCode={getDocumentCode}
            checkCode={checkPepCode}
            cancelGetCode={cancelGetDocumentCode}
            goBack={resetSigning}
          />
        )
      }

      case SigningType.PAPER_DOCUMENTS: {
        return (
          <PaperDocuments
            titleUpload={textUploadSignedDocuments}
            isShowCommentary={isShowCommentary}
            isNeedToUploadSignedDocuments={isNeedToUploadSignedDocuments}
            documents={paperDocuments}
            requiredCountOfSignedDocuments={requiredCountOfSignedDocuments}
            signedDocuments={signedDocuments}
            isLoadingGetDocuments={isLoadingGetPaperDocuments}
            getDocuments={getPaperDocuments}
            submitSigning={submitSigning}
            cancelGetDocuments={cancelGetPaperDocuments}
            addSignedDocument={addSignedDocument}
            removeSignedDocument={removeSignedDocument}
            changeCommentary={changeCommentary}
            goBack={resetSigning}
          />
        )
      }

      default: {
        return (
          <PresencePep
            textGetPaperDocuments={textGetPaperDocuments}
            isLoadingCheckIsClientHasPep={isLoadingCheckIsClientHasPep}
            checkIsClientHasPep={checkIsClientHasPep}
            submitAgreeOnGetSmsCode={submitAgreeOnGetSmsCode}
            submitAgreeOnGetPaperDocuments={submitAgreeOnGetPaperDocuments}
            goBack={goBack}
          />
        )
      }
    }
  }

  return (
    <Fragment>
      {isErrorSigning && (
        <Fragment>
          {isAllowToSkipSigning ? (
            <Modal
              zIndex={1003}
              title={errorSigningTitle}
              footer={[
                <Button type='primary' onClick={resetSigning}>
                  Попробовать еще раз
                </Button>,
                <Button type='primary' onClick={skipSigning}>
                  Продолжить
                </Button>
              ]}
            >
              Распечатай документы и подпиши их с клиентом, либо повтори процесс подписания
            </Modal>
          ) : (
            <Modal
              zIndex={1003}
              title={errorSigningTitle}
              footer={[
                <Button type='primary' onClick={handleSigningUnavailable || resetSigning}>
                  Ок
                </Button>
              ]}
            >
              Повтори процесс подписания
            </Modal>
          )}
        </Fragment>
      )}
      {renderSigning()}
    </Fragment>
  )
}
