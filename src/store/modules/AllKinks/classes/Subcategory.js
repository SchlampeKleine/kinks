import Kink from './Kink';

export default class Subcategory {
  category;

  /**
   * @constructs subcategory
   * @param {Object} param
   * @param {string} param.category
   * @param {string} param.subcategory
   * @param {kink[]} param.kinks
   * @param {Object} param.messages
   */
  constructor({
    category,
    subcategory,
    name,
    kinks,
    kinds,
    messages,
  }) {
    if (!(name || subcategory)) {
      throw new Error('constructing subcategory without naming it');
    }
    this.category = category;
    this.subcategory = subcategory || name;
    if (!(kinks || kinds)) {
      throw new Error('constructing subcategory without kinks');
    }
    this.kinks = (
      kinks || kinds
    )
      .map(
        (o) => new Kink({
          ...o,
          category,
          subcategory,
          kink: o.name || o.kink,
          messages: o.messages,
        }),
      );
    this.messages = messages;
  }

  // Getter
  /**
   * @type {string}
   */
  get name() {
    return this.subcategory;
  }

  /**
   * @type {string[]}
   */
  get kinkNames() {
    return this.kinks
      .map(
        (el) => el.name,
      );
  }

  /**
   * check if the patch corresponds to this subcategory
   * @param {Object} params
   * @param {string} params.name - Name for the patchObject
   * @param {string} params.replaces - Target for the patchObject
   * @return {bool}
   */
  patchMatches({
    name,
    replaces,
    subcategory,
  }) {
    return (
      name === this.subcategory
      || replaces === this.subcategory
      || subcategory === this.subcategory
    );
  }

  /**
   * @return {Object[]}
   */
  get asList() {
    return this.kinks
      .map(
        (o) => (
          o.asList
            .map(
              (el) => ({
                ...el,
                subcategory: this.subcategory,
              }),
            )
        ),
      )
      .flat();
  }

  // Method
  /**
   * Patch a subcategory
   * @param {Object} p - Object to use as patch
   */
  patch = (p) => {
    if (!p) {
      console.warn('patch called without patch object');
    } else {
      if (this.debug) {
        console.log({
          msg: 'patching',
          cur: { ...this },
          patch: p,
        });
      }
      if (p.replaces === this.subcategory) {
        this.messages = p.messages;
        this.subcategory = p.name || p.subcategory;
      }
      this.kinks
        .map(
          (o) => (
            o.patch(
              (
                p.kinks
                  ? p.kinks
                  : p.kinds
              ).find(
                (el) => (
                  o.patchMatches({
                    name: el.name,
                    replaces: el.replaces,
                  })
                ),
              ),
            )
          ),
        );
    }
  };
}
