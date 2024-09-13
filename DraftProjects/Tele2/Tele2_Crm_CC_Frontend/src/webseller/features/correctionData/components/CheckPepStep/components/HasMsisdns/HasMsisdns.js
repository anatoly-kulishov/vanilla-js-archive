import React, { useState } from 'react'
import styled from 'styled-components'
import { Radio as AntdRadio, Space } from 'antd'
import { Modal, Button, Radio, Title } from 'webseller/components'
import { denormalizeNumber } from 'webseller/helpers'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'

const { Group: RadioGroup } = AntdRadio

export default function HasMsisdns ({
  msisdns,
  selectedMsisdn,
  isLoadingDisagreeOnPep,
  agreeOnPepCode,
  selectPepMsisdn,
  disagreeOnPep,
  toPrevStep
}) {
  const [isShowDisagreeConfirmationModal, setIsShowDisagreeConfirmationModal] = useState(false)

  const onChangeSelectedMsisdn = e => {
    const newSelectedMsisdn = e.target.value
    selectPepMsisdn(newSelectedMsisdn)
  }

  const onClickDisagreeBtn = () => {
    setIsShowDisagreeConfirmationModal(true)
  }

  const closeConfirmationModal = () => {
    setIsShowDisagreeConfirmationModal(false)
  }

  return (
    <>
      {isShowDisagreeConfirmationModal && (
        <Modal
          width={360}
          zIndex={1002}
          footer={
            <ButtonsContainer>
              <Button disabled={!isLoadingDisagreeOnPep}>
                Отмена
              </Button>
              <MainButtons>
                <Button type='primary' disabled={isLoadingDisagreeOnPep} onClick={closeConfirmationModal}>
                  Нет
                </Button>
                <Button type='primary' loading={isLoadingDisagreeOnPep} onClick={disagreeOnPep}>
                  Да
                </Button>
              </MainButtons>
            </ButtonsContainer>
          }
          onCancel={closeConfirmationModal}
        >
          <Title>
          Распечатать заявление на актуализацию регистрационных данных абонента?
          </Title>
        </Modal>
      )}
      <Content>
        <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
          Проверка наличия ПЭП
        </Title>
        <Main>
          <TitleStyled>
            Согласен ли клиент подписать заявление аналогом собственноручной подписи, отправленным в SMS на его номер?
          </TitleStyled>
          <RadioGroupWrapper>
            <RadioGroup value={selectedMsisdn} onChange={onChangeSelectedMsisdn}>
              <Space direction='vertical'>
                {msisdns.map(({ msisdn }) => {
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
          <ButtonsContainer>
            <Button onClick={toPrevStep}>Назад</Button>
            <MainButtons>
              <Button onClick={onClickDisagreeBtn}>Не согласен</Button>
              <Button
                type='primary'
                onClick={agreeOnPepCode}
              >
                Согласен, отправить код
              </Button>
            </MainButtons>
          </ButtonsContainer>
        </Footer>
      </Content>
    </>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
