/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import '../lazy-render/lazy-render';
import '../cycle-task-actions/cycle-task-actions';
import './tree-item-custom-attribute';
import BaseTreeItemVM from './tree-item-base-vm';
import template from './templates/tree-item.stache';
import * as businessModels from '../../models/business-models';

const DEFAULT_ATTR_TEMPLATE =
  GGRC.stache_path + '/base_objects/tree-item-attr.stache';

let viewModel = BaseTreeItemVM.extend({
  define: {
    extraClasses: {
      type: String,
      get: function () {
        let classes = [];
        let instance = this.attr('instance');

        if (instance.snapshot) {
          classes.push('snapshot');
        }

        if (instance.workflow_state) {
          classes.push('t-' + instance.workflow_state);
        }

        if (this.attr('expanded')) {
          classes.push('open-item');
        }

        return classes.join(' ');
      },
    },
    selectableSize: {
      type: Number,
      get: function () {
        let attrCount = this.attr('selectedColumns').length;
        let result = 3;

        if (attrCount < 4) {
          result = 1;
        } else if (attrCount < 7) {
          result = 2;
        }

        return result;
      },
    },
    attrTemplate: {
      type: String,
      get() {
        let Model = businessModels[this.attr('instance.type')];
        return Model.tree_view_options.attr_view || DEFAULT_ATTR_TEMPLATE;
      },
    },
  },
  instance: null,
  selectedColumns: [],
  mandatory: [],
  disableConfiguration: null,
  itemSelector: '.tree-item-content',
});

/**
 *
 */
export default can.Component.extend({
  tag: 'tree-item',
  template,
  viewModel,
  events: {
    inserted: function () {
      this.viewModel.attr('$el', this.element.find('.tree-item-wrapper'));
    },
  },
});
