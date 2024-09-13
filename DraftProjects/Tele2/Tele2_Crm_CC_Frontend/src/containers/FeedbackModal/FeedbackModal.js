/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useEffect, Fragment, useMemo, useCallback } from 'react'
import { get, isEmpty } from 'lodash'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'
import html2canvas from 'html2canvas'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

import { AudioOutlined } from '@ant-design/icons'

import { Modal, Button, Spin, notification, Select, Input } from 'antd'
import Dropzone from 'react-dropzone'

import LoadingSpinner from 'components/LoadingSpinner'
import TextAreaWithCounter from 'components/TextAreaWithCounter'
import RatingMenu from 'containers/RatingMenu'
import FileContainer from '../../components/FileContainer'

import { b64toBlob } from 'utils/helpers'
import { Recorder } from 'utils/helpers/recordHelper'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { FEEDBACK_MODAL } from 'constants/logModalNames'

import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import { createBroadbandDescription } from './helpers'
const { feedbackFeatureId } = ratingFeatureIds

let recorder = null

function FeedbackModal (props) {
  const {
    state,
    user,
    filesState,
    uploadFile,
    deleteFile,

    isToggled,
    feedbackModalClose,
    getFeedbackTypes,
    getFeedbackComponents,
    getFeedbackTemplates,
    feedbackTypes,
    feedbackComponents,
    feedbackTemplates,
    fetchSessionFiles,

    msisdn,
    subscriberId,
    prefilledData,

    sendFeedback,
    cancelFeedback,
    isFeedbackSending,
    isFeedbackCanceling,

    recognizeVoice,
    voiceRecognition
  } = props

  const [selectedType, setSelectedType] = useState(+sessionStorage.getItem('feedbackType') || null)
  const [feedbackDescription, setDescription] = useState(sessionStorage.getItem('feedbackDescription') || '')
  const [SessionId, setSessionId] = useState(sessionStorage.getItem('SessionId') || null)
  const [isRecordering, setRecordering] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState(null)

  const { files, isFileLoading } = filesState

  useEffect(() => {
    getFeedbackTypes()
    getFeedbackComponents()
    if (!SessionId) {
      const guid = uuid()
      sessionStorage.setItem('SessionId', guid)
      setSessionId(guid)
      handleSnapshot(guid)
    } else {
      selectedType && getFeedbackTemplates({ TypeId: selectedType })
      fetchSessionFiles({ SessionId, getFileContent: false })
    }
  }, [])

  useEffect(() => {
    const { text } = voiceRecognition
    setDescription(feedbackDescription + text)
  }, [voiceRecognition.text])

  useEffect(() => {
    if (selectedType) {
      getFeedbackTemplates({ TypeId: selectedType })
    }
  }, [selectedType])

  const templateText = feedbackTemplates.at(0)?.TemplateText
  useEffect(() => {
    if (templateText) {
      setDescription(templateText)
    }
  }, [templateText])

  useEffect(() => {
    if (!isEmpty(prefilledData)) {
      if (selectedType === 1 && selectedComponent === 1) {
        const description = createBroadbandDescription(prefilledData)
        setDescription(description)
      }
    }
  }, [selectedType, prefilledData, selectedComponent])

  const handleRequiredFiles = () => {
    const currentType = feedbackTypes.filter(type => type.Id === selectedType)
    let filesRequired
    if (currentType.length) {
      const type = currentType[0]
      if (type.IsScreenshotNeeded && !type.IsFrontEndLogNeeded) {
        filesRequired = 2
      } else if (type.IsFrontEndLogNeeded && !type.IsScreenshotNeeded) {
        filesRequired = 1
      } else if (!type.IsFrontEndLogNeeded && !type.IsScreenshotNeeded) {
        filesRequired = null
      } else if (type.IsFrontEndLogNeeded && type.IsScreenshotNeeded) {
        filesRequired = 'both'
      }
    }
    return filesRequired
  }

  const handleScreenshot = (username, time, SessionId) => {
    const config = { async: true, foreignObjectRendering: true, scale: 2 }

    html2canvas(document.body, config).then(canvas => {
      // Generate the base64 representation of the canvas
      const base64image = canvas.toDataURL('image/png')
      // Split the base64 string in data and contentType
      const block = base64image.split(';')
      // Get the content type
      const mimeType = block[0].split(':')[1] // In this case "image/png"
      // get the real base64 content of the file
      const realData = block[1].split(',')[1] // For example:  iVBORw0KGgouqw23....
      // Convert b64 to blob and store it into a variable (with real base64 as value)
      const canvasBlob = b64toBlob(realData, mimeType)

      const imageData = new FormData()
      imageData.set('File', canvasBlob, `${window.location.host}-${username}-${time}.png`)
      imageData.set('SessionId', SessionId)
      imageData.set('FileType', 2)

      uploadFile(imageData)
    })
  }

  const handleLog = (state, username, time, SessionId) => {
    const json = JSON.stringify({ url: window.location, state })
    const stateLog = new File([json], `${window.location.host}-${username}-${time}.json`, {
      type: 'application/json'
    })

    const logData = new FormData()
    logData.set('File', stateLog)
    logData.set('SessionId', SessionId)
    logData.set('FileType', 1)

    uploadFile(logData)
  }

  const handleSnapshot = SessionId => {
    const time = moment().format('HH:mm:ss-DD.MM.YYYY')

    const username = user?.displayName?.replace(' ', '-') ?? ''

    handleLog(state, username, time, SessionId)
    handleScreenshot(username, time, SessionId)
  }

  const handleAdd = files => {
    // Check file
    if (files.length === 1) {
      const file = get(files, '0')
      // check file size
      if (file.size / Math.pow(1024, 2) < 2) {
        window.URL.revokeObjectURL(files.preview) // to avoid memory leaks
        const customData = new FormData()
        customData.set('File', file)
        customData.set('SessionId', SessionId)
        uploadFile(customData)
      } else {
        notification.info({
          message: 'Обратная связь. Добавление файлов',
          description: 'Размер файла не должен превышать 2 Мб'
        })
      }
    } else {
      notification.info({
        message: 'Обратная связь. Добавление файлов',
        description: 'Возможно добавление файлов только по одному'
      })
    }
  }

  const deleteFeedback = useCallback(() => {
    const feedback = ['feedbackType', 'feedbackDescription', 'SessionId']
    for (const field of feedback) {
      sessionStorage.removeItem(field)
    }
  }, [])

  const handleSubmit = useCallback(() => {
    const message = 'Обратная связь. Submit'
    if (!selectedType) {
      notification.warning({
        message: message,
        description: 'Пожалуйста, определите тип обратной связи'
      })
      return
    }
    if (selectedType === 1 && !selectedComponent) {
      notification.warning({
        message: message,
        description: 'Пожалуйста, выберите компонент, в котором возникла проблема'
      })
      return
    }
    if (!feedbackDescription) {
      notification.warning({
        message: message,
        description: 'Пожалуйста, добавьте описание обратной связи'
      })
      return
    }

    const { contactCentreName } = user
    deleteFeedback()
    sendFeedback({
      SessionId,
      TypeId: selectedType,
      Content: feedbackDescription,
      CallCenter: contactCentreName,
      Msisdn: msisdn,
      SubscriberId: subscriberId?.toString(),
      FunctionalComponentId: selectedComponent ?? 0
    })
  }, [selectedType, selectedComponent, feedbackDescription, user, msisdn, subscriberId, deleteFeedback, sendFeedback])

  const handleCancel = useCallback(() => {
    const { confirm } = Modal
    confirm({
      title: 'Закрыть без сохранения?',
      content: 'После подтверждения вся предоставленная информация будет утеряна.',
      onOk () {
        cancelFeedback({ FeedbackSessionId: SessionId?.toString() })
        deleteFeedback()
      }
    })
  }, [cancelFeedback, deleteFeedback, SessionId])

  const draftFeedback = () => {
    sessionStorage.setItem('feedbackType', selectedType)
    sessionStorage.setItem('feedbackDescription', feedbackDescription)
    feedbackModalClose()
    logIfEnabled({ type: MODAL_CLOSE, log: FEEDBACK_MODAL })
  }

  useEffect(() => {
    if (isToggled) {
      logIfEnabled({ type: MODAL_OPEN, log: FEEDBACK_MODAL })
    }
  }, [isToggled])

  const handleStop = async () => {
    const { audioBlob } = await recorder.stop()
    recognizeVoice(audioBlob)
    setRecordering(recorder.recording())
  }

  const handleRecord = async () => {
    recorder = await Recorder()
    recorder.start()
    setRecordering(recorder.recording())
  }

  const handleTypeChange = useCallback(
    value => {
      setSelectedType(value)
    },
    [setSelectedType]
  )

  const handleComponentChange = useCallback(
    value => {
      setSelectedComponent(value)
    },
    [setSelectedComponent]
  )

  const typesOptions = useMemo(() => feedbackTypes.map(type => ({ label: type.Name, value: type.Id })), [feedbackTypes])

  const componentsOptions = useMemo(
    () => feedbackComponents.map(component => ({ label: component.Name, value: component.Id })),
    [feedbackComponents]
  )

  const isComponentsVisible = useMemo(() => selectedType === 1, [selectedType])

  const renderFooter = () => (
    <Fragment>
      <Button onClick={handleCancel} type='button' disabled={isFeedbackSending || isFeedbackCanceling}>
        Отменить
      </Button>
      <Button onClick={handleSubmit} type='primary' disabled={isFeedbackSending || isFeedbackCanceling}>
        Отправить
      </Button>
    </Fragment>
  )

  return (
    <ModalWrapper
      title={
        <Header>
          <HeaderTitle>Обратная связь</HeaderTitle>
          <RatingWrapper>
            <RatingMenu currentFeatureId={feedbackFeatureId} />
          </RatingWrapper>
        </Header>
      }
      visible={isToggled}
      footer={renderFooter()}
      onCancel={draftFeedback}
      data-html2canvas-ignore
    >
      <Wrapper>
        <Label>
          Тип обратной связи
          <StyledSelect
            options={typesOptions}
            value={selectedType}
            placeholder='Выберите тип обратной связи'
            onChange={handleTypeChange}
          />
        </Label>
        {isComponentsVisible && (
          <Label>
            Компонент
            <StyledSelect
              options={componentsOptions}
              placeholder='Выберите компонент, в котором возникла проблема'
              onChange={handleComponentChange}
            />
          </Label>
        )}
        <Label>
          MSISDN
          <StyledInput value={msisdn} disabled={!!msisdn} />
        </Label>
        <Label>Описание</Label>
        <Fragment>
          <VoiceInput isRecordering={isRecordering}>
            {isRecordering ? (
              <StopButton onClick={handleStop} shape='circle'>
                <StopIcon />
              </StopButton>
            ) : (
              <Button onClick={handleRecord} shape='circle' icon={<AudioOutlined />} type='primary' />
            )}
          </VoiceInput>
          <Spin spinning={voiceRecognition.isVoiceReconizing} indicator={<LoadingSpinner />}>
            <TextAreaWithCounter
              value={feedbackDescription}
              onChange={evt => setDescription(evt.target.value)}
              maxLength={4000}
              rows={8}
            />
          </Spin>
        </Fragment>
        <Label>Файлы</Label>
        <Dropzone onDrop={files => handleAdd(files)} multiple={false}>
          {({ getRootProps, getInputProps, isDragActive, open }) => (
            <UploadZone {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <Overlay>
                  <Tip>Добавляйте файлы по одному. Размер каждого не должен превышать 2 Мб.</Tip>
                  <div>Перетащите файл сюда</div>
                </Overlay>
              ) : (
                <ActiveOverlay id='dropzone-active'>
                  <Title>Нажмите сюда для добавления файла или перетащите его</Title>
                </ActiveOverlay>
              )}
            </UploadZone>
          )}
        </Dropzone>
        <Spin spinning={isFileLoading} indicator={<LoadingSpinner spin />}>
          <FileContainer
            filesRequired={handleRequiredFiles()}
            files={files}
            deleteFile={deleteFile}
            sessionId={SessionId}
            fetchSessionFiles={fetchSessionFiles}
          />
        </Spin>
      </Wrapper>
    </ModalWrapper>
  )
}

export default FeedbackModal

FeedbackModal.propTypes = {
  state: PropTypes.object,
  user: PropTypes.object,
  uploadFile: PropTypes.func,
  filesState: PropTypes.object,
  deleteFile: PropTypes.func,

  isToggled: PropTypes.bool,
  feedbackModalClose: PropTypes.func,
  getFeedbackTypes: PropTypes.func,
  getFeedbackComponents: PropTypes.func,
  getFeedbackTemplates: PropTypes.func,
  feedbackTypes: PropTypes.array,
  feedbackComponents: PropTypes.array,
  feedbackTemplates: PropTypes.array,
  fetchSessionFiles: PropTypes.func,

  msisdn: PropTypes.string,
  subscriberId: PropTypes.number,
  prefilledData: PropTypes.object,

  sendFeedback: PropTypes.func,
  cancelFeedback: PropTypes.func,
  isFeedbackSending: PropTypes.bool,
  isFeedbackCanceling: PropTypes.bool,

  recognizeVoice: PropTypes.func,
  voiceRecognition: PropTypes.object
}

const ModalWrapper = styled(Modal)`
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-body {
    padding: 0;
  }
`
const Wrapper = styled.div`
  padding: 10px 16px;
  margin-bottom: 15px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`

const HeaderTitle = styled.span`
  font-weight: bold;
`

const RatingWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 56px;
  padding: 17px 10px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin: 0;
  line-height: 36px;
`
const UploadZone = styled.div`
  margin-bottom: 8px;
`
const Overlay = styled.div`
  padding: 20px 10px;
  border: 1px solid lightgray;
  border-radius: 4px;
  transition: border-color 0.1s ease-in-out;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
`
const ActiveOverlay = styled(Overlay)`
  border-color: #40bfee;
`
const Title = styled.div`
  border: none;
  background-color: white;
  outline: none;
`

const Tip = styled.div`
  font-size: 12px;
  color: #afafaf;
  font-weight: normal;
  margin-bottom: 5px;
  pointer-events: none;
`
const VoiceInput = styled.div`
  position: absolute;
  padding: 7px 12px;
  padding-left: auto;
  right: 10px;
  z-index: 1;
`
const StopButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`
const pulse = keyframes`
  0%, 100% {
    background-color: red;
  }
  50% {
    background-color: #fb8686;
  }
`
const StopIcon = styled.div`
  animation: ${pulse} 3s infinite;
  height: 12px;
  width: 12px;
  border-radius: 3px;
  background-color: white;
`

const StyledSelect = styled(Select)`
  width: 100%;

  &.ant-select > div.ant-select-selector {
    border: 1px solid #44caff;
  }
`

const StyledInput = styled(Input)`
  border: 1px solid #44caff;
`
