/// <reference types="cypress" />

describe('Check statuses', () => {
  // before(function () {
  //   cy.server()
  //   cy.route('GET', '*identifier', 'fx:internal/identifier')
  //   cy.route('POST', '/conversation/getConversation', 'fx:twinspot/getConversation_mainOpenedWipClosed').as('mainConversation')
  //   cy.route('GET', '/message/getMessages*', 'fx:twinspot/getMessages_oneInbox').as('messages')
  //   cy.route('GET', '/message/getCuvoLink*', 'fx:twinspot/getCuvoLink').as('messages')

  //   cy.visit('http://localhost:3000/twinspot/dialog?conversationId=99999')
  // })

  it('number previews', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('[data-cy=dialog-link]').should('have.length', 3)
  })
  it('number of active previews', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('[data-cy=status-name]').should('have.length', 2)
  })
  it('idle status tag color', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('[data-cy=status-name]').eq(0).should('have.css', 'opacity', '1').and('have.text', 'ОЖИДАНИЕ')
  })
  it('wip status tag color', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('[data-cy=status-name]').eq(1).should('have.css', 'opacity', '0.5').and('have.text', 'В РАБОТЕ')
  })
  it('closed status previews have not tag', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('[data-cy=dialog-link]').eq(2).within($link => {
    //   cy.get('[data-cy=status-name]').should('have.length', 0)
    // })
  })
})
