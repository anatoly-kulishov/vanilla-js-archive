/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FilterOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, DatePicker, TimePicker, Select, Tooltip } from 'antd'
import { debounce, uniqBy } from 'lodash-es'

import AuthenticatedFileLink from 'crmHostApp/hocs/AuthenticatedFileLink'
import MsisdnInput from 'crmHostApp/components/MsisdnInput'
import TimezoneFilterControls from './TimezoneFilterControls'
import TooltipSwitch from './TooltipSwitch'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import {
  CHANNEL_ID_FIELD_NAMES,
  MACRO_REGION_FIELD_NAMES,
  MNP_FIELD_NAMES,
  ONLIME_FIELD_NAMES,
  POC_FIELD_NAMES,
  REASON_ID_FIELD_NAMES,
  STATUS_ID_FIELD_NAMES,
  SYSTEM_ID_FIELD_NAMES,
  UPSALE_ORDER_STATUS_FIELD_NAMES
} from '../constants/fieldNames'
import { MNP_OPTIONS, ONLIME_OPTIONS, POC_OPTIONS } from '../constants/options'
import { URL } from '../constants/fileLinkUrl'
import { FORM_ITEM_LAYOUT } from '../constants/layout'

const { Item } = Form
const { RangePicker: TimeRangePicker } = TimePicker

export default function JournalFilters (props) {
  const {
    form,
    handleSearch,
    onClear,
    setSelectedTimezone,
    showRegionTimezone,
    setShowRegionTimezone,
    isOrdersLoading
  } = props

  const { macroRegions, regions, handbooks, getStatusReasons, statusReasons } = useBroadbandContext()

  const { data: statusReasonsData, isLoading: isStatusReasonsLoading, isError: isStatusReasonsError } = statusReasons

  const {
    Statuses: statuses,
    Channels: channels,
    Systems: systems,
    UpsaleOrderStatuses: upsaleOrderStatuses
  } = handbooks ?? {}

  const [isFilterVisible, setFilterVisible] = useState(false)
  const [selectedMacroRegionIds, setSelectedMacroRegionIds] = useState([])
  const [selectedRegionsCodes, setSelectedRegionsCodes] = useState([])

  const handleClear = () => {
    setSelectedMacroRegionIds([])
    setSelectedRegionsCodes([])
    onClear()
  }

  const handleGettingParams = useCallback(() => {
    return form.getFieldValue()
  }, [form])

  const handleMsisdnRemove = useCallback(() => {
    form.resetFields(['msisdn'])
  }, [form])

  const debouncedGetStatusReasons = useCallback(
    debounce(statusId => {
      getStatusReasons({ statusId })
    }, 200),
    [getStatusReasons]
  )

  const handleChangeStatusId = useCallback(
    statusId => {
      form.resetFields(['reasonId'])

      if (statusId !== undefined && statusId?.length > 0) {
        debouncedGetStatusReasons(statusId)
      }
    },
    [debouncedGetStatusReasons]
  )

  const handleChanges = useCallback(
    changedValues => {
      if (changedValues?.RegionCode) {
        setSelectedRegionsCodes(changedValues.RegionCode)
      }
      if (changedValues?.IsRegionTimezone) {
        const firstSelectedRegion = regions.find(region => region.RegionIsoCode === selectedRegionsCodes[0])
        setSelectedTimezone(firstSelectedRegion.TimeZone)
      }
      if (changedValues?.MacroRegion) {
        setSelectedMacroRegionIds(changedValues.MacroRegion)
        const selectedMacroRegions = macroRegions.filter(macroRegion =>
          changedValues.MacroRegion.includes(macroRegion.MacroRegionId)
        )
        if (selectedMacroRegions) {
          const regionCodes = selectedMacroRegions?.reduce((prevResult, currentMacroRegion) => {
            const codes = currentMacroRegion?.Regions?.map(region => region.RegionIsoCode) ?? []
            return prevResult.concat(codes)
          }, [])
          form.setFieldsValue({ RegionCode: regionCodes })
          setSelectedRegionsCodes(regionCodes)
        }
      }
      if ('MacroRegion' in changedValues && changedValues.MacroRegion === undefined) {
        form.resetFields(['RegionCode'])
        setSelectedMacroRegionIds([])
        setSelectedRegionsCodes([])
      }
      if ('statusId' in changedValues) {
        handleChangeStatusId(changedValues?.statusId)
      }
    },
    [setSelectedRegionsCodes, setSelectedTimezone, selectedRegionsCodes, macroRegions, form, handleChangeStatusId]
  )

  const regionsOptions = useMemo(() => {
    if (!selectedMacroRegionIds?.length) {
      return regions
    }
    const selectedMacroRegions = macroRegions.filter(macroRegion =>
      selectedMacroRegionIds.includes(macroRegion.MacroRegionId)
    )
    return selectedMacroRegions?.reduce(
      (prevResult, currentMacroRegion) => prevResult.concat(currentMacroRegion?.Regions ?? []),
      []
    )
  }, [regions, macroRegions, selectedMacroRegionIds])

  const isSwitchDisabled = useMemo(() => {
    const selectedRegions = regions?.filter(region => selectedRegionsCodes.includes(region.RegionIsoCode))
    return (
      selectedRegions?.length === 0 ||
      selectedRegions?.some(region => !region.TimeZone || region.TimeZone !== selectedRegions[0].TimeZone)
    )
  }, [selectedRegionsCodes, regions])

  const regionCodeOptions = useMemo(
    () =>
      regionsOptions?.map(item => ({ label: `${item.RegionName} (UTC+${item.TimeZone})`, value: item.RegionIsoCode })),
    [regionsOptions]
  )

  const statusReasonOptions = useMemo(() => {
    const statusReasons = statusReasonsData?.reduce((acc, reason) => acc.concat(reason.Reasons), [])
    const uniqStatusReasons = uniqBy(statusReasons, 'Id')

    return uniqStatusReasons
  }, [statusReasonsData])

  return (
    <Wrapper>
      <Tools>
        {!isFilterVisible && (
          <TimezoneFilterControls
            showRegionTimezone={showRegionTimezone}
            setShowRegionTimezone={setShowRegionTimezone}
          />
        )}
        <StyledFilterIcon onClick={() => setFilterVisible(!isFilterVisible)} />
      </Tools>
      <StyledForm {...FORM_ITEM_LAYOUT} form={form} onValuesChange={handleChanges}>
        {isFilterVisible && (
          <Fragment>
            <FiltersGrid>
              <StyleItemOneCol name='orderId' label='Номер заявки'>
                <Input allowClear />
              </StyleItemOneCol>
              <StyleItemOneCol name='MacroRegion' label='Макрорегион'>
                <Select
                  allowClear
                  mode='multiple'
                  maxTagCount={2}
                  maxTagTextLength={6}
                  optionFilterProp={MACRO_REGION_FIELD_NAMES.label}
                  fieldNames={MACRO_REGION_FIELD_NAMES}
                  options={macroRegions}
                />
              </StyleItemOneCol>
              <StyledItem name='RegionCode' label='Регион'>
                <StyledSelect
                  allowClear
                  mode='multiple'
                  maxTagCount={3}
                  maxTagTextLength={6}
                  optionFilterProp='label'
                  options={regionCodeOptions}
                />
              </StyledItem>
              <StyleItemOneCol name='rtcOrderId' label='Номер заявки в ЛКД'>
                <Input allowClear />
              </StyleItemOneCol>
              <StyleItemOneCol name='crmOrderId' label='Номер заявки CRM РТК'>
                <Input allowClear />
              </StyleItemOneCol>

              <StyledItem name='msisdn' label='Msisdn'>
                <MsisdnInput noAutoFocus allowClear onClickRemove={handleMsisdnRemove} />
              </StyledItem>
              <StyledItem name='expectedDate' label='Ожидаемая дата подключения'>
                <DatePicker style={{ width: '100%' }} format='DD.MM.YYYY' />
              </StyledItem>
              <StyledItem name='contactData' label='Контакт'>
                <Input allowClear />
              </StyledItem>

              <ItemWrapper>
                <ItemLabel>
                  <span>Дата и время звонка</span>
                  <TooltipSwitch isSwitchDisabled={isSwitchDisabled} />
                </ItemLabel>
                <StyledItem name='CallDateTime'>
                  <StyledItem name='CallDate' noStyle>
                    <DatePicker
                      style={{ width: 'calc(40% - 8px)', marginRight: '8px' }}
                      placeholder='Выберите дату звонка'
                      format='DD.MM.YYYY'
                    />
                  </StyledItem>
                  <StyledItem name='CallTime' noStyle>
                    <TimeRangePicker
                      style={{ width: '60%' }}
                      placeholder={['Звонить с', 'Звонить по']}
                      format='HH:mm'
                    />
                  </StyledItem>
                </StyledItem>
              </ItemWrapper>
              <StyledItem name='systemId' label='Система'>
                <Select
                  allowClear
                  mode='multiple'
                  optionFilterProp={SYSTEM_ID_FIELD_NAMES.label}
                  fieldNames={SYSTEM_ID_FIELD_NAMES}
                  options={systems}
                />
              </StyledItem>
              <StyledItem name='channelId' label='Канал'>
                <Select
                  allowClear
                  mode='multiple'
                  optionFilterProp={CHANNEL_ID_FIELD_NAMES.label}
                  fieldNames={CHANNEL_ID_FIELD_NAMES}
                  options={channels}
                />
              </StyledItem>

              <StyledItem name='statusId' label='Статус'>
                <Select
                  allowClear
                  mode='multiple'
                  optionFilterProp={STATUS_ID_FIELD_NAMES.label}
                  maxTagCount='responsive'
                  fieldNames={STATUS_ID_FIELD_NAMES}
                  options={statuses}
                />
              </StyledItem>
              <StyledItem name='upsaleOrderStatusId' label='Статус изменения заказа'>
                <Select
                  allowClear
                  mode='multiple'
                  optionFilterProp={UPSALE_ORDER_STATUS_FIELD_NAMES.label}
                  fieldNames={UPSALE_ORDER_STATUS_FIELD_NAMES}
                  options={upsaleOrderStatuses}
                />
              </StyledItem>
              <Item noStyle dependencies={['statusId']}>
                {() => {
                  const statusId = form.getFieldValue('statusId')
                  const noStatusId = statusId?.length === 0 || statusId === undefined
                  const noStatusReasonOptions = statusReasonOptions?.length === 0
                  const isDisabled = noStatusId || isStatusReasonsError || noStatusReasonOptions

                  let tooltipTitle = ''
                  if (noStatusId) {
                    tooltipTitle = 'Для выбора причины статуса необходимо выбрать статус'
                  } else if (isStatusReasonsError) {
                    tooltipTitle =
                      'Произошла ошибка при запросе причин статуса. Попробуйте выбрать другой статус или обратитесь к администратору'
                  } else if (noStatusReasonOptions) {
                    tooltipTitle = 'Отсутствуют причины статуса'
                  }

                  return (
                    <StyledItem label='Причина статуса'>
                      <Tooltip title={tooltipTitle}>
                        <div>
                          <Item name='reasonId' noStyle>
                            <Select
                              allowClear
                              mode='multiple'
                              optionFilterProp={REASON_ID_FIELD_NAMES.label}
                              disabled={isDisabled}
                              maxTagCount='responsive'
                              maxTagTextLength={6}
                              loading={isStatusReasonsLoading}
                              fieldNames={REASON_ID_FIELD_NAMES}
                              options={statusReasonOptions}
                            />
                          </Item>
                        </div>
                      </Tooltip>
                    </StyledItem>
                  )
                }}
              </Item>

              <StyledItem name='isOnlime' label='Онлайм' initialValue={ONLIME_OPTIONS[0].Value}>
                <Select fieldNames={ONLIME_FIELD_NAMES} options={ONLIME_OPTIONS} />
              </StyledItem>
              <StyledItem name='isMNP' label='MNP' initialValue={MNP_OPTIONS[0].Value}>
                <Select fieldNames={MNP_FIELD_NAMES} options={MNP_OPTIONS} />
              </StyledItem>
              <StyledItem name='isPoc' label='Заказ с POC'>
                <Select fieldNames={POC_FIELD_NAMES} options={POC_OPTIONS} />
              </StyledItem>
              <StyledItem name='relocation' label='Переезд' initialValue={POC_OPTIONS[0].Value}>
                <Select fieldNames={POC_FIELD_NAMES} options={POC_OPTIONS} />
              </StyledItem>
            </FiltersGrid>
            <Footer>
              <TimezoneFilterControls
                showRegionTimezone={showRegionTimezone}
                setShowRegionTimezone={setShowRegionTimezone}
              />
              <div>
                <AuthenticatedFileLink url={URL} fileName='RtcOrders.xlsx' getParams={handleGettingParams} isAlwaysNew>
                  <StyledButton icon={<UploadOutlined />}>Экспортировать в Excel</StyledButton>
                </AuthenticatedFileLink>
                <StyledButton onClick={handleSearch} type='primary' loading={isOrdersLoading}>
                  Найти
                </StyledButton>
                <Button onClick={handleClear}>Очистить</Button>
              </div>
            </Footer>
          </Fragment>
        )}
      </StyledForm>
    </Wrapper>
  )
}

JournalFilters.propTypes = {
  form: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired
}

const Wrapper = styled.div`
  padding: 5px 10px;
`
const StyledForm = styled(Form)`
  .ant-form-item-label {
    padding: 0;
  }
  .ant-form-item {
    margin-bottom: 8px;
  }
`
const Tools = styled.div`
  position: relative;
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  margin-bottom: 8px;
`
const StyledFilterIcon = styled(FilterOutlined)`
  position: absolute;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.1s ease-out, transform 0.03s ease-out;
  color: black;
  right: 0;
  :hover {
    color: #44caff;
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
`
const Footer = styled.div`
  padding: 5px 16px;
  display: flex;
  justify-content: space-between;
`
const StyledButton = styled(Button)`
  margin-right: 20px;
`
const FiltersGrid = styled.div`
  display: grid;
  padding: 0 16px;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 10px;
`

const StyledItem = styled(Item)`
  grid-column: 2 span;
`

const StyleItemOneCol = styled(Item)`
  grid-column: 1 span;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 2 span;
`

const ItemLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
`

const StyledSelect = styled(Select)`
  .ant-select-selection-overflow {
    flex-wrap: nowrap;
  }
`
