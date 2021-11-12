// TagVariant model

import { Model } from '@vuex-orm/core';

import Tag from '@/models/Tag';
import Variant from '@/models/Variant';

export default class TagVariant extends Model {
  static entity = 'tagvariant'

  // static primaryKey = 'id'

  static primaryKey = ['tag_key', 'variant_key']

  static fields() {
    return {
      // id: this.uid(), // The auto-generated primary key field.
      tag_key: this.string(''),
      variant_key: this.string(''),
      tag: this.belongsTo(Tag, 'tag_key', 'tag'),
      variant: this.belongsTo(Variant, 'variant_key', 'key'),
    };
  }
}
