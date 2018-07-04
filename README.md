# Analytics

[![Build Status](https://semaphoreci.com/api/v1/festicketci/analytics/branches/master/badge.svg)](https://semaphoreci.com/festicketci/analytics)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A better API wrapper for segment. Uses a slightly amended script loading method as opposed to the [Segment Quick Start Guide](https://segment.com/docs/sources/website/analytics.js/quickstart/).
Adds automatic tracking to elements that are clicked.

A polyfill for Element.prototype.closest is required to support older browsers.

## Setup

```js
// My App: app/utils/analytics.js
import init from '@festicket/analytics';
export { track, identify, page, group, alias, reset } = init(MySegmentAPIKey);
```

Then later in your application:

```js
import { track } from 'app/utils/analytics';

// Wait for something which you would like to track
myEvtHandle = async () => {
  await track(/* some data */);
};
```

## Automatic tracking

The initialisation process listens to all click events on your page.
If you would like to track a click on an element you can use data attributes to both enable and pass data into your analytics events:

```html
<button
  data-analytics='true'
  data-analytics-my-value='some-value'
>
  This is a button
</button>

<!-- Will result in an analytics payload of { myValue: 'some-value' } -->
```
