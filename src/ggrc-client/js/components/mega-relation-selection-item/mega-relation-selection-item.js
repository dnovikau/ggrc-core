/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import template from './mega-relation-selection-item.stache';
import pubSub from '../../pub-sub';

export default can.Component.extend({
  tag: 'mega-relation-selection-item',
  template: can.stache(template),
  leakScope: false,
  viewModel: {
    mapAsChild: null,
    isDisabled: false,
    id: null,
    switchRelation(relation) {
      pubSub.dispatch({
        type: 'mapAsChild',
        id: this.attr('id'),
        value: relation,
      });
    },
    define: {
      childRelation: {
        get() {
          return this.attr('mapAsChild') === true;
        }
      },
      parentRelation: {
        get() {
          return this.attr('mapAsChild') === false;
        }
      },
    }
  },
});
