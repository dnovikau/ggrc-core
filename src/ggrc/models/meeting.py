# Copyright (C) 2013 Google Inc., authors, and contributors <see AUTHORS file>
# Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
# Created By: dan@reciprocitylabs.com
# Maintained By: vraj@reciprocitylabs.com

from ggrc import db
from .mixins import deferred, Described, Hyperlinked, Base
from .object_person import Personable


class Meeting(Personable, Described, Base, db.Model):
  __tablename__ = 'meetings'

  start_at = db.Column(db.DateTime, nullable=False)
  end_at = db.Column(db.DateTime, nullable=False)
  title = db.Column(db.String, nullable=False)

  _publish_attrs = [
      'start_at',
      'end_at',
      'title'
      ]
  _sanitize_html = [
      ]

  @classmethod
  def eager_query(cls):
    from sqlalchemy import orm

    return super(Meeting, cls).eager_query()
