import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { bool, func, object, array, string, number } from 'prop-types'
import styled from 'styled-components'
import { Button, Form, Dropdown, notification, Tag, Switch } from 'antd'
import { CloseCircleTwoTone } from '@ant-design/icons'

import Card from 'components/Card'

import MnpQuestionnaireForm from './components/MnpQuestionnaireForm'
import protocolStatusIds from './constants/protocolStatusIds'
import { getControlsWithData } from './helpers/getWithData'
import { cardModes } from 'constants/cardModes'
import { getMnpRights } from 'utils/helpers/rights'

export default function MnpQuestionnaire (props) {
  const {
    queryParams: { delayedHandling: isDelayedHandling },
    cardMode,
    handlingId,
    fetchProtocolStatusContext,
    protocolList,
    protocolListFull,
    fetchQuestionsHistory,
    fetchMnpQuestionsList,
    mnpQuestionsList,
    mnpQuestionsHistory,
    checkMnpHandling,
    mnpHandlingData,
    user,
    isCheckMNPHandlingError,
    isCheckMNPHandlingLoading,
    isChangeProtocolLoading,
    isProtocolStatusContextLoading,
    isCreateProtocolLoading,
    checkMNPHandlingError,
    isMnpQuestionaryVisible,
    isCheckMnpPressed,
    savedMnpQuestions,
    saveMnpQuestionary,
    msisdn,
    mnpOrder,
    toggleMnpQuestionary,
    createDraftProtocol,
    changeDraftProtocol,
    protocol,
    isHandlingOpenPressed,
    createProtocolResult,
    changeProtocolResult,
    protocolResult,
    isProtocolLoading
  } = props

  const [form] = Form.useForm()
  const [isGoodCall, setGoodCall] = useState(false)

  const mnpRights = useMemo(() => getMnpRights(user), [user])

  const isMnpTypeAllowed = useMemo(() => {
    return (
      isMnpQuestionaryVisible &&
      (mnpRights.isMnpOutReact || mnpRights.isMnpSupport || !mnpRights.isGetCanceledMnpOrder) &&
      cardMode !== cardModes.anonymous
    )
  }, [mnpRights, isMnpQuestionaryVisible])

  const [controls, controlGroups] = useMemo(() => {
    return [
      mnpQuestionsList?.Controls ?? mnpQuestionsHistory?.Questions,
      mnpQuestionsList?.ControlGroup ?? mnpQuestionsHistory?.ControlGroup
    ]
  }, [mnpQuestionsList, mnpQuestionsHistory])

  const [isMnpProtocolAvailable, protocolId, protocolStatusId, protocolStatusName, protocolContextName] =
    useMemo(() => {
      return [
        mnpHandlingData?.MNPType === null,
        createProtocolResult?.ProtocolId ||
          changeProtocolResult?.ProtocolId ||
          protocolResult?.ProtocolId ||
          mnpHandlingData?.ProtocolId,
        createProtocolResult?.ProtocolStatusId ||
          changeProtocolResult?.ProtocolStatusId ||
          protocolResult?.ProtocolStatusId ||
          mnpHandlingData?.ProtocolStatusId,
        createProtocolResult?.ProtocolStatusName ||
          changeProtocolResult?.ProtocolStatusName ||
          protocolResult?.ProtocolStatusName ||
          mnpHandlingData?.ProtocolStatusName,
        createProtocolResult?.ProtocolContextName ||
          changeProtocolResult?.ProtocolContextName ||
          protocolResult?.ProtocolContextName ||
          mnpHandlingData?.ProtocolContextName
      ]
    }, [mnpHandlingData, createProtocolResult, changeProtocolResult, protocolResult])

  useEffect(() => {
    if (isMnpTypeAllowed && mnpHandlingData?.LineType && mnpHandlingData?.MNPType) {
      fetchProtocolStatusContext({
        lineType: mnpHandlingData?.LineType,
        mnpType: mnpHandlingData?.MNPType
      })
    }
  }, [isMnpTypeAllowed, mnpHandlingData])

  useEffect(() => {
    if (mnpHandlingData) {
      const { DocumentId, MNPType, QuestionaryId, IsGoodCall } = mnpHandlingData
      if (MNPType) {
        if (mnpHandlingData?.DocumentId) {
          fetchQuestionsHistory({ QuestionaryHistoryId: DocumentId, isMnp: true })
        } else {
          fetchMnpQuestionsList({ questionaryId: QuestionaryId })
        }
      }
      setGoodCall(!!IsGoodCall)
    }
  }, [mnpHandlingData])

  useEffect(() => {
    if (isMnpQuestionaryVisible && isCheckMnpPressed) {
      handleMnpOrderChecking()
    }
  }, [isMnpQuestionaryVisible])

  const handleStatusClick = useCallback(
    (protocolStatusKey, protocolContextKey) => {
      let protocolParams

      if ((isDelayedHandling && !handlingId) || (isHandlingOpenPressed && !(protocolStatusKey && protocolContextKey))) {
        protocolParams = { protocolStatusId: -1 }
      } else {
        const selectedProtocol = protocolListFull?.find(item => item.ProtocolStatusId === +protocolStatusKey)
        const selectedContext = selectedProtocol?.ProtocolContexts.find(
          item => item.ProtocolContextId === +protocolContextKey
        )

        protocolParams = {
          handlingId,
          protocolStatusId: selectedProtocol?.ProtocolStatusId,
          protocolContextId: selectedContext?.ProtocolContextId
        }
      }

      form
        .validateFields()
        .then(values => {
          const controlsWithData = getControlsWithData(controls, values)

          const order = {
            orderId: mnpHandlingData?.OrderId,
            orderStatusCode: mnpOrder?.OrderStatusCode ?? null,
            recipientOperatorCode: mnpOrder?.RecipientOperatorCode ?? null,
            recipientOperatorName: mnpOrder?.RecipientOperatorName ?? null,
            donorOperatorCode: mnpOrder?.DonorOperatorCode ?? null,
            donorOperatorName: mnpOrder?.DonorOperatorName ?? null,
            orderDate: mnpOrder?.OrderDate ?? null,
            contractDate: mnpOrder?.ContractDate ?? null,
            portingDate: mnpOrder?.PortingDate ?? null,
            rejectCode: mnpOrder?.RejectCode ?? null,
            orderIdCdbpn: mnpOrder?.OrderIdCDBPN ?? null
          }

          const params = {
            order,
            questions: controlsWithData,
            mnpDirection: mnpHandlingData?.MNPType,
            documentId: mnpHandlingData?.DocumentId || createProtocolResult?.DocumentId,
            lineType: mnpHandlingData?.LineType,
            msisdn,
            isGoodCall: isGoodCall
          }

          if (isDelayedHandling && protocolId) {
            changeDraftProtocol({
              protocolId,
              ...params,
              ...protocolParams
            })
          } else if (isHandlingOpenPressed && !(protocolStatusKey && protocolContextKey)) {
            changeDraftProtocol({
              protocolId,
              handlingId,
              ...params,
              ...protocolParams
            })
          } else if (!isDelayedHandling && handlingId) {
            protocol({
              isAutoProtocol: false,
              ...params,
              ...protocolParams
            })
          } else {
            createDraftProtocol({
              handlingId,
              ...params,
              ...protocolParams
            })
          }
        })
        .catch(() => {
          notification.error({
            message: 'Ошибка заполнения анкеты MNP',
            description: 'Заполните поля, выделенные красным'
          })
        })
    },
    [
      controls,
      protocolId,
      mnpHandlingData,
      protocolList,
      protocolListFull,
      handlingId,
      isHandlingOpenPressed,
      isDelayedHandling,
      isGoodCall,
      mnpOrder,
      createProtocolResult
    ]
  )

  const handleMnpOrderChecking = () => {
    if (cardMode !== cardModes.anonymous) {
      if (isDelayedHandling) {
        checkMnpHandling({ isOnDemand: true, isDelayedHandling: true })
      } else {
        checkMnpHandling({ isOnDemand: true })
      }
    }
  }

  const handleGoodCall = useCallback(() => {
    setGoodCall(!isGoodCall)
  }, [isGoodCall])

  const handleOnClose = useCallback(() => {
    if (mnpHandlingData?.LineType && mnpHandlingData?.MNPType) {
      fetchProtocolStatusContext({
        lineType: mnpHandlingData?.LineType,
        mnpType: mnpHandlingData?.MNPType
      })
    }
  }, [mnpHandlingData])

  const additional = useMemo(() => {
    if (isCheckMNPHandlingError) {
      return [{ content: <Tag color='default'>Заявление MNP не найдено</Tag> }]
    }

    let color = 'default'

    switch (protocolStatusId) {
      case protocolStatusIds.new:
        color = 'blue'
        break
      case protocolStatusIds.agreement:
        color = 'green'
        break
      case protocolStatusIds.callingBack:
        color = 'gold'
        break
      case protocolStatusIds.default:
        color = 'default'
        break
      case protocolStatusIds.wrongContact:
        color = 'volcano'
        break
      case protocolStatusIds.rejection:
        color = 'red'
        break
      case protocolStatusIds.conversationRejection:
        color = 'magenta'
        break
      case protocolStatusIds.doubleCancelation:
        color = 'orange'
        break
      default:
        color = 'default'
        break
    }

    let protocolStatusDisplay = protocolStatusName
    if (protocolStatusDisplay && protocolContextName) {
      protocolStatusDisplay += ' | ' + protocolContextName
    }

    return [{ content: <Tag color={color}>{protocolStatusDisplay ?? 'Не определен'}</Tag> }]
  }, [
    isMnpProtocolAvailable,
    protocolList,
    protocolListFull,
    protocolStatusId,
    protocolStatusName,
    protocolContextName,
    isCheckMNPHandlingError
  ])

  const isContentLoading = useMemo(
    () => isChangeProtocolLoading || isCreateProtocolLoading || isCheckMNPHandlingLoading || isProtocolLoading,
    [isChangeProtocolLoading, isCreateProtocolLoading, isCheckMNPHandlingLoading, isProtocolLoading]
  )

  const checkOrderStatusCode = code => {
    const statuses = [
      'recipientCancelled',
      'donorRejected',
      'transfered',
      'serverCancelled',
      'donorCancelled',
      'donorRejectedRecreated'
    ]

    return statuses.includes(code)
  }

  let defaultHidden
  if (mnpRights.isMnpOutReact && !mnpRights.isMnpSupport && !mnpRights.isGetCanceledMnpOrder) {
    defaultHidden = false
  } else if (mnpRights.isMnpSupport && checkOrderStatusCode(mnpHandlingData?.Marker?.OrderStatusCode)) {
    defaultHidden = true
  }

  const handleButtonClick = () => {
    if (isDelayedHandling && !handlingId) {
      handleStatusClick()
    } else {
      handleOnClose()
    }
  }

  useEffect(() => {
    if (isHandlingOpenPressed && handlingId) {
      handleStatusClick()
    }
  }, [handlingId, isHandlingOpenPressed])

  return isMnpTypeAllowed ? (
    <CardWrapper>
      <Card
        isWidgetsMargin
        header='Удержание абонента MNP'
        isContentLoading={isContentLoading}
        additional={additional}
        defaultHidden={defaultHidden}
        content={
          <Wrapper>
            {!isMnpProtocolAvailable && !isContentLoading && !isCheckMNPHandlingError ? (
              <>
                <MnpQuestionnaireForm
                  form={form}
                  saveMnpQuestionary={saveMnpQuestionary}
                  savedMnpQuestions={savedMnpQuestions}
                  hasInitialValues
                  dataSource={controls}
                  controlGroup={controlGroups}
                />
                <Footer>
                  <GoodCall>
                    <Switch checked={isGoodCall} onClick={handleGoodCall} />
                    <SwitchLabel>Хороший звонок</SwitchLabel>
                  </GoodCall>
                  {(!isDelayedHandling && handlingId) ? (
                    <Dropdown
                      placement='topCenter'
                      trigger='click'
                      overlay={
                        <OverlayWrapper>
                          {protocolListFull?.map(({ ProtocolStatusName, ProtocolStatusId, ProtocolContexts }) => (
                            <div key={ProtocolStatusId}>
                              <ProtocolStatusTitle>{ProtocolStatusName}</ProtocolStatusTitle>
                              <ProtocolContextWrapper>
                                {ProtocolContexts?.map(({ ProtocolContextId, ContextName }) => (
                                  <ContextItem
                                    key={ProtocolContextId}
                                    onClick={() => handleStatusClick(ProtocolStatusId, ProtocolContextId)}
                                  >
                                    {ContextName}
                                  </ContextItem>
                                ))}
                              </ProtocolContextWrapper>
                            </div>
                          ))}
                        </OverlayWrapper>
                      }
                    >
                      <Button
                        isContentLoading={isProtocolStatusContextLoading}
                        onClick={handleButtonClick}
                        type='primary'
                      >
                        Завершить
                      </Button>
                    </Dropdown>
                  ) : (
                    <Button onClick={handleButtonClick} type='primary'>
                      Сохранить
                    </Button>
                  )}
                </Footer>
              </>
            ) : (
              <Error>{checkMNPHandlingError ?? 'Заявление MNP не найдено'}</Error>
            )}
          </Wrapper>
        }
      />
      <CloseButton
        type='primary'
        icon={<CloseCircleTwoTone twoToneColor={'#BDBDBD'} />}
        onClick={() => toggleMnpQuestionary()}
      />
    </CardWrapper>
  ) : null
}

MnpQuestionnaire.propTypes = {
  cardMode: string,
  fetchProtocolStatusContext: func,
  protocolList: array,
  protocolListFull: array,
  fetchQuestionsHistory: func,
  mnpHandlingData: object,
  fetchMnpQuestionsList: func,
  mnpQuestionsList: object,
  handlingId: number,
  user: object,
  isCheckMNPHandlingError: bool,
  isProtocolStatusContextLoading: bool,
  isCheckMNPHandlingLoading: bool,
  checkMNPHandlingError: string,
  mnpQuestionsHistory: object,
  checkMnpHandling: func,
  isChangeProtocolLoading: bool,
  isCreateProtocolLoading: bool,
  msisdn: string,
  isMnpQuestionaryVisible: bool,
  isCheckMnpPressed: bool,
  saveMnpQuestionary: func,
  savedMnpQuestions: object,
  mnpOrder: object,
  toggleMnpQuestionary: func,
  createDraftProtocol: func,
  changeDraftProtocol: func,
  protocol: func,
  isHandlingOpenPressed: bool,
  queryParams: object,
  isProtocolLoading: bool,
  createProtocolResult: object,
  changeProtocolResult: object,
  protocolResult: object
}

const Wrapper = styled.div`
  padding: 0 21px;
`
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 12px;
`
const Error = styled.div`
  padding-bottom: 16px;
`
const OverlayWrapper = styled.div`
  padding: 16px 16px;
  border-radius: 10px;
  background: #fff;
  max-width: 400px;
  box-shadow: 5px 4px 24px 0px rgba(34, 60, 80, 0.2);
`
const ProtocolStatusTitle = styled.span`
  font-weight: bold;
`
const ProtocolContextWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
`
const ContextItem = styled.div`
  /* border: 1px solid #d9d9d9; */
  border-radius: 6px;
  width: fit-content;
  padding: 4px 15px;
  box-shadow: 0px 0px 10px 0px rgb(0 0 0 / 15%);
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  margin: 5px;
  :hover {
    background: #44caff;
    border-color: #44caff;
    cursor: pointer;
    color: #fff;
  }
`
const GoodCall = styled.div`
  display: flex;
  align-items: center;
`
const SwitchLabel = styled.label`
  padding: 0 10px;
`

const CardWrapper = styled.div`
  display: grid;
  margin-right: 30px;
  margin-bottom: 20px;
  grid-template-columns: auto 40px;
`
const CloseButton = styled(Button)`
  height: auto;
  border-radius: 10px;
  width: 40px;
  background: #eeeeee;
  border-color: #eeeeee;
  color: black;
  :hover {
    background: #eeeeee;
    border-color: #eeeeee;
    box-shadow: 0 0px 10px rgba(32, 33, 36, 0.2);
    color: black;
  }
  transition: box-shadow 0.3s ease-in-out;
`
