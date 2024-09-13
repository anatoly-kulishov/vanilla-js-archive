import { all } from 'redux-saga/effects'

import reasonsCategories from './reasonsCategories'
import rightModal from './rightModal'
import massProblem from './massProblems'
import handling from './handlings'
import personalInfo from './personalInfo'
import finance from './finance'
import comments from './comments'
import ticket from './ticket'
import services from './services'
import manualSearch from './manualSearch'
import subscriptions from './subscriptions'
import offers from './offers'
import escalationSettingsModal from './escalationSettingsModal'
import commentTemplates from './commentTemplates'
import internal from './internal'
import sms from './sms'
import history from './history'
import lines from './lines'
import likes from './likes'
import mnp from './mnp'
import searching from './searching'
import feedback from './feedback'
import diagnostics from './diagnostics'
import changeSim from './changeSim'
import diagnosticManager from './diagnosticManager'
import compensations from './compensations'
import questionary from './questionary'
import compensation from './compensation'
import twinspot from './twinspot'
import promo from './promo'
import margin from './margin'
import charge from './charge'
import shopOrder from './shopOrder'
import webim from './webim'
import mnpJournal from './mnpJournal'
import mnpOrder from './mnpOrder'
import person from './person'

// WebSeller
import saleSim from './saleSim'
import salesOffice from './salesOffice'
import documentIdentity from './documentIdentity'
import giveOrder from './giveOrder'
import customersCheck from 'webseller/features/webSellerSearch/sagas'
import recreateClient from 'webseller/features/recreateClient/sagas'
import correctionData from 'webseller/features/correctionData/sagas'
import signing from 'webseller/common/signing/sagas'
import replaceSim from 'webseller/features/replaceSim/sagas'
import duplicateRfa from 'webseller/features/duplicateRfa/sagas'
import verification from 'webseller/common/verification/sagas'
import terminationClient from 'webseller/features/terminationClient/sagas'
import changingClientStatus from 'webseller/features/changingClientStatus/sagas'
import numberRoleManagment from 'webseller/features/numberRoleManagment/sagas'
import changeCodeWord from 'webseller/features/changeCodeWord/sagas'
import changingTariffPlan from 'webseller/features/changingTariffPlan/sagas'
import mpnOrderStepper from 'webseller/features/mpnOrderStepper/sagas'
import transferTime from 'webseller/common/transferTimeStep/sagas'
import rfaReport from 'webseller/features/rfaReport/sagas'
import categorySaga from 'webseller/integration/phoneNumberCategory/sagas'
import structureOfExpenses from 'webseller/features/structureOfExpenses/sagas'

function * mySaga () {
  yield all([
    reasonsCategories(),
    handling(),
    rightModal(),
    massProblem(),
    finance(),
    personalInfo(),
    comments(),
    services(),
    ticket(),
    manualSearch(),
    subscriptions(),
    offers(),
    escalationSettingsModal(),
    commentTemplates(),
    internal(),
    sms(),
    history(),
    lines(),
    likes(),
    mnp(),
    changeSim(),
    searching(),
    feedback(),
    diagnosticManager(),
    diagnostics(),
    compensations(),
    questionary(),
    compensation(),
    twinspot(),
    promo(),
    margin(),
    charge(),
    shopOrder(),
    webim(),
    mnpJournal(),
    mnpOrder(),
    person(),

    // WebSeller
    saleSim(),
    salesOffice(),
    documentIdentity(),
    giveOrder(),
    signing(),
    recreateClient(),
    correctionData(),
    signing(),
    replaceSim(),
    duplicateRfa(),
    verification(),
    terminationClient(),
    changingClientStatus(),
    customersCheck(),
    numberRoleManagment(),
    changeCodeWord(),
    changingTariffPlan(),
    mpnOrderStepper(),
    transferTime(),
    rfaReport(),
    categorySaga(),
    structureOfExpenses()
  ])
}

export default mySaga
