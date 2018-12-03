/*
 Copyright (C) 2018 Google Inc., authors, and contributors
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import '../../diff/instance-fields-diff';
import '../../diff/instance-acl-diff';
import '../../diff/instance-gca-diff';
import '../../diff/instance-mapping-fields-diff';
import '../../diff/instance-list-fields-diff';
import '../../revision-history/restored-revision-comparer-config';
import {getPersonInfo} from '../../../plugins/ggrc_utils';
import template from './templates/related-revisions-item.stache';
const tag = 'related-revisions-item';

export default can.Component.extend({
  tag,
  template,
  viewModel: {
    define: {
      revision: {
        set(newValue, setValue) {
          if (!newValue) {
            return;
          }

          getPersonInfo(newValue.modified_by).then((person) => {
            this.attr('modifiedBy', person);
          });

          setValue(newValue);
        },
      },
      isCreated: {
        get() {
          return this.attr('revision.action') === 'created';
        },
      },
    },
    instance: {},
    modifiedBy: {},
    lastRevision: {},
  },
});
