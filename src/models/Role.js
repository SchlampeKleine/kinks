// Role Model

import { Model } from '@vuex-orm/core';

export default class Role extends Model {
  // entity is a required property for all models.
  static entity = 'role'

  static primaryKey = 'roleKey'

  static fields() {
    return {
      id: this.attr(null),
      roleKey: this.string(''),
    };
  }
}
