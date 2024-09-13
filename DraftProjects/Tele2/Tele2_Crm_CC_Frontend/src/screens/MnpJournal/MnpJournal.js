/* eslint-disable react-perf/jsx-no-new-array-as-prop */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import Card from 'components/Card'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Route, useRouteMatch } from 'react-router'
import styled from 'styled-components'
import { Button, Form } from 'antd'
import { setQueryParameters } from 'utils/helpers/queryParameters'
import * as moment from 'moment'
import { bool, func, object, shape } from 'prop-types'
import mnpJournalPropType from '../../constants/propTypes/mnpJournalPropType'
import { formatNumberWithSeparator, checkRight } from 'utils/helpers'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import MnpJournalFilters from './components/MnpJournalFilters'
import MnpJournalSearchFilters from './components/MnpJournalSearchFilters'
import MnpJournalTable from './components/MnpJournalTable'
import { isEqual } from 'lodash-es'
import fromEnv from 'config/fromEnv'

const initialValues = { EcommerceTypeCode: 'B2C' }
const initialPagination = { current: 1, pageSize: 10 }

const MnpJournal = props => {
  const {
    fetchMnpJournal,
    clearMnpJournal,
    mnpJournalState: { mnpJournal, isMnpJournalLoading },
    user
  } = props
  const [rangeDate, setRangeDate] = useState({ from: moment().startOf('month'), to: moment() })
  const [pagination, setPagination] = useState(initialPagination)
  const [form] = Form.useForm()

  const location = useLocation()
  const match = useRouteMatch()

  useEffect(() => {
    const currentMenuItem = menu.find(({ path }) => location.pathname.includes(path))
    if (currentMenuItem) {
      document.title = `CRM: ${currentMenuItem.title}`
    }
  }, [location])

  const isRejectMnpOrder = checkRight(user, 'CC:RejectMNPOrder')
  const isApproveMnpOrder = checkRight(user, 'CC:ApproveMNPOrder')

  const menu = [
    { path: `${match.url}/search`, text: 'Найти', title: 'Поиск заявок' }
  ]

  if (isRejectMnpOrder || isApproveMnpOrder) {
    menu.push({ path: `${match.url}/manual-check`, text: 'Ручная сверка', title: 'Ручная сверка' })
  }

  const rowsCount = mnpJournal?.RowsCount
  const formattedRowsCount = formatNumberWithSeparator(rowsCount)

  const isShowAdditional = !isNaN(rowsCount)
  const additional = [
    isShowAdditional && {
      content: (
        <p>
          Количество заявлений: <span style={{ fontWeight: 700 }}>{formattedRowsCount}</span>
        </p>
      )
    }
  ]

  const handleClear = () => {
    clearMnpJournal()
    setPagination(initialPagination)
    form.resetFields()
  }

  const handleCellClick = value => {
    form.setFieldsValue(value)
  }

  const handleOpenOrder = record => {
    const { OrderId, NpId, EcommerceTypeCode, NumberPortabilityId } = record
    const eCommerceTypeCode = EcommerceTypeCode || form.getFieldValue('EcommerceTypeCode')
    const npId = NpId || NumberPortabilityId
    const newUrl = new URL(`${fromEnv('REACT_APP_SEARCH')}/empty/mnp-order/manual-verification`)
    newUrl.search = setQueryParameters({
      orderId: OrderId,
      npId,
      eCommerceTypeCode
    }).toString()
    open(newUrl.toString())
  }

  useEffect(() => {
    if (mnpJournal?.RowsCount) {
      setPagination(prev => ({ ...prev, total: mnpJournal.RowsCount }))
    }
  }, [mnpJournal])

  const handleSubmit = () => {
    form.validateFields().then(values => {
      handleOpenOrder(values)
    })
  }

  const handleSearch = () => {
    form.validateFields().then(values => {
      const { Msisdn, TemporaryMsisdn } = values
      const MsisdnWithoutFirstSeven = Msisdn?.length === 11 ? Msisdn.slice(1) : undefined
      const temporaryMsisdnWithoutSeven = TemporaryMsisdn?.length === 11 ? TemporaryMsisdn.slice(1) : undefined

      const newValues = { ...values }
      for (const key in newValues) {
        if (newValues[key] === '') {
          delete newValues[key]
        }
      }

      const { from, to } = rangeDate
      const params = {
        ...newValues,
        StartDate: from.format('YYYY-MM-DD'),
        EndDate: to.format('YYYY-MM-DD'),
        Msisdn: MsisdnWithoutFirstSeven,
        TemporaryMsisdn: temporaryMsisdnWithoutSeven
      }
      clearMnpJournal()
      fetchMnpJournal(params)
    })
  }

  const handleChangePagination = useCallback(
    newPagination => {
      if (!isEqual(pagination, newPagination)) {
        setPagination(newPagination)
        const { current, pageSize } = newPagination
        const values = form.getFieldValue()
        const { from, to } = rangeDate

        const params = {
          ...values,
          StartDate: from.format('YYYY-MM-DD'),
          EndDate: to.format('YYYY-MM-DD'),
          Page: current,
          Rows: pageSize
        }
        fetchMnpJournal(params)
      }
    },
    [rangeDate, pagination]
  )

  useEffect(() => {
    if (!mnpJournal?.TransferRequests) {
      setPagination(initialPagination)
    }
  }, [mnpJournal?.TransferRequests])

  return (
    <Fragment>
      <Card
        header='Журнал заявок MNP'
        menu={menu}
        additional={additional}
        content={
          <Wrapper>
            <Route path={`${match.url}/manual-check`}>
              <Form layout='vertical' colon={false} form={form} initialValues={initialValues}>
                <MnpJournalFilters withValidation />
                <Button type='primary' htmlType='submit' onClick={handleSubmit} disabled>
                  Начать обработку
                </Button>
              </Form>
            </Route>
            <Route path={`${match.url}/search`}>
              <Form layout='vertical' colon={false} form={form} initialValues={initialValues}>
                <MnpJournalFilters />
                <MnpJournalSearchFilters
                  onClear={handleClear}
                  rangeDate={rangeDate}
                  onChangeDate={setRangeDate}
                  onSubmit={handleSearch}
                />
                <MnpJournalTable
                  data={mnpJournal?.TransferRequests}
                  loading={isMnpJournalLoading}
                  pagination={pagination}
                  onChangePagination={handleChangePagination}
                  onCellClick={handleCellClick}
                  onDoubleClickRow={handleOpenOrder}
                />
              </Form>
            </Route>
          </Wrapper>
        }
      />
    </Fragment>
  )
}

export default MnpJournal

MnpJournal.propTypes = {
  fetchMnpJournal: func,
  clearMnpJournal: func,
  mnpJournalState: shape({ mnpJournal: mnpJournalPropType, isMnpJournalLoading: bool }),
  user: object
}

const Wrapper = styled.div`
  padding: 22px 26px;
`
