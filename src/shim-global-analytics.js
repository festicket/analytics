export default function shimGlobalAnalytics() {
  // Create a queue, but don't obliterate an existing one!
  const analytics = window.analytics || [];
  window.analytics = analytics;

  // If the real analytics.js is already on the page return.
  if (analytics.initialize) return;

  // If the snippet was invoked already show an error.
  if (analytics.invoked) {
    if (window.console && console.error) {
      console.error('Segment snippet included twice.');
    }
    return;
  }

  // Invoked flag, to make sure the snippet
  // is never invoked twice.
  analytics.invoked = true;

  // A list of the methods in Analytics.js to stub.
  analytics.methods = [
    'trackSubmit',
    'trackClick',
    'trackLink',
    'trackForm',
    'pageview',
    'identify',
    'reset',
    'group',
    'track',
    'ready',
    'alias',
    'debug',
    'page',
    'once',
    'off',
    'on',
  ];

  // Define a factory to create stubs. These are placeholders
  // for methods in Analytics.js so that you never have to wait
  // for it to load to actually record data. The `method` is
  // stored as the first argument, so we can replay the data.
  analytics.factory = function(method) {
    return function(...args) {
      args.unshift(method);
      analytics.push(args);
      return analytics;
    };
  };

  // For each of our methods, generate a queueing stub.
  analytics.methods.forEach(key => {
    analytics[key] = analytics.factory(key);
  });
}
