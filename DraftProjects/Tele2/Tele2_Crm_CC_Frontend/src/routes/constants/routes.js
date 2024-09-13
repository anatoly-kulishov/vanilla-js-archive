import { cardModes } from '../../constants/cardModes'
import { layouts } from './layouts'
import { Menu, Route } from './route'
import loadable from '@loadable/component'
import { getTypeCard } from 'webseller/helpers'

const CommonInformation = loadable(() =>
  import(/* webpackChunkName: "CommonInformation" */ 'screens/CommonInformation')
)
const Comments = loadable(() => import(/* webpackChunkName: "Comments" */ 'screens/Comments'))
const Subscriptions = loadable(() => import(/* webpackChunkName: "Subscriptions" */ 'screens/Subscriptions'))
const History = loadable(() => import(/* webpackChunkName: "History" */ 'screens/History'))
const Service = loadable(() => import(/* webpackChunkName: "Service" */ 'screens/Service'))
const MassProblemsOperator = loadable(() =>
  import(/* webpackChunkName: "MassProblemsOperator" */ 'screens/MassProblemsOperator')
)
const DataClientSubscriber = loadable(() =>
  import(/* webpackChunkName: "DataClientSubscriber" */ 'screens/DataClientSubscriber')
)
const NumberOperatorBelonging = loadable(() =>
  import(/* webpackChunkName: "NumberOperatorBelonging" */ 'screens/NumerOperatorBelonging')
)
const Finance = loadable(() => import(/* webpackChunkName: "Finance" */ 'screens/Finance'))
const CoveragesAndOffices = loadable(() =>
  import(/* webpackChunkName: "CoveragesAndOffices" */ 'screens/CoveragesAndOffices')
)
const SalesAndOffices = loadable(() => import(/* webpackChunkName: "SalesAndOffices" */ 'screens/SalesAndOffices'))
const DiagnosticManager = loadable(() =>
  import(/* webpackChunkName: "DiagnosticManager" */ 'screens/DiagnosticManager')
)
const ClientRestrictions = loadable(() =>
  import(/* webpackChunkName: "ClientRestrictions" */ 'screens/ClientRestrictions')
)
const ManualSearch = loadable(() => import(/* webpackChunkName: "ManualSearch" */ 'screens/ManualSearch'))
const Dialog = loadable(() => import(/* webpackChunkName: "Dialog" */ 'screens/Dialog'))
const Broadband = loadable(/* webpackChunkName: "Broadband" */ () => import('bootstrap/Broadband'))
const MnpJournal = loadable(() => import(/* webpackChunkName: "MnpJournal" */ 'screens/MnpJournal'))
const MnpManualVerification = loadable(() =>
  import(/* webpackChunkName: "MnpManualVerification" */ 'screens/MnpManualVerification')
)
const Validation = loadable(() => import(/* webpackChunkName: "Validation" */ 'screens/Validation'))
const BroadbandJournal = loadable(/* webpackChunkName: "BroadbandJournal" */ () => import('bootstrap/BroadbandJournal'))
const BroadbandSessions = loadable(
  /* webpackChunkName: "BroadbandSessions" */ () => import('bootstrap/BroadbandSessions')
)
const BroadbandShifts = loadable(/* webpackChunkName: "BroadbandShifts" */ () => import('bootstrap/BroadbandShifts'))
const ShopOrder = loadable(() => import(/* webpackChunkName: "ShopOrder" */ 'screens/ShopOrder'))
const Dashboard = loadable(() => import(/* webpackChunkName: "ShopOrder" */ 'screens/Dashboard'))
const SalesReport = loadable(() => import(/* webpackChunkName: "SalesReport" */ 'screens/SalesReport'))
const GiveOrdersHistory = loadable(() => import(/* webpackChunkName: "GiveOrdersHistory" */ 'screens/GiveOrdersHistory'))

const { isNonSubscriberCard, isLimitedCard, isAnonymousCard, isb2b, isUnionEnv, isSubscriberFirstLevelCard } = getTypeCard(true)

const routesСС = [
  new Route(
    'Общая информация',
    '/main',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.client],
    new Menu(true, false, '/balance', ''),
    ['CC:WebApp'],
    CommonInformation
  ),

  new Route(
    'Финансы',
    '/finance',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon],
    new Menu(true, false, '/balance/resources', ''),
    ['CC:WebApp', 'CC:Balance'],
    Finance
  ),
  new Route(
    'Услуги',
    '/services',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon],
    new Menu(true, false, '/connected', ''),
    ['CC:WebApp', 'CC:ServiceCategoryRoleRead'],
    Service
  ),
  new Route(
    'Подписки',
    '/subscriptions',
    [layouts.card],
    [cardModes.subscriber],
    new Menu(true, false, '', ''),
    ['CC:WebApp', 'CC:Subscription'],
    Subscriptions
  ),
  new Route(
    'Комментарии',
    '/comments',
    [layouts.card],
    [cardModes.subscriber, cardModes.client],
    new Menu(true, false, '', ''),
    ['CC:CommentsRead'],
    Comments
  ),
  new Route(
    'Диагностика',
    '/diagnostic',
    [layouts.card],
    [cardModes.subscriber],
    new Menu(true, false, '', ''),
    ['CC:WebApp', 'CC:Diagnostics'],
    DiagnosticManager
  ),
  new Route(
    'Покрытия',
    '/coverage',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous],
    new Menu(true, false, '', ''),
    ['CC:WebApp'],
    CoveragesAndOffices
  ),
  new Route(
    'Офисы продаж',
    '/sales-offices',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous],
    new Menu(true, true, '', ''),
    ['CC:WebApp', 'CC:ReadSalesOffices'],
    SalesAndOffices
  ),
  new Route(
    'Ограничения, устанавливаемые клиентом',
    '/client-restrictions',
    [layouts.card],
    [cardModes.subscriber],
    new Menu(true, true, '', ''),
    ['CC:WebApp'],
    ClientRestrictions
  ),
  new Route(
    'История',
    '/history',
    [layouts.card, layouts.twinspot],
    [cardModes.subscriber, cardModes.leon, cardModes.client, cardModes.anonymous],
    new Menu(true, false, '/appeals', ''),
    ['CC:WebApp'],
    History
  ),
  new Route(
    'Тех. проблемы',
    '/mass-problems',
    [layouts.card],
    [cardModes.subscriber, cardModes.client, cardModes.anonymous],
    new Menu(true, false, '', ''),
    ['CC:WebApp'],
    MassProblemsOperator
  ),
  new Route(
    'Принадлежность номера оператору',
    '/number-operator-belonging',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous],
    new Menu(true, true, '', ''),
    ['CC:WebApp'],
    NumberOperatorBelonging
  ),
  new Route(
    'Поиск',
    '/manual-search',
    [layouts.card, layouts.empty],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous, cardModes.client, cardModes.close, cardModes.unknown],
    new Menu(true, false, '', ''),
    ['CC:WebApp'],
    ManualSearch
  ),
  new Route(
    'Диалог',
    '/dialog',
    [layouts.twinspot],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous, cardModes.client],
    new Menu(false, false, '', ''),
    ['CC:WebApp'],
    Dialog
  ),
  new Route(
    'ШПД',
    '/rtc-broadband',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous],
    new Menu(true, false, '/journal', ''),
    ['CC:WebApp', 'CC:ReadBCOrder'],
    Broadband
  ),
  new Route(
    'Данные',
    '/data',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.client],
    new Menu(true, false, '', '/client'),
    ['CC:WebApp'],
    DataClientSubscriber
  ),
  new Route(
    'Интернет-магазин',
    '/shop-order',
    [layouts.card, layouts.empty],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous, cardModes.client],
    new Menu(false, false, '', ''),
    ['CC:WebApp', 'CC:ShopOrderCreate'],
    ShopOrder
  ),
  new Route(
    'Журнал заявок MNP',
    '/mnp-journal',
    [layouts.empty],
    [cardModes.unknown],
    new Menu(true, false, '/search', ''),
    ['CC:WebApp', 'CC:JournalMNPOrder'],
    MnpJournal
  ),
  new Route(
    'Форма ручной сверки',
    '/mnp-order',
    [layouts.empty],
    [cardModes.unknown],
    new Menu(false, false, '/manual-verification', ''),
    ['CC:WebApp', 'CC:JournalMNPOrder'],
    MnpManualVerification
  ),
  new Route(
    'Форма валидации распознанных значений',
    '/mnp-order-validation',
    [layouts.card, layouts.empty],
    [cardModes.unknown],
    new Menu(false, false, '', ''),
    ['CC:WebApp', 'CC:MNPScanValidate'],
    Validation
  ),
  new Route(
    'Журнал заявок ШПД',
    '/rtc-broadband-journal',
    [layouts.card, layouts.empty],
    [cardModes.unknown],
    new Menu(true, false, '/journal', ''),
    ['CC:WebApp', 'CC:ReadBCOrder'],
    BroadbandJournal
  ),
  new Route(
    'Журнал смен ШПД',
    '/rtc-broadband-shifts',
    [layouts.card, layouts.empty],
    [cardModes.unknown],
    new Menu(true, false, '', ''),
    ['CC:WebApp', 'CC:BCOrderSession', 'CC:BCOrderSessionAdmin'],
    BroadbandShifts
  ),
  new Route(
    'Обработка заявок ШПД',
    '/rtc-broadband-sessions',
    [layouts.card, layouts.empty],
    [cardModes.unknown],
    new Menu(true, false, '', ''),
    ['CC:WebApp', 'CC:BCOrderSession', 'CC:BCOrderSessionAdmin'],
    BroadbandSessions
  )
]

const routesAS = [
  new Route(
    'Dashboard',
    '/dashboard',
    [layouts.webSeller],
    [cardModes.unknown],
    new Menu(true, false, '', ''),
    ['AS:Seller'],
    Dashboard
  ),
  new Route(
    'Журнал заявок ШПД',
    '/rtc-broadband-journal',
    [layouts.webSeller],
    [cardModes.unknown],
    new Menu(true, false, '', ''),
    ['AS:Seller'],
    BroadbandJournal
  ),
  new Route(
    'Продажа',
    '/sales-report',
    [layouts.webSeller],
    [cardModes.unknown],
    new Menu(true, false, '', ''),
    ['AS:Seller', 'AS:SimWebSell'],
    SalesReport
  ),
  new Route(
    'Общая информация',
    '/main',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.client],
    new Menu(true, false, '/balance', ''),
    ['AS:Seller'],
    CommonInformation
  ),

  new Route(
    'Финансы',
    '/finance',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon],
    new Menu(true, false, `${(isb2b && isSubscriberFirstLevelCard) ? '/balance/payments' : '/balance/resources'}`, ''),
    ['AS:Seller'],
    Finance
  ),
  new Route(
    'Услуги',
    '/services',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon],
    new Menu(true, false, '/connected', ''),
    ['AS:Seller'],
    Service,
    [!(isb2b && isSubscriberFirstLevelCard && !isUnionEnv), !isAnonymousCard]
  ),
  new Route(
    'Подписки',
    '/subscriptions',
    [layouts.card],
    [cardModes.subscriber],
    new Menu(true, false, '', ''),
    ['AS:Seller'],
    Subscriptions,
    [!(isb2b && isSubscriberFirstLevelCard)]
  ),
  new Route(
    'Комментарии',
    '/comments',
    [layouts.card],
    [cardModes.subscriber, cardModes.client],
    new Menu(true, false, '', ''),
    ['AS:Seller'],
    Comments
  ),
  new Route(
    'История',
    '/history',
    [layouts.card, layouts.twinspot],
    [cardModes.subscriber, cardModes.leon, cardModes.client, cardModes.anonymous],
    new Menu(true, false, '/appeals', ''),
    ['AS:Seller'],
    History
  ),
  new Route(
    'Тех. проблемы',
    '/mass-problems',
    [layouts.card],
    [cardModes.subscriber, cardModes.client, cardModes.anonymous],
    new Menu(true, false, '', ''),
    ['AS:Seller'],
    MassProblemsOperator
  ),
  new Route(
    'Принадлежность номера оператору',
    '/number-operator-belonging',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous],
    new Menu(true, true, '', ''),
    ['AS:Seller'],
    NumberOperatorBelonging,
    [!isAnonymousCard, !isNonSubscriberCard, !isLimitedCard, !(isb2b && isSubscriberFirstLevelCard)]
  ),
  new Route(
    'ШПД',
    '/rtc-broadband',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.anonymous],
    new Menu(true, false, isAnonymousCard ? '/create-order' : '/journal', ''),
    ['AS:Seller'],
    Broadband,
    [!isb2b]
  ),
  new Route(
    'Данные',
    '/data',
    [layouts.card],
    [cardModes.subscriber, cardModes.leon, cardModes.client],
    new Menu(true, false, '', '/client'),
    ['AS:Seller'],
    DataClientSubscriber,
    [!isAnonymousCard, !isNonSubscriberCard, !(isb2b && isSubscriberFirstLevelCard)]
  ),
  new Route(
    'Журнал заявок ШПД',
    '/rtc-broadband-journal',
    [layouts.card, layouts.empty],
    [cardModes.unknown],
    new Menu(true, false, '/journal', ''),
    ['AS:Seller'],
    BroadbandJournal,
    [!isAnonymousCard, !(isb2b && isSubscriberFirstLevelCard)]
  ),
  new Route(
    'История выдачи заказов',
    '/give-orders-history',
    [layouts.webSeller],
    [cardModes.unknown],
    new Menu(true, false, '', ''),
    ['AS:Seller'],
    GiveOrdersHistory,
    [!isAnonymousCard, !(isb2b && isSubscriberFirstLevelCard)]
  )
]

export const getRoutes = (isASSeller = false) => (isASSeller ? routesAS : routesСС)
