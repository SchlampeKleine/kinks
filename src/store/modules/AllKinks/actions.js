/* eslint-disable import/prefer-default-export */

import defaultKinks from '@/assets/kinks.yaml';
import { defaultRoles } from '@/assets/roles.yaml';

export const saveKinksForUser = ({ state, commit }, { username, kinks }) => {
  const tmpUserKinks = state.userKinks;
  const userIndex = tmpUserKinks.findIndex(
    (el) => el.username === username,
  );

  if (userIndex > -1) {
    tmpUserKinks[userIndex].kinks = kinks;
    tmpUserKinks[userIndex].lastUpdated = new Date();
  } else {
    tmpUserKinks.push({
      username,
      kinks,
      lastUpdated: new Date(),
    });
  }
  commit('updateUserKinks', {
    userKinks: [...tmpUserKinks],
  });
};

export const loadKinksForUser = ({ dispatch, commit, getters }, { username }) => {
  /**
   *  TODO
   *  Save curKinks if not already done
   */
  const tmpKinks = getters.getKinksForUser(username);
  console.log({ tmpKinks });
  dispatch('CurKinks/updateCurKinks', { ...tmpKinks }, { root: true });
};

/**
 * Patches a profile using the default profiles as source
 */
export const patchProfileForUser = ({ dispatch, commit, getters }) => (username) => {
  const curKinks = getters.getKinksForUser(username);

  /**
   * Patch a role
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchRole = (o, p) => (
    {
      ...p,
      ...o,
      // special handling for user provided values
      preference: o.preference !== '' ? o.preference : p.preference,
    }
  );

  /**
   * Patch or replace a role
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchOrReplaceRole = (o, p) => (
    o.name === p.replaces
      ? patchRole(p, o)
      : patchRole(o, p)
  );

  /**
   * @constant
   * @type {Object}
   * @default
   */
  const defaultPreferences = {
    comment: '',
    roles: [...defaultRoles],
  };

  /**
   * Patch preferences and their roles
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchPreferences = (o, p) => {
    const object = {
      ...defaultPreferences,
      ...o,
    };
    const patch = {
      ...defaultPreferences,
      ...p,
    };

    return tmpPreferences = {
      ...patch,
      ...object,
      roles: [
        ...object.roles
          .map(
            (role) => patchRole(
              role,
              patch.roles.find(
                (el) => (
                  el.name === role.name
                || el.replaces === role.name
                ),
              ),
            ),
          ),
      ],
      // special handling for comment
      comment: object.comment.length > 0 ? object.comment : patch.comment,
    };
  };

  /**
   * Patch or replace a variant
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchOrReplaceVariant = (o, p) => (
    {
      preferences:
      o.name === p.replaces
        ? patchPreferences(p.preferences, o.preferences)
        : patchPreferences(o.preferences, p.preferences),
    }
  );

  /**
   * Patch a kind (and its variants)
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchKind = (o, p) => (
    {
      ...p,
      ...o,
      ...(
        o.variants
          ? {
            variants: o.variants.map(
              (variant) => patchOrReplaceVariant(
                variant,
                p.variants.find(
                  (el) => (
                    el.name === variant.name
                  || el.replaces == variant.name
                  ),
                ),
              ),
            ),
          } : {
            preferences: patchPreferences(o.preferences, p.preferences),
          }
      ),
    }
  );

  /**
   * Patch or replace a kind
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchOrReplaceKind = (o, p) => (
    o.name === p.replaces
      ? patchKind(p, o)
      : patchKind(o, p)
  );

  /**
   * Patch kinds-key of an object
   * @param {Object} o - Object to be patched
   * @param {Object[]} o.kinds[] - List of kinds to patch
   * @param {Object} p - Object to use as patch
   * @param {Object[]} p.kinds[] - List of kinds to use as patches
   * @return {Object} - patched Object
   */
  const patchKinds = (o, p) => (
    {
      ...p,
      ...({
        kinds:
        o.kinds.map(
          (kind) => patchOrReplaceKind(
            kind,
            p.kinds.find(
              (el) => (
                el.name === kind.name
                || el.replaces == kind.name
              ),
            ),
          ),
        ),
      }
      ),
    }

  );

  /**
   * Patch or replace a subcategory
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchOrReplaceSubCategory = (o, p) => (
    o.name === p.replaces
      ? patchSubCategory(p, o)
      : patchSubCategory(o, p)
  );

  /**
   * Patch a category (and its subcategories and kinds keys)
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchCategory = (o, p) => {
    const tmpCategory = {
      ...o,
      ...(
        o.subcategories
          ? {
            subcategories: o.subcategories.map(
              (subcategory) => patchKinds(
                subcategory,
                p.subcategories.find(
                  (el) => (
                    el.name === subcategory.name
                  || el.replaces === subcategory.name
                  ),
                ),
              ),
            ),
          }
          : o
      ),
    };

    return tmpCategory.kinds
      ? {
        ...tmpCategory,
        ...patchKinds(tmpCategory, p),
      }
      : tmpCategory;
  };

  /**
   * Patch or replace a category
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchOrReplaceCategory = (o, p) => (
    o.name === p.replaces
      ? patchCategory(p, o)
      : patchCategory(o, p)
  );

  dispatch('saveKinksForUser',
    {
      username,
      kinks:
      {
        ...curKinks,
        categories: [
          ...(
            curKinks.categories
              .map(
                (category) => patchOrReplaceCategory(
                  category,
                  defaultKinks.categories.find(
                    (el) => (
                      el.name === category.name
                    || el.replaces === category.name
                    ),
                  ),
                ),
              )
          ),
        ],
      },
    });
};
