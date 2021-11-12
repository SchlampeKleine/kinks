// Subcategory model

import { Model } from '@vuex-orm/core';

import KinkModel from './Kink';

export default class SubcategoryModel extends Model {
  static entity = 'subcategorymodel'

  static primaryKey = 'subcategory'

  static fields() {
    return {
      subcategory: this.string(''),
      category: this.string(''),
      kinks: this.hasMany(KinkModel, 'subcategory'),
    };
  }
}
