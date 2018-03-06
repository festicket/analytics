# Analytics

A better API wrapper for segment. Uses a slightly amended script loading method as opposed to the [Segment Quick Start Guide](https://segment.com/docs/sources/website/analytics.js/quickstart/).
Adds automatic tracking to elements that are clicked.


## Setup

```js
// My App: app/utils/analytics.js
import init from '@festicket/analytics';
export { track, identify, page, group, alias } = init(MySegmentAPIKey);
```

Then later in your application:

```js
import { track } from 'app/utils/analytics';

// Wait for something which you would like to track
myEvtHandle = () => {
  await track(/* some data */)
}
```

## Automatic tracking

The initialisation process listens to all click events on you page.
If you would like to track a clik on an element you can use data attributes to both enable and pass data into your analytics events:

```html
<button
  data-analytics='true'
  data-my-value='some-value'
>
  This is a button
</button>

// Will result in an analytics payload of { my-value: 'some-value' }
```
