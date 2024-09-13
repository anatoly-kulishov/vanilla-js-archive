import React, { useState, useLayoutEffect, Suspense } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Tooltip, Form, Row, Col, Dropdown, Menu as DropdownMenu } from 'antd'
import Icon, {
  UserOutlined,
  UpOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  FrownOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { StepOfChangingActiveSalesOffice } from 'reducers/salesOffice/salesOfficeReducer'
import { Input, Button, Modal } from 'webseller/components'
import { useAuth } from 'oidc-react'
import { MoreSvg } from 'assets/index'
import featureConfig from 'webseller/featureConfig'
import store from 'utils/createdStore'

const SalesOffice = React.lazy(() => import('websellerRemote/SalesOffice'))

const WebSellerHeader = ({
  user,
  activeSalesOffice,
  stepOfChangingActiveSalesOffice,
  potentialActiveSalesOfficeInfo,
  isLoadingGetPotentialActiveSalesOffice,
  isLoadingChangeActiveSalesOffice,
  errorChangeActiveSalesOffice,
  setStepOfChangingActiveSalesOffice,
  getPotentialActiveSalesOfficeInfo,
  resetStateChangingActiveSalesOffice,
  changeActiveSalesOffice
}) => {
  const [isShowControlsRow, setIsShowControlsRow] = useState(true)

  const [form] = Form.useForm()

  const { userManager, signOutRedirect } = useAuth()

  useLayoutEffect(() => {
    const salesOfficeId = activeSalesOffice?.salesOfficeId
    if (salesOfficeId) {
      form.setFieldsValue({ officeId: salesOfficeId })
    }
  }, [activeSalesOffice?.salesOfficeId])

  const toggleShowControlsRow = () => {
    setIsShowControlsRow(prev => !prev)
  }

  const openChangeOfficeModal = () => {
    setStepOfChangingActiveSalesOffice(StepOfChangingActiveSalesOffice.DATA_INPUT)
    resetStateChangingActiveSalesOffice()
    form.setFieldsValue({ officeId: activeSalesOffice?.salesOfficeId })
  }

  const closeAnyModal = () => {
    setStepOfChangingActiveSalesOffice(StepOfChangingActiveSalesOffice.NONE)
    resetStateChangingActiveSalesOffice()
    form.setFieldsValue({ officeId: activeSalesOffice?.salesOfficeId })
  }

  const onSubmitCheckSalesOfficeInfo = ({ officeId }) => {
    getPotentialActiveSalesOfficeInfo(officeId)
  }

  const onSubmitChangeActiveSalesOffice = () => {
    changeActiveSalesOffice({
      newOfficeId: potentialActiveSalesOfficeInfo.officeId,
      refreshTokens: userManager.revokeTokens.bind(userManager)
    })
  }

  return (
    <TopNav>
      {stepOfChangingActiveSalesOffice === StepOfChangingActiveSalesOffice.DATA_INPUT && (
        <Modal title='Торговая точка' zIndex={1001} width={420} onCancel={closeAnyModal}>
          <Form form={form} onFinish={onSubmitCheckSalesOfficeInfo}>
            <FormItemsWrapper>
              <Form.Item
                name='officeId'
                rules={[
                  { pattern: /^\d*$/, message: 'Недопустимое значение' },
                  { required: true, message: 'Обязательный параметр' }
                ]}
              >
                <InputStyled
                  disabled={isLoadingGetPotentialActiveSalesOffice}
                  suffix={
                    <Tooltip
                      zIndex={1002}
                      title='Уточните номер вашей торговой точки у торгового представителя Tele2 или вашего дилера'
                    >
                      <QuestionCircleOutlined style={{ color: 'grey' }} />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </FormItemsWrapper>
            <ButtonsContainer>
              <Button type='text' onClick={closeAnyModal}>
                Отменить
              </Button>
              <Button type='primary' htmlType='submit' loading={isLoadingGetPotentialActiveSalesOffice}>
                Изменить торговую точку
              </Button>
            </ButtonsContainer>
          </Form>
        </Modal>
      )}
      {stepOfChangingActiveSalesOffice === StepOfChangingActiveSalesOffice.SUBMIT && (
        <Modal
          title='Проверь адрес новой торговой точки'
          zIndex={1001}
          width={416}
          footer={
            <ButtonsContainer>
              <Button type='text' onClick={openChangeOfficeModal}>
                Отменить
              </Button>
              <Button
                type='primary'
                loading={isLoadingChangeActiveSalesOffice}
                onClick={onSubmitChangeActiveSalesOffice}
              >
                Подтвердить изменения
              </Button>
            </ButtonsContainer>
          }
          onCancel={closeAnyModal}
        >
          <p>
            Адрес торговой точки {potentialActiveSalesOfficeInfo.officeId}: {potentialActiveSalesOfficeInfo.fullAddress}
          </p>
        </Modal>
      )}
      {stepOfChangingActiveSalesOffice === StepOfChangingActiveSalesOffice.SUCCESS && (
        <Modal
          zIndex={1001}
          width={370}
          footer={
            <Button type='primary' onClick={closeAnyModal}>
              Готово
            </Button>
          }
          onCancel={closeAnyModal}
        >
          <StyledModalBodyCentered>
            <ResultIconWrapper>
              <CheckCircleOutlined />
            </ResultIconWrapper>
            <StyledModalTitle>Торговая точка изменена</StyledModalTitle>
          </StyledModalBodyCentered>
        </Modal>
      )}
      {stepOfChangingActiveSalesOffice === StepOfChangingActiveSalesOffice.FAILURE && (
        <Modal
          zIndex={1001}
          width={370}
          footer={
            <Button type='primary' onClick={closeAnyModal}>
              Завершить
            </Button>
          }
          onCancel={closeAnyModal}
        >
          <StyledModalBodyCentered>
            <ResultIconWrapper>
              <FrownOutlined />
            </ResultIconWrapper>
            <StyledModalTitle>Не удалось сменить торговую точку</StyledModalTitle>
            <span>{errorChangeActiveSalesOffice}</span>
          </StyledModalBodyCentered>
        </Modal>
      )}
      <MainRow>
        <Tooltip placement='bottom' title={user.DisplayName}>
          <IconWrapper>
            <UserOutlined />
          </IconWrapper>
        </Tooltip>
        <ExpandRowBtn disabled={!activeSalesOffice} onClick={toggleShowControlsRow}>
          <IconWrapper style={{ fontSize: 9 }}>{isShowControlsRow ? <UpOutlined /> : <DownOutlined />}</IconWrapper>
        </ExpandRowBtn>
        <Dropdown
          trigger='click'
          overlay={
            <DropdownMenu>
              <DropdownMenu.Item onClick={signOutRedirect}>
                <LogoutOutlined />
                <span>Выйти</span>
              </DropdownMenu.Item>
            </DropdownMenu>
          }
        >
          <a onClick={event => event.preventDefault()}>
            <IconWrapper style={{ fontSize: 18 }}>
              <Icon component={MoreSvg} />
            </IconWrapper>
          </a>
        </Dropdown>
      </MainRow>
      {isShowControlsRow && (
        <Row gutter={[56, 19]}>
          <Col span={3} />
          <Col span={18}>
            <Controls>
              {featureConfig.isUseRemoteSalesOffice ? (
                <Suspense fallback={null}>
                  <SalesOffice store={store} />
                </Suspense>
              ) : (
                <SaleOfficeBtn onClick={openChangeOfficeModal}>
                  <SaleOfficeBtnValue>{activeSalesOffice?.salesOfficeId || '-'}</SaleOfficeBtnValue>
                  <SaleOfficeBtnLabel>Торговая точка</SaleOfficeBtnLabel>
                </SaleOfficeBtn>
              )}
            </Controls>
          </Col>
          <Col span={3} />
        </Row>
      )}
    </TopNav>
  )
}

WebSellerHeader.propTypes = {
  user: PropTypes.object,
  activeSalesOffice: PropTypes.object,
  stepOfChangingActiveSalesOffice: PropTypes.number,
  potentialActiveSalesOfficeInfo: PropTypes.object,
  isLoadingGetPotentialActiveSalesOffice: PropTypes.bool,
  isLoadingChangeActiveSalesOffice: PropTypes.bool,
  errorChangeActiveSalesOffice: PropTypes.string,
  setStepOfChangingActiveSalesOffice: PropTypes.func,
  getPotentialActiveSalesOfficeInfo: PropTypes.func,
  resetStateChangingActiveSalesOffice: PropTypes.func,
  changeActiveSalesOffice: PropTypes.func
}

const TopNav = styled.div`
  background-color: #24272d;
  width: 100%;
  z-index: 1;
`

const MainRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-tems: center;
  padding: 25px;
`

const FormItemsWrapper = styled.div`
  height: 76px;
`

const Controls = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 11px;
  padding: 25px;
`

const ExpandRowBtn = styled.button`
  background-color: transparent;
  border: none;
`

const SaleOfficeBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 78px;
  width: 190px;
  padding: 16px;
  border-radius: 12px;
  background-color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #d9f5ff;
  }
`

const SaleOfficeBtnLabel = styled.p`
  margin: 0;
  padding: 0;
  color: #000;
  font-family: T2_Rooftop_Regular;
  font-size: 14px;
  font-weight: 400;
`

const SaleOfficeBtnValue = styled.p`
  margin: 0;
  padding: 0;
  color: #000;
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 18px;
`

const IconWrapper = styled.div`
  display: inline-block;
  color: white;
  text-align: center;
  text-decoration: none;
  font-weight: normal;
  font-size: 18px;
`

const StyledModalTitle = styled.p`
  margin: 0;
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 18px;
`

const StyledModalBodyCentered = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

const InputStyled = styled(Input)`
  width: 100%;
`

const ResultIconWrapper = styled.span`
  font-size: 40px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  align-items: center;
`

export default WebSellerHeader
