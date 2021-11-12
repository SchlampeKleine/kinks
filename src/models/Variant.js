// Variant model

import { Model } from '@vuex-orm/core';

export default class Variant extends Model {
  static entity = 'variant'

  static primaryKey = 'key'

  static fields() {
    return {
      // id: this.uid(),
      key: this.string(''),
      category: this.string('')
        .nullable(),
      subcategory: this.string(null).nullable(),
      kind: this.string('')
        .nullable(),
      variant: this.string(null).nullable(),
    };
  }
}
