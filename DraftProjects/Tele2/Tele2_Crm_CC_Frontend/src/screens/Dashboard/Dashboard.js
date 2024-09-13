import React, { useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col } from 'antd'
import ManualSearch from 'screens/ManualSearch'
import { SimIcon, ESimIcon, SimsIcon, InternetIcon, HistoryIcon, ShareIcon, ErfIcon } from 'assets'
import { checkRight } from 'utils/helpers'
import { SALLING_PROCESS_STEPS } from 'webseller/features/saleSim/helpers'
import { Modal, Button } from 'webseller/components'
import DashboardItem from './components/DashboardItem'
import DashboardButton from './components/DashboardButton'
import DashboardSalesReport from './components/DashboardSalesReport'
import SaleSimModal from 'webseller/features/saleSim/components/SaleSimModal'
import { GIVING_ORDER_PROCESS_STEPS } from 'reducers/giveOrder/giveOrderStepsReducer'
import GiveOrderModal from 'webseller/features/giveOrder/components/GiveOrderModal'
import featureConfig from 'webseller/featureConfig'
import { checkRightWithOperations } from 'webseller/helpers'
import RfaReportModal from 'webseller/features/rfaReport/components/RfaReportModal'
import { useSelector } from 'react-redux'

export default function Dashboard ({
  user,
  officeId,
  sellAvailability,
  hasAllRequiredData,
  salesReportShort,
  isLoadingSaleSimRequiredData,
  sallingProcessStep,
  giveOrderProcessStep,
  isSalesReportShortLoading,
  setSalesReportShortLoading,
  initSellSim,
  initSellESim,
  initGiveOrder,
  initTransferToTele2,
  getSellAvailability,
  getSalesReportShort
}) {
  const history = useHistory()

  const [isShowRfaReportModal, setIsShowRfaReportModal] = useState(false)
  const [isShowCreateOrderModal, setIsShowCreateOrderModal] = useState(false)
  const [isShowSubmitESimSaleModal, setIsShowSubmitESimSaleModal] = useState(false)

  const isLoadingGetActiveSalesOffice = useSelector((state) => state?.salesOffice?.isLoadingGetActiveSalesOffice)

  const isSimWebSell = checkRight(user, 'AS:SimWebSell')
  const isAllowToSellSim = checkRightWithOperations({
    permissions: user?.Permissions,
    permissionName: 'AS.SimWebSell',
    operationName: 'C'
  })
  const hasErfReportORight = checkRightWithOperations({
    permissions: user?.Permissions,
    permissionName: 'AS.ErfReport',
    operationName: 'O'
  })
  const hasErfReportFRight = checkRightWithOperations({
    permissions: user?.Permissions,
    permissionName: 'AS.ErfReport',
    operationName: 'F'
  })

  const isAllowToTransferToTele2 = checkRight(user, 'AS.Mnp:C')
  const isAllowToSellUntemplatedSim = checkRight(user, 'AS:UntemplatedSIMSell')
  const isAllowToGiveOrder = checkRight(user, 'AS:DeliveryEshopOrders')
  const isAllowToSellUntemplatedESim =
    checkRight(user, 'AS:UntemplatedESIMSell') && Boolean(sellAvailability?.isEsimAvailable)

  useLayoutEffect(() => {
    if (officeId) {
      getSellAvailability(officeId)
    }
  }, [officeId])

  const navigateToSalesHistory = () => {
    history.push('sales-report')
  }

  const navigateToBroadbandJournal = () => {
    history.push('rtc-broadband-journal')
  }

  const onClickSellSim = () => {
    initSellSim()
  }

  const onClickSellESim = () => {
    setIsShowSubmitESimSaleModal(true)
  }

  const onClickTransferToTele2 = () => {
    initTransferToTele2()
  }

  const onClickSubmitSellESim = () => {
    initSellESim()
    setIsShowSubmitESimSaleModal(false)
  }

  const onClickCreateOrder = () => {
    setIsShowCreateOrderModal(true)
  }

  const onCloseCreateOrderModal = () => {
    setIsShowCreateOrderModal(false)
  }

  const onOpenRfaReportModal = () => {
    setIsShowRfaReportModal(true)
  }

  const onCloseRfaReportModal = () => {
    setIsShowRfaReportModal(false)
  }

  return (
    <>
      {isShowSubmitESimSaleModal && (
        <Modal
          width={320}
          zIndex={1001}
          footer={[
            <Button onClick={() => setIsShowSubmitESimSaleModal(false)}>Нет</Button>,
            <Button type='primary' onClick={onClickSubmitSellESim}>
              Да
            </Button>
          ]}
        >
          Аппарат клиента в наличии и поддерживает технологию eSIM? Итогом продажи станет обязательная установка профиля
        </Modal>
      )}
      {sallingProcessStep !== SALLING_PROCESS_STEPS.NONE && <SaleSimModal />}
      {giveOrderProcessStep !== GIVING_ORDER_PROCESS_STEPS.NONE && <GiveOrderModal />}
      {isShowCreateOrderModal && (
        <Modal title='Новая заявка' width={600} zIndex={1001} onCancel={onCloseCreateOrderModal}>
          <ManualSearch isCreateOrder />
        </Modal>
      )}
      {isShowRfaReportModal && (
        <RfaReportModal
          isSearchDisabled={!hasErfReportFRight}
          onClose={onCloseRfaReportModal}
        />
      )}
      <Row gutter={[56, 19]}>
        <Col span={3} />
        <Col span={7}>
          <DashboardItem title='Мобильная связь'>
            <Row gutter={[11, 11]}>
              <Col span={12}>
                <DashboardButton
                  icon={<SimIcon />}
                  loading={isLoadingSaleSimRequiredData}
                  disabled={(!isAllowToSellSim && !isAllowToSellUntemplatedSim)}
                  onClick={onClickSellSim}
                >
                  Продать SIM
                </DashboardButton>
              </Col>
              <Col span={12}>
                <DashboardButton
                  icon={<ESimIcon />}
                  loading={isLoadingSaleSimRequiredData}
                  disabled={!isAllowToSellUntemplatedESim || !hasAllRequiredData}
                  onClick={onClickSellESim}
                >
                  Продать eSIM
                </DashboardButton>
              </Col>
            </Row>
            <Row style={{ marginTop: 11 }} gutter={[11, 11]}>
              <Col span={12}>
                <DashboardButton
                  icon={<SimsIcon />}
                  loading={isLoadingSaleSimRequiredData}
                  disabled={!isAllowToTransferToTele2}
                  onClick={onClickTransferToTele2}
                >
                  Перевести в Tele2
                </DashboardButton>
              </Col>
              <Col span={12}>
                <DashboardButton
                  icon={<ShareIcon />}
                  disabled={!isAllowToGiveOrder || !officeId}
                  onClick={initGiveOrder}
                >
                  Выдать заказ
                </DashboardButton>
              </Col>
            </Row>
          </DashboardItem>
          <DashboardItem title='Домашний интернет'>
            <Row gutter={[11, 11]}>
              <Col span={12}>
                <DashboardButton icon={<InternetIcon />} onClick={onClickCreateOrder}>
                  Новая заявка
                </DashboardButton>
              </Col>
              <Col span={12}>
                <DashboardButton icon={<HistoryIcon />} onClick={navigateToBroadbandJournal}>
                  История заявок
                </DashboardButton>
              </Col>
            </Row>
          </DashboardItem>
          <DashboardItem title='Отчеты'>
            <Row gutter={[11, 11]}>
              <Col span={12}>
                <DashboardButton
                  icon={<ErfIcon />}
                  disabled={!hasErfReportORight && !hasErfReportFRight}
                  loading={isLoadingGetActiveSalesOffice}
                  onClick={onOpenRfaReportModal}>
                  Реестр ЭРФ физ. лиц
                </DashboardButton>
              </Col>
            </Row>
          </DashboardItem>
          {isSimWebSell && (
            <DashboardItem title='Твои результаты' onClickTitle={navigateToSalesHistory}>
              <DashboardSalesReport
                salesReport={salesReportShort}
                isLoading={isSalesReportShortLoading}
                setLoading={setSalesReportShortLoading}
                getSalesReport={getSalesReportShort}
              />
            </DashboardItem>
          )}
        </Col>
        <Col span={11}>
          <DashboardItem title='Поиск абонента' bordered={!featureConfig.isNewManualSearch} gap={5}>
            <ManualSearch />
          </DashboardItem>
        </Col>
        <Col span={3} />
      </Row>
    </>
  )
}
