const frontend = 'http://localhost:3000'
const resetUrl = `${frontend}/api/testing/reset`
const usersUrl = `${frontend}/api/users`

const user = {
  name: 'User',
  username: 'User',
  password: 'password'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', resetUrl)
    cy.request('POST', usersUrl, user)
    cy.visit(frontend)
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.get('#username')
    cy.contains('Password')
    cy.get('#password')
    cy.contains('Log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains('Welcome to Bloglist!')
      cy.contains(`Logged in as ${user.name}`)
      cy.contains('Log out')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('Failed to log in!')
      cy.contains('Login')
    })
  })
})
