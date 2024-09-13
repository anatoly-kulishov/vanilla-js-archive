import React, { Fragment, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'

import { Button, Loader, Modal, Title } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

export default function PresencePep ({
  textGetPaperDocuments,
  isLoadingCheckIsClientHasPep,
  checkIsClientHasPep,
  submitAgreeOnGetSmsCode,
  submitAgreeOnGetPaperDocuments,
  goBack
}) {
  const [isShowGetPaperDocumentsConfirmationModal, setIsShowGetPaperDocumentsConfirmationModal] = useState(false)

  useLayoutEffect(() => {
    checkIsClientHasPep()
  }, [])

  const showConfirmationModal = () => {
    setIsShowGetPaperDocumentsConfirmationModal(true)
  }

  const closeConfirmationModal = () => {
    setIsShowGetPaperDocumentsConfirmationModal(false)
  }

  const handleSubmitAgreeOnGetPaperDocuments = () => {
    closeConfirmationModal()
    submitAgreeOnGetPaperDocuments()
  }

  if (isLoadingCheckIsClientHasPep) {
    return <Loader title='Проверка наличия ПЭП' />
  }

  return (
    <Fragment>
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
      <Content>
        <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
          Проверка наличия ПЭП
        </Title>
        <Title>
          Клиент согласен на обслуживание с аналогом собственноручной подписи и может принять SMS на свой номер?
        </Title>
        <ButtonsContainer hasBackBtn={goBack}>
          {goBack && <Button onClick={goBack}>Назад</Button>}
          <MainButtons>
            <Button type='primary' onClick={showConfirmationModal}>
              Нет
            </Button>
            <Button type='primary' onClick={submitAgreeOnGetSmsCode}>
              Да, отправить SMS
            </Button>
          </MainButtons>
        </ButtonsContainer>
      </Content>
    </Fragment>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  height: 100%;
  width: 60%;
  max-width: 600px;
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ hasBackBtn }) => (hasBackBtn ? 'space-between' : 'flex-end')};
`

const MainButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`
