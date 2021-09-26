/* eslint-disable import/prefer-default-export */

import { preferenceLevels } from '@/assets/levels.yaml';

import { defaultRoles } from '@/assets/roles.yaml';
import Variant from './classes/Variant';
import Kink from './classes/Kink';
import Subcategory from './classes/Subcategory';
import Category from './classes/Category';

import './classes';

export const getSubCategoryNamesForUser = (state, getters) => ({
  username,
  categoryName,
}) => {
  const c = new Category(getters.getCategoryForUser(username, categoryName));
  return c.subcategoryNames;
};

export const getCategoryNamesForUser = (state, getters) => ({
  username,
}) => getters.getKinksForUser(username).categories
  .map(
    (o) => new Category(o).name,
  );

export const getSubCategoryForUser = (state, getters) => ({
  username,
  categoryName,
  subcategoryName,
}) => {
  const tmpSubCategories = getters.getCategoryForUser({
    username,
    categoryName,
  }).subcategories
    .map(
      (el) => new Subcategory(el),
    );
  return tmpSubCategories
    .find(
      (el) => (
        el.name === subcategoryName
        || el.subcategory === subcategoryName
      ),
    );
};

export const getVariantForUser = (state, getters) => ({
  username,
  categoryName,
  subcategoryName,
  kinkName,
  variantName,
}) => {
  if (!variantName) {
    throw new Error('can not find variant without variantName');
  }
  const tmpVariant = getters.getKinkForUser({
    username,
    categoryName,
    subcategoryName,
    kinkName,
  }).variants
    .map(
      (el) => new Variant(el),
    )
    .find(
      (el) => (
        el.name === variantName
        || el.variant === variantName
      ),
    );
  if (!tmpVariant) {
    throw new Error(JSON.stringify({
      msg: 'could not find variant',
      username,
      categoryName,
      subcategoryName,
      kinkName,
    }));
  }
  return tmpVariant;
};

export const getKinkForUser = (state, getters) => ({
  username,
  categoryName,
  subcategoryName,
  kinkName,
  debug = false,
}) => {
  if (!kinkName) {
    throw new Error('can not find kink without kinkName');
  }
  if (debug) {
    console.log({
      msg: 'getKinkForUser',
      categoryName,
      username,
      kinkName,
      subcategoryName,
    });
  }
  if (subcategoryName) {
    const tmpKink = getters.getSubCategoryForUser({
      username,
      categoryName,
      subcategoryName,
    }).kinks
      .map(
        (el) => new Kink(el),
      )
      .find(
        (el) => (el.name === kinkName || el.kink === kinkName),
      );
    if (!tmpKink) {
      throw new Error(JSON.stringify({
        msg: 'did not find kink',
        username,
        categoryName,
        subcategoryName,
        kinkName,
      }));
    }
    return tmpKink;
  }

  const tmp = getters.getCategoryForUser({
    username,
    categoryName,
  });
  const tmpKink = tmp
    .kinks
    .find(
      (el) => (el.name === kinkName),
    );
  if (!tmpKink) {
    throw new Error(JSON.stringify({
      msg: 'did not find kink',
      username,
      categoryName,
      subcategoryName,
      kinkName,
    }));
  }
  return tmpKink;
};

export const getCategoryForUser = (state, getters) => ({
  username,
  categoryName,
  debug = false,
}) => {
  const { getKinksForUser } = getters;
  const tmpKinks = getKinksForUser(username);
  if (debug) {
    console.log({
      msg: 'getCategoryForUser',
      categoryName,
      username,
      tmpKinks,
      getKinksForUser,

    });
  }
  const tmpCategories = tmpKinks.categories.map(
    (el) => new Category(el),
  );
  if (!categoryName) {
    throw new Error('Can not find category without categoryName');
  }
  return tmpCategories
    .find(
      (el) => (el.name === categoryName),
    );
};

export const getKinksForUser = (state, getters) => (username, o = {}) => {
  if (!username) {
    throw new Error(JSON.stringify({
      msg: 'getKinksForUser called without username argument',
      o,
    }));
  }
  const debug = false;
  if (debug) {
    console.log({
      username, state, getters, o,
    });
  }
  return (
    state.userKinks.find(
      (el) => (el.username === username),
    ) || { }
  ).kinks;
};

export const getKinksForUserOrDefault = (state, getters) => (username) => {
  const debug = false;
  if (debug) {
    console.log({ method: 'getKinksForUserOrDefault', state, getters });
  }
  return (
    getters.getKinksForUser(username, { caller: 'getKinksForUserOrDefault' })
    || getters.getKinksForDefaultUser
  );
};

export const getCurKinks = (_, getters) => (
  getters.getKinksForUser('CURRENT')
);

export const getKinksForDefaultUser = (_, getters) => (
  getters.getKinksForUser('default')
);

export const getAvailableUsers = (state) => state.userKinks.map(
  (el) => (el.username),
);

export const getLastUpdateForUser = (state) => (username) => (
  state.userKinks
    .sort(
      (a, b) => (a.lastUpdated > b.lastUpdated),
    )
    .find(
      (el) => (el.username === username),
    ).lastUpdated
);

export const getKinksAsListForUser = (state, getters) => ({
  username,
  debug = false,
}) => {
  const curKinkCategories = getters.getKinksForUser(username).categories;

  if (debug) {
    console.log({ getCurKinksAsList: curKinkCategories });
  }

  const typedTmp = curKinkCategories
    .map(
      (o) => {
        if (debug) {
          console.log({
            cat: o,
          });
        }
        return new Category({
          name: o.name,
          category: o.category,
          messages: o.messages,
          subcategories: o.subcategories,
          kinks: o.kinks
            ? o.kinks
            : o.kinds,
          debug,
        });
      },
    );

  if (debug) {
    console.log({
      typedTmp,
      flattened: [].concat(typedTmp.map(
        (o) => o.asList,
      )).flat(),
      flattened2: typedTmp.map(
        (o) => (o.asList),
      ),
    });
  }

  return typedTmp
    .map(
      (o) => (o.asList),
    )
    .flat();
};

/**
 * creates a List containing limits from two profiles
 * @param {string} usernameA - username of user a
 * @param {string} usernameB - username of user b
 * @return {Object[]}
 */
export const getKinksSideBySide = (
  state,
  getters,
  rootState,
  rootGetters,
) => (usernameA, usernameB) => {
  const kinksA = usernameA
    ? getters.getKinksForUser(usernameA)
    : rootGetters['AllKinks/getCurKinks'];
  const kinksB = usernameB
    ? getters.getKinksForUser(usernameB)
    : rootGetters['AllKinks/getCurKinks'];

  if (kinksA.SCHEME_VERSION !== kinksB.SCHEME_VERSION) {
    console.warn({
      msg: 'Incompatible SCHEME_VERSION',
      kinksA,
      kinksB,
    });
    return [];
  }

  const getColorFromPreferenceLevel = (k) => {
    const preferenceLevel = preferenceLevels.find(
      (el) => (el.name === k),
    );
    return preferenceLevel
      ? preferenceLevel.color
      : '';
  };

  const getSortKeyFromPreferenceLevel = (k) => {
    const preferenceLevel = preferenceLevels.find(
      (el) => (el.name === k),
    );
    return preferenceLevel
      ? preferenceLevel.sortKey
      : '';
  };

  /**
   * returns a list of two merged role objects
   * @param {Object[]} a
   * @param {Object[]} b
   * @param {Object[]} d - Default entry
   * @return {Object[]}
   */
  const mergeRole = (a, b, d) => {
    const tmpRole = {
      ...d,
      roleA: a.name,
      preferenceLevelA: a.preference || '',
      sortKeyA: a.sortKey || getSortKeyFromPreferenceLevel(a.preference),
      colorA: a.color || getColorFromPreferenceLevel(a.preference),
      roleB: b.name || a.name,
      preferenceLevelB: b.preference || '',
      sortKeyB: b.color || getSortKeyFromPreferenceLevel(b.preference),
      colorB: b.color || getColorFromPreferenceLevel(b.preference),
    };
    // console.log({tmpRole,a,b});
    return tmpRole;
  };

  /**
   * returns a list of two merged preference objects
   * @param {Object[]} a
   * @param {Object[]} b
   * @param {Object[]} d - Default entry
   * @return {Object[]}
   */
  const mergePreferences = (a, b, d) => (
    (
      (a && a.roles)
        ? a.roles
        : defaultRoles
    )
      .map(
        (role) => mergeRole(
          role,
          (
            (b && b.roles)
              ? b.roles
              : defaultRoles
          )
            .find(
              (el) => (
                role.sideBySide
                  ? (
                    el.name === role.sideBySide
                  )
                  : (
                    el.name === role.name
                  )
              ),
            ) || {},
          {
            ...d,
            commentA: (a && a.comment) ? a.comment : '',
            commentB: (b && b.comment) ? b.comment : '',
          },
        ),
      ).flat()
  );

  /**
   * returns a list of two merged variants
   * @param {Object[]} a
   * @param {Object[]} b
   * @param {Object[]} d - Default entry
   * @return {Object[]}
   */
  const mergeVariant = (a, b, d) => (
    (
      mergePreferences(
        a.preferences,
        b.preferences,
        {
          ...d,
          variant: a.name,
        },
      )
    ).flat()
  );

  /**
   * returns a list of two merged kinds
   * @param {Object[]} a
   * @param {Object[]} b
   * @param {Object[]} d - Default entry
   * @return {Object[]}
   */
  const mergeKind = (a, b, d) => (
    (
      a.variants
        ? a.variants.map(
          (variant) => mergeVariant(
            variant,
            b.variants.find(
              (el) => el.name === variant.name,
            ),
            {
              ...d,
              kink: a.name,
            },
          ),
        )
        : [
          mergePreferences(
            a.preferences,
            b.preferences,
            {
              ...d,
              kink: a.name,
            },
          ),
        ]
    ).flat()
  );

  /**
   * returns a list of two merged subcategories
   * @param {Object[]} a
   * @param {Object[]} b
   * @param {Object[]} d - Default entry
   * @return {Object[]}
   */
  const mergeSubCategory = (a, b, d) => (
    (
      a.kinds
        ? a.kinds.map(
          (kind) => mergeKind(
            kind,
            b.kinds.find(
              (el) => el.name === kind.name,
            ),
            {
              ...d,
              subcategory: a.name,
            },
          ),
        )
        : []
    ).flat()
  );

  /**
   * returns a list of two merged categories
   * @param {Object[]} a
   * @param {Object[]} b
   * @param {Object[]} d - Default entry
   * @return {Object[]}
   */
  const mergeCategory = (a, b, d) => (
    (
      (a.subcategories && b.subcategories)
        ? a.subcategories.map(
          (subcategory) => mergeSubCategory(
            subcategory,
            b.subcategories.find(
              (el) => el.name === subcategory.name,
            ),
            d,
          ),
        ).flat()
        : []
    ).concat(
      a.kinds
        ? a.kinds.map(
          (kind) => mergeKind(
            kind,
            b.kinds.find(
              (el) => el.name === kind.name,
            ),
            {
              ...d,
              category: a.name,
            },
          ),
        )
        : [],
    ).flat()
  );

  /**
   * @const
   * @type {Object} - Default entry for sideBySide list
   */
  const defaultEntry = {
    category: '',
    subcategory: '',
    kink: '',
    variant: '',
    roleA: '',
    preferenceLevelA: '',
    sortKeyA: '',
    colorA: '',
    commentA: '',
    roleB: '',
    preferenceLevelB: '',
    sortKeyB: '',
    colorB: '',
    commentB: '',
  };

  const mergedKinks = kinksA.categories.map(
    (category) => mergeCategory(
      category,
      kinksB.categories.find(
        (el) => el.name === category.name,
      ),
      defaultEntry,
    ),
  ).flat();

  return mergedKinks;
};

// https://stackoverflow.com/questions/30012043/how-to-document-a-function-returned-by-a-function-using-jsdoc
/**
 * Creates a function to check whether a username is valid
 * @return {isUsernameValid~inner}
 */
export const existsUsersname = (_, getters) => (
  /**
   * Check whether a username exists
   * @param {string} username
   * @return {bool}
   */
  (username) => getters.getAvailableUsers.includes(username)
);
