import React, { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { Upload, Checkbox } from 'antd'
import { UploadOutlined, FileOutlined } from '@ant-design/icons'
import { Button, Title } from 'webseller/components'
import { IconPhone } from 'webseller/icons'
import { acceptableUploadFormats, checkRightWithOperations } from 'webseller/helpers'

export default function SmevPartialSuccess ({
  permissions,
  isExistsIdentityDoc,
  uploadingDocument,
  isLoadingCheckSimSaleAvailability,
  uploadDocumentError,
  uploadSmevDocument,
  checkSimSaleAvailability,
  onEdit,
  resetSaleSimProcess,
  cancelGetExistingPersonalData
}) {
  const [documentScan, setDocumentScan] = useState(null)
  const [isClientRefuse, setIsClientRefuse] = useState(false)

  useLayoutEffect(() => {
    if (isExistsIdentityDoc) {
      checkSimSaleAvailability()
    }
  }, [isExistsIdentityDoc])

  const isEnabledSubmit = isExistsIdentityDoc || isClientRefuse || documentScan
  const isLoadingNextStep = isClientRefuse ? isLoadingCheckSimSaleAvailability : uploadingDocument

  const isAllowToGetExistingPersonalData = checkRightWithOperations({
    permissions,
    permissionName: 'AS.SimWebSell',
    operationName: 'R'
  })

  const onChangeIsClientRefuse = e => {
    setIsClientRefuse(e.target.checked)
  }

  const goForward = () => {
    cancelGetExistingPersonalData()

    if (isClientRefuse) {
      checkSimSaleAvailability()
    } else {
      uploadSmevDocument(documentScan)
    }
  }

  if (uploadDocumentError) {
    return (
      <Container>
        <Title align={'center'} bold fontSize={16}>
          Не удалось загрузить документ
        </Title>
        <Footer>
          <Button type='primary' onClick={resetSaleSimProcess}>
            Завершить
          </Button>
        </Footer>
      </Container>
    )
  }

  return (
    <Container>
      <Title bold fontSize={16}>
        Данные подтверждены частично
      </Title>
      <Title>
        {`Для продолжения оформления договора приложи скан документа абонента${isAllowToGetExistingPersonalData ? ' или отсканируй в приложении AppSeller' : ''}`}
      </Title>
      <Main gutter={16}>
        <Column>
          <ColumnHeader bold fontSize={16}>
            Загрузи изображение
          </ColumnHeader>
          <ColumnMain>
            <Upload.Dragger
              disabled={isLoadingNextStep}
              iconRender={() => <FileOutlined />}
              maxCount={1}
              customRequest={() => { }}
              onChange={({ fileList }) => setDocumentScan(fileList?.[0])}
              accept={acceptableUploadFormats}
            >
              <UploadOutlined />
              <Title align={'center'} fontSize={16}>
                Загрузите скан документа
              </Title>
            </Upload.Dragger>
          </ColumnMain>
        </Column>
        {isAllowToGetExistingPersonalData && (
          <Column>
            <ColumnHeader bold fontSize={16}>
              Используй AppSeller
            </ColumnHeader>
            <ColumnMain>
              <IconWrapper>
                <IconPhone />
              </IconWrapper>
            </ColumnMain>
          </Column>
        )}
      </Main>
      <FooterContainer>
        <Checkbox checked={isClientRefuse} onChange={onChangeIsClientRefuse}>
          Клиент отказался
        </Checkbox>
        <Footer justifyContent='space-between'>
          <Button disabled={isLoadingNextStep} onClick={onEdit}>
            Назад
          </Button>
          <Button type='primary' disabled={!isEnabledSubmit} loading={isLoadingNextStep} onClick={goForward}>
            Продолжить
          </Button>
        </Footer>
      </FooterContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  gap: 16px;
`

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ColumnHeader = styled(Title)`
  margin-bottom: 10px;
`

const ColumnMain = styled.div`
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const FooterContainer = styled.div`
  padding-top: 20px;
`

const Footer = styled.div`
  display: flex;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-end')};
  align-items: center;
  margin-top: 10px;
`
