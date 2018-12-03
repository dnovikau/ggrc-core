/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import {getComponentVM} from '../../../../js_specs/spec_helpers';
import Component from '../mapper-results-item-attrs';
import * as businessModels from '../../../models/business-models';

describe('mapper-results-item-attrs component', function () {
  'use strict';

  let viewModel;
  let DEFAULT_ATTR_TEMPLATE =
    GGRC.stache_path + '/base_objects/tree-item-attr.stache';

  beforeEach(function () {
    let init = Component.prototype.viewModel.init;
    Component.prototype.viewModel.init = undefined;
    viewModel = getComponentVM(Component);
    Component.prototype.viewModel.init = init;
    viewModel.init = init;
  });

  describe('init() method', function () {
    it('sets mustache template path to attributes view of model' +
    ' in viewModel.attrTemplate', function () {
      let result;
      viewModel.attr('modelType', 'Control');
      viewModel.init();
      result = viewModel.attr('attrTemplate');
      expect(result)
        .toEqual(GGRC.stache_path + '/controls/tree-item-attr.stache');
    });

    it('sets default mustache template path in viewModel.attrTemplate' +
    ' if attributes view of model not defined', function () {
      businessModels.TestModel = {
        tree_view_options: {},
      };

      viewModel.attr('modelType', 'TestModel');
      viewModel.init();
      let result = viewModel.attr('attrTemplate');

      expect(result).toEqual(DEFAULT_ATTR_TEMPLATE);

      businessModels.TestModel = null;
    });
  });
});
