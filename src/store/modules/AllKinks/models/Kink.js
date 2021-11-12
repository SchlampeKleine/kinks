// Kink model

import { Model } from '@vuex-orm/core';

import  VariantModel from './Variant';

export default class KinkModel extends Model {
  static entity = 'kinkmodel'

  static primaryKey = 'kink'

  static fields() {
    return {
      subcategory: this.string('').nullable(),
      category: this.string(''),
      kink: this.string(''),
      variants: this.hasMany(VariantModel, 'kink'),
    };
  }
}



