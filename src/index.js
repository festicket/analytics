import './closest-polyfill';
import loadScript from './load-script';

// Lower case the first character of any string
function firstCharToLower(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// Create the track() function
function trackFactory(key) {
  return async (...data) => {
    const { track } = await loadScript(key);
    return track(...data);
  };
}

// Create the identify() function
function identifyFactory(key) {
  return async (...data) => {
    const { identify } = await loadScript(key);
    return identify(...data);
  };
}

// Create the page() functino
function pageFactory(key) {
  return async (...data) => {
    const { page } = await loadScript(key);
    return page(...data);
  };
}

// create the group() functino
function groupFactory(key) {
  return async (...data) => {
    const { group } = await loadScript(key);
    return group(...data);
  };
}

// create the alias() function
function aliasFactory(key) {
  return async (...data) => {
    const { alias } = await loadScript(key);
    return alias(...data);
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
        propName.replace('analytics', ''),
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

// Export out init() function that kicks everything off
export default function init(key) {
  if (!key) {
    throw new Error('A segment key must be passed to init');
  }

  const track = trackFactory(key);

  // Listen to all click events in a page and track if enabled
  window.addEventListener('click', e => eventHandle(track, key, e));

  return {
    track,
    identify: identifyFactory(key),
    page: pageFactory(key),
    group: groupFactory(key),
    alias: aliasFactory(key),
  };
}
