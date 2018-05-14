jest.mock('./load-script', () => ({
  loadScript: () => Promise.resolve(jest.fn()),
}));

import init from './'; // eslint-disable-line import/first

const KEY = 'test';

describe('init errors', () => {
  it('should throw if no key is provided to init', () => {
    expect(init).toThrow();
  });
});

describe('init', () => {
  let result;
  let spy;
  beforeEach(() => {
    // Spy on some stuff
    spy = jest.fn();
    // Mock out the globals
    Object.defineProperty(window, 'addEventListener', {
      value: spy,
      writeable: true,
    });
  });

  it('should return a track function', () => {
    result = init(KEY);
    expect(typeof result.track).toEqual('function');
  });

  it('should return an identify function', () => {
    result = init(KEY);
    expect(typeof result.identify).toEqual('function');
  });

  it('should return an page function', () => {
    result = init(KEY);
    expect(typeof result.page).toEqual('function');
  });

  it('should return an group function', () => {
    result = init(KEY);
    expect(typeof result.group).toEqual('function');
  });

  it('should return an alias function', () => {
    result = init(KEY);
    expect(typeof result.alias).toEqual('function');
  });

  it('should attach a click event listener to the window', () => {
    result = init(KEY);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toEqual('click');
  });

  it('should not attach a click event listener to the window', () => {
    result = init(KEY, {
      trackClicks: false,
    });

    expect(spy).not.toHaveBeenCalled();
  });
});
