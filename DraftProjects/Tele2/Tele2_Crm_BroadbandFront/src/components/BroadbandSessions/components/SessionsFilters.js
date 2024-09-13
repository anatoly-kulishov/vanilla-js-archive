import { Alert, Button, DatePicker, Form, InputNumber, Select, Switch } from 'antd'
import styled from 'styled-components'

import MsisdnInput from 'crmHostApp/components/MsisdnInput'
import { useBroadbandContext } from '../../../context/hooks/useBroadbandContext'
import { useCallback, useMemo, useState } from 'react'
import { prepareCreateSessionParams } from '../../../helpers/sessions'

const { Item } = Form

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24, offset: 0 }
}

const SessionsFilters = ({ form, openOrder }) => {
  const { macroRegions, regions, handbooks, sessionTypeTasks, sessionsInfoState, createSession } = useBroadbandContext()

  const [selectedTypeId, setSelectedTypeId] = useState(null)
  const [selectedMacroRegionIds, setSelectedMacroRegionIds] = useState([])

  const typeOptions = useMemo(() => {
    return sessionTypeTasks?.map(item => ({ label: item.taskName, value: item.taskTypeId })) ?? []
  }, [sessionTypeTasks])

  const statusOptions = useMemo(() => {
    const selectedTaskType = sessionTypeTasks?.find(item => item.taskTypeId === selectedTypeId)
    return selectedTaskType?.statuses?.map(item => ({ label: item.statusName, value: item.statusId })) ?? []
  }, [sessionTypeTasks, selectedTypeId])

  const macroRegionsOptions = useMemo(() => {
    return macroRegions?.map(item => ({ label: item.MacroRegionName, value: item.MacroRegionId })) ?? []
  }, [macroRegions])

  const regionsOptions = useMemo(() => {
    if (!selectedMacroRegionIds?.length) {
      return (
        regions?.map(item => ({ label: `${item.RegionName} (UTC+${item.TimeZone})`, value: item.RegionIsoCode })) ?? []
      )
    }
    const selectedMacroRegions = macroRegions.filter(macroRegion =>
      selectedMacroRegionIds.includes(macroRegion.MacroRegionId)
    )
    const rawRegions = selectedMacroRegions?.reduce(
      (prevResult, currentMacroRegion) => prevResult.concat(currentMacroRegion?.Regions ?? []),
      []
    )
    return (
      rawRegions.map(item => ({ label: `${item.RegionName} (UTC+${item.TimeZone})`, value: item.RegionIsoCode })) ?? []
    )
  }, [regions, macroRegions, selectedMacroRegionIds])

  const systemOptions = useMemo(() => {
    return handbooks?.Systems?.map(item => ({ label: item.Name, value: item.Id })) ?? []
  }, [handbooks])

  const handleChanges = useCallback(
    changedValues => {
      if (changedValues?.typeId) {
        setSelectedTypeId(changedValues.typeId.value)
      }
      if (changedValues?.macroRegion) {
        const selectedIds = changedValues.macroRegion.map(item => item.value)
        setSelectedMacroRegionIds(selectedIds)
        const selectedMacroRegions = macroRegions.filter(macroRegion => selectedIds.includes(macroRegion.MacroRegionId))
        if (selectedMacroRegions) {
          const regionCodes = selectedMacroRegions?.reduce((prevResult, currentMacroRegion) => {
            const codes =
              currentMacroRegion?.Regions?.map(region => ({
                label: `${region.RegionName} (UTC+${region.TimeZone})`,
                value: region.RegionIsoCode
              })) ?? []
            return prevResult.concat(codes)
          }, [])
          form.setFieldsValue({ regionCode: regionCodes })
        }
      }
      if ('macroRegion' in changedValues && changedValues.macroRegion === undefined) {
        form.resetFields(['regionCode'])
        setSelectedMacroRegionIds([])
      }
    },
    [macroRegions]
  )

  const handleOpenOrder = useCallback(() => {
    const values = form.getFieldsValue()
    const params = prepareCreateSessionParams(values)
    createSession(params)
  }, [form])

  const sessionsData = sessionsInfoState.data
  const currentSessionId = useMemo(() => {
    if (sessionsData?.length > 0) {
      return sessionsData.find(item => !!item.orderId)?.orderId ?? null
    }
    return null
  }, [sessionsData])

  const handleCloseOrder = useCallback(() => {
    const order = sessionsData.find(item => !!item.orderId)

    if (order?.orderId) {
      const { msisdn, orderId } = order
      openOrder(orderId, msisdn)
    }
  }, [sessionsData, openOrder])

  return (
    <Wrapper>
      <StyledForm {...formItemLayout} form={form} onValuesChange={handleChanges}>
        <ControlsGrid>
          <Item name='typeId' label='Тип очереди'>
            <Select options={typeOptions} labelInValue />
          </Item>
          <Item name='statusId' label='Статус'>
            <Select allowClear options={statusOptions} labelInValue />
          </Item>
          <Item name='macroRegion' label='Макрорегион'>
            <Select
              mode='multiple'
              allowClear
              options={macroRegionsOptions}
              maxTagCount={4}
              maxTagTextLength={8}
              labelInValue
              optionFilterProp='label'
            />
          </Item>
          <Item name='regionCode' label='Регион'>
            <Select
              mode='multiple'
              allowClear
              options={regionsOptions}
              maxTagCount={4}
              maxTagTextLength={6}
              labelInValue
              optionFilterProp='label'
            />
          </Item>
          <Item name='orderId' label='Номер заявки'>
            <StyledInputNumber type='number' min={0} />
          </Item>
          <Item name='msisdn' label='Msisdn'>
            <MsisdnInput noAutoFocus allowClear />
          </Item>
          <Item name='systemId' label='Система'>
            <Select allowClear mode='multiple' options={systemOptions} labelInValue />
          </Item>
          <StyledItem name='expectedDate' label='Ожидаемая дата подключения'>
            <DatePicker format='DD.MM.YYYY' />
          </StyledItem>
          <Item name='isTimeCall' label='Проверять время звонка' valuePropName='checked'>
            <Switch />
          </Item>
        </ControlsGrid>
        <Footer>
          {currentSessionId && (
            <CloseButtonContainer>
              <StyledAlert
                showIcon
                type='warning'
                message={`Необходимо завершить работу с заявкой ${currentSessionId}`}
              />
              <Button type='primary' onClick={handleCloseOrder}>
                Завершить
              </Button>
            </CloseButtonContainer>
          )}
          {!currentSessionId && (
            <Button disabled={!selectedTypeId} type='primary' onClick={handleOpenOrder}>
              В работу
            </Button>
          )}
        </Footer>
      </StyledForm>
    </Wrapper>
  )
}

export default SessionsFilters

const Wrapper = styled.div`
  padding: 0 16px 10px 16px;
`

const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding: 0;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
`

const ControlsGrid = styled.div`
  display: grid;
  padding: 0 16px;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 32px;
`

const Footer = styled.div`
  padding: 0 16px 13px 16px;
  display: flex;
  justify-content: flex-end;
`

const StyledItem = styled(Item)`
  display: flex;
  flex-grow: 1;
  .ant-picker {
    width: 100%;
  }
`

const CloseButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const StyledAlert = styled(Alert)`
  height: 32px;
`

const StyledInputNumber = styled(InputNumber)`
  width: 100%;

  & > .ant-input-number-handler-wrap {
    display: none;
  }
`
