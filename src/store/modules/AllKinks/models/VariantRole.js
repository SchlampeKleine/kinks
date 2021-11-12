// VariantRole model

import { Model } from '@vuex-orm/core';

export default class VariantRoleModel extends Model {
  static entity = 'variantrolemodel'

  static primaryKey = ['variant', 'role']

  static fields() {
    return {
      role: this.string(''),
      variant: this.string(''),
    };
  }
}
