import * as moment from 'moment'
import { select, call } from 'redux-saga/effects'
import { getHandlingState, getPersonalAccountState, getUserState } from 'selectors/index'
import { selectSearchParams } from 'webseller/features/webSellerSearch/reducer/selectors'
import { selectActiveSalesOffice } from 'webseller/features/salesOffice/selectors'
import { selectSubscriberData } from 'webseller/common/signing/selectors'
import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { selectHandlingState } from 'reducers/internal/selectors'
import { clientCategories } from 'constants/personalAccountStrings'
import { SEARCH_PARAMS } from 'webseller/constants/searchParams'
import {
  selectSubscriberIdentityDocumentFields,
  selectChangingTariffB2bClientMinimalInfo,
  selectChangingTariffParams,
  selectSubscriberFullName,
  selectTariffRateName,
  selectTariffServices,
  selectTariffSettings, selectSubscriberIdentityDocument
} from 'webseller/features/changingTariffPlan/selectors'
import { getSubscriberPersonalDataSaga } from 'webseller/features/changingTariffPlan/sagas/sagas'
import { checkDisableService } from 'webseller/features/changingTariffPlan/utils'

export function * createDocumentRequestBodyChangingClientStatus ({ code, isArchive }) {
  const searchParams = yield select(selectSearchParams)
  const { Msisdn: msisdn, ParentClientInfo, SubscriberFullInfo } = yield select(selectPersonalAccount)

  const isB2C = searchParams?.[SEARCH_PARAMS.CLIENT_CATEGORY] === clientCategories.B2C

  if (isB2C) {
    yield call(getSubscriberPersonalDataSaga, { msisdn })
  }

  const { DisplayName: sellerName, officeId, msisdn: userName } = yield select(getUserState)
  const b2bClientMinimalInfo = yield select(selectChangingTariffB2bClientMinimalInfo)
  const activeSalesOffice = yield select(selectActiveSalesOffice)
  const { Id: handlingId } = yield select(selectHandlingState)
  const subscriberData = yield select(selectSubscriberData)
  const newTariffName = yield select(selectTariffRateName)

  const identityDocumentFields = yield select(selectSubscriberIdentityDocumentFields)
  const { BillingBranchId, ClientId } = yield select(getPersonalAccountState)
  const identityDocument = yield select(selectSubscriberIdentityDocument)
  const subscriberFullName = yield select(selectSubscriberFullName)

  const {
    deactivatedServices,
    activatedServices,
    hasTariffSetting,
    tariffTraffic,
    tariffCost,
    tariffMin,
    tariffSms,
    rateName,
    targetDate
  } = yield select(selectChangingTariffParams)

  if (isB2C) {
    const tariffSettings = yield select(selectTariffSettings)
    const tariffServices = yield select(selectTariffServices)

    const hasThirdTrafficSlider = tariffSettings?.AvailableSliders?.TrafficTypeThreeSliders?.length
    const hasFirstTrafficSlider = tariffSettings?.AvailableSliders?.TrafficTypeOneSliders?.length
    const hasSecondTrafficSlider = tariffSettings?.AvailableSliders?.TrafficTypeTwoSliders?.length

    const tariffOptions = []

    if (hasThirdTrafficSlider) {
      tariffOptions.push({
        selected: true,
        description: `объем пакета интернета, включенный в абонентскую плату, установить в размере — ${tariffTraffic || 0} Гб`
      })
    }
    if (hasFirstTrafficSlider) {
      tariffOptions.push({
        selected: true,
        description: `объем пакета минут, включенный в абонентскую плату, установить в размере ${tariffMin || 0} мин.`
      })
    }
    if (hasSecondTrafficSlider) {
      tariffOptions.push({
        selected: true,
        description: `объем пакета SMS, включенный в абонентскую плату, установить в размере ${tariffSms || 0} SMS`
      })
    }

    const checkedTariffServices = tariffServices
      ?.filter(service => {
        const isActiveService = (service.AvailableServiceStatusPs === 'Unactive' || activatedServices.includes(service.BillingServiceIdPs))
        const isDeactivatedService = deactivatedServices.includes(service.BillingServiceIdPs)

        return isActiveService && !isDeactivatedService && !checkDisableService(service)
      })
      ?.map(service => ({ description: service?.ServiceNamePs }))

    if (checkedTariffServices?.length) {
      tariffOptions.push({
        selected: true,
        description: 'подключить следующие дополнительные услуги (опции):',
        subitem: checkedTariffServices
      })
    }

    return {
      typeId: 19,
      handlingId,
      format: 'PDF',
      isArchive,
      data: {
        appSellerUserName: userName,
        branchId: BillingBranchId,
        clientId: ClientId,
        subscriberInformation: {
          msisdn,
          name: subscriberFullName,
          docType: identityDocumentFields?.TypeDoc || identityDocument[0]?.trim(),
          docSeries: identityDocumentFields?.Series || identityDocument[1]?.trim(),
          docNumber: identityDocumentFields?.Number || identityDocument[2]?.trim()
        },
        tariff: {
          name: rateName || newTariffName,
          dateChange: targetDate,
          cost: tariffCost,
          options: hasTariffSetting ? tariffOptions : undefined
        },
        companyInfo: {
          sellerName: sellerName.trim(),
          contractStartPlace: activeSalesOffice?.fullAddress,
          sellerPointId: activeSalesOffice?.salesOfficeId || officeId
        },
        signDate: moment().format(),
        dsKey: code
      }
    }
  }

  return {
    typeId: 18,
    format: 'PDF',
    isArchive,
    handlingId,
    data: {
      docDate: moment().format('YYYY-MM-DD'),
      subscriberName: ParentClientInfo?.ParentClientName || ParentClientInfo?.ClientName,
      subscriberDocument: ParentClientInfo?.PersonalAccountId,
      contactMsisdn: subscriberData?.Data?.MainData?.ContactNumberB2b,
      confirmDocument: b2bClientMinimalInfo?.Data?.AdditionalOptParameters?.find(param => param['Key'] === 'managerAuthorityDocument')['Value'],
      operatorName: sellerName.trim(),
      sellerPointId: activeSalesOffice?.salesOfficeId || officeId,
      contractStartPlace: activeSalesOffice?.fullAddress,
      tariffPlan: {
        msisdn,
        currentName: SubscriberFullInfo?.SubscriberInfo?.RateName,
        newName: newTariffName || rateName
      }
    }
  }
}

export function * createRequestParamsCreateInteraction () {
  const { DisplayName: sellerName, msisdn: userName } = yield select(getUserState)
  const { Id: HandlingId } = yield select(selectHandlingState)
  const handling = yield select(getHandlingState)
  const { BillingBranchId: ClientBranchId, Msisdn, ClientId, SubscriberId } = yield select(getPersonalAccountState)
  return {
    HandlingId: handling?.id || HandlingId,
    Msisdn,
    ClientId,
    ClientBranchId,
    SubscriberId: SubscriberId,
    SubscriberBranchId: SubscriberId,
    ReasonId: 3,
    CategoryId: 0,
    RegisteringCaseId: 7,
    CreatedOn: moment(),
    CreatedBy: userName,
    UserName: userName,
    UserFio: sellerName.trim()
  }
}
