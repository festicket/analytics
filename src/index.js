import loadScript from './load-script';

// Lower case the first character of any string
function firstCharToLower(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// Create the track() function
export function trackFactory(key, globalData) {
  return async (...data) => {
    const { track } = await loadScript(key);
    const compoundedData = Object.assign({}, globalData, ...data);
    return track(compoundedData);
  };
}

// Create the identify() function
export function identifyFactory(key, globalData) {
  return async (...data) => {
    const { identify } = await loadScript(key);
    const compoundedData = Object.assign({}, globalData, ...data);
    return identify(compoundedData);
  };
}

// Create the page() functino
export function pageFactory(key, globalData) {
  return async (...data) => {
    const { page } = await loadScript(key);
    const compoundedData = Object.assign({}, globalData, ...data);
    return page(compoundedData);
  };
}

// create the group() functino
export function groupFactory(key, globalData) {
  return async (...data) => {
    const { group } = await loadScript(key);
    const compoundedData = Object.assign({}, globalData, ...data);
    return group(compoundedData);
  };
}

// create the alias() function
export function aliasFactory(key, globalData) {
  return async (...data) => {
    const { alias } = await loadScript(key);
    const compoundedData = Object.assign({}, globalData, ...data);
    return alias(compoundedData);
  };
}

// Handle click events
async function eventHandle(track, key, e) {
  // Only track elements with data-analytics=true
  // Use `Element.closest` because the clicked element may be a child
  // of an element with data-analytics=true on it.
  const target = e.target.closest('[data-analytics=true]');

  if (!target) {
    return;
  }

  // Strip data-analytics=true
  const { analytics, analyticsEvent, ...data } = target.dataset;

  // Map through the data props and only use data-analytics-* as the data payload
  const payloadData = Object.keys(data).reduce((result, propName) => {
    if (propName.startsWith('analytics')) {
      const strippedPropName = firstCharToLower(
        propName.replace('analytics', '')
      );
      result[strippedPropName] = data[propName]; // eslint-disable-line no-param-reassign
    }
    return result;
  }, {});

  // construct our event payload with { elementId: element.id }
  const elementData = target.id ? { elementId: target.id } : {};

  // Actually track our event
  await track(analyticsEvent, { ...payloadData, ...elementData });
}

const defaultConfig = {
  trackClicks: true,
};

// Export out init() function that kicks everything off
export default function init(key, config = defaultConfig, getGlobalData) {
  if (!key) {
    throw new Error('A segment key must be passed to init');
  }

  if (typeof window === 'undefined') {
    const errorFunction = message => () => {
      throw new Error(
        `analytics function '${message}' called in non browser environment`
      );
    };
    return {
      track: errorFunction('track'),
      identify: errorFunction('identify'),
      page: errorFunction('page'),
      group: errorFunction('group'),
      alias: errorFunction('alias'),
    };
  }

  const globalData = getGlobalData ? getGlobalData() : {};

  const track = trackFactory(key, globalData);

  // Listen to all click events in a page and track if enabled
  if (config.trackClicks) {
    window.addEventListener('click', e => eventHandle(track, key, e));
  }

  return {
    track,
    identify: identifyFactory(key, globalData),
    page: pageFactory(key, globalData),
    group: groupFactory(key, globalData),
    alias: aliasFactory(key, globalData),
  };
}
