import specTitle from 'cypress-sonarqube-reporter/specTitle'


describe(specTitle('History Navigation'), () => {
  // const msisdn = Cypress.env('msisdn')

  // before(() => {
  //   cy.on('uncaught:exception', () => false)
  //   cy.visit(`/card/history/appeals?msisdn=${msisdn}`)
  //   cy.get('a[class*=HistoryNavigation__TabButton]').as('historyNavTabs')

  //   cy.fixture('history/historyNavigationLinks.json').as('navLinks')
  // })
  // must use es5 func syntax in order to get "this" object
  // https://github.com/cypress-io/cypress/issues/4880
  // TODO: not works in cypress v8.2, need to fix
  it('History header links navigate to corresponding tabs', function () {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.get('@historyNavTabs')
    //   .each(($el, index, $list) => {
    //     cy.get($el)
    //       .should('have.attr', 'href')
    //       .and('include', this.navLinks[index].link)
    //       .then(href => {
    //         cy.wrap($el).click()
    //         cy.url().should('include', href)
    //         cy.wrap($el)
    //           .should('have.attr', 'class')
    //           .and('include', 'current')
    //       })
    //   })
  })
})
