import axios from 'axios'
import qs from 'query-string'

import { getAuthToken } from 'utils/helpers/authToken'

import adjustment from './adjustment'
import blacklist from './blacklist'
import broadband from './broadband'
import category from './category'
import changeSim from './changeSim'
import clientRestrictions from './clientRestrictions'
import comment from './comment'
import commentTemplates from './commentTemplates'
import companyMarks from './companyMarks'
import compensations from './compensations'
import correctionData from './correctionData'
import diagnosticManager from './diagnosticManager'
import diagnostics from './diagnostics'
import escalation from './escalation'
import history from './history'
import ticket from './ticket'
import personalData from './personalData'
import interactionTemplates from './interactionTemplates'
import feedback from './feedback'
import finance from './finance'
import gameInteractions from './gameInteractions'
import handling from './handling'
import hlr from './hlr'
import interaction from './interaction'
import internal from './internal'
import likes from './likes'
import lines from './lines'
import manualSearch from './manualSearch'
import margin from './margin'
import markers from './markers'
import massProblems from './massProblems'
import mnp from './mnp'
import mnpJournal from './mnpJournal'
import mnpOrder from './mnpOrder'
import mnpVerify from './mnpVerify'
import offers from './offers'
import promo from './promo'
import protocol from './protocol'
import tariffConstructor from './tariffConstructor'
import remains from './remains'
import psychotype from './psychotype'
import questionary from './questionary'
import reason from './reason'
import reasonCategory from './reasonCategory'
import searching from './searching'
import serviceManagement from './serviceManagement'
import shopOrder from './shopOrder'
import sms from './sms'
import subscriptions from './subscriptions'
import suz from './suz'
import twinspot from './twinspot'
import charge from './charge'
import webim from './webim'
import billingNotifications from './billingNotifications'

import { reasonCategory as reasonCategoryPort, smartSearch, smsTemplate } from 'constants/ports'
import person from './person'
import fromEnv from 'config/fromEnv'

// WebSeller
import { applyRequestInterceptorWebSeller } from 'webseller/helpers/api/interceptors'
import customersCheck from 'webseller/features/webSellerSearch/utils'
import { isWebSellerApp } from 'webseller/helpers'
import salesHistory from './salesHistory'
import simCard from './simCard'
import replaceSim from './replaceSim'
import eShopOrders from './eShopOrders'
import salesOfficeLimitations from './salesOfficeLimitations'
import address from './address'
import dataIntegration from './dataIntegration'
import simSell from './simSell'
import teledealer from './teledealer'
import dealerInfo from './dealerInfo'
import documentIdentity from './documentIdentity'
import pep from './pep'
import document from './document'
import orders from './orders'
import contract from './contract'
import verification from './verification'
import manageringSession from './manageringSession'
import documentImages from './documentImages'
import b2b from './b2b'
import changeCodeWord from 'webseller/features/changeCodeWord/utils'
import mpnOrderStepper from 'webseller/features/mpnOrderStepper/utils'
import mnpOrderWebSeller from './mnpOrderWebseller'
import personalDataAS from './personalDataAS'
import task from './task'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

const paramCacheControl = 'no-cache, no-store, must-revalidate'

axios.interceptors.request.use(
  config => {
    let headers = {
      Authorization: getAuthToken(),
      ...config.headers
    }

    return {
      ...config,
      headers,
      paramsSerializer: params => qs.stringify(params, { encode: false }),
      validateStatus: function (status) {
        return status >= 200 && status < 500
      }
    }
  },
  error => Promise.reject(error)
)

if (isWebSellerApp()) {
  axios.interceptors.request.use(applyRequestInterceptorWebSeller)
}

axios.defaults.timeout = isWebSellerApp() ? 600_000 : 30_000

export default {
  ...finance,
  ...remains,
  ...internal,
  ...handling,
  ...massProblems,
  ...subscriptions,
  ...sms,
  ...commentTemplates,
  ...manualSearch,
  ...reason,
  ...category,
  ...reasonCategory,
  ...offers,
  ...companyMarks,
  ...interaction,
  ...escalation,
  ...history,
  ...ticket,
  ...personalData,
  ...interactionTemplates,
  ...hlr,
  ...tariffConstructor,
  ...lines,
  ...likes,
  ...feedback,
  ...serviceManagement,
  ...mnp,
  ...changeSim,
  ...searching,
  ...feedback,
  ...diagnostics,
  ...comment,
  ...diagnosticManager,
  ...clientRestrictions,
  ...gameInteractions,
  ...blacklist,
  ...compensations,
  ...suz,
  ...questionary,
  ...psychotype,
  ...twinspot,
  ...markers,
  ...promo,
  ...adjustment,
  ...broadband,
  ...protocol,
  ...margin,
  ...charge,
  ...shopOrder,
  ...webim,
  ...billingNotifications,
  ...mnpJournal,
  ...mnpOrder,
  ...mnpVerify,
  ...person,

  // WebSeller
  ...salesHistory,
  ...simCard,
  ...eShopOrders,
  ...salesOfficeLimitations,
  ...address,
  ...dataIntegration,
  ...simSell,
  ...teledealer,
  ...dealerInfo,
  ...documentIdentity,
  ...pep,
  ...document,
  ...orders,
  ...manageringSession,
  ...correctionData,
  ...contract,
  ...verification,
  ...replaceSim,
  ...documentImages,
  ...customersCheck,
  ...b2b,
  ...mnpOrderWebSeller,
  ...personalDataAS,
  ...changeCodeWord,
  ...mpnOrderStepper,
  ...task
}

// mtp categoru selector
export const fetchCategoriesList = params =>
  axios.get(`${http}${pathBe}:${reasonCategoryPort}/reasonCategory/getCategories`, {
    params
  })

export const fetchReasonCategories = reasonId =>
  axios.get(`${http}${pathBe}:${reasonCategoryPort}/reasoncategory/getcategories`, {
    params: reasonId
  })
// History
export const fetchTicketStatuses = () => axios.get(`${http}${pathBe}:${ticket}/ticketsHistory/GetBpmIncidentStatus`)

export const fetchSmsTemplates = parameters =>
  axios.get(`${http}${pathBe}:${smsTemplate}/smstemplate/GetFilteredTemplates`, {
    params: {
      system: true,
      targetsystem: 'CRM CC',
      ...parameters
    },
    headers: {
      'Cache-Control': paramCacheControl
    }
  })

export const fetchAdminSmsTemplates = ({ reasonId, categoryId }) =>
  axios.get(`${http}${pathBe}:${reasonCategoryPort}/CategorySmsTemplates/GetReasonCategorySmsTemplates`, {
    params: {
      reasonId: reasonId,
      categoryId: categoryId
    },
    headers: {
      'Cache-Control': paramCacheControl
    }
  })

export const fetchOperateSmsTemplates = ({ reasonId, categoryId, generalSmsTemplateId, b2bSmsTemplateId }) =>
  axios.get(`${http}${pathBe}:${reasonCategoryPort}/CategorySmsTemplates/OperateReasonCategorySmsTemplate`, {
    params: {
      reasonId: reasonId,
      categoryId: categoryId,
      generalSmsTemplateId: generalSmsTemplateId,
      b2bSmsTemplateId: b2bSmsTemplateId
    },
    headers: {
      'Cache-Control': paramCacheControl
    }
  })

export const fetchParametersProcessing = param =>
  axios.get(`${http}${pathBe}:${smartSearch}/Mdm/RequestParametersProcessing`, { params: param })
