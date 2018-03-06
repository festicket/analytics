export default function loadScript(key) {
  return new Promise((res, rej) => {
    // If we have already loaded the script return window.analytics
    if (window.analytics) {
      return res();
    }
    // Load in our external analytics script see this page for details:
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
    // Create our script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    // Handle load/error states
    script.onload = res;
    script.onerror = rej;
    // Inject into the head of the document
    document.head.prepend(script);
    // Assign a src so it **actually** loads
    script.src = `https://cdn.segment.com/analytics.js/v1/${key}/analytics.min.js`;

    // Return the now present window.analytics after the script has loaded
    return window.analytics;
  });
}
