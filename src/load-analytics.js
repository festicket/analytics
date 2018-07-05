export default function loadAnalytics(segmentKey) {
  // eslint-disable-next-line consistent-return
  return new Promise((res, rej) => {
    // If we have already loaded the script return window.analytics
    if (window.analytics) {
      return res();
    }

    // Create a queue, but don't obliterate an existing one!
    const analytics = window.analytics || [];
    window.analytics = analytics;

    // If the real analytics.js is already on the page return.
    if (analytics.initialize) return; // eslint-disable-line

    // If the snippet was invoked already show an error.
    if (analytics.invoked) {
      if (window.console && console.error) {
        console.error('Segment snippet included twice.');
      }
      return; // eslint-disable-line
    }

    if (!analytics.initialize && !analytics.invoked) {
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
      analytics.methods.forEach(method => {
        analytics[method] = analytics.factory(method);
      });

      // Load in our external analytics script see this page for details:
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
      // Create our script

      // Define a method to load Analytics.js from our CDN,
      // and that will be sure to only ever load it once.
      analytics.load = function(key, options) {
        const script = document.createElement('script');
        script.type = 'text/javascript';

        // Handle load/error states
        script.onload = res;
        script.onerror = rej;

        // Assign a src so it **actually** loads
        script.src = `https://cdn.segment.com/analytics.js/v1/${key}/analytics.min.js`;

        // Inject into the head of the document
        document.head.prepend(script);

        analytics._loadOptions = options; // eslint-disable-line
      };

      // Add a version to keep track of what's in the wild.
      analytics.SNIPPET_VERSION = '4.1.0';

      // Load Analytics.js with your key, which will automatically
      // load the tools you've enabled for your account. Boosh!
      analytics.load(segmentKey, { initialPageView: false });

      // Return the now present window.analytics after the script has loaded
      return window.analytics;
    }
  })
    .then(() => window.analytics)
    .catch(() => window.analytics);
}
