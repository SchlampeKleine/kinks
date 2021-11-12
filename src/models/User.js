// User Model

import { Model } from '@vuex-orm/core';

export default class User extends Model {
  // entity is a required property for all models.
  static entity = 'user'

  static primaryKey = 'role'

  static fields() {
    return {
      id: this.attr(null),
      kink: this.string(''),
      variant: this.string(''),
    };
  }
}
