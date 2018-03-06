import client from 'analytics.js';

export default class AnalyticsManager {
  constructor({ key }) {
    this.key = key;
  }

  init() {
    window.addEventListener('click', this.onClick);
  }

  onClick() {}
}
