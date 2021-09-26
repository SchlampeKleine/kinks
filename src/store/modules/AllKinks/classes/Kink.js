import Variant from './Variant';
import Preferences from './Preferences';
import { defaultPreferences } from './Preferences';

export default class Kink {
  /**
   * @constructs kink
   * @param {Object} param
   * @param {string} param.category
   * @param {string} param.subcategory
   * @param {string} param.kink
   * @param {string} param.name - can replace kink
   * @param {variant[]} param.variants
   * @param {Object} param.messages
   * @param {Object} param.preferences
   */
  constructor({
    category,
    subcategory,
    kink,
    name,
    variants,
    messages = {},
    preferences,
    debug,
  }) {
    if (debug) {
      console.log({
        msg: 'constructing Kink',
        category,
        subcategory,
        kink,
        name,
        variants,
        preferences,
      });
    }
    this.category = category;
    this.subcategory = subcategory;
    if (!(kink || name)) {
      throw new Error(
        JSON.stringify({
          msg: 'constructing kink without naming it',
          params: {
            category,
            subcategory,
            name,
            kink,
          },
        }),
      );
    }
    this.kink = kink || name;
    if (variants) {
      this.variants = variants
        .map(
          (o) => {
            try {
              return new Variant({
                ...o,
                category,
                subcategory,
                kink,
                name: o.name,
                variant: o.variant,
                messages: o.messages,
                debug,
              });
            } catch (e) {
              throw new Error(JSON.stringify({
                old: e,
                o,
                variants,
              }));
            }
          },
        );
    }
    this.messages = messages;
    if (!variants) {
      this.preferences = preferences
        ? new Preferences(
        preferences
      )
      : defaultPreferences;
    }
    if (debug) {
      console.log({
        msg: 'kink - constructor',
        category,
        subcategory,
        kink,
        variants,
        preferences,
      });
    }
  }

  // Getter

  /**
   * @type {string[]}
   */
  get variantNames() {
    return this.variants
      ? this.variants
        .map(
          (el) => el.name,
        )
      : [];
  }

  /**
   * @type {string}
   */
  get name() {
    return this.kink;
  }

  /**
   * @return {Object[]}
   */
  get asList() {
    return (
      this.variants
      ? this.variantsFlattened
      : this.preferencesFlattened
    ).flat();
  }

  /**
   * @return {Object[]}
   */
  get preferencesFlattened() {
    return this.preferences
      .asList
      .map(
        (o) => ({
          kink: this.kink,
          ...o,
        }),
      )
      .flat();
  }

  /**
   * @return {Object[]}
   */
  get variantsFlattened() {
    return this.variants
      ? this.variants
      .map(
        (o) => new Variant(o)
      )
      .map(
        (o) => (
          o.asList
          .map(
            (el) => (
              {
                kink: this.kink,
                ...el,
              }),
          )
        )
      )
      .flat()
      : [];
  }

  // Method
  /**
   * Patch a kink
   * @param {Object} p - Object to use as patch
   */
  patch = (p) => {
    if (!p) {
      throw new Error('patch called without patch object');
    } else {
      if (this.debug) {
        console.log({
          msg: 'patching',
          cur: { ...this },
          patch: p,
        });
      }
      if (p.replaces === this.kink) {
        this.messages = p.messages;
        this.kink = p.kink || p.name;
        if (p.variants) {
          this.variants = p.variants
            .map(
              (o) => (new Variant({
                ...o,
                variant: o.variant,
                name: o.name,
              })),
            );
        }
        if (p.preferences) {
          this.preferences = new Preferences(p.preferences);
        }
      }
      if (p.variants) {
        this.variants
          .map(
            (o) => o.patch(
              p.variants.find(
                (el) => {
                  console.log({
                    msg: 'finding patch',
                    el,
                    o,
                  });

                  return o.patchMatches({
                    name: el.name,
                    replaces: el.replaces,
                  });
                },
              ),
            ),
          );
      }
      if (p.preferences) {
        this.preferences.patch(
          p.preferences,
        );
      }
    }
  };

  /**
   * check if the patch corresponds to this kink
   * @param {Object} params
   * @param {string} params.name - Name for the patchObject
   * @param {string} params.replaces - Target for the patchObject
   * @return {bool}
   */
  patchMatches({
    name,
    replaces,
    kind,
    kink,
  }) {
    return (
      name === this.kink
      || replaces === this.kink
      || kind === this.kink
      || kink === this.kink
    );
  }
}
