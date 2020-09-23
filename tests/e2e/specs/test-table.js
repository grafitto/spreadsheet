// https://docs.cypress.io/api/introduction/api.html

describe('Spreadsheet - Table', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('table').should('exist');
    cy.get('table > tr').should('have.length', 51);
    cy.get('table > tr > td').should('have.length', 50 * 27);
  })
})
