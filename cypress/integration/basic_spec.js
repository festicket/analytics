describe('Example Test', () => {
  beforeEach(() => {
    cy.server();
    cy
      .route('POST', 'https://api.segment.io/v1/p', { response: { ok: true } })
      .as('analytics');
  });

  it('should pass', () => {
    cy.visit('http://localhost:8080');

    cy
      .wait('@analytics')
      .its('request.body.writeKey')
      .should('eq', 'test');
  });
});
