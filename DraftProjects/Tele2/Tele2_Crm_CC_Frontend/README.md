# Tele2 CRM CC
## Настройка окружения OS
Для запуска приложения требуется NodeJS и Yarn.
Разрабатывая этот продукт в первую очередь мы ориентируемся на Chromium.
Используемые инструменты:
* [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=ru)
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru)
* [VS Code](https://code.visualstudio.com) или другой редактор, или IDE, например, WebStorm
## Среды
Для CRM CC существует несколько сред. [Среды CRM CC.](https://wiki.tele2.ru/display/MSD/Test%2C+Preproductive+and+Productive+Stands)
* **Production** - серда, которой пользуются операторы
* * Canary (продуктивная среда для обкатки релизов)
* * Silvester (продуктивная среда для полноценной эксплуатации)
* **Preproduction** - среда для проведения регрессионного тестирования и проведения бизнесом и/или аналитиками приемочного тестирования
* **Test** - среда для обкатки связки бекенда и фронтенда
* **Develop** - среда для разработки (общая)
* **Personal develop** - персональная среда для разработки (выделяется каждому разработчику). [Правила выделения сред и установки dev-сборок.](https://wiki.tele2.ru/display/MSD/Developers%27+stands)

## Сборка
Для каждой среды следует использовать конкретные ключи для сборки.
Обработка аргументов командной строки описана в файле *config/setEnv.js*.
### Используя yarn:
Сборка для **Production** (Tweety)
```bash
yarn build -prod t
```
Сборка для **Production** (Silvester)
```bash
yarn build -prod s
```
Сборка для **Preproduction**
```bash
yarn build -pp
```
Сборка для **Test**
```bash
yarn build -tst
```
Сборка для **Develop**
```bash
yarn build -t1
```
Сборка для **Personal develop**
```bash
yarn build -dev X 
```
где X - номер стенда [Подробнее тут.](https://wiki.tele2.ru/display/MSD/Developers%27+stands)
### Используя npm:
Сборка через npm не отличается по аргументам, нужно учесть особенности обработки этих аргументов, так, например, сборка для Preprod будет выглядеть следующим образом:

Сборка для **Preproduction**
```bash
npm run build -- -pp
```
## Разработка
### Code-style и производительность
Код должен быть в первую очередь читаемым и однозначным, в тоже время производительным. [Подробнее о code-style и оптимизации.](https://wiki.tele2.ru/display/MSD/Code+Style)
### Dev-server и настройка окружения
Для запуска приложения на локальной машине потребуется установленные NodeJS и Yarn, и подключение к [VPN Tele2.](https://wiki.tele2.ru/pages/viewpage.action?pageId=8929033)

После успешного подключения выполните команду для установки зависимостей:
```bash
yarn
```
или:
```bash
npm i
```
Далее запустите dev-server:
```bash
yarn start
```
или:
```bash
npm run start
```
Приложение довольно сильно завязано на бекенд и без авторизационного токена запуск на локальной машине будет почти бесполезным. Для его получения перейдите на компьютер или сервер внутри контура Tele2 и перейдите на [Test-среду.](http://t2ru-crmcc-dev02:12400/empty/manual-search) и перенесите токен из Local Storage (переменная token) к себе.
### Redux store
Для debug решений во время разработки следует пользоваться расширением [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru)].
#### Какие компоненты следует подключать?
Следует разумно обращаться со store, не стоит подключать все компоненты подряд. Допустимо подключать компоненты-скрины (крупные узлы приложения, импортируемые в Router) и containers - специальные компоненты, которые могут использоваться более одного раза.
#### Устройство Redux Store
Store подразумевает древовидную структуру - каждое ответвления от корня store отвечается за какую-либо существенную часть data-flow приложения, например, internal отвечает за все сервисные данные такие как авторизация или обращение (handling).
#### Статусы
* `legacy` - старый код, неоптимальная реализация, требует акутализации или рефакторинга
* `actual` - актуальный код
* `depricated` - используется, запрещено вносить изменения
* `unused` - не используется, будет удален в ближайшем рефакторинге

Название | Статус | Для чего используется
--|--|--
categoryIdForTemplateAdminState | `legacy` `depricated` `unused` | Не используется
changeCommentTemplateState | `legacy` | ?
changeSim | `actual` | Замена SIM (часть правой панели)
chooseRegionModalState | `legacy` | ?
comments | `actual` | Screen Comments
commentTemplates | `legacy` | ?
compensation | `actual` | Раздел "Операции" блока "Финансы" в скрине "Общая информация" и "Финансы"
compensations | `actual` | ?
diagnosticManager | `actual` | Скрин "Диагностика" менеджер диагностики
diagnostics | `actual` | Скрины "Покрытия" и "Офисы продаж"
editCommentModalState | `legacy` | ?
escalationSettingsModal | `legacy` | ?
feedback | `actual` | Модальное окно "Обратная связь"
finance | `actual` | Скрин "Финансы"
historyInteractions | `actual` | Скрин "История" раздел "Причины обращения"
historyRequestsDates | `legacy` `depricated` | Необходимо для дат (не использовать в новых разделах истории)
internal | `actual` | Все сервисные данные 
likes | `actual` | Лайки
lines | `actual` | Раздел "Группы" в "Общей информации"
linkedHandlingModalState | `legacy` | ?
manualSearch | `actual` | Скрин "Ручной поиск"
massProblems | `actual` | Скрин "Массовые проблемы"
mnp | `actual` | ?
questionary | `actual` | Модальное окно "Анкеты"
twinspot | `actual` | Раздел "Twinspot (ГОЗ)"
notesReasonCategoryGridState | `legacy` | ?
offers | `actual` | Раздел "Предложения" в "Общей информации" и части правой панели
personalInfo | `actual` | Данные об абоненте или клиенте (корневая часть, сверхважная, много зависимостей)
reasonCategoryCommentTemplate | `legacy` | ?
reasonIdForTemplateAdminState | `legacy` | ?
reasonsCategories | `legacy` | Модальное окно с регистрацией причины (старый код), отвечает за перфокарту
reasonsRegistering | `legacy` | Модальное окно с регистрацией причины (старый код), отвечает ?
searching | `actual` | Поиск по KMS ?
services | `actual` | Скрин "Услуги" и раздел "Услуги" в "Общей информации"
showcommentTemplateModalState | `legacy` | ?
sms | `legacy` | Модальное окно "Отправка СМС"
smsHistoryState | `actual` | История SMS
smsSending | `legacy` | Модальное окно "Отправка СМС" ?
smsTemplatesState | `legacy` | Модальное окно "Отправка СМС" выбор шаблона
subscriptions | `actual` | Скрин "Подписки"
tickets | `legacy` | Модальное окно регистрации заявки
wgHistory | `actual` | История Wargaming
promo | `actual` | История промокодов
### Взаимодействие с бекендом
Все взаимодействие с бекендом осуществляется при помощи поттерна [redux-saga](https://redux-saga.js.org). Типовой контракт сервиса в CRM выглядит так:
```js
{
  Data: null | object | array // объект или массив с основными данными от сервера
  IsSuccess: bool // DEPRICATED маркер успешности запроса
  MessageText: null | string // дополнительный текст к результату запроса
  ResultCode: number // Код результата 
  ResultType: number // Тип результата
}
```
При обработке сообщения в saga следует опираться на ResultType, справочник значений указан в файле *constants/servicesMessageType*

Таким образом типовая saga выглядит так:
```js
import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import servicesMessageTypes from 'constants/servicesMessageTypes'

// Деструктуризация метода
const { fetchPromoCodeHistory } = api

// Передача параметров метода следует производить в объекте payload из компонента
export function * fetchPromoHistorySaga ({ payload }) {
  try {
    // Вызов метода axios (см. ниже)
    const { data } = yield call(fetchPromoCodeHistory, payload)
    // Обработка запроса
    switch (data.ResultType) {
      // Запрос выполнен успешно
      case servicesMessageTypes.success:
        yield put({ type: FETCH_PROMO_HISTORY_FETCH_SUCCESS, payload: data })
        break
      // Запрос выполнен успешно, но есть предупреждение для пользователя
      case servicesMessageTypes.warning:
        yield put({ type: FETCH_PROMO_HISTORY_FETCH_SUCCESS, payload: data })
        // Вывод нотификации (часть библиотеки antd)
        notification.warn({
          message: 'История промокодов',
          description: data.MessageText
        })
        break
      // Запрос выполнен с ошибкой
      case servicesMessageTypes.error:
        yield put({ type: FETCH_PROMO_HISTORY_FETCH_ERROR, payload: data })
        break
      // Запрос выполнен с неизвестным результатом - ошибкой
      default:
        yield put({ type: FETCH_PROMO_HISTORY_FETCH_ERROR, payload: null })
        break
    }
    // Обработка сетевых и иных ошибок
  } catch (exception) {
    yield put({ type: FETCH_PROMO_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({
      message: 'История промокодов',
      description: exception.message
    })
  }
}
```
Что такое объект api из файла *utils/api*? Обертка над axios, позволяющая выполнять запросы на бекенд
```js
import axios from 'axios'
// Порты к сервисам (нет API Gateway)
import { promo } from 'constants/ports'
// Получение адреса бекенда и протокола из переменной окружения (на этапе сборки)
const pathBe = process.env.REACT_APP_BE
const http = process.env.REACT_APP_HTTP

export default {
  // Для запросов типа POST используется переменная data
  fetchActivatePromoCode: data => axios.post(`${http}${pathBe}:${promo}/promoCode/activatePromoCode`, data),
  // Для запросов типа GET используется переменная params
  fetchCancelPromoCode: params => axios.get(`${http}${pathBe}:${promo}/promoCode/cancelPromoCode`, { params })
  // Остальные типы запросов не используются
}
```
Какие типы actions старндартны? Типичный reducer выглядит так:
```js
import { createAction, handleActions } from 'redux-actions'

// Получение данных (используется при отправке запроса)
export const FETCH_PROMO_HISTORY_FETCH = 'promo/FETCH_PROMO_HISTORY_FETCH'
// Для успешной обработке запроса
export const FETCH_PROMO_HISTORY_FETCH_SUCCESS = 'promo/FETCH_PROMO_HISTORY_FETCH_SUCCESS'
// Запрос выполнен с ошибкой (бизнес)
export const FETCH_PROMO_HISTORY_FETCH_ERROR = 'promo/FETCH_PROMO_HISTORY_FETCH_ERROR'
// В случае неуспешной обработки (сетевых проблем, ошибки контракта и т. д.)
export const FETCH_PROMO_HISTORY_FETCH_FAILURE = 'promo/FETCH_PROMO_HISTORY_FETCH_FAILURE'

// Первоначальное значение state в store
const initialState = {
  promoHistory: null,
  isPromoHistoryLoading: false,
  promoHistoryError: null
}

export default handleActions({
  [FETCH_PROMO_HISTORY_FETCH]: (state) => ({
    ...state,
    // При первоначальном запросе изменяется только переменная, отвечающая за индикацию загрузки
    isPromoHistoryLoading: true
  }),
  [FETCH_PROMO_HISTORY_FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    // В случае успешности заполняется store нужными данными
    promoHistory: payload?.Data,
    // Отключается индикация загрузки
    isPromoHistoryLoading: false
  }),
  [FETCH_PROMO_HISTORY_FETCH_ERROR]: (state, { payload }) => ({
    ...state,
    // Отключается индикация загрузки в случае ошибки
    isPromoHistoryLoading: false,
    // Заполняется переменная с текстом ошибки
    promoHistoryError: payload?.MessageText
  }),
  [FETCH_PROMO_HISTORY_FETCH_FAILURE]: (state) => ({
    ...state,
    // В случае ошибки при обработке запроса лучше убрать значение основной переменной store
    promoHistory: null,
    // Отключить индикацию загрузки
    isPromoHistoryLoading: false,
    // Вывести сообщение для пользователя
    promoHistoryError: 'При получении истории услуг произошла ошибка'
  })
}, initialState)
```
После описания saga и reducer, а так же объявления функции-обретки над axios для запросов на бекенд следует подключить новые saga и reducer к корневым:
*sagas/index.js*
```js
import { all } from 'redux-saga/effects'
// ...импорт остальных sagas
// Импорт новой saga
import promo from './promo'

function * mySaga () {
  yield all([
    // ...остальные sagas
    promo()
  ])

export default mySaga
```
*reducers/index.js*
```js
import { combineReducers } from 'redux'

// Импорт нового reducer
import promo from './promo'

const rootReducer = combineReducers({
  // ...остальные reducers
  promo
})

export default rootReducer
```
Это описание основного процесса взаимодействия с бекендом, в каждом конкретном случае могут быть исключения, например, исключением является *sagas/diagnosticManager* из-за нестандартной бизнес-логики этот стандартный подход к нему неприменим. Но он подчиняется основным правилам:
* В reducer **только изменяются** значения
* В saga происходит **обработка данных и обслуживание жизненного цикла запроса**
### Роутинг и параметры URL
TODO: 
### Общие компоненты и функции
TODO: Папка utils, components
### Тестирование 
TODO: Cypress и Jest
### Конфигурация Webpack
TODO:
### Webpack Federation
TODO:

