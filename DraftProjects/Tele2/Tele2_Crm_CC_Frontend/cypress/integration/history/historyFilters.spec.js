import specTitle from 'cypress-sonarqube-reporter/specTitle'

describe(specTitle('History Filters'), () => {
  const msisdn = Cypress.env('msisdn')

  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.visit(`/card/history/appeals?msisdn=${msisdn}`)
    cy.get('div[class*=FiltersWrapper__Content]').children().as('historyContent')

    cy.server({
      method: 'GET',
      delay: 300,
      status: 200,
      response: {}
    })
  })

  it('History filter button toggles filters visibility', function () {
    cy.get('@historyContent').should('be.not.visible')
    cy.get('span.anticon.anticon-filter').click()
    cy.get('@historyContent').should('be.visible')
  })

  it('Questionary History filters send a valid request', function () { // TODO: тест нуждается в фиксах, не проверяет работу кнопки
    cy.intercept('POST', 'Questionary/GetQuestionaryHistory*', 'fx:history/getQuestionaryHistoryResponse')
    cy.intercept(
      'GET',
      'Questionary/GetQuestionaryUseListWithoutCheck*',
      'fx:history/getQuestionaryUseListWithoutCheckResponse'
    )

    cy.get('a[class*=HistoryNavigation__TabButton]').contains('Анкеты').click()
    cy.get('span.anticon.anticon-filter').click()
    cy.get('#questionary-name')
      .click()
      .then(input => {
        cy.wait(1000)
        cy.get('.ant-select-dropdown')
          .should('be.visible')
          .within($list => {
            cy.get('.ant-select-item.ant-select-item-option')
              .first()
              .then($el => {
                cy.wrap($el).click()
              })
          })
        cy.get('button').contains('Найти').parent().click()
        cy.get('.ant-table-tbody tr').should('have.length', 2)
      })
  })
})
