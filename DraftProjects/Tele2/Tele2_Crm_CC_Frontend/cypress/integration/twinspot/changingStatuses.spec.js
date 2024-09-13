/// <reference types="cypress" />

import specTitle from 'cypress-sonarqube-reporter/specTitle'

describe(specTitle('Loading test messages'), () => {
  
  Cypress.on('uncaught:exception', (err, runnable) => false)
  // beforeEach(function () {
  //   cy.fixture('twinspot/messages/letter').then((letter) => { this.letter = letter })
  //   cy.intercept('GET', '*identifier', 'fx:internal/identifier')
  //   cy.intercept('POST', '/conversation/getConversation', 'fx:twinspot/getConversation_mainOpened').as('mainConversation')
  //   cy.intercept('GET', '/message/getMessages*', 'fx:twinspot/getMessages_oneInbox').as('messages')
  //   cy.visit('http://localhost:3000/twinspot/dialog?conversationId=99999')
  // })

  it('Message loads correct', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.wait(['@mainConversation', '@messages'])
    // cy.get('[data-cy=subject]').should('have.text', '99999: И снова тестовое письмо.')
    // cy.get('[data-cy=status]').should('have.text', 'Ожидает ')
    // cy.get('[data-cy=setWorkStatus]').should('have.text', 'Взять в работу')
    // cy.get('[data-cy=from]').should('have.text', 'anton.y.semenov@tele2.ru')
    // cy.get('[data-cy=user]').should('have.text', 'Семенов Антон Юрьевич')
    // cy.get('[data-cy=createdOn]').should('have.text', '15.10.2020 16:01')
    // cy.get('[data-cy=messageText]').should('have.html', this.letter)
    // cy.get('[data-cy=reply]').should('not.exist')
  })
})

describe(specTitle('Set work status'), () => {
  it('Click button \"В работе\"', () => {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.intercept('POST', '/conversation/setWorkStatus', 'fx:twinspot/setWorkStatus').as('setWorkStatus')
    // cy.intercept('POST', '/conversation/getConversation', 'fx:twinspot/getConversation_mainWip').as('getConversation')

    // cy.get('[data-cy=setWorkStatus]').click()

    // cy.wait(['@setWorkStatus', '@getConversation'])
    // cy.get('[data-cy=status]').should('have.text', 'В работе ')
    // cy.get('[data-cy=reply]').should('have.text', 'Ответить').should('have.class', 'ant-btn-primary')
    // cy.get('[data-cy=setIdleStatus]').should('have.text', 'Отложить')
  })

  it('Click button \"Отложить\"', () => {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.intercept('POST', '/conversation/setDelayStatus', 'fx:twinspot/setDelayStatus').as('setDelayStatus')
    // cy.intercept('POST', '/conversation/getConversation', 'fx:twinspot/getConversation_mainOpened').as('getConversation')

    // cy.wait(300)
    // cy.get('[data-cy=setIdleStatus]').click()

    // cy.wait(['@setDelayStatus', '@getConversation'])
    // cy.get('[data-cy=status]').should('have.text', 'Ожидает ')
    // cy.get('[data-cy=setWorkStatus]').should('have.text', 'Взять в работу')
    // cy.get('[data-cy=reply]').should('not.exist')
  })
})