/// <reference types="cypress" />

import specTitle from 'cypress-sonarqube-reporter/specTitle'

describe(specTitle('Write a letter'), () => {
  // before(function () {
  //   cy.server()
  //   cy.fixture('twinspot/messages/cuvoLetter').then((letter) => { this.cuvoLetter = letter })
  //   cy.fixture('twinspot/templates/templateLetter').then((letter) => { this.templateLetter = letter })
  //   cy.fixture('twinspot/messages/cuvoLetterBold').then((letter) => { this.cuvoLetterBold = letter })
  //   cy.fixture('twinspot/messages/cuvoLetterBoldAndUnderline').then((letter) => { this.cuvoLetterBoldAndUnderline = letter })
  //   cy.fixture('twinspot/messages/cuvoLetterBoldAndUnderlineCombiened').then((letter) => { this.cuvoLetterBoldAndUnderlineCombiened = letter })
  //   cy.fixture('twinspot/messages/cuvoLetterBoldAndUnderlineListCombined').then((letter) => { this.cuvoLetterBoldAndUnderlineListCombined = letter })

  //   cy.route('GET', '*identifier', 'fx:internal/identifier')
  //   cy.route('POST', '/conversation/getConversation', 'fx:twinspot/getConversation_mainWip').as('mainConversation')
  //   cy.route('GET', '/message/getMessages*', 'fx:twinspot/getMessages_oneInbox').as('messages')
  //   cy.route('GET', '/message/getCuvoLink*', 'fx:twinspot/getCuvoLink').as('messages')
  //   cy.route('GET', '/messageTemplate/getMessageTemplate*', 'fx:twinspot/templates/getMessageTemplate').as('templates')

  //   cy.visit('http://localhost:3000/twinspot/dialog?conversationId=99999')
  // })

  it('Click button \"Ответить\"', () => {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('[data-cy=reply]').click()
    // cy.get('[data-cy=reply]').should('be.disabled')

    // cy.wait(200)

    // cy.get('[data-cy=to]').should('be.disabled').should('have.value', 'anton.y.semenov@tele2.ru')
  })

  it('Cuvo link', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('.ql-editor').should('have.html', this.cuvoLetter)
  })

  it('Add template', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.server()
    // cy.route('GET', '/messageTemplate/getMessageTemplate*', 'fx:twinspot/templates/getMessageTemplate').as('templates')

    // cy.get('button').contains('Шаблоны').click()
    // cy.wait('@templates')
    // cy.get('.ant-collapse-item').should('have.length', 3).first().within($panel => {
    //   cy.wrap($panel).click()
    //   cy.get('.ant-list-item').first().click()
    // })
    // cy.get('.ql-editor')
    //   .type('{movetostart}{downarrow}')
    //   .should('have.html', this.templateLetter)
  })
  it('Write bold text', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('.ql-bold').click()
    // cy.get('.ql-editor').type('Bold text ').should('have.html', this.cuvoLetterBold)
  })

  it('Write underline text', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('.ql-bold').click()
    // cy.get('.ql-underline').click()
    // cy.get('.ql-editor').type('Underline text ').should('have.html', this.cuvoLetterBoldAndUnderline)
  })

  it('Write bold and underline text combained', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('.ql-bold').click()
    // cy.get('.ql-editor').type('Bold and underline text combined ').should('have.html', this.cuvoLetterBoldAndUnderlineCombiened)
  })

  it('Write numeric list', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('.ql-editor').type('{enter}')
    // cy.get('.ql-list').click()
    // cy.get('.ql-editor').type('first line{enter}second line{enter}third line').should('have.html', this.cuvoLetterBoldAndUnderlineListCombined)
  })

  // TODO
  // it('Create a link', () => {
  //   cy.get('.ql-editor').then((editor) => {
  //   })
  // })

  it('send message', () => {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.server()
    // cy.route('POST', '/message/sendMessage*').as('sendMessage')
    // cy.get('button').contains('Отправить').click()
    // cy.wait('@sendMessage').then((interception) => {
    //   assert.isObject(interception)
    // })
  })
})
