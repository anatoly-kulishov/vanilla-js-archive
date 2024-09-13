import React from 'react'
import styled from 'styled-components'
import { Upload, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { Title } from 'webseller/components'
import { acceptableUploadFormats } from 'webseller/helpers'

export default function UploadDocuments ({
  title = 'Отсканируй и загрузи подписанные документы',
  accept = acceptableUploadFormats,
  maxCount,
  documents,
  addDocument,
  removeDocument
}) {
  const customRequest = ({ file, onSuccess, onError }) => {
    const isAlreadyAdded = documents.find(({ name }) => name === file.name)
    const isAllDocumentsUploaded = maxCount === documents?.length
    if (!isAlreadyAdded && !isAllDocumentsUploaded) {
      addDocument(file)
      onSuccess()
      return
    }
    if (isAlreadyAdded) {
      notification.error({
        message: 'Файл с таким именем уже был добавлен'
      })
    }
    if (isAllDocumentsUploaded) {
      notification.error({
        message: 'Необходимые файлы уже добавлены'
      })
    }
    onError()
  }

  const onRemove = file => {
    removeDocument(file.uid)
  }

  return (
    <div>
      <Upload.Dragger accept={accept} fileList={documents} customRequest={customRequest} onRemove={onRemove}>
        <Icon>
          <UploadOutlined />
        </Icon>
        <Title style={{ textAlign: 'center' }} fontSize={16}>{title}</Title>
      </Upload.Dragger>
    </div>
  )
}

const Icon = styled.span`
  font-size: 24px;
`
