/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import '../object-list-item/document-object-list-item';
import template from './editable-document-object-list-item.stache';

const tag = 'editable-document-object-list-item';

export default can.Component.extend({
  tag,
  template,
  viewModel: {
    document: {},
  },
});
