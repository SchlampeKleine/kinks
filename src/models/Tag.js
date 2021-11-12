// Tag model

import { Model } from '@vuex-orm/core';

export default class Tag extends Model {
  static entity = 'tag'

  static primaryKey = 'tag'

  static fields() {
    return {
      // id: this.uid(),
      tag: this.string(''),
    };
  }
}
