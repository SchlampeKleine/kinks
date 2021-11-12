// UserPreference Model

import { Model } from '@vuex-orm/core';
import Preference from '@/models/Preference';

export default class UserPreference extends Model {
  // entity is a required property for all models.
  static entity = 'user_preference'

  static fields() {
    return {
      id: this.attr(null),
      user: this.string,
      level: this.string(null).nullable(),
      role: this.hasOne(Role, 'roleKey'),
    };
  }
}
