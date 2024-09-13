/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Spin, notification, Tooltip, Form } from 'antd'
import { FilterOutlined } from '@ant-design/icons'

import CardNew from 'components/Card'
import ConfirmButton from 'components/ConfirmButton'
import LoadingSpinner from 'components/LoadingSpinner'
import SubscriptionsFilter from './components/SubscriptionsFilter'
import ActiveSubscriptionsTable from './components/ActiveSubscriptionsTable'
import OldSubscriptionsTable from './components/OldSubscriptionsTable'
import OldSubscriptionExpandedRow from './components/OldSubscriptionExpandedRow'
import HtmlRender from 'components/HtmlRender'
import PopoverSubscriptions from 'containers/PopoverSubscriptions'
import RatingMenu from 'containers/RatingMenu'
import { shouldRate } from 'containers/RatingMenu/shouldRate'

import { PersonalAccountShape } from 'constants/personalAccount'
import { ActiveSubscriptionsStateProps } from 'constants/activeSubscriptions'
import { ratingFeatureIds } from 'constants/ratingFeatureIds'
import { checkRight } from 'utils/helpers'

const { activeSubsFeatureId, oldSubsFeatureId } = ratingFeatureIds
const purifyOptions = { ADD_ATTR: ['target'] }

const LoadIcon = <LoadingSpinner spin />

const { useForm } = Form

const findLimitByServiceNumber = (limits, serviceNumber) => limits?.find(limit => limit.serviceNumber === serviceNumber)

const findAmountByServiceNumber = (amounts, serviceNumber) =>
  amounts?.find(amount => amount.serviceNumber === serviceNumber)
const checkIsSelected = (selected, record) =>
  selected?.find(item => item.ServiceNumber === record.ServiceNumber && item.Key !== record.Key)

const checkIsCompensationAllowed = (isCompensationAvailable, userPermissions) =>
  (isCompensationAvailable && userPermissions.isPaydComp) || userPermissions.isPaydCopmSubscriptionsAll

const propTypes = {
  personalAccount: PersonalAccountShape,
  activeSubscriptionsState: ActiveSubscriptionsStateProps,
  getActiveSubscriptions: PropTypes.func.isRequired,
  unsubscribeSelected: PropTypes.func.isRequired,
  sendSubscriptionSms: PropTypes.func.isRequired,
  handlingId: PropTypes.number,
  fetchUnsibscribeReasons: PropTypes.func,
  unsubscribeReasons: PropTypes.array,
  isUnsubscribeLoading: PropTypes.bool,
  fetchAvailableBalance: PropTypes.func
}

const Subscriptions = props => {
  const {
    getActiveSubscriptions,
    activeSubscriptionsState,
    personalAccount,
    unsubscribeReasons,
    fetchUnsibscribeReasons,
    fetchAvailableBalance,
    unsubscribeSelected,
    handlingId,
    sendSubscriptionSms,
    getSubscriptionCompensationLimits,
    subscriptionCompensationLimits,
    getSubscriptionCompensationAmounts,
    subscriptionCompensationAmounts,
    accrueSubscriptionCompensation,
    accruedSubscriptionCompensations,
    user,
    balance
  } = props

  const { Msisdn: msisdn } = personalAccount ?? {}

  const { activeSubscriptions, isActiveSubscriptionsLoading, oldSubscriptions, isActiveSuccess } =
    activeSubscriptionsState

  const { data: balanceData } = balance

  const [form] = useForm()

  const [filterHidden, setFilterHidden] = useState(false)
  const [selectedActive, setSelectedActive] = useState([])
  const [selectedOld, setSelectedOld] = useState([])
  const [expandedRowKeys, setExpandedRowKeys] = useState([])
  const [selectedOldRowKeys, setSelectedOldRowKeys] = useState([])

  useEffect(() => {
    if (!isActiveSuccess) {
      getActiveSubscriptions({ msisdn })
    }
    fetchAvailableBalance()
    form.setFieldsValue({ msisdn })

    !unsubscribeReasons && fetchUnsibscribeReasons()
  }, [])

  useEffect(() => {
    if (isActiveSuccess && oldSubscriptions) {
      const subscriptionList = oldSubscriptions.map(({ ProviderName, ServiceNumber }) => ({
        ProviderName,
        ServiceNumber
      }))
      getSubscriptionCompensationLimits({ msisdn, subscriptionList })
    }
  }, [isActiveSuccess])

  useEffect(() => {
    if (!subscriptionCompensationAmounts.isLoading && subscriptionCompensationAmounts.data.length > 0) {
      const expandedRowKeys = subscriptionCompensationAmounts.data?.reduce((acc, { serviceNumber }) => {
        const rowKey = selectedOld?.find(({ ServiceNumber }) => serviceNumber === ServiceNumber)?.Key
        if (!acc.includes(rowKey)) {
          acc.push(rowKey)
        }
        return acc
      }, [])

      setExpandedRowKeys(expandedRowKeys)
    }
  }, [subscriptionCompensationAmounts])

  const userPermissions = {
    isPaydComp: checkRight(user, 'CC:PaydComp'),
    isPaydCopmSubscriptionsAll: checkRight(user, 'CC:PaydCopmSubscriptionsAll'),
    isSubscriptionCompensationCalc: checkRight(user, 'CC:SubscriptionCompensationCalc')
  }

  const handleFilterHide = () => {
    setFilterHidden(!filterHidden)
  }

  const handleUnsubscribe = (reason, subscriptions) => {
    const subscriptionsRemove = []
    const { msisdn } = form.getFieldsValue()

    if (msisdn.length === 11) {
      if (subscriptions && subscriptions.length) {
        subscriptions.forEach((item, index) => {
          subscriptionsRemove[index] = {
            SubscriptionId: item.Id,
            SubscriptionName: item.Name,
            SubscriptionTypeId: item.SubscriptionTypeId,
            ProviderName: item.ProviderName,
            ServiceNumber: item.ServiceNumber,
            ReasonId: reason,
            SpaceSubscriptionId: item.SpaceSubscriptionId,
            TransitServiceId: item.TransitServiceId
          }
        })

        const req = {
          Msisdn: msisdn,
          Subscriptions: subscriptionsRemove,
          HandlingId: handlingId
        }

        unsubscribeSelected({ req, msisdn })
      } else {
        notification.open({
          message: 'Подписки',
          description: 'У абонента отсутствуют активные подписки',
          type: 'error'
        })
      }
    } else {
      notification.open({
        message: 'Подписки',
        description: 'Некорректный формат номера',
        type: 'error'
      })
    }
  }

  const handleSendSms = () => {
    const subscriptionsSms = []
    const subscriptionsNames = []
    const selected = [...selectedActive, ...selectedOld]
    const { msisdn } = form.getFieldsValue()

    if (msisdn.length === 11) {
      if ((selectedActive && selectedActive.length) || (selectedOld && selectedOld.length)) {
        selected.forEach((item, index) => {
          const text = `Подписка: ${item.Name} (${item.PaymentCost})\nДля подключения: ${item.SubscribeText}`
          subscriptionsSms[index] = text
          subscriptionsNames[index] = item.Name
        })

        const req = {
          Msisdn: msisdn,
          SmsText: subscriptionsSms,
          SubsNames: subscriptionsNames,
          HandlingId: handlingId
        }

        sendSubscriptionSms({ req })
      } else {
        notification.open({
          message: 'Подписки',
          description: 'Выберите подписки для отправки SMS',
          type: 'error'
        })
      }
    } else {
      notification.open({
        message: 'Подписки',
        description: 'Некорректный формат номера',
        type: 'error'
      })
    }
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = () => {
    const { dateRange, msisdn } = form.getFieldsValue()
    let DatePeriodStart, DatePeriodFinish
    if (dateRange.from !== '') {
      DatePeriodStart = dateRange.from.toISOString()
      DatePeriodFinish = dateRange.to.toISOString()
    } else {
      DatePeriodStart = dateRange.from
      DatePeriodFinish = dateRange.to
    }
    if (msisdn.length === 11) {
      getActiveSubscriptions({
        msisdn,
        fromDate: DatePeriodStart,
        toDate: DatePeriodFinish
      })
    } else {
      notification.open({
        message: 'Подписки',
        description: 'Некорректный формат номера',
        type: 'error'
      })
    }
  }

  const handlePaste = event => {
    form.setFieldsValue({
      msisdn: event
    })
  }

  const handleClickRemove = () => {
    form.setFieldsValue({
      msisdn: ''
    })
  }

  const handleActiveChange = (__, selectedRows) => {
    setSelectedActive(selectedRows)
  }

  const handleOldChange = (__, selectedRows) => {
    const nextSelectedRows = selectedRows?.reduce((acc, item) => {
      const { isCompensationAvailable } =
        findLimitByServiceNumber(subscriptionCompensationLimits.data, item.ServiceNumber) ?? {}
      const isCompensationAllowed = checkIsCompensationAllowed(isCompensationAvailable, userPermissions)
      const isSelected = checkIsSelected(acc, item)
      if (!isSelected && isCompensationAllowed) {
        acc.push(item)
      }
      return acc
    }, [])

    const nextSelectedRowKeys = nextSelectedRows.map(({ Key }) => Key)
    setSelectedOld(nextSelectedRows)
    setSelectedOldRowKeys(nextSelectedRowKeys)
  }

  const handleCompensationCalculate = () => {
    const subscriptionList = selectedOld?.map(({ ProviderName, ServiceNumber, TotalPaymentSum }) => ({
      ProviderName,
      ServiceNumber,
      TotalPayment: TotalPaymentSum
    }))

    getSubscriptionCompensationAmounts({ msisdn, subscriptionList })
  }

  const handleAccrue = (record, formValues) => {
    const { serviceNumber, documentTypeId } = record
    const { amount, commentText } = formValues
    const { clientBalanceId } = balanceData?.[0] ?? {}
    const data = {
      amount,
      activatePromo: false,
      compensationFormId: 1,
      compensationTypeId: documentTypeId,
      relationId: serviceNumber,
      commentText: userPermissions.isPaydCopmSubscriptionsAll ? commentText : serviceNumber,
      clientBalanceId,
      serviceNumber
    }
    accrueSubscriptionCompensation(data)
  }

  const handleExpandedRowsChange = nextRowKeys => {
    setExpandedRowKeys(nextRowKeys)
  }

  const handleAccrueSuccess = key => {
    const nextExpandedRowKeys = expandedRowKeys.filter(rowKey => rowKey !== key)
    setExpandedRowKeys(nextExpandedRowKeys)
  }

  const activeRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => handleActiveChange(selectedRowKeys, selectedRows)
  }

  const renderActiveSubscriptions = () => (
    <div>
      <SubscriptionsFilter
        form={form}
        hidden={filterHidden}
        onSubmit={handleSearch}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onClickRemove={handleClickRemove}
      />
      <Spin spinning={isActiveSubscriptionsLoading} indicator={LoadIcon}>
        <ActiveSubscriptionsTable activeSubscriptions={activeSubscriptions} rowSelection={activeRowSelection} />
      </Spin>
    </div>
  )

  const getActiveAdditional = handlingId => [
    shouldRate(activeSubsFeatureId) && { content: <RatingMenu currentFeatureId={activeSubsFeatureId} /> },
    { content: <FilterIcon />, onClick: handleFilterHide },
    {
      content: handlingId && (
        <PopoverSubscriptions
          title='Отключить все подписки?'
          confirm={reason => handleUnsubscribe(reason, props.activeSubscriptionsState.activeSubscriptions)}
        >
          <Label disabled={props.isUnsubscribeLoading}>Отключить все</Label>
        </PopoverSubscriptions>
      )
    },
    {
      content: handlingId && (
        <ConfirmButton text='Отправить SMS' confirmText='Отправить SMS?' onConfirm={handleSendSms} />
      )
    },
    {
      content: handlingId && (
        <PopoverSubscriptions
          title='Отписаться от выбранных подписок?'
          confirm={reason => handleUnsubscribe(reason, selectedActive)}
        >
          <Label disabled={props.isUnsubscribeLoading}>Отписаться от выбранных</Label>
        </PopoverSubscriptions>
      )
    }
  ]

  const oldRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => handleOldChange(selectedRowKeys, selectedRows),
    selectedRowKeys: selectedOldRowKeys,
    hideSelectAll: subscriptionCompensationLimits.data.length === 0,
    renderCell: (value, record, index, originNode) => {
      if (!subscriptionCompensationLimits.data.length) {
        return null
      }

      const { resultMessage } =
        findLimitByServiceNumber(subscriptionCompensationLimits.data, record.ServiceNumber) ?? {}

      if (resultMessage) {
        const title = <HtmlRender value={resultMessage} options={purifyOptions} />
        return <Tooltip title={title}>{originNode}</Tooltip>
      }

      return originNode
    },
    getCheckboxProps: record => {
      const { isCompensationAvailable } =
        findLimitByServiceNumber(subscriptionCompensationLimits.data, record.ServiceNumber) ?? {}
      const isCompensationAllowed = checkIsCompensationAllowed(isCompensationAvailable, userPermissions)
      const isAnotherRecordSelected = checkIsSelected(selectedOld, record)
      return { disabled: isAnotherRecordSelected || !isCompensationAllowed }
    }
  }

  const oldExpandable = {
    rowExpandable: record => {
      const amountsRecord = findAmountByServiceNumber(subscriptionCompensationAmounts.data, record.ServiceNumber)
      const { isSuccess } = accruedSubscriptionCompensations?.[record.ServiceNumber] ?? {}
      const isAnotherRecordSelected = checkIsSelected(selectedOld, record)
      return amountsRecord && !isSuccess && !isAnotherRecordSelected
    },
    expandedRowKeys,
    onExpandedRowsChange: handleExpandedRowsChange,
    expandedRowRender: record => {
      const amountsRecord = findAmountByServiceNumber(subscriptionCompensationAmounts.data, record.ServiceNumber)
      const accruedRecord = accruedSubscriptionCompensations?.[record.ServiceNumber]
      return (
        <OldSubscriptionExpandedRow
          record={amountsRecord}
          rowKey={record.Key}
          accruedRecord={accruedRecord}
          onAccrue={handleAccrue}
          onAccrueSuccess={handleAccrueSuccess}
          isEditingAllowed={userPermissions.isPaydCopmSubscriptionsAll}
        />
      )
    }
  }

  const renderOldSubscriptions = () => {
    const loading =
      isActiveSubscriptionsLoading ||
      subscriptionCompensationAmounts.isLoading ||
      subscriptionCompensationLimits.isLoading
    return (
      <Spin spinning={loading} indicator={LoadIcon}>
        <OldSubscriptionsTable
          oldSubscriptions={oldSubscriptions}
          rowSelection={oldRowSelection}
          expandable={oldExpandable}
        />
      </Spin>
    )
  }

  const getOldAdditional = () => {
    const isCompensationCalculateVisible = selectedOld.length > 0 && userPermissions.isSubscriptionCompensationCalc

    return [
      shouldRate(oldSubsFeatureId) && { content: <RatingMenu currentFeatureId={oldSubsFeatureId} /> },
      isCompensationCalculateVisible && {
        content: <Label disabled={subscriptionCompensationAmounts.isLoading}>Расчёт компенсации</Label>,
        onClick: handleCompensationCalculate
      }
    ]
  }

  return (
    <div>
      <ActiveSubscriptionsCard>
        <CardNew
          header={'Активные подписки'}
          content={renderActiveSubscriptions()}
          additional={handlingId && getActiveAdditional(handlingId)}
        />
      </ActiveSubscriptionsCard>
      <OldSubscriptionsCard>
        <CardNew
          header={'Подключенные ранее подписки'}
          content={renderOldSubscriptions()}
          additional={getOldAdditional()}
        />
      </OldSubscriptionsCard>
    </div>
  )
}

Subscriptions.propTypes = propTypes

export default Subscriptions

const ActiveSubscriptionsCard = styled.div`
  margin-bottom: 15px;
`
const OldSubscriptionsCard = styled.div`
  margin-bottom: 15px;
`
const FilterIcon = styled(FilterOutlined)`
  font-size: 17px;
`

const Label = styled.div`
  border-bottom: 1px solid rgb(127, 130, 133);
  padding-bottom: 1px;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}

  &:hover {
    border-color: #40bfee;
  }
`
