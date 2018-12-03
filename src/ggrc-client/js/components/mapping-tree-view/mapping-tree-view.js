/*
    Copyright (C) 2018 Google Inc.
    Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
*/

import template from './mapping-tree-view.stache';
import '../object-list-item/editable-document-object-list-item';
import {notifierXHR} from '../../plugins/utils/notifiers-utils';
import Mappings from '../../models/mappers/mappings';

export default can.Component.extend({
  tag: 'mapping-tree-view',
  template,
  viewModel: {
    treeViewClass: '@',
    expandable: '@',
    sortField: '@',
    sortOrder: '@',
    emptyText: '@',
    parentInstance: null,
    mappedObjects: [],
    isExpandable: function () {
      let expandable = this.attr('expandable');
      if (expandable === null || expandable === undefined) {
        return true;
      } else if (typeof expandable === 'string') {
        return expandable === 'true';
      }
      return expandable;
    },
  },
  init: function (element) {
    let el = $(element);
    let binding;

    _.forEach(['mapping', 'itemTemplate'], (prop) => {
      if (!this.viewModel.attr(prop)) {
        this.viewModel.attr(prop,
          el.attr(can.camelCaseToDashCase(prop)));
      }
    });

    binding = Mappings.get_binding(
      this.viewModel.mapping,
      this.viewModel.parentInstance);

    binding.refresh_instances().then(function (mappedObjects) {
      this.viewModel.attr('mappedObjects').replace(
        this._sortObjects(mappedObjects)
      );
    }.bind(this));

    // We are tracking binding changes, so mapped items update accordingly
    binding.list.on('change', function () {
      this.viewModel.attr('mappedObjects').replace(
        this._sortObjects(binding.list)
      );
    }.bind(this));
  },
  /**
    * Sort objects list by this.viewModel.sortField, if defined
    * in order defined in this.viewModel.sortOrder (asc or desc)
    *
    * @param {Array} mappedObjects - the list of objects to be sorted
    *
    * @return {Array} - if this.viewModel.sortField is defined, mappedObjects
    *                   sorted by field this field;
    *                   if this.viewModel.sortField is undefined, unsorted
    *                   mappedObjects.
    */
  _sortObjects: function (mappedObjects) {
    let sortField = this.viewModel.attr('sortField');
    let sortOrder = this.viewModel.attr('sortOrder');
    if (sortField) {
      return _.orderBy(mappedObjects, sortField, sortOrder);
    }
    return mappedObjects;
  },
  events: {
    '[data-toggle=unmap] click': function (el, ev) {
      let instance = el.find('.result').data('result');
      let mappings = Mappings.get_mapping(
        this.viewModel.mapping,
        this.viewModel.parentInstance);
      let binding;

      ev.stopPropagation();
      // Refactor and show spinner instead (for all lists)
      el.hide();
      binding = _.find(mappings, function (mapping) {
        return mapping.instance.id === instance.id &&
          mapping.instance.type === instance.type;
      });
      _.forEach(binding.get_mappings(), function (mapping) {
        mapping.refresh()
          .then(function () {
            return mapping.destroy();
          })
          .then(function () {
            if (mapping.documentable) {
              return mapping.documentable.reify();
            }
          })
          .fail(notifierXHR('error'));
      });
    },
  },
});
