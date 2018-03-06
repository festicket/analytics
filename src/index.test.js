import AnalyticsManager from './';

describe('AnalyticsManager', () => {
  let client;
  const addEventListenerSpy = jest.fn();

  beforeEach(() => {
    // Create the client instance to work with
    client = new AnalyticsManager({ key: 'test' });
    // Setup the addEventListener mock
    Object.defineProperty(window, 'addEventListener', {
      value: addEventListenerSpy,
      writable: true,
    });
  });

  it('should store the writeKey', () => {
    expect(client.key).toEqual('test');
  });

  it('should add an event listener to the body with teh correct handle', () => {
    client.init();
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', client.onClick);
  });
});
