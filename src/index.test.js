jest.mock('./load-script', () => ({
  loadScript: () => Promise.resolve(jest.fn()),
}));

import init, { evtHandle } from './'; // eslint-disable-line import/first

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

describe('evtHandle', () => {
  let shouldTrigger;
  let shouldNotTrigger;
  beforeEach(() => {
    shouldTrigger = document.createElement('button');
    shouldTrigger.dataset.analytics = true;

    shouldNotTrigger = document.createElement('button');
  });

  it('should call track with the right arguments', async () => {
    const trackSpy = jest.fn();
    await evtHandle(trackSpy, KEY, { target: shouldTrigger });
    expect(trackSpy).toHaveBeenCalled();
    expect(trackSpy.mock.calls[0][0].writeKey).toEqual(KEY);
  });

  it('should not trigger for elements taht are not enabled', async () => {
    const trackSpy = jest.fn();
    await evtHandle(trackSpy, KEY, { target: shouldNotTrigger });
    expect(trackSpy).not.toHaveBeenCalled();
  });
});
