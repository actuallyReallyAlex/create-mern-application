/// <reference types="cypress" />

context('create-mern-application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should display correct content', () => {
    cy.get('body').should('contain.text', 'create-mern-application');
    cy.get('body').should(
      'contain.text',
      'A bootstrapper for creating a MERN application.',
    );
    cy.get('body').should('contain.text', 'View Documentation');
  });

  it('Should step through demo', () => {
    cy.get('#create-application').click();
    cy.wait(10000);
    cy.get('#view-documentation').should('exist');
  });
});
