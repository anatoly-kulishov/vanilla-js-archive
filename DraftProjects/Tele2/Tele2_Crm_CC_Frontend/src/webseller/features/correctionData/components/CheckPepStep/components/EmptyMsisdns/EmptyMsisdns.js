import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Button, Title } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

export default function EmptyMsisdns ({
  isLoadingAgreeOnPep,
  isLoadingDisagreeOnPep,
  agreeOnPep,
  disagreeOnPep,
  toPrevStep
}) {
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false)
  const [isAgreeOnPep, setIsAgreeOnPep] = useState(false)

  const isLoading = isLoadingAgreeOnPep || isLoadingDisagreeOnPep

  const closeConfirmationModal = () => {
    setIsShowConfirmationModal(false)
  }

  const onAgreeOnPepClick = () => {
    setIsAgreeOnPep(true)
    setIsShowConfirmationModal(true)
  }

  const onDisagreeOnPepClick = () => {
    setIsAgreeOnPep(false)
    setIsShowConfirmationModal(true)
  }

  const onPep = () => {
    if (isAgreeOnPep) {
      agreeOnPep()
    } else {
      disagreeOnPep()
    }
  }

  return (
    <>
      {isShowConfirmationModal && (
        <Modal
          width={480}
          zIndex={1002}
          footer={
            <ButtonsContainer>
              <Button disabled={!isLoading}>
                Отмена
              </Button>
              <MainButtons>
                <Button type='primary' disabled={isLoading} onClick={closeConfirmationModal}>
                  Нет
                </Button>
                <Button type='primary' loading={isLoading} onClick={onPep}>
                  Да, распечатать заявление
                </Button>
              </MainButtons>
            </ButtonsContainer>
          }
          onCancel={closeConfirmationModal}
        >
          <Title>
            Клиент согласен на обслуживание с аналогом собственноручной подписи? Это позволит не тратить время на
            оформление бумажных заявлений, все документы будут формироваться в электронном виде.
          </Title>
        </Modal>
      )}
      <Content>
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
          <Button onClick={toPrevStep}>
            Назад
          </Button>
          <MainButtons>
            <Button
              type='primary'
              disabled={isLoading}
              onClick={onDisagreeOnPepClick}
            >
              Нет
            </Button>
            <Button type='primary' loading={isLoading} onClick={onAgreeOnPepClick}>
              Да, распечатать заявление
            </Button>
          </MainButtons>
        </ButtonsContainer>
      </Content>
    </>
  )
}

const Content = styled.div`
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
