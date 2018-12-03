/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import template from './custom-attributes-actions.stache';

export default can.Component.extend({
  tag: 'custom-attributes-actions',
  template,
  viewModel: {
    instance: null,
    formEditMode: false,
    edit: function () {
      this.attr('formEditMode', true);
    },
  },
});
