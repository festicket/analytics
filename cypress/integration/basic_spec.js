describe('Example Test', () => {
  beforeEach(() => {
    cy.server();
    cy
      .route('POST', 'https://api.segment.io/v1/p', { response: { ok: true } })
      .as('analytics');
    cy.visit('http://localhost:8080');
  });

  it('should pass', () => {
    cy.get('#test-1').click();
    cy
      .wait('@analytics')
      .its('request.body.writeKey')
      .should('eq', 'test');
  });
});
