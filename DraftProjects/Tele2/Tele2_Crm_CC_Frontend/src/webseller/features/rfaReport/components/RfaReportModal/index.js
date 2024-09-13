import React, { useEffect, useState } from 'react'
import { AutoComplete, Col, Input, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { Button, Modal, BoxShadowButton } from 'webseller/components'
import { useDebouncedSearch } from 'webseller/helpers/hooks'

import {
  generateRfaReport,
  getAllDealerSalePoints,
  getDealerIdBySalePointId,
  getDealerInfo,
  resetDealerSalePoints,
  resetRfaReportProcess
} from '../../actions'
import { RFA_REPORT_MODAL_TITLE } from '../../constants'
import Filters from '../Filters/filters'
import {
  selectDealerCodes,
  selectDealerId,
  selectDealerSalePoints,
  selectDealerSalePointsOptions,
  selectIsDealerCodesLoading,
  selectIsDealerIdLoading,
  selectIsDealerSalePointsLoading,
  selectSalesOfficeId
} from '../../selectors'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'

const { Search } = Input

function RfaReportModal ({ isSearchDisabled, onClose }) {
  const dispatch = useDispatch()

  /** salesOfficeId */
  const salesOfficeId = useSelector(selectSalesOfficeId)
  const fullInfoSalesOffice = useSelector(selectActiveSalesOffice)
  /** dealerCodes */
  const dealerCodes = useSelector(selectDealerCodes)
  const isDealerCodesLoading = useSelector(selectIsDealerCodesLoading)
  /** salesOffices */
  const dealerSalePoints = useSelector(selectDealerSalePoints)
  const dealerSalePointsOptions = useSelector(selectDealerSalePointsOptions)
  const isDealerSalePointsLoading = useSelector(selectIsDealerSalePointsLoading)
  /** dealerId */
  const dealerId = useSelector(selectDealerId)
  const isDealerIdLoading = useSelector(selectIsDealerIdLoading)

  const [filter, setFilter] = useState(null)
  const [dealerIdValue, setDealerIdValue] = useState('')
  const [officeIdValue, setOfficeIdValue] = useState(isSearchDisabled ? String(salesOfficeId) : '')
  const [chosenOffice, setChosenOffice] = useState(
    isSearchDisabled
      ? {
        id: officeIdValue,
        address: fullInfoSalesOffice?.fullAddress
      }
      : undefined
  )

  const isDisabledReportBtn = !dealerId || !chosenOffice?.id || !filter?.dateFrom || !filter?.dateTo

  useEffect(() => {
    if (isSearchDisabled) {
      dispatch(getDealerIdBySalePointId({ officeId: salesOfficeId }))
    }

    return () => {
      dispatch(resetRfaReportProcess())
    }
  }, [])

  useEffect(() => {
    if (isSearchDisabled) {
      const dealerIdQuery = dealerId && String(dealerId)

      if (dealerIdQuery && dealerIdQuery !== dealerIdValue) {
        dispatch(getDealerInfo({ dealerId: dealerIdQuery }))
        setDealerIdValue(dealerIdQuery)
      }
    }
  }, [dealerId])

  const onSearchSalePoint = useDebouncedSearch({
    search: query => {
      dispatch(getAllDealerSalePoints({ dealerId, query }))
    },
    deps: [dealerId]
  })

  const onFilterChangeHandler = params => {
    setFilter(params)
  }

  const onChangeDealer = event => {
    setDealerIdValue(event.target.value)
  }

  const onSearchDealer = value => {
    if (value) {
      dispatch(getDealerInfo({ dealerId: value }))

      dispatch(resetDealerSalePoints())

      setOfficeIdValue('')
      setChosenOffice(undefined)
    }
  }

  const onSelectSalePoint = officeId => {
    const chosenOffice = dealerSalePoints.find(office => String(office.id) === officeId)
    setChosenOffice(chosenOffice)

    setOfficeIdValue(officeId)
  }

  const onChangeSalePoint = officeId => {
    setOfficeIdValue(officeId)
  }

  const onGenerateErfReport = () => {
    dispatch(
      generateRfaReport({
        dateFrom: filter?.dateFrom,
        dateTo: filter?.dateTo,
        dealerId: dealerIdValue,
        officeId: chosenOffice?.id
      })
    )
    onClose()
  }

  return (
    <StyledModal title={RFA_REPORT_MODAL_TITLE} onCancel={onClose} zIndex={1001} width={1151} closable>
      <div>
        <StyledRow justify='center'>
          <Col span={24}>
            <InformationBox>Период выгрузки отчета должен быть не более 3 месяцев</InformationBox>
          </Col>
        </StyledRow>
        <StyledRow justify='end'>
          <Col>
            <Filters findHandler={onFilterChangeHandler} />
          </Col>
        </StyledRow>
        <StyledRow gutter={[30, 30]}>
          <Col span={8}>
            <ContentArea gutter={[15, 15]}>
              <Col>
                <Search
                  allowClear
                  size='large'
                  enterButton='Найти'
                  placeholder='Код дилера'
                  onChange={onChangeDealer}
                  onSearch={onSearchDealer}
                  value={dealerIdValue}
                  disabled={isSearchDisabled}
                  loading={isDealerCodesLoading || isDealerIdLoading}
                />
              </Col>
              {dealerCodes && (
                <Col>
                  <BoxShadowButton>
                    <BoxTitle>{dealerCodes?.name}</BoxTitle>
                    <BoxDescription>{dealerId}</BoxDescription>
                  </BoxShadowButton>
                </Col>
              )}
            </ContentArea>
          </Col>
          <Col span={8}>
            <ContentArea gutter={[15, 15]}>
              <Col>
                <StyledAutoComplete
                  loading={isDealerSalePointsLoading}
                  options={dealerSalePointsOptions}
                  onSearch={onSearchSalePoint}
                  onChange={onChangeSalePoint}
                  onSelect={onSelectSalePoint}
                  disabled={isSearchDisabled || !dealerCodes}
                  value={officeIdValue}
                  filterOption
                >
                  <Input size='large' placeholder='Точка(-и) продаж' />
                </StyledAutoComplete>
              </Col>
              {Boolean(chosenOffice) && (
                <Col>
                  <BoxShadowButton>
                    <BoxTitle>{chosenOffice.id}</BoxTitle>
                    <BoxDescription>{chosenOffice.address}</BoxDescription>
                  </BoxShadowButton>
                </Col>
              )}
            </ContentArea>
          </Col>
        </StyledRow>
      </div>
      <Row justify='space-between'>
        <Button onClick={onClose}>Назад</Button>
        <Button type='primary' onClick={onGenerateErfReport} disabled={isDisabledReportBtn}>
          Сформировать отчет
        </Button>
      </Row>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`
const StyledRow = styled(Row)`
  margin: 0 0 16px;
`
const StyledAutoComplete = styled(AutoComplete)`
  width: 100%;
`
const ContentArea = styled(Row)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`
const BoxTitle = styled.div`
  font-weight: 400;
  line-height: 16px;
`
const BoxDescription = styled.div`
  line-height: 16px;
`
const InformationBox = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 18px;
  text-align: center;
  color: #65707b;
  background-color: #f7f8fb;
`

export default RfaReportModal
