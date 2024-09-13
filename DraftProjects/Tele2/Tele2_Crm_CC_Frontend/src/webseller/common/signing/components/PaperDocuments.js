import React, { Fragment, useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { Checkbox } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

import { Button, Modal, Textarea, Title, UploadDocuments } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { downloadFile } from 'webseller/helpers'

export default function PaperDocuments ({
  isNeedToUploadSignedDocuments,
  isShowCommentary = false,
  title = 'Документы для подписания',
  titleUpload,
  documents,
  requiredCountOfSignedDocuments,
  signedDocuments,
  isLoadingGetDocuments,
  getDocuments,
  submitSigning,
  cancelGetDocuments,
  addSignedDocument,
  removeSignedDocument,
  changeCommentary,
  goBack
}) {
  const [isSigningСonfirmed, setIsSigningСonfirmed] = useState(false)
  const [isShowCancelGetDocumentsConfirmationModal, setIsShowCancelGetDocumentsConfirmationModal] = useState(false)

  useLayoutEffect(() => {
    getDocuments()
  }, [])

  const isAllSignedDocumentsUploaded = requiredCountOfSignedDocuments
    ? requiredCountOfSignedDocuments === signedDocuments?.length
    : documents?.length === signedDocuments?.length
  const isAvailableSubmit = isNeedToUploadSignedDocuments ? isAllSignedDocumentsUploaded : isSigningСonfirmed

  const toggleIsSigningСonfirmed = () => {
    setIsSigningСonfirmed(!isSigningСonfirmed)
  }

  const openDocument = e => {
    const { url, filename } = e.currentTarget.dataset
    downloadFile(url, `${filename}.pdf`)
  }

  const showCancelGetDocumentsConfirmationModal = () => {
    setIsShowCancelGetDocumentsConfirmationModal(true)
  }

  const closeCancelGetDocumentsConfirmationModal = () => {
    setIsShowCancelGetDocumentsConfirmationModal(false)
  }

  const submitCancelGetDocuments = () => {
    cancelGetDocuments()
    closeCancelGetDocumentsConfirmationModal()
  }

  const onChangeCommentary = e => {
    changeCommentary(e.target.value)
  }

  return (
    <Fragment>
      {isShowCancelGetDocumentsConfirmationModal && isLoadingGetDocuments && (
        <Modal
          width={360}
          zIndex={1002}
          footer={[
            <Button onClick={submitCancelGetDocuments}>Да</Button>,
            <Button type='primary' onClick={closeCancelGetDocumentsConfirmationModal}>
              Нет
            </Button>
          ]}
          onCancel={closeCancelGetDocumentsConfirmationModal}
        >
          <Title>Вы уверены, что хотите отменить формирование документов на подпись?</Title>
        </Modal>
      )}
      {isLoadingGetDocuments ? (
        <LoadingContainer>
          <Title bold fontSize={16}>
            Формирование списка документов на подпись...
          </Title>
          <Button onClick={showCancelGetDocumentsConfirmationModal}>Отменить</Button>
        </LoadingContainer>
      ) : (
        <Container>
          <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
            {title}
          </Title>
          <Main>
            <Documents>
              {documents?.map(({ title, url }) => (
                <Document key={url} data-url={url} data-filename={title} onClick={openDocument}>
                  <Title bold fontSize={16}>
                    {title}
                  </Title>
                  <Icon>
                    <DownloadOutlined />
                  </Icon>
                </Document>
              ))}
            </Documents>
            {isNeedToUploadSignedDocuments ? (
              <UploadDocuments
                title={titleUpload}
                maxCount={requiredCountOfSignedDocuments || documents?.length}
                documents={signedDocuments}
                addDocument={addSignedDocument}
                removeDocument={removeSignedDocument}
              />
            ) : (
              <Checkbox
                checked={isSigningСonfirmed}
                disabled={isLoadingGetDocuments}
                onClick={toggleIsSigningСonfirmed}
              >
                Я подтверждаю, что документы подписаны сторонами
              </Checkbox>
            )}
            {isShowCommentary && (
              <Textarea style={{ marginTop: 16 }} rows={1} placeholder='Комментарий' onChange={onChangeCommentary} />
            )}
          </Main>
          <Footer>
            <Button onClick={goBack}>Назад</Button>
            <Button
              type='primary'
              loading={isLoadingGetDocuments}
              disabled={!isAvailableSubmit}
              onClick={submitSigning}
            >
              Продолжить
            </Button>
          </Footer>
        </Container>
      )}
    </Fragment>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 100%;
  width: 60%;
  max-width: 600px;
`

const Main = styled.div`
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
`

const Documents = styled.div``

const Document = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Icon = styled.span`
  font-size: 24px;
`
