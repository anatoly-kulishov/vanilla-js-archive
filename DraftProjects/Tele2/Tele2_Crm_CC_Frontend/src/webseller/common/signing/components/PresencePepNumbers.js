import React, { Fragment, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { Radio as AntdRadio, Space, Checkbox } from 'antd'

import { Modal, Button, Radio, Title, Loader } from 'webseller/components'
import { denormalizeNumber } from 'webseller/helpers'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

const { Group: RadioGroup } = AntdRadio

export default function PresencePepNumbers ({
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
}) {
  const [isShowGetDocumentCodeConfirmationModal, setIsShowGetDocumentCodeConfirmationModal] = useState(false)
  const [isShowGetPaperDocumentsConfirmationModal, setIsShowGetPaperDocumentsConfirmationModal] = useState(false)
  const [hasNotSim, setHasNotSim] = useState(false)

  useLayoutEffect(() => {
    getPepNumbers()
  }, [])

  const onChangeActivePepNumber = e => {
    const newNumber = e.target.value
    changeActivePepNumber(newNumber)
  }

  const onChangeClientHasSim = e => {
    const hasNotSim = e.target.checked
    setHasNotSim(hasNotSim)
  }

  const showGetDocumentCodeConfirmationModal = () => {
    setIsShowGetDocumentCodeConfirmationModal(true)
  }

  const showGetPaperDocumentsConfirmationModal = () => {
    setIsShowGetPaperDocumentsConfirmationModal(true)
  }

  const handleSubmitAgreeOnGetDocumentCode = () => {
    submitAgreeOnGetDocumentCode()
    closeConfirmationModal()
  }

  const handleSubmitAgreeOnGetPaperDocuments = () => {
    submitAgreeOnGetPaperDocuments()
    closeConfirmationModal()
  }

  const closeConfirmationModal = () => {
    setIsShowGetDocumentCodeConfirmationModal(false)
    setIsShowGetPaperDocumentsConfirmationModal(false)
  }

  if (isLoadingGetPepNumbers) {
    return <Loader title='Проверка наличия ПЭП' />
  }

  return (
    <Fragment>
      {isShowGetDocumentCodeConfirmationModal && (
        <Modal
          width={480}
          zIndex={1002}
          footer={[
            <Button type='default' onClick={closeConfirmationModal}>
              Нет
            </Button>,
            <Button type='primary' onClick={handleSubmitAgreeOnGetDocumentCode}>
              Да, распечатать заявление
            </Button>
          ]}
          onCancel={closeConfirmationModal}
        >
          <Title>
            Клиент согласен на обслуживание с аналогом собственноручной подписи? Это позволит не тратить время на
            оформление бумажных заявлений, все документы будут формироваться в электронном виде.
          </Title>
        </Modal>
      )}
      {isShowGetPaperDocumentsConfirmationModal && (
        <Modal
          width={360}
          zIndex={1002}
          footer={[
            <Button type='default' onClick={closeConfirmationModal}>
              Нет
            </Button>,
            <Button type='primary' onClick={handleSubmitAgreeOnGetPaperDocuments}>
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
          <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
            Проверка наличия ПЭП
          </Title>
          <Main>
            <TitleStyled>
              Согласен ли клиент подписать Договор аналогом собственноручной подписи, отправленным в SMS на его номер?
            </TitleStyled>
            <RadioGroupWrapper>
              <RadioGroup value={activePepNumber} onChange={onChangeActivePepNumber}>
                <Space direction='vertical'>
                  {pepNumbers.map(({ msisdn }) => {
                    return (
                      <Radio key={msisdn} value={msisdn}>
                        {denormalizeNumber(msisdn)}
                      </Radio>
                    )
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
                  type='primary'
                  onClick={hasNotSim ? showGetDocumentCodeConfirmationModal : submitAgreeOnGetSmsCode}
                >
                  Согласен
                </Button>
              </MainButtons>
            </ButtonsContainer>
          </Footer>
        </Content>
      ) : (
        <ContentEmpty>
          <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
            Проверка наличия ПЭП
          </Title>
          <Main>
            <Title>
              Клиент согласен на обслуживание с аналогом собственноручной подписи? Это позволит не тратить время на
              оформление бумажных заявлений, все документы будут формироваться в электронном виде.
            </Title>
          </Main>
          <ButtonsContainer>
            <Button onClick={goBack}>Назад</Button>
            <MainButtons>
              <Button type='default' onClick={showGetPaperDocumentsConfirmationModal}>
                Нет
              </Button>
              <Button type='primary' onClick={submitAgreeOnGetDocumentCode}>
                Да, распечатать заявление
              </Button>
            </MainButtons>
          </ButtonsContainer>
        </ContentEmpty>
      )}
    </Fragment>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
  max-width: 600px;
`

const ContentEmpty = styled.div`
  width: 60%;
  max-width: 600px;
`

const Main = styled.div`
  flex: 1;
  margin: 24px 0;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }
`

const TitleStyled = styled(Title)`
  margin-bottom: 24px;
`

const RadioGroupWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MainButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`
