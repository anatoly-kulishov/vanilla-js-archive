import React, { PureComponent, Fragment } from 'react'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { notification } from 'antd'
import PropTypes from 'prop-types'
import SearchFilters from './SearchFilters'
import SearchGrid from './SearchGrid'
import { validateInn } from 'utils/helpers/validators'

class Search extends PureComponent {
  static propTypes = {
    personalAccountState: PropTypes.object,
    queryParamsState: PropTypes.object,
    processingParameters: PropTypes.object,
    channels: PropTypes.array,
    fetchManualSearchGridData: PropTypes.func,
    cleanManualSearchGridData: PropTypes.func,
    getSubscriberList: PropTypes.func,
    manualSearchState: PropTypes.object,
    user: PropTypes.object,
    changeAbonentsModalVisibility: PropTypes.func,
    fetchSubscriberStatuses: PropTypes.func,
    redirectPaymentsUrl: PropTypes.func,
    payments: PropTypes.object,
    isVisible: PropTypes.bool,
    isUpdateIdentity: PropTypes.bool,
    handleUpdatingIdentificationLevel: PropTypes.func,
    isCreateOrder: PropTypes.bool
  }

  defaultState = {
    focusedInput: '',
    MSISDN: '',
    LocalPhoneNumber: '',
    IccId: '',
    PersonalAccountName: '',
    TTNumber: '',
    Inn: '',
    InnErrorMessage: 'ИНН пуст',
    Email: '',
    handlingChannel: '',
    isClosed: false,
    isB2b: false,
    fio: {
      LastName: '',
      FirstName: '',
      MiddleName: '',
      DocumentSeries: '',
      DocumentNumber: ''
    },
    errorInput: {
      PersonalAccountName: true,
      IccId: true,
      MSISDN: true,
      LocalPhoneNumber: true,
      Email: true,
      TTNumber: true,
      Inn: true,
      LastName: true,
      DocumentSeries: true,
      DocumentNumber: true
    },
    isHandlingChannelSet: false
  }

  state = {
    ...this.defaultState
  }

  static getDerivedStateFromProps (props, state) {
    const { isUpdateIdentity, channels } = props
    const { isHandlingChannelSet } = state

    if (isUpdateIdentity && !isHandlingChannelSet) {
      const handlingChannel = channels?.filter(channel => channel.Name === 'Email')?.[0]?.Id
      return handlingChannel ? { handlingChannel, isHandlingChannelSet: true } : null
    }
    return null
  }

  componentDidMount () {
    const {
      personalAccountState: { personalAccount },
      queryParamsState: { queryParams },
      processingParameters,
      user
    } = this.props

    if (user.isASSeller) {
      this.setState({
        errorInput: {
          PersonalAccountName: true,
          IccId: true,
          MSISDN: true,
          LocalPhoneNumber: '',
          Email: true,
          TTNumber: true,
          Inn: true,
          LastName: true,
          DocumentSeries: true,
          DocumentNumber: false
        }
      })
    } else {
      this.setState({
        focusedInput: 'MSISDN'
      })
    }

    if (personalAccount) {
      const ServiceChannelId = processingParameters?.ServiceChannel?.Id
      let handlingChannel = queryParams.serviceChannelId || ServiceChannelId || ''
      if (processingParameters && handlingChannel === processingParameters.ServiceChannel.Id) {
        handlingChannel = processingParameters.ServiceChannel.Name
      }
      this.setState({ handlingChannel })
    }
  }

  onFocusChangeHandle = field => {
    this.setState({ focusedInput: field })
  }

  isFieldChangeHandle = (elem, focusName, nestedName) => {
    let value
    if (elem) {
      if (elem.currentTarget) {
        value = elem.currentTarget.value
      } else {
        value = elem
      }
    } else {
      value = ''
    }

    if (typeof this.state[focusName] === 'object') {
      // проверки на правильное заполнение полей
      this.validationСheck(value, nestedName)
      this.setState({
        [focusName]: {
          ...this.state[focusName],
          [nestedName]: value
        }
      })
    } else {
      // проверки на правильное заполнение полей
      this.validationСheck(value, focusName)
      this.setState({ [focusName]: value })
    }
  }

  validationСheck (value, checkName) {
    const { errorInput } = this.state
    this.setState({
      errorInput: {
        ...errorInput,
        [checkName]: this.checkField(value, checkName)
      }
    })
  }

  checkField (value, checkName) {
    const { isASSeller } = this.props.user
    if (isASSeller) {
      switch (checkName) {
        case 'MSISDN':
          return value.length !== 11
        case 'LocalPhoneNumber':
          return value.length !== 11
        case 'DocumentSeries':
          return value.length === 0
        case 'DocumentNumber':
          return false
      }
    } else {
      switch (checkName) {
        case 'PersonalAccountName':
          return !/^\d+$/.test(value) || value === ''
        case 'TTNumber':
          return !/^[A-Za-z0-9]+$/.test(value)
        case 'Inn':
          const { isValid, error } = validateInn(value)
          this.setState({ InnErrorMessage: error })
          return !isValid
        case 'Email':
          return !/^(([^<>()\\[\]\\.,;:\s@\\"]+(\.[^<>()\\[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/.test(
            value
          )
        case 'IccId':
          return value.length !== 20 || !/^\d+$/.test(value)
        case 'MSISDN':
          return value.length !== 11
        case 'LocalPhoneNumber':
          return value.length !== 11
        case 'LastName':
          return value.length > 50 || value.length === 0 || !/^[A-Za-zА-Яа-я -]+$/.test(value)
        case 'DocumentSeries':
        case 'DocumentNumber':
          return value.length === 0
      }
    }
    return null
  }

  validateChannel = () => {
    const { channels, user } = this.props
    const { handlingChannel } = this.state
    if (user.isASSeller) {
      const visitChannel = channels.find(channel => channel.Name === 'Визит')
      return visitChannel ? visitChannel.Id : 'e5d8aa1b-ac89-e811-8110-00155df43732'
    }
    const findedChannel = channels.filter(
      item =>
        item.Name.toUpperCase() === handlingChannel.toUpperCase() ||
        item.Id.toUpperCase() === handlingChannel.toUpperCase()
    )
    const channel = findedChannel.length === 1 ? findedChannel[0].Id : null
    return channel
  }

  isButtonFindClickHandle = () => {
    const { focusedInput, isClosed } = this.state
    const { fetchManualSearchGridData, isUpdateIdentity, isCreateOrder, user } = this.props
    const { isASSeller } = user
    const channel = this.validateChannel()

    let fieldValue = null
    if (isASSeller) {
      fieldValue = {
        MSISDN: this.state.MSISDN,
        DocumentSeries: this.state.fio.DocumentSeries,
        DocumentNumber: this.state.fio.DocumentSeries
          ? this.state.fio.DocumentNumber
            ? this.state.fio.DocumentNumber
            : undefined
          : undefined
      }
    } else {
      fieldValue =
        typeof this.state[focusedInput] === 'object'
          ? { ...this.state[focusedInput] }
          : { [focusedInput]: this.state[focusedInput] }
    }
    const gridData = {
      handlingChannel: channel,
      fieldName: focusedInput,
      isClosed: isClosed,
      isUpdateIdentity,
      ...fieldValue
    }

    this.setState({ isB2b: focusedInput === 'PersonalAccountName' })
    channel
      ? fetchManualSearchGridData({ gridData, isASSeller, isCreateOrder })
      : notification.error({
        message: 'Поиск',
        description: !isUpdateIdentity
          ? 'Открытие карточки абонента или клиента недоступно'
          : `Для осуществления поиска необходимо выбрать доступный канал обращения`
      })
  }

  searchFormerOwners = () => {
    const { isClosed } = this.state
    this.setState({ isClosed: !isClosed })
  }

  handleKeyPressWebSeller = elem => {
    if (elem.key === 'Enter') {
      const { errorInput } = this.state
      const isValid = !errorInput.DocumentNumber && !errorInput.DocumentSeries && !errorInput.MSISDN
      if (isValid) {
        this.isButtonFindClickHandle()
      }
    }
  }

  handleKeyPress = elem => {
    const { handlingChannel, focusedInput, errorInput } = this.state
    let isValid = elem.key === 'Enter' && handlingChannel !== ''
    if (focusedInput === 'fio') {
      isValid = isValid && !errorInput.DocumentNumber && !errorInput.DocumentSeries && !errorInput.LastName
    } else {
      isValid = isValid && !errorInput[focusedInput]
    }

    if (isValid) {
      this.isButtonFindClickHandle()
    }
  }

  isButtonCleanClickHandle = () => {
    const { cleanManualSearchGridData } = this.props
    this.setState({ ...this.defaultState })
    cleanManualSearchGridData()
  }

  handleUdpdatingIdentity = (isDs, params) => {
    const { handleUpdatingIdentificationLevel } = this.props
    handleUpdatingIdentificationLevel(isDs, { ...params, lastUsedChannelId: this.state.handlingChannel })
  }

  render () {
    const {
      manualSearchState,
      personalAccountState: { personalAccount },
      getSubscriberList,
      user,
      channels,
      changeAbonentsModalVisibility,
      fetchSubscriberStatuses,
      redirectPaymentsUrl,
      payments,
      isUpdateIdentity,
      isCreateOrder
    } = this.props
    const { isASSeller: isWebSellerView } = user
    const { isB2b } = this.state
    return (
      <Fragment>
        <div onKeyPress={isWebSellerView ? this.handleKeyPressWebSeller : this.handleKeyPress}>
          <SearchFilters
            isCreateOrder={isCreateOrder}
            onFocusChangeHandle={this.onFocusChangeHandle}
            isButtonFindClickHandle={this.isButtonFindClickHandle}
            isButtonCleanClickHandle={this.isButtonCleanClickHandle}
            isFieldChangeHandle={this.isFieldChangeHandle}
            searchFormerOwners={this.searchFormerOwners}
            channels={channels}
            personalAccount={personalAccount}
            user={user}
            manualSearchState={manualSearchState}
            handleKeyPress={this.handleKeyPress}
            isUpdateIdentity={isUpdateIdentity}
            isWebSellerView={isWebSellerView}
            {...this.state}
          />
          {!isWebSellerView && (
            <SearchGrid
              getSubscriberList={getSubscriberList}
              manualSearchState={manualSearchState}
              validateChannel={this.validateChannel}
              changeAbonentsModalVisibility={changeAbonentsModalVisibility}
              isB2b={isB2b}
              fetchSubscriberStatuses={fetchSubscriberStatuses}
              redirectPaymentsUrl={redirectPaymentsUrl}
              payments={payments}
              isUpdateIdentity={isUpdateIdentity}
              handleUpdatingIdentificationLevel={this.handleUdpdatingIdentity}
            />
          )}
        </div>
      </Fragment>
    )
  }
}

export default Form.create()(Search)
