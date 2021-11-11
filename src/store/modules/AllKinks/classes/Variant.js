import Preferences from './Preferences';

/**
 * Creates a new variant
 * @class
 */
export default class Variant {
  category;

  subcategory;

  kink;

  variant;

  debug = true;

  /**
   * @constructs variant
   * @param {Object} param
   * @param {string} param.category
   * @param {string} param.subcategory
   * @param {string} param.kink
   * @param {string} param.variant
   * @param {Object} param.messages
   * @param {Object} param.preferences
   */
  constructor({
    category,
    subcategory,
    kink,
    variant,
    name,
    messages = {},
    preferences,
  }) {
    if (!(variant || name)) {
      throw new Error(JSON.stringify({
        msg: 'constructing variant without naming it',
        category,
        subcategory,
        kink,
        variant,
        name,
        preferences,
      }));
    }
    this.category = category;
    this.subcategory = subcategory;
    this.kink = kink;
    this.variant = variant || name;
    this.messages = messages;
    this.preferences = new Preferences({
      ...preferences,
    });
    /* console.log({ category, subcategory, kink, variant, preferences }); */
  }

  // Getter

  /**
   * check if the patch corresponds to this variant
   * @param {Object} params
   * @param {string} params.name - Name for the patchObject
   * @param {string} params.replaces - Target for the patchObject
   * @return {bool}
   */
  patchMatches({
    name,
    replaces,
  }) {
    return (
      name === this.variant
      || replaces === this.variant
    );
  }

  /**
   * @type {string}
   */
  get name() {
    return this.variant;
  }

  /**
   * @return {Object[]}
   */
  get asList() {
    return this.preferencesFlattened.flat();
  }

  /**
   * @return {Object[]}
   */
  get preferencesFlattened() {
    return this.preferences
      .asList
      .map(
        (o) => ({
          ...o,
          variant: this.variant,
        }),
      )
      .flat();
  }

  // Method
  /**
   * Patch a variant
   * @param {Object} p - Object to use as patch
   */
  patch = (p) => {
    if (this.debug) {
      console.log({
        msg: 'patching',
        cur: { ...this },
        patch: p,
      });
    }

    if (!p) {
      throw new Error('patch called without patch object');
    } else {
      if (p.replaces === this.variant) {
        this.messages = p.messages;
        this.variant = p.variant || p.name;
      }
      if (p.preferences) {
        this.preferences.patch(
          p.preferences,
        );
      }
    }
  };
}
