import { FC, Fragment, useLayoutEffect, useState } from 'react';
import { Checkbox } from 'antd';

import { Font } from 'styles';
import { Api } from 'api/types';
import { Button, Document, Modal, TextArea, Title, UploadDocuments } from 'uiKit';
import { Container, Documents, Footer, LoadingContainer, Main } from './styled';

type Props = {
  isNeedToUploadSignedDocuments: boolean;
  isShowCommentary?: boolean;
  title?: string;
  titleUpload?: string;
  documents: Api.DocumentService.Model.Document[];
  requiredCountOfSignedDocuments?: number;
  signedDocuments: Api.DocumentService.Model.SignedDocument[];
  isLoadingGetDocuments: boolean;
  getDocuments: () => void;
  submitSigning: () => void;
  cancelGetDocuments: () => void;
  addSignedDocument: (documents: Api.DocumentService.Model.SignedDocument) => void;
  removeSignedDocument: (uid: string) => void;
  changeCommentary: (newCommentary: string) => void;
  goBack: () => void;
};

const PaperDocuments: FC<Props> = ({
  isNeedToUploadSignedDocuments,
  isShowCommentary = false,
  title = 'Документы для подписания',
  titleUpload,
  documents,
  requiredCountOfSignedDocuments,
  signedDocuments,
  isLoadingGetDocuments,
  getDocuments,
  submitSigning,
  cancelGetDocuments,
  addSignedDocument,
  removeSignedDocument,
  changeCommentary,
  goBack
}) => {
  const [isSigningСonfirmed, setIsSigningСonfirmed] = useState(false);
  const [isShowCancelGetDocumentsConfirmationModal, setIsShowCancelGetDocumentsConfirmationModal] =
    useState(false);

  useLayoutEffect(() => {
    getDocuments();
  }, []);

  const isAllSignedDocumentsUploaded = requiredCountOfSignedDocuments
    ? requiredCountOfSignedDocuments === signedDocuments?.length
    : documents?.length === signedDocuments?.length;
  const isAvailableSubmit = isNeedToUploadSignedDocuments
    ? isAllSignedDocumentsUploaded
    : isSigningСonfirmed;

  const toggleIsSigningСonfirmed = () => {
    setIsSigningСonfirmed(!isSigningСonfirmed);
  };

  const showCancelGetDocumentsConfirmationModal = () => {
    setIsShowCancelGetDocumentsConfirmationModal(true);
  };

  const closeCancelGetDocumentsConfirmationModal = () => {
    setIsShowCancelGetDocumentsConfirmationModal(false);
  };

  const submitCancelGetDocuments = () => {
    cancelGetDocuments();
    closeCancelGetDocumentsConfirmationModal();
  };

  const onChangeCommentary = (e) => {
    changeCommentary(e.target.value);
  };

  return (
    <Fragment>
      {isShowCancelGetDocumentsConfirmationModal && isLoadingGetDocuments && (
        <Modal
          width={360}
          zIndex={1002}
          footer={[
            <Button onClick={submitCancelGetDocuments}>Да</Button>,
            <Button type="primary" onClick={closeCancelGetDocumentsConfirmationModal}>
              Нет
            </Button>
          ]}
          onCancel={closeCancelGetDocumentsConfirmationModal}
        >
          <Title>Вы уверены, что хотите отменить формирование документов на подпись?</Title>
        </Modal>
      )}
      {isLoadingGetDocuments ? (
        <LoadingContainer>
          <Title bold fontSize={16}>
            Формирование списка документов на подпись...
          </Title>
          <Button onClick={showCancelGetDocumentsConfirmationModal}>Отменить</Button>
        </LoadingContainer>
      ) : (
        <Container>
          <Title bold fontSize={18} fontFamily={Font.T2_BOLD}>
            {title}
          </Title>
          <Main>
            <Documents>
              {documents?.map(({ title, url }) => (
                <Document url={url} title={title} />
              ))}
            </Documents>
            {isNeedToUploadSignedDocuments ? (
              <UploadDocuments
                title={titleUpload}
                maxCount={requiredCountOfSignedDocuments || documents?.length}
                documents={signedDocuments}
                addDocument={addSignedDocument}
                removeDocument={removeSignedDocument}
              />
            ) : (
              <Checkbox
                checked={isSigningСonfirmed}
                disabled={isLoadingGetDocuments}
                onClick={toggleIsSigningСonfirmed}
              >
                Я подтверждаю, что документы подписаны сторонами
              </Checkbox>
            )}
            {isShowCommentary && (
              <TextArea
                style={{ marginTop: 16 }}
                rows={1}
                placeholder="Комментарий"
                onChange={onChangeCommentary}
              />
            )}
          </Main>
          <Footer>
            <Button onClick={goBack}>Назад</Button>
            <Button
              type="primary"
              loading={isLoadingGetDocuments}
              disabled={!isAvailableSubmit}
              onClick={submitSigning}
            >
              Продолжить
            </Button>
          </Footer>
        </Container>
      )}
    </Fragment>
  );
};

export default PaperDocuments;
