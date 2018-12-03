/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import '../object-tasks/object-tasks';
import '../mapped-counter/mapped-counter';
import Directive from '../../models/business-models/directive';
import Requirement from '../../models/business-models/requirement';
import CycleTaskGroupObjectTask from '../../models/business-models/cycle-task-group-object-task';
import CycleTaskGroup from '../../models/business-models/cycle-task-group';
import Cycle from '../../models/business-models/cycle';

import template from './templates/tree-item-extra-info.stache';

let viewModel = can.Map.extend({
  define: {
    isSubTreeItem: {
      type: 'htmlbool',
      value: false,
    },
    isActive: {
      type: 'boolean',
      get: function () {
        return this.attr('drawStatuses') ||
          this.attr('isDirective') ||
          this.attr('isCycleTasks') ||
          this.attr('isRequirement');
      },
    },
    isDirective: {
      type: 'boolean',
      get: function () {
        return this.attr('instance') instanceof Directive;
      },
    },
    isRequirement: {
      type: 'boolean',
      get: function () {
        return this.attr('instance') instanceof Requirement;
      },
    },
    isCycleTaskGroupObjectTask: {
      type: 'boolean',
      get: function () {
        return this.attr('instance') instanceof CycleTaskGroupObjectTask;
      },
    },
    isCycleTaskGroup: {
      type: 'boolean',
      get: function () {
        return this.attr('instance') instanceof CycleTaskGroup;
      },
    },
    isCycleTasks: {
      type: 'boolean',
      get: function () {
        return this.attr('isCycleTaskGroup') ||
          this.attr('isCycleTaskGroupObjectTask') ||
          this.attr('instance') instanceof Cycle;
      },
    },
    isLoading: {
      type: 'boolean',
      value: false,
    },
    readyStatus: {
      type: 'boolean',
      value: false,
    },
    raisePopover: {
      type: 'boolean',
      value: false,
      get: function () {
        return this.attr('hovered') || this.attr('readyStatus');
      },
    },
    disablePopover: {
      type: 'boolean',
      get: function () {
        return this.attr('instance') instanceof Cycle;
      },
    },
    drawStatuses: {
      type: 'boolean',
      get: function () {
        return !!this.attr('instance.workflow_state');
      },
    },
    isShowOverdue: {
      type: 'boolean',
      get: function () {
        return this.attr('isCycleTaskGroup') ||
          this.attr('isCycleTaskGroupObjectTask');
      },
    },
    isOverdue: {
      type: 'boolean',
      get: function () {
        let isWorkflowOverdue =
          this.attr('drawStatuses') &&
          this.attr('instance.workflow_state') === 'Overdue';

        let isCycleTasksOverdue =
          this.attr('isCycleTasks') &&
          this.attr('instance.isOverdue');

        return isWorkflowOverdue || isCycleTasksOverdue;
      },
    },
    cssClasses: {
      type: 'string',
      get: function () {
        let classes = [];

        if (this.attr('isOverdue')) {
          classes.push('state-overdue');
        }

        if (this.attr('spin')) {
          classes.push('fa-spinner');
          classes.push('fa-spin');
        } else if (this.attr('active')) {
          classes.push('active');
          classes.push('fa-info-circle');
        } else {
          classes.push('fa-info-circle');
        }

        return classes.join(' ');
      },
    },
  },
  onEnter: function () {
    this.attr('active', true);
    if (!this.attr('triggered')) {
      this.attr('triggered', true);
    }
  },
  onLeave: function () {
    this.attr('active', false);
  },
  addContent: function (dataPromise) {
    let dfds = this.attr('contentPromises');
    let dfdReady = this.attr('dfdReady');

    if (dfdReady.state() === 'pending') {
      this.attr('spin', true);
      dfds.push(dataPromise);
      dfdReady = $.when(...dfds).then(function () {
        this.attr('spin', false);
      }.bind(this));

      this.attr('dfdReady', dfdReady);
    }
  },
  contentPromises: [],
  dfdReady: can.Deferred(),
  classes: [],
  instance: null,
});

export default can.Component.extend({
  tag: 'tree-item-extra-info',
  template,
  viewModel,
});
