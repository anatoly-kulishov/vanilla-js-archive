import { FC, Fragment, useLayoutEffect, useState } from 'react';
import { Radio as AntdRadio, Space, Checkbox } from 'antd';

import { Api } from 'api/types';
import { Font } from 'styles';
import { Modal, Button, Radio, Title, Loader } from 'uiKit';
import { denormalizeNumber } from 'helpers/numbers';
import {
  ButtonsContainer,
  Content,
  ContentEmpty,
  Footer,
  Main,
  MainButtons,
  RadioGroupWrapper,
  TitleStyled
} from './styled';

const { Group: RadioGroup } = AntdRadio;

type Props = {
  textGetPaperDocuments: string;
  pepNumbers: Api.PepService.Model.PepNumber[];
  activePepNumber: string;
  isLoadingGetPepNumbers: boolean;
  getPepNumbers: () => void;
  changeActivePepNumber: (newNumber: string) => void;
  submitAgreeOnGetSmsCode: () => void;
  submitAgreeOnGetDocumentCode: () => void;
  submitAgreeOnGetPaperDocuments: () => void;
  goBack: () => void;
};

const PresencePepNumbers: FC<Props> = ({
  textGetPaperDocuments,
  pepNumbers,
  activePepNumber,
  isLoadingGetPepNumbers,
  getPepNumbers,
  changeActivePepNumber,
  submitAgreeOnGetSmsCode,
  submitAgreeOnGetDocumentCode,
  submitAgreeOnGetPaperDocuments,
  goBack
}) => {
  const [isShowGetDocumentCodeConfirmationModal, setIsShowGetDocumentCodeConfirmationModal] =
    useState(false);
  const [isShowGetPaperDocumentsConfirmationModal, setIsShowGetPaperDocumentsConfirmationModal] =
    useState(false);
  const [hasNotSim, setHasNotSim] = useState(false);

  useLayoutEffect(() => {
    getPepNumbers();
  }, []);

  const onChangeActivePepNumber = (e) => {
    const newNumber = e.target.value;
    changeActivePepNumber(newNumber);
  };

  const onChangeClientHasSim = (e) => {
    const hasNotSim = e.target.checked;
    setHasNotSim(hasNotSim);
  };

  const showGetDocumentCodeConfirmationModal = () => {
    setIsShowGetDocumentCodeConfirmationModal(true);
  };

  const showGetPaperDocumentsConfirmationModal = () => {
    setIsShowGetPaperDocumentsConfirmationModal(true);
  };

  const handleSubmitAgreeOnGetDocumentCode = () => {
    submitAgreeOnGetDocumentCode();
    closeConfirmationModal();
  };

  const handleSubmitAgreeOnGetPaperDocuments = () => {
    submitAgreeOnGetPaperDocuments();
    closeConfirmationModal();
  };

  const closeConfirmationModal = () => {
    setIsShowGetDocumentCodeConfirmationModal(false);
    setIsShowGetPaperDocumentsConfirmationModal(false);
  };

  if (isLoadingGetPepNumbers) {
    return <Loader title="Проверка наличия ПЭП" />;
  }

  return (
    <Fragment>
      {isShowGetDocumentCodeConfirmationModal && (
        <Modal
          width={480}
          zIndex={1002}
          footer={[
            <Button type="default" onClick={closeConfirmationModal}>
              Нет
            </Button>,
            <Button type="primary" onClick={handleSubmitAgreeOnGetDocumentCode}>
              Да, распечатать заявление
            </Button>
          ]}
          onCancel={closeConfirmationModal}
        >
          <Title>
            Клиент согласен на обслуживание с аналогом собственноручной подписи? Это позволит не
            тратить время на оформление бумажных заявлений, все документы будут формироваться в
            электронном виде.
          </Title>
        </Modal>
      )}
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
      {pepNumbers?.length ? (
        <Content>
          <Title bold fontSize={18} fontFamily={Font.T2_BOLD}>
            Проверка наличия ПЭП
          </Title>
          <Main>
            <TitleStyled>
              Согласен ли клиент подписать Договор аналогом собственноручной подписи, отправленным в
              SMS на его номер?
            </TitleStyled>
            <RadioGroupWrapper>
              <RadioGroup value={activePepNumber} onChange={onChangeActivePepNumber}>
                <Space direction="vertical">
                  {pepNumbers.map(({ msisdn }) => {
                    return (
                      <Radio key={msisdn} value={msisdn}>
                        {denormalizeNumber(msisdn)}
                      </Radio>
                    );
                  })}
                </Space>
              </RadioGroup>
            </RadioGroupWrapper>
          </Main>
          <Footer>
            <Checkbox onChange={onChangeClientHasSim}>У клиента нет с собой SIM</Checkbox>
            <ButtonsContainer>
              <Button onClick={goBack}>Назад</Button>
              <MainButtons>
                <Button onClick={showGetPaperDocumentsConfirmationModal}>Не согласен</Button>
                <Button
                  type="primary"
                  onClick={
                    hasNotSim ? showGetDocumentCodeConfirmationModal : submitAgreeOnGetSmsCode
                  }
                >
                  Согласен
                </Button>
              </MainButtons>
            </ButtonsContainer>
          </Footer>
        </Content>
      ) : (
        <ContentEmpty>
          <Title bold fontSize={18} fontFamily={Font.T2_BOLD}>
            Проверка наличия ПЭП
          </Title>
          <Main>
            <Title>
              Клиент согласен на обслуживание с аналогом собственноручной подписи? Это позволит не
              тратить время на оформление бумажных заявлений, все документы будут формироваться в
              электронном виде.
            </Title>
          </Main>
          <ButtonsContainer>
            <Button onClick={goBack}>Назад</Button>
            <MainButtons>
              <Button type="default" onClick={showGetPaperDocumentsConfirmationModal}>
                Нет
              </Button>
              <Button type="primary" onClick={submitAgreeOnGetDocumentCode}>
                Да, распечатать заявление
              </Button>
            </MainButtons>
          </ButtonsContainer>
        </ContentEmpty>
      )}
    </Fragment>
  );
};

export default PresencePepNumbers;
