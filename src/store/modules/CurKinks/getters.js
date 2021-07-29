/* eslint-disable import/prefer-default-export */
import defaultKinks from '@/assets/kinks.yaml';

import yaml from 'js-yaml';

import { preferenceLevels } from '@/assets/levels.yaml';

/**
 * get the currently active kinks
 * @deprecated This will be replaced by a 'CURRENT' entry in the global kinks object
 * @return {Object}
 */
export const getCurKinks = (state, _, __, rootGetters) => {
  console.warn('getCurKinks will be deprecated');

  if (state.curKinks && !state.imported) {
    console.warn('curKinks have not been imported yet!');
    return state.curKinks;
  } else {
    console.warn('curKinks have been imported. Please use "AllKinks/getCurKinks"');
    return rootGetters['AllKinks/getKinksForUserOrDefault']('CURRENT');
  }
};

/**
 * @return {bool} - import state
 */
export const getImportStatus = (state) => (
  state.imported
  ? true
  : false
);

export const getCurKinksAsYAML = (_, getters) => yaml.dump(
  { categories: getters.getCurKinks.categories },
);

export const getCurKinksAsURI = (state, getters) => encodeURI(getters.getCurKinksAsYAML);

export const getCurKinksAsList = (state, getters) => {
  const debug = false;
  const curKinkCategories = getters.getCurKinks.categories;

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

export const getCurKinksAsCSV = (_, getters) => {
  const curKinks = getters.getCurKinksAsList;

  const sortKeys = (a, b) => (a[0] > b[0]);

  const header = Object.entries(
    curKinks[0],
  )
    .sort(
      sortKeys,
    )
    .map(
      ([key, value]) => (`'${key}'`),
    )
    .join(',');

  return [header].concat(
    curKinks.map(
      (o) => (
        Object.entries(o)
          .sort(
            sortKeys,
          )
          .map(
            ([key, value]) => (`'${value}'`),
          )
          .join(',')
      ),
    ),
  )
    .join('\n');
};
