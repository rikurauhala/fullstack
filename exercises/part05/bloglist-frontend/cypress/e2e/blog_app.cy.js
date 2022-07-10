const frontendUrl = 'http://localhost:3000'
const resetUrl = 'http://localhost:3003/api/testing/reset'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', resetUrl)
    cy.visit(frontendUrl)
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.get('#username')
    cy.contains('Password')
    cy.get('#password')
    cy.contains('Log in')
  })
})
