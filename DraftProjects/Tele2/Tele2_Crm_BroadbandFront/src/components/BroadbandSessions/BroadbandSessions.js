import { useCallback, useEffect } from 'react'
import { Form } from 'antd'

import Card from 'crmHostApp/components/Card'
import SessionsFilters from './components/SessionsFilters'
import { useBroadbandContext } from 'context/hooks/useBroadbandContext'
import { constructUrl } from 'helpers/sessions'
import usePageVisibility from 'hooks/usePageVisibility'

const BroadbandSessions = ({ history, user }) => {
  const { createSessionState, getMacroRegions, getHandbooks, getRegions, getSessionTaskTypes, getSessionsInfo } =
    useBroadbandContext()
  const [form] = Form.useForm()

  const isPageHidden = usePageVisibility()

  useEffect(() => {
    getMacroRegions()
    getRegions()
    getHandbooks()
    getSessionTaskTypes()
  }, [])

  useEffect(() => {
    if (!isPageHidden) {
      getSessionsInfo({ UserLogin: user?.login })
    }
  }, [isPageHidden])

  const openOrder = useCallback((orderId, msisdn) => {
    const path = constructUrl('/card/rtc-broadband/order', { orderId, msisdn: msisdn || null })
    open(path)
  }, [])

  const createSessionData = createSessionState.data
  useEffect(() => {
    if (createSessionData?.orderId) {
      const { orderId, msisdn } = createSessionData
      openOrder(orderId, msisdn)
    }
  }, [createSessionData, openOrder])

  return (
    <Card
      header='Работа с заявками ШПД'
      menu={null}
      isContentLoading={false}
      content={<SessionsFilters history={history} openOrder={openOrder} form={form} />}
    />
  )
}

export default BroadbandSessions
