// Category model

import { Model } from '@vuex-orm/core';

import KinkModel from './Kink';
import SubcategoryModel from './Subcategory';

export default class CategoryModel extends Model {
  static entity = 'categorymodel'

  static primaryKey = 'category'

  static fields() {
    return {
      category: this.string(''),
      subcategories: this.hasMany(Subcategory, 'category'),
      kinks: this.hasMany(Kink, 'category'),
    };
  }
}
