jest.mock('./load-script', () => () =>
  Promise.resolve({
    track: param => param,
    identify: param => param,
    page: param => param,
    group: param => param,
    alias: param => param,
  })
);

// eslint-disable-next-line import/first
import init, {
  trackFactory,
  identifyFactory,
  pageFactory,
  groupFactory,
  aliasFactory,
} from './';

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

describe('trackFactory', () => {
  it('should call track with globalData and any extra data', async () => {
    const tracked = await trackFactory('myKey', {
      globalData: 'global-data',
    })({ extraData: 'extra-data' });

    expect(tracked).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call track with just globalData if no extra data', async () => {
    const tracked = await trackFactory('myKey', {
      globalData: 'global-data',
    })({});

    expect(tracked).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call track with just extra data if no globalData', async () => {
    const tracked = await trackFactory('myKey', {})({
      extraData: 'extra-data',
    });

    expect(tracked).toEqual({
      extraData: 'extra-data',
    });
  });
});

describe('identifyFactory', () => {
  it('should call identify with globalData and any extra data', async () => {
    const identified = await identifyFactory('myKey', {
      globalData: 'global-data',
    })({ extraData: 'extra-data' });

    expect(identified).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call identify with just globalData if no extra data', async () => {
    const identified = await identifyFactory('myKey', {
      globalData: 'global-data',
    })({});

    expect(identified).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call identify with just extra data if no globalData', async () => {
    const identified = await identifyFactory('myKey', {})({
      extraData: 'extra-data',
    });

    expect(identified).toEqual({
      extraData: 'extra-data',
    });
  });
});

describe('pageFactory', () => {
  it('should call page with globalData and any extra data', async () => {
    const paged = await pageFactory('myKey', {
      globalData: 'global-data',
    })({ extraData: 'extra-data' });

    expect(paged).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call page with just globalData if no extra data', async () => {
    const paged = await pageFactory('myKey', {
      globalData: 'global-data',
    })({});

    expect(paged).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call page with just extra data if no globalData', async () => {
    const paged = await pageFactory('myKey', {})({
      extraData: 'extra-data',
    });

    expect(paged).toEqual({
      extraData: 'extra-data',
    });
  });
});

describe('groupFactory', () => {
  it('should call group with globalData and any extra data', async () => {
    const grouped = await groupFactory('myKey', {
      globalData: 'global-data',
    })({ extraData: 'extra-data' });

    expect(grouped).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call group with just globalData if no extra data', async () => {
    const grouped = await groupFactory('myKey', {
      globalData: 'global-data',
    })({});

    expect(grouped).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call group with just extra data if no globalData', async () => {
    const grouped = await groupFactory('myKey', {})({
      extraData: 'extra-data',
    });

    expect(grouped).toEqual({
      extraData: 'extra-data',
    });
  });
});

describe('aliasFactory', () => {
  it('should call alias with globalData and any extra data', async () => {
    const aliased = await aliasFactory('myKey', {
      globalData: 'global-data',
    })({ extraData: 'extra-data' });

    expect(aliased).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call alias with just globalData if no extra data', async () => {
    const aliased = await aliasFactory('myKey', {
      globalData: 'global-data',
    })({});

    expect(aliased).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call alias with just extra data if no globalData', async () => {
    const aliased = await aliasFactory('myKey', {})({
      extraData: 'extra-data',
    });

    expect(aliased).toEqual({
      extraData: 'extra-data',
    });
  });
});
