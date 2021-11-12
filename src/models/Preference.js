// Preference Model

import { Model } from '@vuex-orm/core';
import Role from '@/models/Role';
import KinkVariant from '@/models/KinkVariant';

export default class Preference extends Model {
  // entity is a required property for all models.
  static entity = 'preference'

  static fields() {
    return {
      id: this.attr(null),
      level: this.string(null).nullable(),
      role: this.hasOne(Role, 'roleKey'),
    };
  }
}
