/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useEffect, useState } from 'react'
import { shape, func, arrayOf, string, bool, number } from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import { Form, Input, Button, Spin } from 'antd'
import { PaperClipOutlined, LoadingOutlined } from '@ant-design/icons'

import conversationPropType from 'constants/conversationPropType'
import { RichEditorForm } from 'components/RichEditorForm'
import TemplatesModal from '../../components/TemplatesModal'
import { Attachment } from '../../components/Attachment'

export default function Editor (props) {
  Editor.propTypes = {
    uploadMessageFiles: func,
    deleteMessageFiles: func,
    currentConversation: conversationPropType,
    toggleEditor: func,
    sendMessage: func,
    messageFiles: arrayOf(
      shape({
        DocumentId: string.isRequired,
        FileName: string.isRequired
      })
    ),
    cuvoLink: string,
    isUploadMessageFilesLoading: bool,
    fetchMessageTemplates: func,
    messageTemplates: arrayOf(
      shape({
        Body: string,
        CreatedBy: string,
        CreatedOn: string,
        IsActive: bool,
        IsDeleted: bool,
        MessageTemplateId: number,
        ModifiedBy: string,
        ModifiedOn: string,
        Name: string,
        SectionTemplateId: number,
        SectionTemplateName: string
      })
    )
  }

  const {
    currentConversation,
    sendMessage,
    uploadMessageFiles,
    deleteMessageFiles,
    toggleEditor,
    messageFiles,
    cuvoLink,
    isUploadMessageFilesLoading,
    fetchMessageTemplates,
    messageTemplates
  } = props

  const parentMessage = useSelector(state => {
    const incoming = state.twinspot.messages?.messages?.filter(message => message.IsIncoming)
    return incoming[incoming.length - 1]
  })

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ 'Body': { formatted: cuvoLink, plainText: cuvoLink } })
  }, [cuvoLink])

  const [isModalVisible, setModalVisible] = useState(false)

  const handleAdd = files => {
    if (files.length === 1) {
      const file = files[0]
      if (file.size / Math.pow(1024, 2) < 20) {
        window.URL.revokeObjectURL(files.preview)
        const customData = new FormData()
        customData.set('', file)
        uploadMessageFiles(customData)
      }
    }
  }

  const handleDelete = (fileId) => {
    const fileIndex = messageFiles.findIndex(file => file.FileId === fileId)
    deleteMessageFiles(fileIndex)
  }

  const handleSend = (_values, statusId) => {
    let param = {
      Channel: 'Exchange',
      ConversationId: currentConversation?.ConversationId,
      Body: form.getFieldValue('Body').formatted,
      TextBody: form.getFieldValue('Body').plainText,
      To: form.getFieldValue('To'),
      Cc: form.getFieldValue('Copy'),
      StatusId: statusId || 6,
      ParentMessageTechId: parentMessage?.MessageTechId
    }

    if (messageFiles.length) {
      param = { ...param,
        HasAttachments: true,
        Attachments: messageFiles.map(attachment => ({ FileId: attachment.FileId, FileName: attachment.FileName, ContentType: attachment.ContentType }))
      }
    }

    sendMessage(param)
    toggleEditor(false)
  }

  const handleTemplateSelect = (template) => {
    const text = form.getFieldValue('Body').formatted
    const templatedText = text.replace('', ''.concat(template.Body))

    form.setFieldsValue({ 'Body': { formatted: templatedText, plainText: templatedText } })
  }

  const formItemMargin = { marginBottom: '0' }
  const formItemToStyle = { display: 'inline-flex', width: 'calc(50% - 8px)' }
  const formItemToRules = [{ required: true, message: 'Отправитель обязателен' }]
  const formItemCopyStyle = { display: 'inline-flex', width: 'calc(50% - 8px)', margin: '0px 0 0 16px' }
  const spinStyle = { fontSize: 24 }
  const formItemBodyRules = [{ required: true, message: 'Необходимо ввести текст в тело письма для отправки' }]

  return (
    <Fragment>
      <TemplatesModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        messageTemplates={messageTemplates}
        handleTemplateSelect={handleTemplateSelect}
      />
      <Dropzone onDrop={files => handleAdd(files)} multiple={false} noClick>
        {({ getRootProps, getInputProps, open }) => (
          <Wrapper {...getRootProps()}>
            <input {...getInputProps()} />
            <Form form={form} onFinish={handleSend}>
              <Form.Item style={formItemMargin}>
                <Form.Item
                  initialValue={parentMessage?.From}
                  style={formItemToStyle}
                  label='Кому'
                  name='To'
                  rules={formItemToRules}
                >
                  <Input disabled data-cy='to' />
                </Form.Item>
                <Form.Item
                  initialValue={parentMessage?.Cc}
                  style={formItemCopyStyle}
                  label='Копия'
                  name='Copy'
                >
                  <Input data-cy='copy' />
                </Form.Item>
              </Form.Item>
              <Spin
                spinning={isUploadMessageFilesLoading}
                indicator={<LoadingOutlined style={spinStyle} spin />}
              >
                {!!messageFiles.length && (
                  <FilesBlock>
                    {messageFiles.map((file) => <Attachment FileName={file.FileName} AttachmentId={file.FileId} onDelete={() => handleDelete(file.FileId)} />)}
                  </FilesBlock>
                )}
              </Spin>
              <Form.Item
                name='Body'
                rules={formItemBodyRules}
              >
                <RichEditorForm data-cy='editor' />
              </Form.Item>
              <Footer>
                <StyledButton htmlType='submit' type='primary'>
                  Отправить
                </StyledButton>
                {/* TODO: Phase 2 */}
                {/* <StyledButton onClick={() => handleSend(null, 4)}>Сохранить как черновик</StyledButton> */}
                <StyledButton onClick={() => toggleEditor(false)}>Отмена</StyledButton>
                <StyledButton icon={<PaperClipOutlined />} onClick={open}>
                  Прикрепить файл
                </StyledButton>
                <Button
                  onClick={() => {
                    fetchMessageTemplates({ isActive: true })
                    setModalVisible(true)
                  }}
                >
                  Шаблоны
                </Button>
              </Footer>
            </Form>
          </Wrapper>
        )}
      </Dropzone>
    </Fragment>
  )
}

const Wrapper = styled.div`
  padding: 24px;
  background: white;
  border-bottom: 2px #e7e7f0 solid;
`
const Footer = styled.div`
  display: flex;
`
const StyledButton = styled(Button)`
  margin-right: 8px;
`
const FilesBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
`
