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
  let track;
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
    track = init(KEY);
  });

  it('should return a track function', () => {
    expect(typeof track).toEqual('function');
  });

  it('should attach a click event listener to the window', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0]).toEqual('click');
  });
});
