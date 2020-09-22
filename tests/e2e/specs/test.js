// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('table > tr').then(async rows => {
      let i = 1;
      for(;i < 11; i++) {
        const tenCells = rows[i].children[1].children[0];
        tenCells.value = 12;
      }
      const ans = rows[i].children[1].children[0];
      ans.value = '=SUM(A1:A3)';
    })
  })
})
