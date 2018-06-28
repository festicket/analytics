jest.mock('./load-script', () => () =>
  Promise.resolve({
    track: (event, data) => data,
    identify: (userId, data) => data,
    page: (name, data) => data,
    group: (groupId, data) => data,
    alias: (previousId, userId) => ({ previousId, userId }),
  })
);

// eslint-disable-next-line import/first
import init from './';

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

describe('track', () => {
  it('should call track with globalData and any extra data', async () => {
    const analytics = init(KEY, {
      getGlobalData: () => ({ globalData: 'global-data' }),
    });
    const tracked = await analytics.track('event', {
      extraData: 'extra-data',
    });

    expect(tracked).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call track with just globalData if no extra data', async () => {
    const analytics = init(KEY, {
      getGlobalData: () => ({ globalData: 'global-data' }),
    });
    const tracked = await analytics.track('event');

    expect(tracked).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call track with just extra data if no globalData', async () => {
    const analytics = init(KEY);
    const tracked = await analytics.track('event', { extraData: 'extra-data' });

    expect(tracked).toEqual({
      extraData: 'extra-data',
    });
  });
});

describe('identify', () => {
  it('should call identify with globalData and any extra data', async () => {
    const analytics = init(KEY, {
      getGlobalData: () => ({ globalData: 'global-data' }),
    });
    const identified = await analytics.identify('user1234', {
      extraData: 'extra-data',
    });

    expect(identified).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call identify with just globalData if no extra data', async () => {
    const analytics = init(KEY, {
      getGlobalData: () => ({ globalData: 'global-data' }),
    });
    const identified = await analytics.identify('user1234');

    expect(identified).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call track with just extra data if no globalData', async () => {
    const analytics = init(KEY);
    const identified = await analytics.identify('user1234', {
      extraData: 'extra-data',
    });

    expect(identified).toEqual({
      extraData: 'extra-data',
    });
  });
});

describe('page', () => {
  it('should call page with globalData and any extra data', async () => {
    const analytics = init(KEY, {
      getGlobalData: () => ({ globalData: 'global-data' }),
    });
    const paged = await analytics.page('page-name', {
      extraData: 'extra-data',
    });

    expect(paged).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call page with just globalData if no extra data', async () => {
    const analytics = init(KEY, {
      getGlobalData: () => ({ globalData: 'global-data' }),
    });
    const paged = await analytics.page('page-name');

    expect(paged).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call page with just extra data if no globalData', async () => {
    const analytics = init(KEY);
    const paged = await analytics.page('page-name', {
      extraData: 'extra-data',
    });

    expect(paged).toEqual({
      extraData: 'extra-data',
    });
  });
});

describe('group', () => {
  it('should call group with globalData and any extra data', async () => {
    const analytics = init(KEY, {
      getGlobalData: () => ({ globalData: 'global-data' }),
    });
    const grouped = await analytics.group('group1234', {
      extraData: 'extra-data',
    });

    expect(grouped).toEqual({
      globalData: 'global-data',
      extraData: 'extra-data',
    });
  });

  it('should call group with just globalData if no extra data', async () => {
    const analytics = init(KEY, {
      getGlobalData: () => ({ globalData: 'global-data' }),
    });
    const grouped = await analytics.group('group1234');

    expect(grouped).toEqual({
      globalData: 'global-data',
    });
  });

  it('should call group with just extra data if no globalData', async () => {
    const analytics = init(KEY);
    const grouped = await analytics.group('group1234', {
      extraData: 'extra-data',
    });

    expect(grouped).toEqual({
      extraData: 'extra-data',
    });
  });
});

describe('alias', () => {
  it('should call alias with the correct arguments', async () => {
    const analytics = init(KEY);
    const aliased = await analytics.alias('previousId1234', 'userId1234');

    expect(aliased).toEqual({
      previousId: 'previousId1234',
      userId: 'userId1234',
    });
  });
});
