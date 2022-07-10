describe('Blog app', function() {
  it('Front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Bloglist')
  })
})
