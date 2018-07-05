import shimGlobalAnalytics from './shim-global-analytics';

export default function loadScript(key) {
  return new Promise((res, rej) => {
    // If we have already loaded the script return window.analytics
    if (window.analytics) {
      return res();
    }

    // Create our global event queue to catch any events that
    // occur during script load
    shimGlobalAnalytics(res, rej, key);

    // Return the now present window.analytics after the script has loaded
    return window.analytics;
  })
    .then(() => window.analytics)
    .catch(() => window.analytics);
}
