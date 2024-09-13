import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import useAutoTabSwitcher from 'webseller/features/webSellerSearch/hooks/useAutoTabSwitcher'
import { selectCustomersCheck } from 'webseller/features/webSellerSearch/reducer/selectors'
import { SESSION_PARAMS } from 'webseller/constants/searchParams'
import { setQueryParameters } from 'utils/helpers/queryParameters'
import InputMask from 'components/MsisdnMask/InputMask'

import {
  SEARCH_MODALS_MAP,
  WebSellerSearchMainTabsKeys,
  WebSellerSearchMainTabsName,
  WebSellerSearchSubTabsKeys,
  WebSellerSearchSubTabsName
} from 'webseller/features/webSellerSearch/constants'
import {
  createRedirectUrlWebSellerSearch,
  getValidationRule,
  onStartCardTypeScript,
  setFieldsTouchedStatus
} from 'webseller/features/webSellerSearch/helpers'
import { createNewSession } from 'webseller/features/webSellerSearch/reducer/customersCheckReducer'

import MessageModal from './components/MessageModal'
import InfoModal from './components/InfoModal'
import MsisdnInput from 'components/MsisdnMask'

const WebSellerSearch = ({ isCreateOrder = false, isAsB2BSearch = false, disabled }) => {
  const dispatch = useDispatch()

  const { sessionParams, searchParams, isCreateNewSessionLoading } = useSelector(selectCustomersCheck)

  const [activeMainTabKey, setActiveMainTabKey] = useState(WebSellerSearchMainTabsKeys.MSISDN)
  const [activeSubTabKey, setActiveSubTabKey] = useState(WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER)
  const [activeModal, setActiveModal] = useState(SEARCH_MODALS_MAP.NONE)

  const [form] = Form.useForm()

  const handleCloseModal = () => {
    setActiveModal(SEARCH_MODALS_MAP.NONE)
  }

  const handleOpenCard = () => {
    const query = setQueryParameters(sessionParams, [SESSION_PARAMS.SESSION_CLIENT_KEY])
    const redirectUrl = createRedirectUrlWebSellerSearch({ isCreateOrder, query })
    open(redirectUrl, '_self')
    handleCloseModal()
  }

  const handleClearField = (fieldName) => {
    form.setFieldsValue({ [fieldName]: '' })
  }

  const handleMainTabChange = (fieldName) => {
    if (fieldName !== activeMainTabKey) {
      form.resetFields(Object.values(WebSellerSearchMainTabsKeys))
      handleClearField(fieldName)
      setActiveMainTabKey(fieldName)
    }
  }

  const handleSubTabChange = (fieldName) => {
    if (fieldName !== activeSubTabKey) {
      form.resetFields(Object.values(WebSellerSearchSubTabsKeys))
      handleClearField(fieldName)
      setActiveSubTabKey(fieldName)
    }
  }

  const handleClickRemove = (fieldName) => () => {
    handleClearField(fieldName)
    form.resetFields([fieldName])
  }

  const onSubmitForm = (formData) => {
    dispatch(createNewSession({ searchData: formData, isCreateOrder }))
  }

  useAutoTabSwitcher(activeMainTabKey, activeSubTabKey, setActiveSubTabKey)

  useEffect(() => {
    if (searchParams && !isEmpty(form.getFieldValue())) {
      onStartCardTypeScript(searchParams, setActiveModal)
    }
  }, [searchParams])

  return (
    <WebSellerSearchForm form={form} onFinish={onSubmitForm}>
      <Tabs activeKey={activeMainTabKey} size='large' onChange={handleMainTabChange} destroyInactiveTabPane>
        <Tabs.TabPane
          tab={WebSellerSearchMainTabsName.MSISDN}
          key={WebSellerSearchMainTabsKeys.MSISDN}
          disabled={disabled}>
          <Form.Item
            name={WebSellerSearchMainTabsKeys.MSISDN}
            rules={getValidationRule(WebSellerSearchMainTabsKeys.MSISDN)}>
            <MsisdnInput
              noAutoFocus
              disabled={disabled}
              className='custom-search-input'
              placeholder={WebSellerSearchMainTabsName.MSISDN}
              onClickRemove={handleClickRemove(WebSellerSearchMainTabsKeys.MSISDN)}
            />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={WebSellerSearchMainTabsName.LOCAL_PHONE_NUMBER}
          key={WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER}
          disabled={disabled}>
          <Form.Item
            name={WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER}
            rules={getValidationRule(WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER)}>
            <MsisdnInput
              noAutoFocus
              className='custom-search-input'
              placeholder={WebSellerSearchMainTabsName.LOCAL_PHONE_NUMBER}
              onClickRemove={handleClickRemove(WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER)}
            />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={WebSellerSearchMainTabsName.ICC}
          key={WebSellerSearchMainTabsKeys.ICC}
          disabled={disabled}>
          <Form.Item
            name={WebSellerSearchMainTabsKeys.ICC}
            rules={getValidationRule(WebSellerSearchMainTabsKeys.ICC)}>
            <InputMask
              mask='99999999999999999999'
              className='custom-search-input'
              placeholder={WebSellerSearchMainTabsName.ICC}
              onClickRemove={handleClickRemove(WebSellerSearchMainTabsKeys.ICC)}
            />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={WebSellerSearchMainTabsName.PERSONAL_ACCOUNT_NAME}
          key={WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME}
          disabled={disabled || !isAsB2BSearch}>
          <Form.Item
            name={WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME}
            rules={getValidationRule(WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME)}>
            <InputMask
              mask='9999999999'
              className='custom-search-input'
              placeholder={WebSellerSearchMainTabsName.PERSONAL_ACCOUNT_NAME}
              onClickRemove={handleClickRemove(WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME)}
            />
          </Form.Item>
        </Tabs.TabPane>
      </Tabs>
      <Tabs activeKey={activeSubTabKey} size='large' onChange={handleSubTabChange} destroyInactiveTabPane>
        <Tabs.TabPane
          tab={WebSellerSearchSubTabsName.DOCUMENT_NUMBER}
          key={WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER}
          disabled={disabled || activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME}>
          <Form.Item
            name={WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER}
            rules={getValidationRule(WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER, activeMainTabKey)}>
            <InputMask
              mask='999999999999'
              className='custom-search-input'
              placeholder={WebSellerSearchSubTabsName.DOCUMENT_NUMBER}
              onClickRemove={handleClickRemove(WebSellerSearchSubTabsKeys.DOCUMENT_NUMBER)}
              disabled={disabled || activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME}
            />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={WebSellerSearchSubTabsName.INN}
          key={WebSellerSearchSubTabsKeys.INN}
          disabled={disabled || !isAsB2BSearch || activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER}>
          <Form.Item
            name={WebSellerSearchSubTabsKeys.INN}
            rules={getValidationRule(WebSellerSearchSubTabsKeys.INN, activeMainTabKey)}>
            <InputMask
              mask='999999999999'
              className='custom-search-input'
              placeholder={WebSellerSearchSubTabsName.INN}
              onClickRemove={handleClickRemove(WebSellerSearchSubTabsKeys.INN)}
              disabled={activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER}
            />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={WebSellerSearchSubTabsName.CLIENT_NAME}
          key={WebSellerSearchSubTabsKeys.CLIENT_NAME}
          disabled={disabled || !isAsB2BSearch ||
            activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
            activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME
          }>
          <Form.Item
            name={WebSellerSearchSubTabsKeys.CLIENT_NAME}
            rules={getValidationRule(WebSellerSearchSubTabsKeys.CLIENT_NAME, activeMainTabKey)}>
            <Input
              className='custom-search-input'
              placeholder={WebSellerSearchSubTabsName.CLIENT_NAME}
              maxLength={50}
              disabled={disabled ||
                activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
                activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME}
            />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={WebSellerSearchSubTabsName.OGRN}
          key={WebSellerSearchSubTabsKeys.OGRN}
          disabled={disabled || !isAsB2BSearch ||
            activeMainTabKey === WebSellerSearchMainTabsKeys.MSISDN ||
            activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
            activeMainTabKey === WebSellerSearchMainTabsKeys.ICC
          }>
          <Form.Item
            name={WebSellerSearchSubTabsKeys.OGRN}
            rules={getValidationRule(WebSellerSearchSubTabsKeys.OGRN, activeMainTabKey)}>
            <InputMask
              mask='999999999999999'
              className='custom-search-input'
              placeholder={WebSellerSearchSubTabsName.OGRN}
              onClickRemove={handleClickRemove(WebSellerSearchSubTabsKeys.OGRN)}
              disabled={disabled ||
                activeMainTabKey === WebSellerSearchMainTabsKeys.MSISDN ||
                activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
                activeMainTabKey === WebSellerSearchMainTabsKeys.ICC
              }
            />
          </Form.Item>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={WebSellerSearchSubTabsName.MANAGER_IDENTITY_DOCUMENT}
          key={WebSellerSearchSubTabsKeys.MANAGER_IDENTITY_DOCUMENT}
          disabled={disabled || !isAsB2BSearch ||
            activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
            activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME ||
            activeMainTabKey === WebSellerSearchMainTabsKeys.ICC

          }>
          <Form.Item
            name={WebSellerSearchSubTabsKeys.MANAGER_IDENTITY_DOCUMENT}
            rules={getValidationRule(WebSellerSearchSubTabsKeys.MANAGER_IDENTITY_DOCUMENT, activeMainTabKey)}>
            <InputMask
              mask='999999999999'
              className='custom-search-input'
              placeholder={WebSellerSearchSubTabsName.MANAGER_IDENTITY_DOCUMENT}
              onClickRemove={handleClickRemove(WebSellerSearchSubTabsKeys.MANAGER_IDENTITY_DOCUMENT)}
              disabled={disabled ||
                activeMainTabKey === WebSellerSearchMainTabsKeys.LOCAL_PHONE_NUMBER ||
                activeMainTabKey === WebSellerSearchMainTabsKeys.PERSONAL_ACCOUNT_NAME ||
                activeMainTabKey === WebSellerSearchMainTabsKeys.ICC
              }
            />
          </Form.Item>
        </Tabs.TabPane>
      </Tabs>
      <WebSellerButtonContainer>
        <Form.Item shouldUpdate>
          {() => (
            <SubmitButton type='text' htmlType='submit' size='large' loading={isCreateNewSessionLoading} disabled={
              !form.isFieldsTouched(setFieldsTouchedStatus(activeMainTabKey, activeSubTabKey)) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
              isCreateNewSessionLoading
            }>
              Найти
            </SubmitButton>
          )}
        </Form.Item>
      </WebSellerButtonContainer>
      <>
        <InfoModal
          visible={activeModal === SEARCH_MODALS_MAP.INFO}
          onClose={handleCloseModal}
          footer={[
            <Button type='default' onClick={handleCloseModal}>Отмена</Button>,
            <Button type='primary' onClick={handleOpenCard}>Да</Button>
          ]}
        />
        <MessageModal
          visible={activeModal === SEARCH_MODALS_MAP.MESSAGE_WITH_ACTION || activeModal === SEARCH_MODALS_MAP.MESSAGE_WITHOUT_ACTION}
          messageText={sessionParams?.messageText}
          onClose={handleCloseModal}
          footer={
            activeModal === SEARCH_MODALS_MAP.MESSAGE_WITH_ACTION ? [
              <Button type='default' onClick={handleCloseModal}>Отмена</Button>,
              <Button type='primary' onClick={handleOpenCard}>Да</Button>
            ] : [<Button type='primary' onClick={handleCloseModal}>Ок</Button>]
          }
        />
      </>
    </WebSellerSearchForm>
  )
}

WebSellerSearch.propTypes = {
  disabled: PropTypes.bool,
  isCreateOrder: PropTypes.bool
}

const WebSellerSearchForm = styled(Form)`
    .ant-tabs-tab .ant-tabs-tab-btn {
        color: #000;
    }
    .custom-search-input {
        padding: 18px 16px;
    }
    .ant-tabs-tab.ant-tabs-tab-disabled {
        opacity: .3;
    }
`
const WebSellerButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 6px;
`
const SubmitButton = styled(Button)`
    margin: 0;
    background: #24272D;
    border-color: #24272D;
    color: #fff;

    &[disabled], &[disabled]:hover, &[disabled]:focus, &[disabled]:active {
        background: #24272D;
        color: #fff;
        opacity: .5;
    }

    &:hover, &:focus {
        background: #24272D;
        border-color: #24272D;
        color: #fff;
        opacity: .7;
    }
`

export default WebSellerSearch
