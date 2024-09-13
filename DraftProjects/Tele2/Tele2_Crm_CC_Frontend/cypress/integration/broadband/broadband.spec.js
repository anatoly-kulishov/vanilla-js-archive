describe('Broadband Form', () => {
  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    cy.window().then(win => {
      win.location.href = 'about:blank'
    })
  })

  it('opened order main information prefill', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/opened.json'
    }).as('getOpenedOrder')

    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOpenedOrder', { timeout: 10000 })
    // Регион - Москва
    cy.get('[data-tid=select__broadband-form__main-region] span.ant-select-selection-item').should('contain', 'Москва')
    // Msisdn - +7 (902) 233-43-65
    cy.get('[data-tid=input__broadband-form__main-msisdn] input.ant-input').should(
      'have.attr',
      'value',
      '+7 (902) 233-43-65'
    )
    // Как обращаться - Иванов Иван Иванович
    cy.get('[data-tid=input__broadband-form__main-nickname]').should('have.attr', 'value', 'Иванов Иван Иванович')
    // Фамилия/Имя/Отчество - Иванов Иван Иванович
    cy.get('[data-tid=input__broadband-form__main-firstname]').should('have.attr', 'value', 'Иванов') // TODO messed up
    cy.get('[data-tid=input__broadband-form__main-middlename]').should('have.attr', 'value', 'Иван')
    cy.get('[data-tid=input__broadband-form__main-lastname]').should('have.attr', 'value', 'Иванович')
    // Пол - Мужской
    cy.get('[data-tid=select__broadband-form__main-sex] span.ant-select-selection-item').should('contain', 'Мужской')
    // Дата рождения - 31.12.1987
    cy.get('[data-tid=datepicker__broadband-form__main-birthday]').should('have.attr', 'value', '31.12.1987')
    // Место рождения - Москва
    cy.get('[data-tid=input__broadband-form__main-birthplace]').should('have.attr', 'value', 'Москва')
    // Гражданин РФ - checked
    cy.get('[data-tid=checkbox__broadband-form__main-citizen]').should('be.checked')
    // Коммент - коммент
    cy.get('[data-tid=checkbox__broadband-form__main-comment]').should('have.attr', 'value', 'коммент')
  })

  it('new order main information prefill', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/personalInfo/GetClientSubscriberInfoTemp*', {
      fixture: '/broadband/responses/getClientSubscriberInfoTemp.json'
    }).as('getClientSubscriberInfoTemp')
    cy.intercept('GET', '/marker/GetMarkers?Msisdn=79022334365&SubscriberStatus=1', {
      fixture: '/broadband/responses/getMarkers.json'
    }).as('getMarkers')
    cy.visit('/card/rtc-broadband/create-order?msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getClientSubscriberInfoTemp', { timeout: 10000 })
    cy.wait('@getMarkers', { timeout: 10000 })
    // Регион - Москва
    cy.get('[data-tid=select__broadband-form__main-region] span.ant-select-selection-item').should('contain', 'Саранск')
    // Msisdn - +7 (902) 233-43-65
    cy.get('[data-tid=input__broadband-form__main-msisdn] input.ant-input').should(
      'have.attr',
      'value',
      '+7 (902) 233-43-65'
    )
    // Как обращаться - Иванов Иван Иванович
    cy.get('[data-tid=input__broadband-form__main-nickname]').should('have.attr', 'value', 'Иванов Иван Иванович')
    // Фамилия/Имя/Отчество - Иванов Иван Иванович
    cy.get('[data-tid=input__broadband-form__main-firstname]').should('have.attr', 'value', 'Иванов') // TODO messed up
    cy.get('[data-tid=input__broadband-form__main-middlename]').should('have.attr', 'value', 'Иван')
    cy.get('[data-tid=input__broadband-form__main-lastname]').should('have.attr', 'value', 'Иванович')
    // Пол - Пусто
    cy.get('[data-tid=select__broadband-form__main-sex] span.ant-select-selection-placeholder').should('contain', '')
    // Дата рождения - 01.01.1988
    cy.get('[data-tid=datepicker__broadband-form__main-birthday]').should('have.attr', 'value', '01.01.1988')
    // Место рождения - Пусто
    cy.get('[data-tid=input__broadband-form__main-birthplace]').should('have.attr', 'value', '')
    // Гражданин РФ - not checked
    cy.get('[data-tid=checkbox__broadband-form__main-citizen]').should('not.be.checked')
    // Коммент - Пусто
    cy.get('[data-tid=checkbox__broadband-form__main-comment]').should('have.attr', 'value', '')
  })

  it('opened order address information prefill', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/opened.json'
    }).as('getOpenedOrder')
    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOpenedOrder', { timeout: 10000 })
    // Регион - Москва г
    cy.get('[data-tid=select__broadband-form__address-region] span.ant-select-selection-item').should(
      'contain',
      'Москва г'
    )
    // Город / Населенный пункт - г Москва
    cy.get('[data-tid=select__broadband-form__address-city] span.ant-select-selection-item').should(
      'contain',
      'г Москва'
    )
    // Улица - проезд Симферопольский
    cy.get('[data-tid=select__broadband-form__address-street] span.ant-select-selection-item').should(
      'contain',
      'проезд Симферопольский'
    )
    // Дом - 14
    cy.get('[data-tid=select__broadband-form__address-house] span.ant-select-selection-item').should('contain', '14')
    // Квартира - 7
    cy.get('[data-tid=input__broadband-form__address-flat]').should('have.attr', 'value', '7')
    // Домофон - 111
    cy.get('[data-tid=input__broadband-form__address-intercom]').should('have.attr', 'value', '111')
    // Подъезд - 1
    cy.get('[data-tid=input__broadband-form__address-entrance]').should('have.attr', 'value', '1')
    // Этаж - 4
    cy.get('[data-tid=input__broadband-form__address-floor]').should('have.attr', 'value', '4')
    // Комментарий - коммент
    cy.get('[data-tid=input__broadband-form__address-comment]').should('have.attr', 'value', 'коммент')
    // Проверка запроса CheckAddress
    cy.intercept('GET', '/AddressInfo/CheckAddress*', { fixture: '/broadband/responses/success.json' }).as(
      'checkAddress'
    )
    cy.fixture('/broadband/requests/checkAddress.json').then(expectedBody => {
      cy.get('[data-tid=button__broadband-form__check-address]').click()
      cy.wait('@checkAddress').should(({ request }) => {
        const query = new URLSearchParams(request.url.split('?')[1])
        const queryObj = Object.fromEntries(query)
        expect(queryObj).to.deep.equal(expectedBody)
      })
    })
  })

  it('opened order orpon id house field disabled check', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/orpon.json'
    }).as('getOpenedOrder')
    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOpenedOrder', { timeout: 10000 })
    // Проверяем, что поле 'Дом' нельзя изменять
    cy.get('[data-tid=select__broadband-form__address-house]').should('have.class', 'ant-select-disabled')
    // Проверяем кнопку, 'Изменить дом'
    cy.get('[data-tid=button__broadband-form__change-house]').click()
    cy.get('.ant-popover-buttons .ant-btn-primary').click()
    cy.get('[data-tid=select__broadband-form__address-house]').should('not.have.class', 'ant-select-disabled')
    // Проверяем оборудование (чтобы загрузилось, до нажатия 'Сохранить')
    cy.get('[data-tid=select__broadband-form__technology] span.ant-select-selection-item').invoke('text').should(
      'to.have.length.of.at.least', 1)
    cy.get('[data-tid=select__broadband-form__technology-type] span.ant-select-selection-item').each(
      (item, index, list) => {
        cy.wrap(item).invoke('text').should('to.have.length.of.at.least', 1)
      }
    )
    // Проверяем запрос по кнопке 'Сохранить'
    cy.intercept('POST', '/BroadbandConnectionOrder/PerformOrder', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('performOrder')
    cy.fixture('/broadband/requests/performOrderNewBodySave.json').then(expectedBody => {
      cy.get('[data-tid=button__broadband-footer__save-button]').click()
      cy.wait('@performOrder').should(({ request }) => {
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
  })

  it('opened order address empty field disabling', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/opened.json'
    }).as('getOpenedOrder')
    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOpenedOrder', { timeout: 10000 })
    // Очищаем улицу, проверяем, что поле дом disabled
    cy.get('[data-tid=select__broadband-form__address-street] path').trigger('mousedown', { force: true })
    cy.get('[data-tid=select__broadband-form__address-street] input').should('have.attr', 'value', '')
    cy.get('[data-tid=select__broadband-form__address-house]').should('have.class', 'ant-select-disabled')
    // // Очищаем город, проверяем, что поле улица disabled
    cy.get('[data-tid=select__broadband-form__address-city] path').trigger('mousedown', { force: true })
    cy.get('[data-tid=select__broadband-form__address-city] input').should('have.attr', 'value', '')
    cy.get('[data-tid=select__broadband-form__address-street]').should('have.class', 'ant-select-disabled')
    // // Очищаем регион, проверяем, что поле город disabled
    cy.get('[data-tid=select__broadband-form__address-region] path').trigger('mousedown', { force: true })
    cy.get('[data-tid=select__broadband-form__address-region] input').should('have.attr', 'value', '')
    cy.get('[data-tid=select__broadband-form__address-city]').should('have.class', 'ant-select-disabled')
  })

  it('opened orpon order equipment check', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/orpon.json'
    }).as('getOrponOrder')
    cy.intercept('GET', '/BroadbandConnectionEquipment/GetSpeedToTechnology?maxSpeed=1000&rtcKey=RU-MOW-1&technology=FTTB', {
      fixture: '/broadband/responses/getSpeedToTechnology/index.json'
    }).as('getSpeedToTechnlogy')
    cy.intercept('GET', '/BroadbandConnectionEquipment/GetEquipmentType?rtcKey=RU-MOW-1&speedId=5&technologyId=1', {
      fixture: '/broadband/responses/getEquipmentType/index.json'
    }).as('GetEquipmentType')

    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOrponOrder', { timeout: 10000 })

    cy.contains('Требуемое оборудование', { timeout: 10000 })
    cy.contains('В случае изменения типа технологий все наборы оборудования будут удалены', { timeout: 10000 })

    // Проверяем предзаполнение технологии и скорости подключения
    cy.get('[data-tid=select__broadband-form__technology] span.ant-select-selection-item').should(
      'contain',
      'FTTB | 500 мбит/с'
    )
    // Проверяем наличие технологий в select'е
    const technologyTypesSpeeds = ['FTTB | 100 мбит/с', 'FTTB | 300 мбит/с', 'FTTB | 500 мбит/с']
    cy.get('[data-tid=select__broadband-form__technology]').click()
    cy.get('.ant-select-item.ant-select-item-option').each((item, index, list) => {
      cy.wrap(item).should('contain', technologyTypesSpeeds[index])
    })
    cy.get('[data-tid=select__broadband-form__technology]').click()

    // Проверяем количество предзаполненных форм с оборудованим
    cy.get('[data-tid=form-item__broadband-form__equipment-field]').should('have.length', 2)
    // Проверяем предзаполнение тиров оборудования
    const technologyTypes = ['Wifi-роутер', 'ТВ-Приставка']
    cy.get('[data-tid=select__broadband-form__technology-type] span.ant-select-selection-item').each(
      (item, index, list) => {
        cy.wrap(item).should('contain', technologyTypes[index])
      }
    )

    // Проверяем наличие сегментов оборудования в select'е и их предзаполнение
    const technologySegmentTypes = ['Премиум', 'Стандарт']
    cy.get('[data-tid=select__broadband-form__technology-segment]').each((item, index, list) => {
      cy.wrap(item).should('contain', technologySegmentTypes[index])
      cy.wrap(item).click()
      cy.get('.ant-select-dropdown')
        .not('.ant-select-dropdown-hidden')
        .within($dropdown => {
          cy.get('.ant-select-item.ant-select-item-option').each((optionItem, index, list) => {
            cy.wrap(optionItem).should('contain', technologySegmentTypes[index])
          })
        })
      cy.wrap(item).click()
    })

    // Проверяем наличие форм оплаты в select'е и их предзаполнение
    const payForms = ['Аренда', 'Полная стоимость', 'Рассрочка']
    const payFormsSelected = ['Полная стоимость', 'Аренда']
    cy.get('[data-tid=select__broadband-form__technology-pay-form]').each((item, index, list) => {
      cy.wrap(item).should('contain', payFormsSelected[index])
      cy.wrap(item).click()
      cy.get('.ant-select-dropdown')
        .not('.ant-select-dropdown-hidden')
        .within($dropdown => {
          cy.get('.ant-select-item.ant-select-item-option').each((optionItem, index, list) => {
            cy.wrap(optionItem).should('contain', payForms[index])
          })
        })
      cy.wrap(item).click()
    })

    // Проверяем работоспособность кнопки "Добавить оборудование"
    cy.get('[data-tid=button__broadband-form__add-equipment]').should('have.text', 'Добавить оборудование')
    cy.get('[data-tid=button__broadband-form__add-equipment]').click()
    cy.get('[data-tid=form-item__broadband-form__equipment-field]').should('have.length', 3)
    // Проверяем недоступность выбора сегмента при невыбранном оборудовании
    cy.get('[data-tid=select__broadband-form__technology-segment]').eq(2).should('have.class', 'ant-select-disabled')

    // Проверяем работоспособность кнопки "Удалить"
    cy.get('[data-tid=button__broadband-form__equipment-remove]').should('have.length', 3)
    cy.get('[data-tid=button__broadband-form__equipment-remove]').eq(2).click()
    cy.get('[data-tid=form-item__broadband-form__equipment-field]').should('have.length', 2)
  })

  it('opened order estimated time and engineer timeslot check', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/opened.json'
    }).as('getOpenedOrder')
    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Ожидаемые дата и время', { timeout: 10000 })
    cy.wait('@getOpenedOrder', { timeout: 10000 })

    // Проверка наличия datepicker и лейбла к нему
    cy.get('div').contains('Ожидаемые дата и время').should('have.length', 1)
    cy.get('[data-tid=date-picker__broadband-form__estimated-time]').should('be.visible')
    // Проверка доступности компонента
    cy.get('[data-tid=date-picker__broadband-form__estimated-time]').click()
    cy.get('.ant-picker-date-panel').should('be.visible')
    cy.get('.ant-picker-time-panel').should('be.visible')
    cy.get('[data-tid=date-picker__broadband-form__estimated-time]').click()

    // Проверка наличия select для таймслота и лейбла к нему
    cy.get('div').contains('Таймслот монтажника').should('have.length', 1)
    cy.get('[data-tid=select__broadband-form__timeslot]').should('be.visible')
    // Проверка наличия нужных options в select'е таймслота
    const timeslotOptions = ['Таймслот отсутствует', 'Таймслот установлен']
    cy.get('[data-tid=select__broadband-form__timeslot]').click()
    cy.get('.ant-select-item.ant-select-item-option').should('have.length', 2)
    cy.get('.ant-select-item.ant-select-item-option').each((item, index, list) => {
      cy.wrap(item).should('contain', timeslotOptions[index])
    })
  })

  it('opened order contacts block check', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/opened.json'
    }).as('getOpenedOrder')
    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Дополнительная контактная информация', { timeout: 10000 })
    cy.wait('@getOpenedOrder', { timeout: 10000 })

    // check 1-st contact prefill
    cy.get('[data-tid=form-field__broadband-contacts__contact-form-field]').should('have.length', 1)
    cy.get('[data-tid=broadband__contacts-form__owner]').should('have.value', 'Тестирование Рсrf')
    cy.get('[data-tid=broadband__contacts-form__type] .ant-select-selection-item').should(
      'contain',
      'Мобильный телефон'
    )
    cy.get('[data-tid=broadband__contacts-form__contact-msisdn]').should('have.value', '+7 (902) 233-43-65')

    // check creating 2-nd contact
    cy.get('[data-tid=button__broadband-contacts__add-contact]').click()
    cy.get('[data-tid=form-field__broadband-contacts__contact-form-field]').should('have.length', 2)
    cy.get('[data-tid=broadband__contacts-form__type] input').should('have.length', 2)
    cy.get('[data-tid=broadband__contacts-form__owner]').eq(1).should('have.value', '')
    cy.get('[data-tid=broadband__contacts-form__type] input').eq(1).should('contain', '')
    cy.get('[data-tid=broadband__contacts-form__contact-input]').should('have.value', '')

    // check select type => change of contact-input
    cy.get('[data-tid=broadband__contacts-form__contact-msisdn]').should('have.length', 1)
    cy.get('[data-tid=broadband__contacts-form__type] input').eq(1).click()
    cy.get('.ant-select-dropdown .ant-select-item-option-content').contains('Рабочий телефон').click()
    cy.get('[data-tid=broadband__contacts-form__contact-msisdn]').should('have.length', 2)

    // check max contacts count disabled adding button
    cy.get('[data-tid=button__broadband-contacts__add-contact]').click()
    cy.get('[data-tid=button__broadband-contacts__add-contact]').should('be.disabled')
    cy.get('[data-tid=form-field__broadband-contacts__contact-form-field]').should('have.length', 3)
    cy.get('[data-tid=broadband__contacts-form__owner]').eq(2).should('have.value', '')
    cy.get('[data-tid=broadband__contacts-form__type] input').should('have.length', 3)
    cy.get('[data-tid=broadband__contacts-form__type] input').eq(2).should('contain', '')
    cy.get('[data-tid=broadband__contacts-form__contact-input]').should('have.value', '')

    // check remove buttons
    cy.get('[data-tid=form-field__broadband-contacts__contact-form-field]').should('have.length', 3)
    cy.get('[data-tid=button__broadband-contacts__remove-contact').eq(2).click()
    cy.get('[data-tid=form-field__broadband-contacts__contact-form-field]').should('have.length', 2)
    cy.get('[data-tid=button__broadband-contacts__remove-contact').eq(1).click()
    cy.get('[data-tid=form-field__broadband-contacts__contact-form-field]').should('have.length', 1)
    cy.get('[data-tid=broadband__contacts-form__owner]').should('have.value', 'Тестирование Рсrf')
    cy.get('[data-tid=broadband__contacts-form__type] .ant-select-selection-item').should(
      'contain',
      'Мобильный телефон'
    )
    cy.get('[data-tid=broadband__contacts-form__contact-msisdn]').should('have.value', '+7 (902) 233-43-65')
  })

  it('opened draft order footer buttons check', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/draft.json'
    }).as('getOpenedOrderDraft')
    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOpenedOrderDraft', { timeout: 10000 })
    cy.get('[data-tid=span__broadband-status-bar__status-name]').should('contain', 'Черновик')
    // Проверяем видимость кнопок 'В обработку', 'Сохранить', 'Отказ'
    cy.get('[data-tid=button__broadband-footer__process-button]').as('processButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__save-button]').as('saveButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__reject-button]').as('rejectButton').should('be.visible')
    // Проверяем оборудование (чтобы загрузилось, до нажатия 'Сохранить')
    cy.get('[data-tid=select__broadband-form__technology] span.ant-select-selection-item').invoke('text').should(
      'to.have.length.of.at.least', 1)
    cy.get('[data-tid=select__broadband-form__technology-type] span.ant-select-selection-item').each(
      (item, index, list) => {
        cy.wrap(item).invoke('text').should('to.have.length.of.at.least', 1)
      }
    )
    // Проверяем запрос по кнопке 'В обработку'
    cy.intercept('POST', '/BroadbandConnectionOrder/PerformOrder', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('performOrder')
    cy.fixture('/broadband/requests/performOrderDraftBodyProcess.json').then(expectedBody => {
      cy.get('@processButton').click()
      cy.wait('@performOrder').should(({ request }) => {
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
    // Проверяем запрос по кнопке 'Сохранить'
    cy.fixture('/broadband/requests/performOrderDraftBodySave.json').then(expectedBody => {
      cy.get('@saveButton').click()
      cy.wait('@performOrder').should(({ request }) => {
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
    // Проверяем запрос по кнопке 'Отказ'
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOperationReasons?OperationId=-1', {
      fixture: '/broadband/responses/getOperations/reject.json'
    }).as('getOperationsReject')
    cy.get('@rejectButton').click()
    // Проверяем причину в модалке
    cy.wait('@getOperationsReject')
    cy.get('[data-tid=select__broadband-form__reason-type] input').click()
    cy.get('.ant-select-dropdown .ant-select-item-option').as('dropDownOptions')
    cy.get('@dropDownOptions').first().should('be.visible').click()
    cy.get('[data-tid=input__broadband-form__reason-comment]').type('коммент')
    cy.get('[data-tid=select__broadband-form__reason-type] span.ant-select-selection-item').should(
      'contain',
      'Отказ абонента'
    )
    // Проверяем запрос DeleteOrder
    cy.intercept('POST', '/BroadbandConnectionOrder/DeleteOrder', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('deleteOrder')
    cy.fixture('/broadband/requests/deleteOrderDraftBody.json').then(expectedBody => {
      cy.get('.ant-modal-footer .ant-btn-primary').click()
      cy.wait('@deleteOrder').should(({ request }) => {
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
  })

  it('opened new order footer buttons check', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/new.json'
    }).as('getOpenedOrderNew')
    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOpenedOrderNew', { timeout: 10000 })
    cy.get('[data-tid=span__broadband-status-bar__status-name]').should('contain', 'Новая заявка')
    // Проверяем видимость кнопок 'Передать в РТК', 'Ожидание', 'Сохранить', 'Отменить'
    cy.get('[data-tid=button__broadband-footer__transfer-button]').as('transferButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__wait-button]').as('waitButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__save-button]').as('saveButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__cancel-button]').as('cancelButton').should('be.visible')
    // Проверяем запрос по кнопке 'Передать в РТК'
    cy.get('@transferButton').click()
    cy.intercept('POST', '/BroadbandConnectionOrder/TransferOrderToRtc', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('transferOrderToRtc')
    cy.get('.ant-modal-confirm-btns .ant-btn-dangerous').click()
    cy.wait('@transferOrderToRtc').should(({ request }) => {
      expect(request.body).to.deep.equal({ orderId: 285 })
    })
    // Проверяем запрос по кнопке 'Ожидание'
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOperationReasons?OperationId=2', {
      fixture: '/broadband/responses/getOperations/wait.json'
    }).as('getOperationsWait')
    cy.get('@waitButton').click()
    // Проверяем причину в модалке
    cy.wait('@getOperationsWait')
    cy.get('[data-tid=select__broadband-form__reason-type] input').click()
    cy.get('.ant-select-dropdown .ant-select-item-option').as('dropDownOptions')
    cy.get('@dropDownOptions').first().should('be.visible').click()
    cy.get('[data-tid=input__broadband-form__reason-comment]').type('коммент')
    cy.get('[data-tid=select__broadband-form__reason-type] span.ant-select-selection-item').should(
      'contain',
      'Оформление SIM-карты'
    )
    // Проверяем запрос ChangeOrderWaitState
    cy.intercept('POST', '/BroadbandConnectionOrder/ChangeOrderWaitState', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('changeOrderWaitState')
    cy.fixture('/broadband/requests/changeWaitOrderStateTransfer.json').then(expectedBody => {
      cy.get('.ant-modal-footer .ant-btn-primary').click()
      cy.wait('@changeOrderWaitState').should(({ request }) => {
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
    // Проверяем запрос по кнопке 'Сохранить'
    cy.intercept('POST', '/BroadbandConnectionOrder/PerformOrder', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('performOrder')
    cy.fixture('/broadband/requests/performOrderNewBodySave.json').then(expectedBody => {
      cy.get('@saveButton').click()
      cy.wait('@performOrder').should(({ request }) => {
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
    // Проверяем запрос по кнопке 'Отменить'
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOperationReasons?OperationId=99', {
      fixture: '/broadband/responses/getOperations/cancel.json'
    }).as('getOperationsCancel')
    cy.get('@cancelButton').click()
    // Проверяем причину в модалке
    cy.wait('@getOperationsCancel')
    cy.get('[data-tid=select__broadband-form__reason-type] input').click()
    cy.get('.ant-select-dropdown .ant-select-item-option').as('dropDownOptions')
    cy.get('@dropDownOptions').first().should('be.visible').click()
    cy.get('[data-tid=input__broadband-form__reason-comment]').type('коммент')
    cy.get('[data-tid=select__broadband-form__reason-type] span.ant-select-selection-item').should(
      'contain',
      'Отказ абонента'
    )
    // Проверяем запрос ChangeOrderWaitState
    cy.intercept('POST', '/BroadbandConnectionOrder/CancelOrder', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('cancelOrder')
    cy.fixture('/broadband/requests/cancelOrder.json').then(expectedBody => {
      cy.get('.ant-modal-footer .ant-btn-primary').click()
      cy.wait('@cancelOrder').should(({ request }) => {
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
  })

  it('opened wait order footer buttons check', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', {
      fixture: '/broadband/responses/getOrder/wait.json'
    }).as('getOpenedOrderWait')
    cy.visit('/card/rtc-broadband/order?orderId=285&msisdn=79022334365')
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOpenedOrderWait', { timeout: 10000 })
    cy.get('[data-tid=span__broadband-status-bar__status-name]').should('contain', 'Ожидание')
    // Проверяем видимость кнопок 'Передать в РТК', 'Вернуть в работу', 'Сохранить', 'Отменить'
    cy.get('[data-tid=button__broadband-footer__transfer-button]').as('transferButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__return-button]').as('returnButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__save-button]').as('saveButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__cancel-button]').as('cancelButton').should('be.visible')
    // Проверяем запрос по кнопке 'Вернуть в работу'
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOperationReasons?OperationId=3', {
      fixture: '/broadband/responses/getOperations/return.json'
    }).as('getOperationsReturn')
    cy.get('@returnButton').click()
    // Проверяем причину в модалке
    cy.wait('@getOperationsReturn')
    cy.get('[data-tid=select__broadband-form__reason-type] input').click()
    cy.get('.ant-select-dropdown .ant-select-item-option').as('dropDownOptions')
    cy.get('@dropDownOptions').first().should('be.visible').click()
    cy.get('[data-tid=input__broadband-form__reason-comment]').type('коммент')
    cy.get('[data-tid=select__broadband-form__reason-type] span.ant-select-selection-item').should(
      'contain',
      'Повторный звонок'
    )
    // Проверяем запрос ChangeOrderWaitState
    cy.intercept('POST', '/BroadbandConnectionOrder/ChangeOrderWaitState', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('changeOrderWaitState')
    cy.fixture('/broadband/requests/changeWaitOrderStateTransfer.json').then(expectedBody => {
      cy.get('.ant-modal-footer .ant-btn-primary').click()
      cy.wait('@changeOrderWaitState').should(({ request }) => {
        expectedBody.isForWaitState = false
        expectedBody.reasonId = 14
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
  })

  it('opened in-work order footer buttons check', () => {
    cy.on('uncaught:exception', () => false)
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOrder?orderId=285', { fixture: '/broadband/responses/getOrder/inWork.json' }).as('getOpenedOrderInWork')
    cy.intercept('GET', '/BroadbandConnectionOrder/GetRtcStatuses?StatusId=40', { fixture: '/broadband/responses/getRtcStatuses.json'}).as('getRtcStatuses')
    cy.intercept('GET', '/BroadbandConnectionOrder/GetOperationReasons?OperationId=104', { fixture: '/broadband/responses/getOperations/transferRtc.json'}).as('getOperationsTransferRtc')
    cy.visit("/card/rtc-broadband/order?orderId=285&msisdn=79022334365")
    cy.contains('Заявка на подключение ШПД', { timeout: 10000 })
    cy.wait('@getOpenedOrderInWork', { timeout: 10000 })
    cy.get('[data-tid=span__broadband-status-bar__status-name]').should('contain', 'Принята в работу')
    // Проверяем видимость кнопок 'Передать в РТК', 'Вернуть в работу', 'Сохранить', 'Отменить'
    cy.get('[data-tid=button__broadband-footer__change-button]').as('changeButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__save-button]').as('saveButton').should('be.visible')
    cy.get('[data-tid=button__broadband-footer__cancel-button]').as('cancelButton').should('be.visible')
    // Проверяем кнопку 'Изменить состояние'
    cy.wait('@getRtcStatuses')
    cy.get('@changeButton').trigger('mouseover')
    // Проверяем варианты кнопки 'Изменить состояние'
    const buttonOptions = ['Передана в РТК', 'Назначен монтажник', 'Инсталляция выполнена', 'Закрыта']
    cy.get('[data-tid=menu-item__broadband-form__button-menu-item]')
      .as('changeButtonOptions')
      .each((item, index, list) => {
        cy.wrap(item).should('contain', buttonOptions[index])
      })
    // Проверяем запрос по кнопке 'Изменить состояние' -> 'Передать в РТК'
    cy.get('@changeButtonOptions').each((item, index, list) => {
      if (item.text().includes('Передана в РТК')) {
        cy.get('@changeButton').trigger('mouseover')
        cy.wrap(item).click()
      }
    })
    // Проверяем причину в модалке
    cy.wait('@getOperationsTransferRtc')
    cy.get('[data-tid=select__broadband-form__reason-type]').should('be.visible')
    cy.get('[data-tid=select__broadband-form__reason-type] input').click({ force: true })
    cy.get('.ant-select-dropdown .ant-select-item-option').as('dropDownOptions')
    cy.get('@dropDownOptions').first().should('be.visible').click()
    cy.get('[data-tid=input__broadband-form__reason-comment]').type('коммент')
    cy.get('[data-tid=select__broadband-form__reason-type] span.ant-select-selection-item').should(
      'contain',
      'Исправление ошибки'
    )
    // Проверяем запрос SetOrderStatus
    cy.intercept('POST', '/BroadbandConnectionOrder/SetOrderStatus', {
      statusCode: 200,
      fixture: '/broadband/responses/success.json'
    }).as('setOrderStatus')
    cy.fixture('/broadband/requests/setOrderStatus.json').then(expectedBody => {
      cy.get('.ant-modal-footer .ant-btn-primary').click()
      cy.wait('@setOrderStatus').should(({ request }) => {
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
    // Проверяем запрос по кнопке 'Изменить состояние' -> 'Назначен монтажник'
    cy.get('@changeButtonOptions').each((item, index, list) => {
      if (item.text().includes('Назначен монтажник')) {
        cy.get('@changeButton').trigger('mouseover')
        cy.wrap(item).click()
      }
    })
    cy.get('.ant-modal-confirm-btns .ant-btn-dangerous').click()
    cy.fixture('/broadband/requests/setOrderStatus.json').then(expectedBody => {
      cy.wait('@setOrderStatus').should(({ request }) => {
        expectedBody.operationId = 6
        expectedBody.reasonId = null
        expectedBody.reasonComment = ''
        expect(request.body).to.deep.equal(expectedBody)
      })
    })
  })
})
