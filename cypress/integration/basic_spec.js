describe("Example Test", function() {
  it("should pass", function() {
    cy.visit("http://localhost:8080");
    expect(true).to.equal(true);
  });
});
