const frontend = 'http://localhost:3000'
const loginUrl = `${frontend}/api/login`
const blogsUrl = `${frontend}/api/blogs`

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', loginUrl, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('user', JSON.stringify(body))
    cy.visit(frontend)
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: blogsUrl,
    method: 'POST',
    body: { title, author, url, likes },
    headers: { 'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}` }
  })
  cy.visit(frontend)
})
