/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import '../tree/tree-item-custom-attribute';
import '../tree/tree-field';
import * as businessModels from '../../models/business-models';
import template from './templates/mapper-results-item-attrs.stache';

const DEFAULT_ATTR_TEMPLATE =
  '/static/mustache/base_objects/tree-item-attr.stache';

export default can.Component.extend({
  tag: 'mapper-results-item-attrs',
  template,
  viewModel: {
    init() {
      let Model = businessModels[this.attr('modelType')];
      let attrTemplate = Model.tree_view_options.attr_view;
      this.attr('attrTemplate', attrTemplate || DEFAULT_ATTR_TEMPLATE);
    },
    instance: null,
    columns: [],
    modelType: '',
    attrTemplate: DEFAULT_ATTR_TEMPLATE,
  },
  events: {
    click(element, event) {
      if ($(event.target).is('.link')) {
        event.stopPropagation();
      }
    },
  },
});
