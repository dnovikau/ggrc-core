/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

describe('can.stache.helper.localize_date_today', function () {
  'use strict';

  let helper;
  let testDate;

  beforeAll(function () {
    helper = can.Mustache._helpers.localize_date_today.fn;
  });

  it('returns "Today" for today', function () {
    testDate = new Date();
    expect(helper(testDate)).toEqual('Today');
  });

  it('returns date for tomorrow', function () {
    let today = new Date();
    let tomorrow = today.getDate() + 1;
    let expected = moment(tomorrow).format('MM/DD/YYYY');
    expect(helper(tomorrow)).toEqual(expected);
  });

  it('returns date for yesterday', function () {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let expected = moment(yesterday).format('MM/DD/YYYY');
    expect(helper(yesterday)).toEqual(expected);
  });

  it('returns date string when date is passed in', function () {
    testDate = new Date(2000, 2, 2);
    expect(helper(testDate)).toEqual('03/02/2000');
  });

  it('returns "Today" for falsey', function () {
    expect(helper(null)).toEqual('Today');
    expect(helper()).toEqual('Today');
  });
});
