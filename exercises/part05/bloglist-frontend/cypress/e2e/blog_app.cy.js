const frontend = 'http://localhost:3000'
const resetUrl = `${frontend}/api/testing/reset`
const usersUrl = `${frontend}/api/users`

const blog = {
  title: 'Title',
  author: 'Author',
  url: 'www.example.com'
}

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

  describe('After logging in', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
    })

    it('a new blog can be created', function() {
      cy.contains('Create a new blog')
      cy.get('#button').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()
      cy.contains('New blog created!')
      cy.contains(blog.title)
      cy.contains(blog.author)
    })

    describe('and a blog has been created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: blog.title,
          author: blog.author,
          url: blog.url
        })
      })

      it('a blog can be liked', function() {
        cy.get('#view-button').click()
        cy.contains('0 likes')
        cy.get('#like-button').click()
        cy.contains(`Like added to blog ${blog.title}!`)
        cy.contains('1 like')
      })

      it('a blog can be deleted', function() {
        cy.get('#view-button').click()
        cy.contains(blog.title)
        cy.contains(blog.author)
        cy.contains(blog.url)
        cy.get('#delete-button').click()
        cy.contains(`Deleted blog ${blog.title}!`)
      })
    })
  })
})
