/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import template from './templates/numberbox-component.stache';

const INT_NUMBER_PATTERN = '([0-9]+)';

export default can.Component.extend({
  tag: 'numberbox-component',
  view: can.stache(template),
  leakScope: true,
  viewModel: can.Map.extend({
    value: '',
    attrDataId: '',
    additionalClass: '',
    placeholder: '',
    checkIntKey(key) {
      const intPattern = /[0-9]/i;
      return !!key.match(intPattern);
    },
    validateValue() {
      if (!(this.attr('value') || '').match(`^${INT_NUMBER_PATTERN}$`)) {
        this.attr('value', '');
      }
    },
  }),
  events: {
    '.numberbox-input keypress'(el, ev) {
      if (!this.viewModel.checkIntKey(ev.key)) {
        ev.preventDefault();
      }
    },
    '.numberbox-input blur'() {
      this.viewModel.validateValue();
    },
  },
});

export {INT_NUMBER_PATTERN};
