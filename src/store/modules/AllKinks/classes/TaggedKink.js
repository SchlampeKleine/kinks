/**
 * Creates as tagged Kink
 * @class
 */
export default class TaggedKink {
  taggedKink;

  /**
   * @constructs taggedKink
   * @param {Object} params
   * @param {string} params.kinkName
   * @param {string[]} params.tags
   */
  constructor({
    kinkName,
    tags,
  }) {
    if (!kinkName) {
      throw new Error('constructing taggedKink without kinkName');
    }
    this.kinkName = kinkName;

    if (!tags) {
      throw new Warning('no tags specified for {kinkName}');
    }

    this.tags = tags || [];
  }
}
