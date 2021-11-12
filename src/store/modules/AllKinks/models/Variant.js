// Variant model

import { Model } from '@vuex-orm/core';

import VariantRoleModel from './VariantRole';

export default class VariantModel extends Model {
  static entity = 'variantmodel'

  static primaryKey = 'variant'

  static fields() {
    return {
      subcategory: this.string('').nullable(),
      category: this.string(''),
      kink: this.string(''),
      variant: this.string(''),
      variantrole: this.hasMany(VariantRoleModel, 'variant'),
    };
  }
}



