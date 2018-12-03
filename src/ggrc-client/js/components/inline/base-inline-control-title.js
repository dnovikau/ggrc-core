/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import template from './base-inline-control-title.stache';

export default can.Component.extend({
  tag: 'base-inline-control-title',
  template,
  viewModel: {
    define: {
      isEditIconAllowed: {
        get: function () {
          return !this.attr('editMode') &&
            !this.attr('isLoading') &&
            !this.attr('isEditIconDenied');
        },
      },
    },
    isLoading: false,
    editMode: false,
    isEditIconDenied: false,
  },
  events: {
    '.inline-edit-icon click': function () {
      this.viewModel.dispatch('setEditModeInline');
    },
  },
});
