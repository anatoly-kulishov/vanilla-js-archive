import { FC, Fragment, useLayoutEffect, useState } from 'react';

import { Font } from 'styles';
import { Button, Loader, Modal, Title } from 'uiKit';
import { ButtonsContainer, Content, MainButtons } from './styled';

type Props = {
  textGetPaperDocuments: string;
  isLoadingCheckIsClientHasPep: boolean;
  checkIsClientHasPep: () => void;
  submitAgreeOnGetSmsCode: () => void;
  submitAgreeOnGetPaperDocuments: () => void;
  goBack: () => void;
};

const PresencePep: FC<Props> = ({
  textGetPaperDocuments,
  isLoadingCheckIsClientHasPep,
  checkIsClientHasPep,
  submitAgreeOnGetSmsCode,
  submitAgreeOnGetPaperDocuments,
  goBack
}) => {
  const [isShowGetPaperDocumentsConfirmationModal, setIsShowGetPaperDocumentsConfirmationModal] =
    useState(false);

  useLayoutEffect(() => {
    checkIsClientHasPep();
  }, []);

  const showConfirmationModal = () => {
    setIsShowGetPaperDocumentsConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setIsShowGetPaperDocumentsConfirmationModal(false);
  };

  const handleSubmitAgreeOnGetPaperDocuments = () => {
    closeConfirmationModal();
    submitAgreeOnGetPaperDocuments();
  };

  if (isLoadingCheckIsClientHasPep) {
    return <Loader title="Проверка наличия ПЭП" />;
  }

  return (
    <Fragment>
      {isShowGetPaperDocumentsConfirmationModal && (
        <Modal
          width={360}
          zIndex={1002}
          footer={[
            <Button type="default" onClick={closeConfirmationModal}>
              Нет
            </Button>,
            <Button type="primary" onClick={handleSubmitAgreeOnGetPaperDocuments}>
              Да
            </Button>
          ]}
          onCancel={closeConfirmationModal}
        >
          <Title>{textGetPaperDocuments}</Title>
        </Modal>
      )}
      <Content>
        <Title bold fontSize={18} fontFamily={Font.T2_BOLD}>
          Проверка наличия ПЭП
        </Title>
        <Title>
          Клиент согласен на обслуживание с аналогом собственноручной подписи и может принять SMS на
          свой номер?
        </Title>
        <ButtonsContainer hasBackBtn={!!goBack}>
          {goBack && <Button onClick={goBack}>Назад</Button>}
          <MainButtons>
            <Button type="primary" onClick={showConfirmationModal}>
              Нет
            </Button>
            <Button type="primary" onClick={submitAgreeOnGetSmsCode}>
              Да, отправить SMS
            </Button>
          </MainButtons>
        </ButtonsContainer>
      </Content>
    </Fragment>
  );
};

export default PresencePep;
