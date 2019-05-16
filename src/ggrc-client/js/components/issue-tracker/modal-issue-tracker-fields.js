/*
 Copyright (C) 2019 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import '../dropdown/dropdown-component';
import '../numberbox/numberbox-component';
import template from './templates/modal-issue-tracker-fields.stache';
import {
  checkIssueTrackerTicketId,
} from '../../plugins/utils/issue-tracker-utils';
import {
  validateAttr,
} from '../../plugins/utils/validation-utils';

export default can.Component.extend({
  tag: 'modal-issue-tracker-fields',
  view: can.stache(template),
  leakScope: true,
  viewModel: can.Map.extend({
    define: {
      hasError: {
        get() {
          return this.attr('isChecked') && !this.attr('isValid');
        },
      },
      validationError: {
        get() {
          return validateAttr(this.instance, 'issue_tracker.issue_id');
        },
      },
    },
    instance: {},
    note: '',
    linkingNote: '',
    mandatoryTicketIdNote: '',
    setIssueTitle: false,
    allowToChangeId: false,
    isTicketIdMandatory: false,
    isCheckInProgress: false,
    isChecked: false,
    isValid: false,
    msg: '',
    setTicketIdMandatory() {
      let instance = this.attr('instance');

      if (instance.class.unchangeableIssueTrackerIdStatuses) {
        this.attr('isTicketIdMandatory',
          instance.class.unchangeableIssueTrackerIdStatuses
            .includes(instance.attr('status')));
      }
    },
    resetValidationStatus() {
      this.attr('isChecked', false);
      this.attr('isValid', false);
    },
    checkTicketId() {
      this.resetValidationStatus();
      this.attr('isCheckInProgress', true);

      const instance = this.attr('instance');
      if (instance.issue_tracker.issue_id) {
        return checkIssueTrackerTicketId(instance.issue_tracker.issue_id)
          .then((data) => {
            this.attr('isValid', data.valid);
            this.attr('msg', data.msg);
            this.attr('isCheckInProgress', false);
            this.attr('isChecked', true);
          });
      }
      return false;
    },
  }),
  events: {
    inserted() {
      this.viewModel.setTicketIdMandatory();
    },
    '{viewModel.instance} status'() {
      this.viewModel.setTicketIdMandatory();
    },
  },
});
