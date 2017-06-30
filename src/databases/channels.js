/*
 * Copyright (c) 2017, Hugo Freire <hugo@exec.sh>.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

const Database = require('./database')

class Channels extends Database {
  constructor () {
    super('channels', [ 'name' ])
  }

  _transformRowToObject (row) {
    const _row = super._transformRowToObject(row)

    if (!_row) {
      return
    }

    if (_row.last_activity_date) {
      _row.last_activity_date = new Date(_row.last_activity_date)
    }

    if (_row.out_of_likes_date) {
      _row.out_of_likes_date = new Date(_row.out_of_likes_date)
    }

    row.is_enabled = !!row.is_enabled
    row.is_out_of_likes = !!row.is_out_of_likes

    return _row
  }

  _transformObjectToRow (object) {
    const _object = super._transformObjectToRow(object)

    if (!_object) {
      return
    }

    if (_object.last_activity_date instanceof Date) {
      _object.last_activity_date = _object.last_activity_date.toISOString()
    }

    if (_object.out_of_likes_date instanceof Date) {
      _object.out_of_likes_date = _object.out_of_likes_date.toISOString()
    }

    return _object
  }

  findByName (name) {
    return this._findByPrimaryKeys([ name ])
  }

  deleteByName (name) {
    return this._deleteByPrimaryKeys([ name ])
  }
}

module.exports = new Channels()