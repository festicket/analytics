import AnalyticsManager from "./";

describe("AnalyticsManager", () => {
  let client;
  beforeEach(() => {
    client = new AnalyticsManager();
  });

  it("should have an init method", () => {
    expect(client.init).toBeTruthy();
  });
});
