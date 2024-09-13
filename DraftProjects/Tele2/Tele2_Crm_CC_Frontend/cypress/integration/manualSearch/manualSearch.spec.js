import specTitle from 'cypress-sonarqube-reporter/specTitle'

describe(specTitle('Manual Search'), () => {
  it('Visit crm', () => {
    cy.end() // TODO: remove end() and actualize commented tests
    // cy.on('uncaught:exception', (err, runnable) => {
    //   expect(err.message).to.include('something about the error')
  
    //   // using mocha's async done callback to finish
    //   // this test so we prove that an uncaught exception
    //   // was thrown
    //   done()
  
    //   // return false to prevent the error from
    //   // failing this test
    //   return true
    // })

    // cy.visit('/')
    
    // cy.contains('Искать')
    // cy.get('.ant-input')
    //   .first()
    //   .type('9518238244')
    // cy.get('#handlingChannel')
    //   .click({ force: true })
    //   cy.contains('Звонок').click()
    // cy.get('button').contains('Найти').parent().click()
  })
})
