/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useRef, useState } from 'react'
import { Button, Checkbox, Col, Form, Input, List, Row, Select, Space, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import styled from 'styled-components'
import { bool, func, object, string } from 'prop-types'
import LoadingSpinner from 'components/LoadingSpinner'

const SELECT_OPTIONS = [
  { label: 'Все', value: '' },
  { label: 'Активные', value: 1 },
  { label: 'Неактивные', value: 2 }
]

const getListRow = (leftContent, rightContent) => (
  <StyledRow gutter={20}>
    <Col span={19}>{leftContent}</Col>
    <Col span={5}>{rightContent}</Col>
  </StyledRow>
)

const NotificationsSubscriber = props => {
  NotificationsSubscriber.propTypes = {
    handlingId: string,
    notifications: object,
    onActivate: func,
    onDeactivate: func,
    onSearch: func,
    personalAccount: object,
    editable: bool
  }
  const [form] = useForm()

  const [isDropDownOpened, setIsDropDownOpened] = useState(false)

  const selectRef = useRef(null)
  const inputRef = useRef(null)

  const { notifications, onActivate, onDeactivate, onSearch, personalAccount, editable, handlingId } = props
  const {
    subscriberNotifications,
    isModifySubscriberNotificationLoading,
    isDeleteSubscriberNotificationLoading,
    isSubscriberNotificationsLoading
  } = notifications
  const { Msisdn, SubscriberId, BillingBranchId } = personalAccount

  const handleClear = () => form.resetFields()

  const handleChange = (event, item) => {
    if (!editable) {
      return
    }

    const { clientId, clientRecipientPositionId, deliveryTypeId, messageTypeId, messageTypeName, deliveryTypeName } =
      item
    const checked = !event.target.checked

    const requestData = {
      msisdn: Msisdn,
      subscriberId: SubscriberId,
      branchId: BillingBranchId,
      clientId,
      clientRecipientPositionId,
      deliveryTypeId,
      messageTypeId,
      messageTypeName,
      handlingId,
      deliveryTypeName
    }

    const notificationParams = {
      ...form.getFieldsValue(),
      branchId: BillingBranchId,
      msisdn: Msisdn,
      subscriberId: SubscriberId
    }

    const payload = { requestData, notificationParams }

    if (checked) {
      onDeactivate(payload)
    } else {
      onActivate(payload)
    }
  }

  const handleSearch = () => {
    form.validateFields().then(values => {
      onSearch({ ...values, branchId: BillingBranchId, msisdn: Msisdn, subscriberId: SubscriberId })
    })
  }

  const handleKeyDown = event => {
    const isEnterKey = event.key === 'Enter'
    if (isEnterKey) {
      handleSearch()
      inputRef.current.blur()
      selectRef.current.blur()
      setIsDropDownOpened(false)
    }
  }

  const handleSelect = () => {
    setIsDropDownOpened(prev => !prev)
  }

  const isLoading = isDeleteSubscriberNotificationLoading || isModifySubscriberNotificationLoading

  const header = getListRow('Наименование типа сообщения', 'Тип доставки')

  return (
    <Wrapper>
      <Form form={form} colon={false} onKeyDown={handleKeyDown}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item name='messageStatusId' label='Статус'>
              <Select
                options={SELECT_OPTIONS}
                open={isDropDownOpened}
                defaultValue={SELECT_OPTIONS[0].value}
                onDropdownVisibleChange={setIsDropDownOpened}
                ref={selectRef}
                onSelect={handleSelect}
              />
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item name='messageTypeName' label='Нотификация'>
              <Input allowClear ref={inputRef} />
            </Form.Item>
          </Col>
          <Col>
            <Space>
              <Button onClick={handleSearch} type='primary'>
                Найти
              </Button>
              <Button onClick={handleClear}>Очистить</Button>
            </Space>
          </Col>
        </Row>
      </Form>

      <Spin indicator={<LoadingSpinner spin />} spinning={isLoading}>
        <ListWrapper>
          <List
            header={header}
            loading={isSubscriberNotificationsLoading}
            rowKey={({ messageTypeId }) => messageTypeId}
            dataSource={subscriberNotifications}
            renderItem={item => (
              <StyledListItem>
                {getListRow(
                  <StyledRow>
                    <StyledCheckbox
                      onChange={event => handleChange(event, item)}
                      checked={item.messageStatusId === 1}
                      disabled={!editable}
                    />
                    <div>{item.messageTypeName}</div>
                  </StyledRow>,
                  <div>{item.deliveryTypeName}</div>
                )}
              </StyledListItem>
            )}
          />
        </ListWrapper>
      </Spin>
    </Wrapper>
  )
}

export default NotificationsSubscriber

const Wrapper = styled.div`
  padding-left: 20px;
  font-size: 14px;
`

const ListWrapper = styled.div`
  max-height: 500px;
  height: 100%;

  overflow-y: auto;

  .ant-list-header {
    position: sticky;
    top: 0;

    width: 100%;

    background: white;
    z-index: 10;
  }
`

const StyledListItem = styled(List.Item)`
  justify-content: start;
  gap: 10px;
`

const StyledRow = styled(Row)`
  width: 100%;

  flex-flow: row nowrap;
`

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`
