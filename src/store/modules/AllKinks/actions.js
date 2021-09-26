/* eslint-disable import/prefer-default-export */

import { defaultRoles } from '@/assets/roles.yaml';
import defaultKinks from '@/assets/kinks.yaml';

import Role from './classes/Role';
import Variant from './classes/Variant';
import Kink from './classes/Kink';
import Subcategory from './classes/Subcategory';
import Category from './classes/Category';
import Preferences from './classes/Preferences';
import Profile from './classes/Profile';

export const updateRoleForUser = ({ commit },
  {
    username,
    categoryName,
    subcategoryName,
    variantName,
    kinkName,
    changedRole,
    debug = false,
  }) => {
  commit('updateRoleForUser', {
    username,
    categoryName,
    subcategoryName,
    kinkName,
    variantName,
    roleName: changedRole.role
      ? changedRole.role
      : changedRole.name,
    role: changedRole,
    debug,
  });
};

export const updateVariantForUser = ({ dispatch, commit },
  {
    username,
    categoryName,
    subcategoryName,
    kinkName,
    changedVariant,
    debug = false,
  }) => {
  commit('updateVariantForUser', {
    username,
    categoryName,
    subcategoryName,
    kinkName,
    variant: changedVariant,
    variantName: changedVariant.name
      ? changedVariant.name
      : changedVariant.variant,
  });

  changedVariant.preferences.roles
    .map(
      (o) => (
        dispatch('updateRoleForUser', {
          username,
          categoryName,
          subcategoryName,
          kinkName,
          variantName: changedVariant.name
            ? changedVariant.name
            : changedVariant.variant,
          roleName: o.name,
          changedRole: o,
        })
      ),
    );

  /**
  if (debug) {
    console.log({
      msg: 'updateVariantForUser',
      username,
      categoryName,
      subcategoryName,
      kinkName,
      changedVariant,
    });
  }
  if (!changedVariant) {
    throw new Error('no changedVariant provided');
  }

  const tmpKink = getters.getKinkForUser({
    username,
    categoryName,
    subcategoryName,
    kinkName,
  });
  const tmpVariants = tmpKink
    .variants;
  tmpVariants[
    tmpVariants.findIndex(
      (el) => (el.name === changedVariant.name),
    )
  ] = { ...changedVariant };
  dispatch('updateKinkForUser',
    {
      username,
      changedKink: {
        ...tmpKink,
        variants: [...tmpVariants],
      },
      subcategoryName,
      categoryName,
      debug,
    });
    */
};

export const updateKinkForUser = ({ dispatch, getters, commit },
  {
    username,
    categoryName,
    subcategoryName,
    changedKink,
    debug = false,
  }) => {
  if (!changedKink) {
    throw new Error('can not update kink without changedKink');
  }
  const tmpKink = new Kink(changedKink);
  commit('updateKinkForUser', {
    username,
    categoryName,
    subcategoryName,
    kinkName: tmpKink,
    name,
    kink: tmpKink,
  });

  /**
  if (debug) {
    console.log({
      msg: 'updateKinkForUser',
      username,
      categoryName,
      subcategoryName,
      changedKink,
    });
  }
  if (subcategoryName) {
    const tmpSubCategory = getters.getSubCategoryForUser({
      username,
      categoryName,
      subcategoryName,
    });
    const tmpKinks = tmpSubCategory.kinks;

    const idx = tmpKinks.findIndex(
      (el) => (el.name === changedKink.name),
    );
    if (idx === -1) {
      throw new Error('did not find matching kink');
    }
    tmpKinks[
      idx
    ] = { ...changedKink };

    dispatch('updateSubCategoryForUser',
      {
        username,
        changedSubCategory: {
          ...tmpSubCategory,
          kinks: [...tmpKinks],
        },
        categoryName,
        debug,
      });
  } else {
    const tmpCategory = getters.getCategoryForUser({
      username,
      categoryName,
    });
    const tmpKinks = tmpCategory
      .kinks;
    tmpKinks[
      tmpKinks.findIndex(
        (el) => (el.name === changedKink.name),
      )
    ] = { ...changedKink };
    dispatch('updateCategoryForUser',
      {
        username,
        categoryName,
        changedCategory: new Category({
          ...tmpCategory,
          kinks: [...tmpKinks],
        }),
      });
  }
  */
};

export const updateSubCategoryForUser = ({ dispatch, getters, commit },
  {
    username,
    categoryName,
    changedSubCategory,
  }) => {
  commit('updateSubCategoryForUser', {
    username,
    categoryName,
    subcategoryName: changedSubCategory.name,
    subcategory: changedSubCategory,
  });
  /**
  const tmpCategory = getters.getCategoryForUser({
    username,
    categoryName,
  });
  const tmpSubCategories = tmpCategory
    .subcategories;
  const idx = tmpSubCategories.findIndex(
    (el) => (el.name === changedSubCategory.name),
  );

  if (idx === -1) {
    throw new Error('did not find matching subcategory');
  }
  tmpSubCategories[
    idx
  ] = { ...changedSubCategory };

  dispatch('updateCategoryForUser',
    {
      username,
      changedCategory: new Category({
        ...tmpCategory,
        subcategories: [...tmpSubCategories],
      }),
    });
    */
};

export const updateCategoryForUser = ({ dispatch, getters, commit },
  {
    username,
    changedCategory,
  }) => {
  commit('updateCategoryForUser', {
    username,
    categoryName: changedCategory.name,
    category: changedCategory,
  });

/**
  const tmpKinks = getters.getKinksForUser(username);
  const tmpCategories = tmpKinks
    .categories
    .map(
      (el) => new Category(el)
    );
  const idx = tmpCategories.findIndex(
    (el) => (el.name === changedCategory.name),
  );
  if (idx === -1) {
    throw new Error('did not find matching category');
  }
  tmpCategories[
    idx
  ] = { ...changedCategory };
  dispatch('saveOrCreateKinksForUser',
    {
      username,
      kinks: {
        ...tmpKinks,
        categories: [ ...tmpCategories ],
      },
    });
    */
};

export const resetKinksForUser = ({ dispatch, commit }, { username }) => (
  commit('updateKinksForUser', {
    username,
    kinks: {
      ...defaultKinks,
      categories: defaultKinks.categories.map(
        (el) => (new Category(el)),
      ),
    },
  })
);

export const saveOrCreateKinksForUser = ({ state, commit }, { username, kinks }) => {
  try {
    commit('updateKinksForUser', {
      username,
      kinks,
    });
  } catch {
    const tmpUserKinks = state.userKinks;
    const userIndex = tmpUserKinks.findIndex(
      (el) => el.username === username,
    );

    tmpUserKinks.push({
      username,
      kinks,
      lastUpdated: new Date(),
    });
    commit('updateUserKinks', {
      userKinks: [...tmpUserKinks],
    });
  }
};

export const loadKinksForUser = ({ dispatch, commit, getters }, { username }) => {
  /**
   *  TODO
   *  Save curKinks if not already done
   */
  const tmpKinks = getters.getKinksForUser(username);
  console.log({ tmpKinks });
  dispatch('saveOrCreateKinksForUser', {
    username: 'CURRENT',
    kinks: { ...tmpKinks },
  });
};

/**
 * Patches a profile using the default profiles as source
 */
export const patchProfileForUser = ({ dispatch, commit, getters }, { username }) => {
  const curKinks = getters.getKinksForUser(username);

  const patchKinks = { ...defaultKinks };

  /**
   * Patch a role
   * @param {Object} o - Object to be patched
   * @param {Object} p - Object to use as patch
   * @return {Object} - patched Object
   */
  const patchRole = (o, p) => {
    const r = new Role({ ...o, role: o, name });
    r.patch(p);
    console.log({
      p,
      o,
      r,
    });
    return r;
    /* {
      ...p,
      ...o,
      // special handling for user provided values
      preference: o.preference !== '' ? o.preference : p.preference,
    } */
  };

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
  const patchPreferences = (
    o = { ...defaultPreferences },
    p = { ...defaultPreferences },
  ) => {
    const preferences = new Preferences(
      o,
    );
    preferences.patch(p);
    return preferences;
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
              (variant) => {
                const v = new Variant(variant);
                v.patch(
                  p.variants.find(
                    (el) => (
                      el.name === variant.name
                  || el.replaces === variant.name
                    ),
                  ),
                );
                return v;
              },
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
          (kind) => {
            console.log({
              kind,
              o,
              p,
            });
            const k = new Kink(kind);
            k.patch(
              p.kinds.find(
                (el) => (
                  el.name === kind.name
                || el.replaces == kind.name
                ),
              ),
            );
            return k;
          },
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
              (subcategory) => {
                const s = new Subcategory(subcategory);
                s.patch(

                  p.subcategories.find(
                    (el) => (
                      el.name === subcategory.name
                  || el.replaces === subcategory.name
                    ),
                  ),
                );
                return s;
              },
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

  dispatch('saveOrCreateKinksForUser',
    {
      username,
      kinks:
      {
        ...patchKinks,
        ...curKinks,
        categories: [
          ...(
            curKinks.categories
              .map(
                (category) => {
                  const c = new Category(category);
                  console.log({
                    msg: 'mapping categories',
                    c,
                  });
                  c.patch(
                    patchKinks.categories
                      .find(
                        (el) => (
                          c.patchMatches({
                            name: el.name,
                            category: el.category,
                            replaces: el.replaces,
                          })
                        ),
                      ),
                  );
                  return { ...c };
                },
              )
          ),
        ],
        SCHEME_VERSION: patchKinks.SCHEME_VERSION || '',
      },
    });
};

export const importCurKinks = ({ dispatch, commit, rootGetters }) => (
  dispatch(
    'saveOrCreateKinksForUser',
    {
      username: 'CURRENT',
      kinks: {
        ...rootGetters['CurKinks/getCurKinks'],
      },
    },
  ).then(
    () => {
      const curKinks = rootGetters['CurKinks/getCurKinks'];

      const curKinksAllKinks = rootGetters['AllKinks/getCurKinks'];

      if (
        JSON.stringify(curKinks)
        === JSON.stringify(curKinksAllKinks)
      ) {
        console.log('Correctly imported');
        commit('CurKinks/markAsImported', null, { root: true });
      } else {
        console.log({
          msg: 'import error',
          curKinks,
          curKinksAllKinks,
        });
      }
    },
  )
);
