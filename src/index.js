import loadScript from './load-script';

function trackFactory(key) {
  return async data => {
    const { track } = await loadScript(key);
    return track(data);
  };
}

function identifyFactory(key) {
  return async data => {
    const { identify } = await loadScript(key);
    return identify(data);
  };
}

function pageFactory(key) {
  return async data => {
    const { page } = await loadScript(key);
    return page(data);
  };
}

function groupFactory(key) {
  return async data => {
    const { group } = await loadScript(key);
    return group(data);
  };
}

function aliasFactory(key) {
  return async data => {
    const { alias } = await loadScript(key);
    return alias(data);
  };
}

async function evtHandle(track, key, e) {
  if (!e.target.dataset.analytics) {
    return;
  }
  const { analytics, ...data } = e.target.dataset;
  const elementData = e.target.id ? { elementId: e.target.id } : {};
  await track({ ...data, ...elementData });
}

export default function init(key) {
  if (!key) {
    throw new Error('A segment key must be passed to init');
  }

  const track = trackFactory(key);

  window.addEventListener('click', e => evtHandle(track, key, e));

  return {
    track,
    identify: identifyFactory(key),
    page: pageFactory(key),
    group: groupFactory(key),
    alias: aliasFactory(key),
  };
}
