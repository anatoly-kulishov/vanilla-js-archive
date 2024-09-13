import { FC, Fragment, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Button } from 'uiKit';
import { SigningScenario, SigningType } from 'common/signing/helpers';
import selectorsSigning from 'common/signing/selectors';
import actionSigning from 'common/signing/actions';
import PaperDocuments from '../PaperDocuments';
import PresencePepNumbers from '../PresencePepNumbers';
import PresencePep from '../PresencePep';
import PepCode from '../PepCode';

type Props = {
  isOnlyPaperDocumentsScenario?: boolean;
  isAllowToSkipSigning?: boolean;
  isNeedToUploadSignedDocuments?: boolean;
  isShowCommentary?: boolean;
  signingScenario?: SigningScenario;
  textGetPaperDocuments?: string;
  textUploadSignedDocuments?: string;
  requiredCountOfSignedDocuments?: number;
  getPepNumbers: () => void;
  getSmsCode: () => void;
  getDocumentCode: () => void;
  checkPepCode: () => void;
  getPaperDocuments: () => void;
  handleSigningUnavailable: () => void;
  goForward: () => void;
  goBack: () => void;
};

const Signing: FC<Props> = ({
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
}) => {
  const {
    signingType,
    isLoadingCheckIsClientHasPep,
    pepNumbers,
    activePepNumber,
    paperDocuments,
    isSuccessfulSigning,
    isLoadingGetPepNumbers,
    isLoadingGetSmsCode,
    isLoadingGetDocumentCode,
    isLoadingGetPaperDocuments,
    isLoadingCheckPepCode,
    isSigningSkipped,
    isErrorGetDocumentCode,
    isErrorGetPaperDocuments,
    signedDocuments
  } = useSelector(selectorsSigning.selectAll);

  const dispatch = useDispatch();

  const checkIsClientHasPep = () => dispatch(actionSigning.checkIsClientHasPep());
  const changeActivePepNumber = (payload) => dispatch(actionSigning.changeActivePepNumber(payload));
  const submitAgreeOnGetSmsCode = () =>
    dispatch(actionSigning.changeSigningType(SigningType.SMS_CODE));
  const submitAgreeOnGetDocumentCode = () =>
    dispatch(actionSigning.changeSigningType(SigningType.DOCUMENT_CODE));
  const submitAgreeOnGetPaperDocuments = () =>
    dispatch(actionSigning.changeSigningType(SigningType.PAPER_DOCUMENTS));

  // TODO удалить, т.к. в компоненте не обрабатывается
  // const cancelGetDocumentCode = () => dispatch(actionSigning.cancelGetDocumentCode());
  const cancelGetPaperDocuments = () => dispatch(actionSigning.cancelGetPaperDocuments());
  const submitSigning = () => dispatch(actionSigning.submitSigning());
  const resetState = () => dispatch(actionSigning.resetState());
  const skipSigning = (payload) => dispatch(actionSigning.skipSigning(payload));
  const addSignedDocument = (payload) => dispatch(actionSigning.addSignedDocument(payload));
  const removeSignedDocument = (payload) => dispatch(actionSigning.removeSignedDocument(payload));
  const changeCommentary = (payload) => dispatch(actionSigning.changeCommentary(payload));

  useLayoutEffect(() => {
    if (isOnlyPaperDocumentsScenario) {
      dispatch(actionSigning.changeSigningType(SigningType.PAPER_DOCUMENTS));
    }
  }, []);

  useLayoutEffect(() => {
    if (isSuccessfulSigning || (isAllowToSkipSigning && isSigningSkipped)) {
      goForward();
    }
  }, [isSuccessfulSigning, isSigningSkipped]);

  const isErrorSigning = isErrorGetDocumentCode || isErrorGetPaperDocuments;

  const errorSigningTitle = isOnlyPaperDocumentsScenario
    ? 'Формирование документов недоступно'
    : 'Подписание в электронном формате недоступно';

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
      );
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
          );
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
        );
      }

      case SigningType.SMS_CODE: {
        return (
          <PepCode
            isAllowToSendAnotherCode
            isLoadingGetCode={isLoadingGetSmsCode}
            isLoadingCheckCode={isLoadingCheckPepCode}
            placeholder="Код из СМС"
            getCode={getSmsCode}
            checkCode={checkPepCode}
            goBack={resetState}
          />
        );
      }

      case SigningType.DOCUMENT_CODE: {
        return (
          <PepCode
            isLoadingGetCode={isLoadingGetDocumentCode}
            isLoadingCheckCode={isLoadingCheckPepCode}
            getCode={getDocumentCode}
            checkCode={checkPepCode}
            // TODO удалить, т.к. в компоненте не обрабатывается
            // cancelGetCode={cancelGetDocumentCode}
            goBack={resetState}
          />
        );
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
            goBack={resetState}
          />
        );
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
        );
      }
    }
  };

  return (
    <Fragment>
      {isErrorSigning && (
        <Fragment>
          {isAllowToSkipSigning ? (
            <Modal
              zIndex={1003}
              title={errorSigningTitle}
              footer={[
                <Button type="primary" onClick={resetState}>
                  Попробовать еще раз
                </Button>,
                <Button type="primary" onClick={skipSigning}>
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
                <Button type="primary" onClick={handleSigningUnavailable || resetState}>
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
  );
};

export default Signing;
