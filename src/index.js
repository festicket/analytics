import loadScript from './load-script';

// Lower case the first character of any string
function firstCharToLower(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// Create the track() function
function trackFactory(key, getGlobalData) {
  return async (...data) => {
    const { track } = await loadScript(key);
    const compoundedData = Object.assign({}, getGlobalData(), ...data);
    return track(compoundedData);
  };
}

// Create the identify() function
function identifyFactory(key, getGlobalData) {
  return async (...data) => {
    const { identify } = await loadScript(key);
    const compoundedData = Object.assign({}, getGlobalData(), ...data);
    return identify(compoundedData);
  };
}

// Create the page() functino
function pageFactory(key, getGlobalData) {
  return async (...data) => {
    const { page } = await loadScript(key);
    const compoundedData = Object.assign({}, getGlobalData(), ...data);
    return page(compoundedData);
  };
}

// create the group() functino
function groupFactory(key, getGlobalData) {
  return async (...data) => {
    const { group } = await loadScript(key);
    const compoundedData = Object.assign({}, getGlobalData(), ...data);
    return group(compoundedData);
  };
}

// create the alias() function
function aliasFactory(key, getGlobalData) {
  return async (...data) => {
    const { alias } = await loadScript(key);
    const compoundedData = Object.assign({}, getGlobalData(), ...data);
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
  getGlobalData: () => ({}),
};

// Export out init() function that kicks everything off
export default function init(key, extraConfig) {
  // provide defaultConfig and overwrite if anything extra is provided
  const config = { ...defaultConfig, ...extraConfig };

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

  const { getGlobalData } = config;

  const track = trackFactory(key, getGlobalData);

  // Listen to all click events in a page and track if enabled
  if (config.trackClicks) {
    window.addEventListener('click', e => eventHandle(track, key, e));
  }

  return {
    track,
    identify: identifyFactory(key, getGlobalData),
    page: pageFactory(key, getGlobalData),
    group: groupFactory(key, getGlobalData),
    alias: aliasFactory(key, getGlobalData),
  };
}
