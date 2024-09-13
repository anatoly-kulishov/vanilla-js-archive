import React, { useState, useMemo, useEffect } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Title, Button, Modal } from 'webseller/components'
import { denormalizeNumber } from 'webseller/helpers/index'
import {
  SimTypes,
  getTariffInfoRowText,
  useSumOfSimPrice,
  RegistrationStatusViews,
  isFinalRegistartionSimStatus,
  isSuccessRegistrationSimStatus,
  isESim,
  getTariffInfoRowTextForOrder
} from 'webseller/features/saleSim/helpers'
import { T2_HALVAR_BREIT_EXTRABOLD, T2_ROOFTOP_REGULAR } from 'webseller/helpers/styles'

// TODO
const SimIcon = ({ fill }) => <div style={{ width: 30, height: 20, borderRadius: 4, backgroundColor: fill }} />

export default function SimsInOrderStep ({
  isOrderProcess,
  simsInOrder,
  addedSims,
  connectionFee,
  isLoadingInstruction,
  registerSims,
  downloadInstruction,
  toNextStep
}) {
  const [chosenSimId, setChosenSimId] = useState(() => addedSims[0]?.id)
  const [isShowSubmitFinishModal, setIsShowSubmitFinishModal] = useState(false)

  const chosenSim = useMemo(() => addedSims.find(({ id }) => id === chosenSimId), [addedSims, chosenSimId])
  const isESimChosen = isESim(chosenSim.simTypeId)

  const { isAllSimsHaveFinalStatus, isAllSimsHaveSuccessStatus } = useMemo(
    () => {
      let prevIsAllSimsHaveFinalStatus = true
      let prevIsAllSimsHaveSuccessStatus = true

      addedSims.forEach(sim => {
        const status = sim.registration?.statusId

        if (prevIsAllSimsHaveFinalStatus) {
          prevIsAllSimsHaveFinalStatus = isFinalRegistartionSimStatus(status)
        }
        if (prevIsAllSimsHaveSuccessStatus) {
          prevIsAllSimsHaveSuccessStatus = isSuccessRegistrationSimStatus(status)
        }
      })

      return {
        isAllSimsHaveFinalStatus: prevIsAllSimsHaveFinalStatus,
        isAllSimsHaveSuccessStatus: prevIsAllSimsHaveSuccessStatus
      }
    },
    [addedSims]
  )

  const sumOfSimPrice = useSumOfSimPrice(addedSims, connectionFee)

  useEffect(() => {
    registerSims()
  }, [])

  const onClickSim = e => {
    const chosenSimId = e.currentTarget.dataset.simId
    setChosenSimId(chosenSimId)
  }

  const onCloseSubmitFinishModal = () => {
    setIsShowSubmitFinishModal(false)
  }

  const onClickFinish = () => {
    if (isESimChosen && isAllSimsHaveSuccessStatus) {
      setIsShowSubmitFinishModal(true)
    } else {
      toNextStep()
    }
  }

  return (
    <Container>
      <div>
        <Header>
          <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
            SIM-карты в заказе
          </Title>
        </Header>
        <Sims>
          {addedSims.map(({ id, simTypeId, tariff, number, registration }, simIdx) => {
            const simTitle = `${SimTypes[simTypeId]}-карта ${simIdx + 1}`
            const isChosenSim = chosenSimId === id
            const registrationStatus = RegistrationStatusViews[registration?.statusId]

            const tariffName = isOrderProcess ? simsInOrder[simIdx]?.tariff : tariff?.name
            const tariffInfoRowText = isOrderProcess ? getTariffInfoRowTextForOrder(simsInOrder[simIdx]) : getTariffInfoRowText(tariff)

            return (
              <Sim key={id}>
                <SimHeader>
                  <Title fontSize={14} fontFamily={T2_ROOFTOP_REGULAR}>
                    {simTitle}
                  </Title>
                </SimHeader>
                <SimButton data-sim-id={id} active={isChosenSim} onClick={onClickSim}>
                  <Title bold fontSize={16} fontFamily={T2_ROOFTOP_REGULAR}>
                    {tariffName}
                  </Title>
                  <Title fontSize={16} fontFamily={T2_ROOFTOP_REGULAR}>
                    {tariffInfoRowText}
                  </Title>
                  <SimNumberRow>
                    <Title bold fontSize={16} fontFamily={T2_ROOFTOP_REGULAR}>
                      {denormalizeNumber(number)}
                    </Title>
                    <SimIcon fill={registrationStatus?.color} />
                  </SimNumberRow>
                  <Title fontSize={14} fontFamily={T2_ROOFTOP_REGULAR}>
                    {registrationStatus?.title}
                  </Title>
                </SimButton>
                {isESim(simTypeId) && (
                  <ButtonInstruction
                    type='text'
                    disabled={!isAllSimsHaveSuccessStatus}
                    icon={<DownloadOutlined />}
                    loading={isLoadingInstruction}
                    onClick={downloadInstruction}
                  >
                    Инструкция
                  </ButtonInstruction>
                )}
              </Sim>
            )
          })}
        </Sims>
      </div>
      <Footer>
        <Title bold fontSize={16} fontFamily={T2_ROOFTOP_REGULAR}>
          Стоимость
        </Title>
        <Title bold fontSize={16} fontFamily={T2_ROOFTOP_REGULAR}>
          {sumOfSimPrice} ₽
        </Title>
        <Button type='primary' disabled={!isAllSimsHaveFinalStatus} onClick={onClickFinish}>
          Завершить
        </Button>
      </Footer>
      {isShowSubmitFinishModal && (
        <Modal
          zIndex={1001}
          footer={[
            <Button onClick={onCloseSubmitFinishModal}>Нет</Button>,
            <Button type='primary' onClick={toNextStep}>
              Да
            </Button>
          ]}
          onCancel={onCloseSubmitFinishModal}
        >
          <Title>Профиль eSIM установлен в телефон клиента? Это обязательный шаг при подключении</Title>
        </Modal>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
  max-width: 900px;
  height: 100%;
  padding: 16px;
`

const Header = styled.div`
  margin-bottom: 24px;
`

const Sims = styled.ul`
  list-style: none;
  padding: 0px;
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

  & > li:not(:last-of-type) {
    margin-bottom: 16px;
  }
`

const SimHeader = styled.div`
  margin-bottom: 8px;
`

const Sim = styled.li`
  width: 100%;
`

const SimNumberRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const SimButton = styled.button`
  width: 100%;
  text-align: start;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  background: ${({ active }) => (active ? 'rgba(63, 203, 255, 0.2)' : '#f1f1f1')};
  cursor: pointer;

  &:hover {
    background: rgba(63, 203, 255, 0.1);
  }

  &[disabled]:hover {
    background: #f1f1f1;
    cursor: default;
  }
`

const ButtonInstruction = styled(Button)`
  margin-top: 8px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
