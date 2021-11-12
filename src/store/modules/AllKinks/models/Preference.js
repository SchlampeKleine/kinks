// Preference model

import { Model } from '@vuex-orm/core';

import VariantRoleModel from './VariantRole';
import LevelModel from './Level';

export default class PreferenceModel extends Model {
  static entity = 'preferencemodel'

  // static primaryKey = ['user']

  static fields() {
    return {
      user: this.string(''),
      userObject: this.belongsTo(User, 'user'),
      level: this.string(null).nullable(),
      levelObject: this.belongsTo(LevelModel, 'level'),
      variantrole: this.string(''),
      variant: this.string(''),
      role: this.string(''),
      variantroleObject: this.belongsTo(VariantRoleModel, 'variantrole'),
      variantRoleObject: this.belongsTo(VariantRoleModel, ['variant', 'role']),
    };
  }
}
