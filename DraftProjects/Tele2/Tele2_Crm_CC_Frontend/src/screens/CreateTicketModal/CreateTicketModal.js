/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import styled from 'styled-components'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Modal, Spin, Col, Row, notification } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import Head from './components/Head'
import Footer from './components/Footer'
import RightBlockContent from './components/RightBlockContent'
import LeftBlockContent from './components/LeftBlockContent'
import PropTypes from 'prop-types'
import { CreateTicketModalTicketsStateProps, CoordinatesProps } from 'constants/tickets'
import { logIfEnabled } from 'utils/helpers/logger'
import { MODAL_OPEN, MODAL_CLOSE } from 'constants/logTypes'
import { CREATE_TICKET_MODAL } from 'constants/logModalNames'
import { cardModes } from '../../constants/cardModes'

class CreateTicketModal extends Component {
  static propTypes = {
    lteNumber: PropTypes.bool,
    personalAccount: PropTypes.object,
    ticketsState: CreateTicketModalTicketsStateProps,
    saveTicketFormState: PropTypes.func,
    form: PropTypes.object,
    mnpMarkers: PropTypes.object,
    changeModalVisibility: PropTypes.func.isRequired,
    fetchContactLines: PropTypes.func.isRequired,
    selectReason: PropTypes.func,
    selectCategory: PropTypes.func,
    reasonsChange: PropTypes.func.isRequired,
    fetchLteNumber: PropTypes.func.isRequired,
    filterReasons: PropTypes.func.isRequired,
    fetchReasonsCategories: PropTypes.func.isRequired,
    createTicket: PropTypes.func.isRequired,
    ticketAddParams: PropTypes.func.isRequired,
    handlingId: PropTypes.number,
    clearAddParams: PropTypes.func,
    coordinates: PropTypes.arrayOf(CoordinatesProps),
    location: PropTypes.object,
    isVaildatedCoordinate: PropTypes.bool,
    fetchValidatedCoordinates: PropTypes.func,
    setHandlingCoordinates: PropTypes.func,
    setValidateCoordinateSmartGis: PropTypes.func,
    fetchHandlingCoordinates: PropTypes.func.isRequired,
    processingParameters: PropTypes.object,
    clearCheckCoverages: PropTypes.func.isRequired,
    checkCoverages: PropTypes.func.isRequired,
    isCheckCoveragesError: PropTypes.bool,
    checkCoveragesResult: PropTypes.object,
    clearCheckMTPByServiceId: PropTypes.func.isRequired,
    checkMTPByServiceId: PropTypes.func.isRequired,
    isCheckMTPByServiceIdError: PropTypes.bool,
    checkMTPByServiceIdResult: PropTypes.object,
    handlingTechId: PropTypes.string,
    isWebSeller: PropTypes.bool
  }

  state = {
    MSISDN: null,
    abonent: null,
    contactNumber: null,
    fileData: [],
    reasonSearchName: null,
    isClearTicket: false,
    isReadyForUseCoordinates: false,
    isGeopositionEnteredManually: false, // необходимо для сохранения предыдущих адреса или координат в случае закрытия окна заявки
    prevIsVisible: false
  }

  shouldComponentUpdate (nextProps) {
    return this.props.ticketsState.isVisible || nextProps.ticketsState.isVisible
    // Отмена обновлений если модалка невидима
  }

  componentDidMount () {
    const {
      fetchContactLines,
      personalAccount,
      fetchLteNumber,
      lteNumber,
      fetchReasonsCategories,
      mnpMarkers,
      form,
      ticketsState
    } = this.props
    const { Msisdn, ClientCategory, BillingBranchId, ClientId } = personalAccount
    const { isVisible, ticketFormState } = ticketsState
    const { Lte450 } = mnpMarkers ?? {}

    if (isVisible && ticketFormState) {
      form.setFieldsValue(ticketFormState)
    }

    fetchReasonsCategories()
    fetchContactLines()
    Msisdn &&
      fetchLteNumber({
        msisdn: Msisdn,
        clientCategory: ClientCategory,
        branchId: BillingBranchId,
        clientId: ClientId
      })

    this.setState({
      MSISDN: Msisdn,
      abonent: Msisdn,
      contactNumber: Lte450 ? lteNumber : Msisdn
    })
  }

  componentWillUnmount () {
    const {
      saveTicketFormState,
      form,
      ticketsState: { isVisible }
    } = this.props
    if (isVisible) {
      saveTicketFormState(form.getFieldsValue())
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { isClearTicket, prevIsVisible } = state
    const {
      personalAccount,
      mnpMarkers,
      lteNumber,
      ticketsState: { isCreateTicketLoading, createTicketError, isVisible },
      form,
      saveTicketFormState,
      handlingId,
      fetchHandlingCoordinates
    } = props

    const { Msisdn } = personalAccount
    const { Lte450 } = mnpMarkers ?? {}
    if (!isCreateTicketLoading && !createTicketError && isClearTicket) {
      form.resetFields()
      saveTicketFormState(null)
      return {
        contactNumber: Lte450 ? lteNumber : Msisdn,
        MSISDN: Msisdn,
        abonent: Msisdn,
        fileData: [],
        reasonSearchName: null,
        isClearTicket: false
      }
    }
    if (isCreateTicketLoading === true) {
      return {
        isClearTicket: true
      }
    }

    if (handlingId && isVisible !== prevIsVisible) {
      if (isVisible) {
        const fetchHandlingCoordinatesParams = {
          handlingId,
          isSingleRecordNeeded: false
        }
        fetchHandlingCoordinates(fetchHandlingCoordinatesParams)
      }
      return {
        prevIsVisible: isVisible
      }
    }

    return null
  }

  componentDidUpdate = prevProps => {
    const {
      ticketsState: { ticketFormState },
      saveTicketFormState,
      form
    } = this.props
    const { isVisible: prevIsVisible } = prevProps.ticketsState
    const { isVisible } = this.props.ticketsState

    if (prevIsVisible === false && isVisible === true) {
      if (ticketFormState) {
        form.setFieldsValue(ticketFormState)
      }
      logIfEnabled({ type: MODAL_OPEN, log: CREATE_TICKET_MODAL })
    } else if (prevIsVisible === true && isVisible === false) {
      saveTicketFormState(form.getFieldsValue())
      logIfEnabled({ type: MODAL_CLOSE, log: CREATE_TICKET_MODAL })
    }
  }

  isFieldChangeHandle = (value, name) => {
    // TODO: сейчас это используется только для дерева причин
    this.setState({ [name]: value })
  }

  sendFile = files => {
    const { fileData } = this.state
    const { isWebSeller } = this.props

    let maxFileAmount = 1
    let maxFileNotificationText = 'Прикреплять файлы к заявкам следует по одному'

    if (isWebSeller) {
      maxFileAmount = 10
      maxFileNotificationText = `Следует приклеплять не более ${maxFileAmount} файлов к заявкам`
    }

    if (files !== undefined && files.length === maxFileAmount) {
      this.setState({
        fileData: [...fileData, ...files]
      })
    } else {
      notification.error({
        message: 'Ошибка добавления файлов',
        description: maxFileNotificationText
      })
    }
  }

  clearTicket = () => {
    const { selectReason, filterReasons, form, clearAddParams } = this.props

    this.setState({
      fileData: [],
      reasonSearchName: null
    })
    selectReason({ reason: null })
    form.resetFields()
    clearAddParams()
    this.setDefaultValidateConstant()
    this.setGeopositionEnteredManually(false)
    filterReasons({ value: '', field: 'reasonName' })
  }

  check = () => {
    const { selectedReason, selectedCategory } = this.props.ticketsState
    const { validateFields } = this.props.form
    // TODO: попробовать исправить в новой версии анта
    validateFields(['coordinates', 'Address'], { force: true })
    validateFields(err => {
      if (!err && !!selectedReason && !!selectedCategory) {
        this.sendTicketToBPM()
      }
    })
  }

  sendTicketToBPM = () => {
    const {
      createTicket,
      ticketsState: { selectedReason, selectedCategory, isValidatedCoordinateSmartGis },
      personalAccount,
      handlingId,
      form,
      setHandlingCoordinates,
      processingParameters: { processingParameters },
      cardMode,
      whoIsIt,
      handlingTechId,
      activeSaleOffice
    } = this.props
    const {
      coordinates,
      contactNumber,
      email,
      Person,
      Address,
      problemDescription,
      MSISDN,
      feedbackChannel,
      addParams
    } = form.getFieldsValue()

    const {
      ParentClientInfo,
      SubscriberFullInfo,
      ClientId,
      ClientTypeId,
      ClientCategory,
      BillingBranchId,
      Email,
      SubscriberId,
      ClientStatusId
    } = personalAccount

    const {
      PersonalAccountId: ClientInfoPersonalAccountId,
      ParentClientName: CompanyName,
      ParentJurClientTypeId
    } = ParentClientInfo ?? {}
    const { Enviroment, ClientFullName, PersonalAccountId, JurClientTypeId } =
      SubscriberFullInfo?.SubscriberClientInfo ?? {}
    const { SubscriberTypeId, SubscriberStatusId } = SubscriberFullInfo?.SubscriberInfo ?? {}

    const ServiceChannelId = processingParameters?.ServiceChannel?.Id
    const DirectionId = processingParameters?.InteractionDirection?.Id
    const HandlingBranchId = processingParameters?.HandlingBranchId
    const Coordinates = coordinates?.replace(/(_| )/g, '').replace(/(,)/, ' ')

    const factualBillingBranchId = whoIsIt?.BillingBranchId
    const currentJurClientTypeId = ClientCategory === 'B2B' ? ParentJurClientTypeId : JurClientTypeId
    const RegionCodeId =
      cardMode === cardModes.leon && factualBillingBranchId ? factualBillingBranchId : BillingBranchId

    createTicket({
      AbonentNumber: MSISDN,
      TypeId: '1b0bc159-150a-e111-a31b-00155d04c01d',
      UmbServiceRequestReason: selectedReason.ReasonId,
      UmbCategoryReason: selectedCategory.CategoryId,
      FeedbackModeId: feedbackChannel,
      ContactNumber: contactNumber,
      ClientEmail: email || Email,
      ContactPerson: Person,
      Location: Address,
      Coordinates,
      Description: problemDescription,
      addParams: addParams,
      FileData: this.state.fileData,
      ClientCategoryId: ClientCategory,
      UmbInVoiceSubId: SubscriberId,
      UmbServiceType: Enviroment,
      UmbInVoiceClientID: ClientId,
      RegionCodeId: RegionCodeId,
      ClientFullName,
      PersonalAccountNumber: ClientInfoPersonalAccountId || PersonalAccountId,
      HandlingId: handlingId,
      SubscriberTypeId,
      SubscriberStatusId,
      ClientTypeId,
      CompanyName,
      ServiceChannelId,
      ClientServiceMethod: Enviroment,
      ClientStatusId,
      DirectionId,
      HandlingBranchId,
      HandlingTechId: handlingTechId,
      ClientJurTypeId: currentJurClientTypeId,
      OfficeId: activeSaleOffice?.salesOfficeId
    })

    const splitCoordinates = Coordinates?.split(' ')
    Coordinates !== '' &&
      setHandlingCoordinates({
        Address,
        Lat: splitCoordinates?.[0],
        Lng: splitCoordinates?.[1],
        handlingId,
        IsNotValidated: isValidatedCoordinateSmartGis ? 0 : 1
      })
  }

  validateBySmartGis = () => {
    const { fetchValidatedCoordinates, form } = this.props
    const { coordinates } = form.getFieldsValue()

    if (coordinates) {
      const splitCoordinates = coordinates?.split(',')
      if (splitCoordinates.length > 1) {
        const Latitude = splitCoordinates[0].replace(/[_ ]/g, '')
        const Longitude = splitCoordinates[1].replace(/[_ ]/g, '')
        const coordinatesParams = {
          Lat: Latitude,
          Lng: Longitude
        }
        fetchValidatedCoordinates(coordinatesParams)
        this.setState({ isReadyForUseCoordinates: true })
      }
    }
    form.validateFields(['coordinates'])
  }

  setDefaultValidateConstant = () => {
    const { setValidateCoordinateSmartGis } = this.props
    this.setState({ isReadyForUseCoordinates: false })
    setValidateCoordinateSmartGis(false)
  }

  setGeopositionEnteredManually = value => {
    this.setState({ isGeopositionEnteredManually: value })
  }

  setValidCoordinate = () => {
    this.setState({ isReadyForUseCoordinates: true })
  }

  style = { backgroundColor: 'rgba(0, 0, 0, 0)' }

  render () {
    const {
      ticketsState,
      personalAccount,
      reasonsChange,
      selectCategory,
      selectReason,
      ticketAddParams,
      fetchReasonsCategories,
      filterReasons,
      form,
      changeModalVisibility,
      clearAddParams,
      coordinates,
      setValidateCoordinateSmartGis,
      clearCheckCoverages,
      checkCoverages,
      isCheckCoveragesError,
      checkCoveragesResult,
      clearCheckMTPByServiceId,
      checkMTPByServiceId,
      isCheckMTPByServiceIdError,
      checkMTPByServiceIdResult,
      isWebSeller
    } = this.props

    const {
      isCreateTicketLoading,
      reasons,
      categories,
      isReasonsCategoriesLoading,
      isReasonsCategoriesError,
      selectedReason,
      selectedCategory,
      isVisible
    } = ticketsState
    const { getFieldDecorator } = form

    const checkCoveragesData = { isCheckError: isCheckCoveragesError, checkResult: checkCoveragesResult }
    const checkMTPByServiceIdData = {
      isCheckMTPError: isCheckMTPByServiceIdError,
      checkMTPResult: checkMTPByServiceIdResult
    }

    return (
      <Form>
        <TicketModal
          visible={isVisible}
          width={'73vw'}
          maskStyle={this.style}
          onCancel={changeModalVisibility}
          title={
            <Head
              changeModalVisibility={changeModalVisibility}
              checkCoveragesData={checkCoveragesData}
              checkMTPByServiceIdData={checkMTPByServiceIdData}
            />
          }
          footer={
            <Footer
              isWebSeller={isWebSeller}
              isCreateTicketLoading={isCreateTicketLoading}
              check={this.check}
              clearTicket={this.clearTicket}
              changeModalVisibility={changeModalVisibility}
              checkCoveragesData={checkCoveragesData}
            />
          }
        >
          <Spin indicator={<AntIcon spin />} spinning={isCreateTicketLoading}>
            <ModalContent>
              <Col span={12}>
                <LeftBlockContent
                  isWebSeller={isWebSeller}
                  // TODO: все эти пропсы нужны для дерева, не забыть при рефакторе дерева
                  ticketAddParams={ticketAddParams}
                  fetchReasonsCategories={fetchReasonsCategories}
                  reasons={reasons}
                  categories={categories}
                  isReasonsCategoriesLoading={isReasonsCategoriesLoading}
                  isReasonsCategoriesError={isReasonsCategoriesError}
                  selectedReason={selectedReason}
                  selectedCategory={selectedCategory}
                  filterReasons={filterReasons}
                  selectCategory={selectCategory}
                  selectReason={selectReason}
                  reasonsChange={reasonsChange}
                  reasonSearchName={this.state.reasonSearchName}
                  clearAddParams={clearAddParams}
                  sendFile={this.sendFile}
                  personalAccount={personalAccount}
                  ticketsState={ticketsState}
                  isFieldChangeHandle={this.isFieldChangeHandle}
                  form={form}
                  coordinates={coordinates}
                  setDefaultValidateConstant={this.setDefaultValidateConstant}
                  validateBySmartGis={this.validateBySmartGis}
                  setValidateCoordinateSmartGis={setValidateCoordinateSmartGis}
                  setGeopositionEnteredManually={this.setGeopositionEnteredManually}
                  setValidCoordinate={this.setValidCoordinate}
                  clearCheckCoverages={clearCheckCoverages}
                  checkCoverages={checkCoverages}
                  clearCheckMTPByServiceId={clearCheckMTPByServiceId}
                  checkMTPByServiceId={checkMTPByServiceId}
                  {...this.state}
                />
              </Col>
              <Col span={12}>
                <RightBlockContent getFieldDecorator={getFieldDecorator} ticketsState={ticketsState} />
              </Col>
            </ModalContent>
          </Spin>
        </TicketModal>
      </Form>
    )
  }
}

export default Form.create()(CreateTicketModal)

const TicketModal = styled(Modal)`
  position: fixed;
  padding: 0;
  top: 110px;
  left: 0;
  height: calc(100vh - 110px);
  .ant-modal-title {
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
    color: black;
  }
  .ant-modal-body {
    padding: 0;
  }
`
const ModalContent = styled(Row)`
  align-items: center;
`
const AntIcon = styled(LoadingOutlined)`
  font-size: 24;
  text-align: center;
`
