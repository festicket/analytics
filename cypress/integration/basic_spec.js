Cypress.on('window:before:load', win => {
  // because this is called before any scripts
  // have loaded - the ga function is undefined
  // so we need to create it.
  win.analytics = { track: cy.stub().as('track') }; // eslint-disable-line no-param-reassign
});

describe('Example Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/test');
  });

  it('should pass', () => {
    cy.get('#test-1').click();
    cy.get('@track').should('be.calledWith', { writeKey: 'test' });
  });
});
