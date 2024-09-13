// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// -- This will fetch a JWT token --
// import 'cypress-localstorage-commands'

// Cypress.Commands.add('login', () => {
//   cy.request({
//     method: 'GET',
//     url: 'https://t2ru-crmse-tst.corp.tele2.ru:6070/authtoken'
//   })
//     .its('body')
//     .then(body => {
//       cy.setLocalStorage('token', body.data)
//     })
// })


Cypress.Commands.add('login', () => { 
    window.localStorage.setItem('token', Cypress.env('token'))
})