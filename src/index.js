import loadScript from './load-script';

export function trackFactory(key) {
  return async data => {
    const { track } = await loadScript(key);
    return track(data);
  };
}

export async function evtHandle(track, key, e) {
  if (!e.target.dataset.analytics) {
    return;
  }
  await track({ writeKey: key });
}

export default function init(key) {
  if (!key) {
    throw new Error('A segment key must be passed to init');
  }

  const track = trackFactory(key);

  window.addEventListener('click', e => evtHandle(track, key, e));

  return track;
}
