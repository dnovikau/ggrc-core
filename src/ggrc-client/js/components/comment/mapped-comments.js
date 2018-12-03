/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import '../object-list-item/comment-list-item';
import '../object-list/object-list';
import template from './mapped-comments.stache';

/**
 * Assessment specific mapped controls view component
 */
export default can.Component.extend({
  tag: 'mapped-comments',
  template: template,
  viewModel: {
    define: {
      noItemsText: {
        type: 'string',
        value: '',
      },
    },
    mappedItems: [],
    baseInstance: {},
  },
});
