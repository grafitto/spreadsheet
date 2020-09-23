describe('Spreadsheet - Cells', () => {
  const values = [32, 12, 46, 7, 53, 23, 6, 76, 34, 2, 1, 7, 76];
  it('Visits the app root url', () => {
    cy.visit('/');
    values.forEach((value, index) => {
      cy.get(`.cell-0-${index}`).type(value);
    })
    cy.get(`.cell-0-${values.length}`)
      .type('=SUM(A1:A13)')
      .blur()
      .should('have.value', values.reduce((sum, value) => sum + value).toString());

    cy.get(`.cell-0-${values.length + 1}`)
      .type('=SUM(A1, A2, A3, A4)')
      .blur()
      .should('have.value', (values[0] + values[1] + values[2] + values[3]).toString());

    cy.get(`.cell-0-${values.length + 2}`)
      .type('=AVG(A1, A2, A3, A4)')
      .blur()
      .should('have.value', ((values[0] + values[1] + values[2] + values[3]) / 4).toString());

    cy.get(`.cell-0-${values.length + 3}`)
      .type('=AVG(A1:A4)')
      .blur()
      .should('have.value', ((values[0] + values[1] + values[2] + values[3]) / 4).toString());

    cy.get(`.cell-0-${values.length + 4}`)
      .type('=A1')
      .blur()
      .should('have.value', (values[0]).toString());

    cy.get(`.cell-0-${values.length + 5}`)
      .type('=A1 + A2 *  A3 - A4 / A5')
      .blur()
      .should('have.value', (values[0] + values[1] * values[2] - values[3] / values[4]).toString());

    cy.get(`.cell-0-${values.length + 6}`)
      .type('=SUM(SUM(A1, A2, A3), A4, A5)')
      .blur()
      .should('have.value', (values[0] + values[1] + values[2] + values[3] + values[4]).toString());
  })
})