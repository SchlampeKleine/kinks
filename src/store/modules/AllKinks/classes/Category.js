import Kink from './Kink';
import Subcategory from './Subcategory';

/**
 * Creates a new category
 * @class
 */
export default class Category {
  category;

  /**
   * @constructs category
   * @param {Object} params
   * @param {string} params.category
   * @param {subcategory[]} params.subcategories
   * @param {kink[]} params.kinks
   * @param {Object} params.messages
   */
  constructor({
    category,
    name,
    subcategories,
    kinks,
    kinds,
    messages = {},
    debug,
  }) {
    if (debug) {
      console.log({
        msg: 'constructing Category',
        category,
        name,
        subcategories,
        kinks,
        kinds,
        messages,
        debug,
      });
    }

    if (!(category || name)) {
      throw new Error('constructing category without naming it');
    }
    this.category = category || name;
    if (!(subcategories || kinks || kinds)) {
      throw new Error('constructing category without subcategories or kinks');
    }
    if (subcategories) {
      this.subcategories = subcategories
        .map(
          (o) => (
            new Subcategory({
              ...o,
              category: this.category,
              subcategory: o.subcategory
                ? o.subcategory
                : o.subcategory,
              kinks: o.kinks,
              kinds: o.kinds,
              messages: o.messages,
              debug,
            })
          ),
        );
    }

    if (kinks || kinds) {
      this.kinks = (
        kinks || kinds
      )
        .map(
          (o) => new Kink({
            ...o,
            category,
            name: o.name,
            kink: o.kink,
            messages: o.messages,
            preferences: o.preferences,
            debug,
          }),
        );
    }
    this.messages = messages;
  }

  // Getter
  /**
   * @type {string}
   */
  get name() {
    return this.category;
  }

  /**
   * @type {string[]}
   */
  get subcategoryNames() {
    if (this.debug) {
      console.log({
        msg: 'get subcategoryNames',
        subcategories: this.subcategories,
      });
    }
    return this.subcategories
      ? this.subcategories
        .map(
          (el) => (el.name),
        )
      : [];
  }

  /**
   * @type {string[]}
   */
  get kinkNames() {
    if (this.debug) {
      console.log({
        msg: 'get kinkNames',
        kinks: this.kinks,
      });
    }
    return this.kinks
      ? this.kinks
        .map(
          (el) => (new Kink(el).name),
        )
      : [];
  }

  /**
   * check if the patch corresponds to this category
   * @param {Object} params
   * @param {string} params.name - Name for the patchObject
   * @param {string} params.replaces - Target for the patchObject
   * @return {bool}
   */
  patchMatches({
    name,
    replaces,
    category,
  }) {
    return (
      name === this.category
      || replaces === this.category
      || category === this.category
    );
  }

  /**
   * creates a list representation of the category
   * @return {Object[]}
   */
  get asList() {
    return this.subcategoriesFlattened
      .concat(
        this.kinksFlattened,
      );
  }

  /**
   * creates a list representation of all subcategories
   * @return {Object[]}
   */
  get subcategoriesFlattened() {
    return this.subcategories
      ? this.subcategories
        .map(
          (o) => o.asList
            .map(
              (el) => ({
                ...el,
                category: this.category,
              }),
            ),
        )
        .flat()
      : [];
  }

  /**
   * creates a list representation of all kinks
   * @return {Object[]}
   */
  get kinksFlattened() {
    return this.kinks
      ? this.kinks
        .map(
          (o) => (
            o.asList
              .map(
                (el) => ({
                  ...el,
                  category: this.category,
                }),
              )
          ),
        )
        .flat()
      : [];
  }

  // Method
  /**
   * Patch a category
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
      if (p.replaces === this.category) {
        this.messages = p.messages;
        this.category = p.name || p.category;
      }
      if (p.kinds || p.kinks) {
        this.kinks
          .map(
            (o) => new Kink(o),
          )
          .map(
            (o) => (
              o.patch(
                (
                  p.kinds
                    ? p.kinds
                    : p.kinks
                ).find(
                  (el) => (
                    o.patchMatches({
                      name: el.name,
                      replaces: el.replaces,
                      kind: el.kind,
                      kink: el.kink,
                    })
                  ),
                ),
              )
            ),
          );
      }
      if (p.subcategories) {
        this.subcategories
          .map(
            (o) => new Subcategory(o),
          )
          .map(
            (o) => (
              o.patch(
                p.subcategories.find(
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
    }
  };
}
