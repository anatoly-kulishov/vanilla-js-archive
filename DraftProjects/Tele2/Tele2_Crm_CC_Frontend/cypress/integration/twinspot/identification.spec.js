/// <reference types="cypress" />

describe('Client identification', () => {
  // beforeEach(function () {
  //   cy.server()

  //   cy.route('GET', '*identifier', 'fx:internal/identifier')
  //   cy.route('POST', '/conversation/getConversation', 'fx:twinspot/identification/zero/getConversation').as(
  //     'mainConversation'
  //   )
  //   cy.route('GET', '/message/getMessages*', 'fx:twinspot/identification/zero/getMessages').as('messages')
  //   cy.route('GET', '/message/getCuvoLink*', 'fx:twinspot/getCuvoLink').as('messages')
  //   cy.route('GET', '/identification/identifyConversation*', 'fx:twinspot/identification/zero/identifyConversation').as(
  //     'identify'
  //   )

  //   cy.visit('http://localhost:3000/twinspot/dialog?conversationId=99999')
  // })

  it('check error IdentifyConversation', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.wait(500)
    // cy.get('button').contains('Привязать клиента вручную').should('be.visible').click()
    // cy.get('div')
    //   .contains('MSISDN')
    //   .children()
    //   .within($div => {
    //     cy.get('input').type('79022334365')
    //   })

    // cy.server()
    // cy.route('POST', '/ManualSearch/GetCustomers*', 'fx:twinspot/identification/zero/getCustomers').as('customers')
    // cy.route(
    //   'POST',
    //   '/conversation/updateIdentificationLevel*',
    //   'fx:twinspot/identification/zero/updateIdentificationLevel'
    // ).as('updateLevel')
    // cy.route('POST', '/conversation/getConversation', 'fx:twinspot/identification/zero/getConversationLeveled').as(
    //   'mainConversationLeveled'
    // )
    // cy.get('button').contains('Найти').click()
    // cy.wait('@customers').then(responce => {
    //   cy.get('button').contains('Привязать абонента').click()
    // })
    // cy.get('button').contains('Первый уровень').click()
    // cy.wait('@mainConversationLeveled').then(() => {
    //   cy.get('div')
    //     .contains('Наименование')
    //     .next('div')
    //     .should('have.text', 'ООО «Т2 МОБАЙЛ» (Тестовый B2B CRM WebDealer)')
    // })
  })

  it('check IdentifyConversation empty array', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.server()
    // cy.route(
    //   'GET',
    //   '/identification/identifyConversation*',
    //   'fx:twinspot/identification/zero/identifyConversationEmpty'
    // ).as('identify')
    // cy.wait(500)
    // cy.get('button').contains('Привязать клиента вручную').should('be.visible').click()
    // cy.get('div')
    //   .contains('MSISDN')
    //   .children()
    //   .within($div => {
    //     cy.get('input').type('79022334365')
    //   })

    // cy.route('POST', '/ManualSearch/GetCustomers*', 'fx:twinspot/identification/zero/getCustomers').as('customers')
    // cy.route(
    //   'POST',
    //   '/conversation/updateIdentificationLevel*',
    //   'fx:twinspot/identification/zero/updateIdentificationLevel'
    // ).as('updateLevel')
    // cy.route('POST', '/conversation/getConversation', 'fx:twinspot/identification/zero/getConversationLeveled').as(
    //   'mainConversationLeveled'
    // )
    // cy.get('button').contains('Найти').click()
    // cy.wait('@customers').then(responce => {
    //   cy.get('button').contains('Привязать абонента').click()
    // })
    // cy.get('button').contains('Первый уровень').click()
    // cy.wait('@mainConversationLeveled').then(() => {
    //   cy.get('div')
    //     .contains('Наименование')
    //     .next('div')
    //     .should('have.text', 'ООО «Т2 МОБАЙЛ» (Тестовый B2B CRM WebDealer)')
    // })
  })

  it('check IdentifyConversation array of one client', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.server()
    // cy.route('POST', '/conversation/getConversation', 'fx:twinspot/identification/zero/getConversation').as(
    //   'conversation'
    // )
    // cy.route(
    //   'GET',
    //   '/identification/identifyConversation*',
    //   'fx:twinspot/identification/zero/identifyConversationOne'
    // ).as('identify')
    // cy.reload()
    // cy.wait(2000)
    // cy.get('button').contains('Привязать').first().click()
    // cy.wait(1000)
    // cy.get('button').contains('Первый уровень').click()
  })
})
