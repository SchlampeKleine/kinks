// User model

import { Model } from '@vuex-orm/core';

import PreferenceModel from './Preference';

export default class UserModel extends Model {
  static entity = 'usermodel'

  static primaryKey = 'user'

  static fields() {
    return {
      user: this.string(''),
      userpreferences: this.hasMany(PreferenceModel, 'user'),
    };
  }
}
