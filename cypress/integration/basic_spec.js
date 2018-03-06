Cypress.on('window:before:load', win => {
  // because this is called before any scripts
  // have loaded - the ga function is undefined
  // so we need to create it.
  win.analytics = { track: cy.stub().as('track') }; // eslint-disable-line no-param-reassign
});

describe('Festicket Analytics', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/test');
  });

  it('should track elements that have been clicked', () => {
    cy.get('#test-1').click();
    cy.get('@track').should('be.calledWith', { writeKey: 'test' });
  });

  it('should not track elements that have not been enabled', () => {
    cy.get('#test-2').click();
    cy.get('@track').should('not.be.called');
  });
});
