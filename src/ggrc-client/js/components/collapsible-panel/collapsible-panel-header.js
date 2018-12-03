/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import template from './collapsible-panel-header.stache';

const tag = 'collapsible-panel-header';
/**
 * Collapsible Panel component to add collapsing behavior
 */
export default can.Component.extend({
  tag,
  template,
  viewModel: {
    titleIcon: null,
    expanded: null,
    toggle: function () {
      this.attr('expanded', !this.attr('expanded'));
    },
  },
});
