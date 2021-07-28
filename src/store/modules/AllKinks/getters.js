/* eslint-disable import/prefer-default-export */

import defaultKinks from '@/assets/kinks.yaml';
import { preferenceLevels } from '@/assets/levels.yaml';

import { defaultRoles } from '@/assets/roles.yaml';

export const getKinksForUser = (state, getters) => (username) => (
  (
    state.userKinks.filter(
      (el) => (el.username === username),
    )[0] || getters.getDefaultUser
  ).kinks
);

export const getDefaultUser = (state) => state.userKinks.filter(
  (el) => el.username === 'default',
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

export const getKinksAsListForUser = (state, getters) => (username) => {
  const debug = false;
  const curKinkCategories = getters.getKinksForUser(username).categories;

  if (debug) {
    console.log({ getCurKinksAsList: curKinkCategories });
  }

  const transformTranslations = (prefix, translations) => (
    // https://stackoverflow.com/questions/62402443/map-on-javascript-object-get-the-object-keys
    Object.fromEntries(
      Object
        .entries(translations)
        .map(
          ([key, value]) => [`${prefix}-${key}`, value],
        ),
    )
  );

  const transformMessages = (prefix, messages) => (
    // https://stackoverflow.com/questions/62402443/map-on-javascript-object-get-the-object-keys
    Object.fromEntries(
      Object
        .entries(messages)
        .map(
          ([key, translations]) => [
            key,
            transformTranslations(
              prefix,
              translations,
            ),
          ],
        ),
    )
  );

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

  const parseRole = (prefix, o, p) => {
    const h = {
      ...p,
      role: o.name,
      preferenceLevel: o.preference || '',
      sortKey: o.sortKey || getSortKeyFromPreferenceLevel(o.preference),
      color: o.color || getColorFromPreferenceLevel(o.preference),
    };
    return h;
  };

  const parsePreferences = (prefix, o = {}, p) => {
    const h = {
      ...p,
      comment: o.comment || '',
    };
    return o.roles
      ? o.roles
        .map(
          (r) => parseRole(
            prefix,
            r,
            h,
          ),
        )
        .flat()
      : [h].flat();
  };

  const parseVariant = (prefix, o, p) => {
    const h = {
      ...p,
      variant: o.name,
    };

    return o.preferences
      ? parsePreferences(
        o.name,
        o.preferences,
        h,
      )
        .flat()
      : [h];
  };

  const parseKink = (prefix, o, p) => {
    const h = {
      ...p,
      kink: o.name,
    };
    return o.variants
      ? o.variants
        .map(
          (v) => parseVariant(
            o.name,
            v,
            h,
          ),
        ).flat()
      : [
        parsePreferences(
          o.name,
          o.preferences,
          h,
        ),
      ];
  };

  const parseSubCategory = (prefix, o, p) => {
    const h = {
      ...p,
      subcategory: o.name,
    };
    return o.kinds
      .map(
        (k) => parseKink(
          o.name,
          k,
          h,
        ),
      ).flat();
  };

  const defaultEntry = {
    category: '',
    subcategory: '',
    kink: '',
    variant: '',
    role: '',
    preferenceLevel: '',
    sortKey: '',
    color: '',
  };

  const parseCategory = (o) => {
    const h = {
      ...defaultEntry,
      category: o.name,
    };

    return (
      o.subcategories
        ? o
          .subcategories
          .map(
            (s) => {
              const tmp = parseSubCategory(o.name, s, h);
              if (debug) {
                console.log(tmp);
              }
              return tmp;
            },
          )
          .flat()
        : []
    ).concat(
      o.kinds
        ? o.kinds
          .map(
            (k) => parseKink(
              o.name,
              k,
              h,
            ),
          ).flat()
        : [],
    );
  };

  const tmp = curKinkCategories
    .map(
      (o) => {
        const tmpCategory = parseCategory(o).flat();
        if (debug) {
          console.log(tmpCategory);
        }
        return tmpCategory;
      },
    )
    .flat();

  console.log({ 'getCurKinksAsList tmp': tmp });
  return tmp;
};

/**
 * creates a List containing limits from two profiles
 * @param {string} usernameA - username of user a
 * @param {string} usernameB - username of user b
 * @return {Object[]}
 */
export const getKinksSideBySide = (state, getters) => (usernameA, usernameB) => {
  if (usernameA === '' || usernameB === '') {
    return [];
  }

  const kinksA = getters.getKinksForUser(usernameA);
  const kinksB = getters.getKinksForUser(usernameB);

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
  const mergeRole = (a, b, d) => (
    {
      ...d,
      roleA: a.name,
      preferenceLevelA: a.preference,
      sortKeyA: getSortKeyFromPreferenceLevel(a.preference),
      colorA: getColorFromPreferenceLevel(a.preference),
      roleB: b.name,
      preferenceLevelB: b.preference,
      sortKeyB: getSortKeyFromPreferenceLevel(b.preference),
      colorB: getColorFromPreferenceLevel(b.preference),
    }
  );

  /**
   * returns a list of two merged preference objects
   * @param {Object[]} a
   * @param {Object[]} b
   * @param {Object[]} d - Default entry
   * @return {Object[]}
   */
  const mergePreferences = (a, b, d) => (
    (
      a.roles
      ? a.roles
      : defaultRoles
    )
    .map(
      (role)=> mergeRole(
        role,
        (
          b.roles
          ? b.roles
          : defaultRoles
        )
        .find(
          (el) => (
            role.sideBySide
            ? el.name === role.sideBySide
            : el.name === role.name
          )
        ),
        {
          ...d,
          commentA: a.comment,
          commentB: b.comment,
        }
      )
    )
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
      [mergePreferences(
        a,
        b,
          {
            ...d,
            variant: a.name,
          }
        )
      ]
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
            (el) => el.name === variant.name
          ),
          {
            ...d,
            kink: a.name,
          }
        )
      )
      : [mergePreferences(a, b, {...d, kink: a.name, })]
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
            (el) => el.name === kind.name
          ),
          { ...d,
            subcategory: a.name,
          }
        )
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
    a.subcategories
    ? a.subcategories.map(
      (subcategory) => mergeSubCategory(
        subcategory,
        b.subcategories.find(
          (el) => el.name === subcategory.name
        ),
        d
      )
    ).flat()
    : []
    ).concat(
      a.kinds
      ? a.kinds.map(
        (kind) => mergeKind(
          kind,
          b.kinds.find(
            (el) => el.name === kind.name
          ),
          {
            ...d,
            category: a.name,
          }
        )
      )
      : []
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

  const mergedKinks =
    kinksA.categories.map(
      (category) => mergeCategory(
        category,
        kinksB.categories.find(
          (el) => el.name === category.name
        ),
        defaultEntry
      )
    ).flat();

  return mergedKinks;

};
