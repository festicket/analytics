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

    // Result
    result = init(KEY);
  });

  it('should return a track function', () => {
    expect(typeof result.track).toEqual('function');
  });

  it('should return an identify function', () => {
    expect(typeof result.identify).toEqual('function');
  });

  it('should return an page function', () => {
    expect(typeof result.page).toEqual('function');
  });

  it('should return an group function', () => {
    expect(typeof result.group).toEqual('function');
  });

  it('should return an alias function', () => {
    expect(typeof result.alias).toEqual('function');
  });

  it('should attach a click event listener to the window', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toEqual('click');
  });

  it('should return empty functions in case analytics are disabled', () => {
    const { track, identify, page, group, alias } = init(KEY, {
      disableBrowserAnalytics: true,
    });

    expect(track()).toBeUndefined();
    expect(identify()).toBeUndefined();
    expect(page()).toBeUndefined();
    expect(group()).toBeUndefined();
    expect(alias()).toBeUndefined();
  });
});
