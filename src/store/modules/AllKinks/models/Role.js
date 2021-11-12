// Role model

import { Model } from '@vuex-orm/core';

export default class RoleModel extends Model {
  static entity = 'rolemodel'

  static primaryKey = 'role'

  static fields() {
    return {
      role: this.string(''),
      sideBySide_id: this.string(null).nullable(),
      sideBySide: this.hasMany(RoleModel, 'sideBySide_id'),
      replaces_id: this.string(null).nullable(),
      replaces: this.hasMany(RoleModel, 'replaces_id'),
    };
  }
}
