// Level model

import { Model } from '@vuex-orm/core';

import VariantRoleModel from './VariantRole';

export default class LevelModel extends Model {
  static entity = 'levelmodel'

  static primaryKey = 'level'

  static fields() {
    return {
      level: this.string(''),
      color: this.string(null).nullable(),
      sortKey: this.number(null).nullable(),
    };
  }
}
