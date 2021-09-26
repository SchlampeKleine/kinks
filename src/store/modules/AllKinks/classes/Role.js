// Hints on destructuring params from https://skovy.dev/named-parameters-in-javascript/

import { preferenceLevels } from '@/assets/levels.yaml';
import Messages from './Messages';

/**
 * Creates a new role
 * @class
 */
export default class Role {
  role;

  messages;

  preferenceLevel;

  sideBySide;

  /**
   * @constructs Role
   * @param {string} role
   * @param {string} name
   * @param {Messages} messages
   */

  constructor({
    role,
    name,
    messages,
    preference,
    preferenceLevel,
    sideBySide,
    debug = false,
  }) {
    if (debug) {
      console.log({
        msg: 'Constructor Role',
        name,
        role,
        messages,
        preference,
        preferenceLevel,
        cur: { ...this },
      });
    }
    if (!(role || name)) {
      throw new Error('constructing role without naming it');
    }
    this.role = role || name;
    this.messages = new Messages(messages);
    this.preferenceLevel = preferenceLevel || preference;
    this.sideBySide = sideBySide;
  }

  // Getter
  /**
   *
   */
  get asListObject() {
    return {
      role: this.role,
      sortKey: this.sortKey,
      color: this.color,
      preferenceLevel: this.preferenceLevel,
    };
  }

  /**
   * color to use to represent the preferenceLevel
   * @type {string}
   */
  get color() {
    return Role.getColorFromPreferenceLevel(this.preferenceLevel);
  }

  /**
   * Key to sort the preferenceLevel
   * @type {number}
   */
  get sortKey() {
    return Role.getSortKeyFromPreferenceLevel(this.preferenceLevel);
  }

  /**
   * Name of the role
   * @type {string}
   */
  get name() {
    return this.role;
  }

  // Method
  /**
   * Patch a role
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
      if (p.replaces === this.role) {
        this.role = p.role || p.name;
        this.messages = new Messages(p.messages);
      } else if (p.messages) {
        this.messages
          .patch(
            p.messages,
          );
      }
      // special handling for user provided values
      this.preference = this.preference !== ''
        ? this.preference
        : p.preference;
    }
  };

  /**
   * @static
   * @return {string} - Color representing the preferenceLevel
   * @param {string} preferenceLevel
   */
  static getColorFromPreferenceLevel(preferenceLevel) {
    const level = preferenceLevels.find(
      (el) => (el.name === preferenceLevel),
    );
    return level
      ? level.color
      : '';
  }

  /**
   * @static
   * @return {string} - sortKey for the preferenceLevel
   * @param {string} preferenceLevel
   */
  static getSortKeyFromPreferenceLevel(preferenceLevel) {
    const level = preferenceLevels.find(
      (el) => (el.name === preferenceLevel),
    );
    return level
      ? level.sortKey
      : '';
  }

  /**
   * update
   * @param {Role} role
   */
  update(role) {
    this.preferenceLevel = role.preferenceLevel
      ? role.preferenceLevel
      : this.preferenceLevel;
  }
}
