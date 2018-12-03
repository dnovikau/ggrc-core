/*
 * Copyright (C) 2018 Google Inc.
 * Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import {
  getPageInstance,
} from '../plugins/utils/current-page-utils';
import {widgetModules} from '../plugins/utils/widgets-utils';
import RiskAssessment from '../models/business-models/risk-assessment';
import Program from '../models/business-models/program';
import Stub from '../models/stub';
import WidgetList from '../modules/widget_list';
import TreeViewConfig from '../apps/base_widgets';

let RiskAssessmentsExtension = {};
let allowedObjectTypes = ['Program'];
widgetModules.push(RiskAssessmentsExtension);

RiskAssessmentsExtension.name = 'risk_assessments';
Program.attributes.risk_assessments = Stub.List;

// Initialize widgets for risk assessment page
RiskAssessmentsExtension.init_widgets = function () {
  let descriptor = {};
  let pageInstance = getPageInstance();
  let treeWidgets = TreeViewConfig.attr('base_widgets_by_type');

  _.forEach(allowedObjectTypes, function (type) {
    if (!type || !treeWidgets[type]) {
      return;
    }
    treeWidgets[type] = treeWidgets[type].concat(['RiskAssessment']);
  });
  if (pageInstance
    && ~can.inArray(pageInstance.constructor.shortName, allowedObjectTypes)) {
    descriptor[pageInstance.constructor.shortName] = {
      RiskAssessment: {
        widget_id: 'risk_assessments',
        widget_name: 'Risk Assessments',
        widgetType: 'treeview',
        treeViewDepth: 0,
        content_controller_options: {
          add_item_view: GGRC.stache_path +
            '/risk_assessments/tree_add_item.stache',
          parent_instance: pageInstance,
          model: RiskAssessment,
        },
      },
    };
  }
  new WidgetList('ggrc_risk_assessments', descriptor);
};
