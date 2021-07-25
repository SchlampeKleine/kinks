/* eslint-disable import/prefer-default-export */
import defaultKinks from '@/assets/kinks.yaml';

import yaml from 'js-yaml';

export const getCurKinks = (state) => (Object.keys(state.curKinks) === 0
  ? defaultKinks
  : state.curKinks);

export const getCurKinksAsYAML = ( _, getters) => yaml.dump(
  { categories: getters.getCurKinks.categories },
);

export const getCurKinksAsURI = (state, getters) => encodeURI(getters.getCurKinksAsYAML);

export const getCurKinksAsList = (state, getters) => {
  const debug = false;
  const curKinkCategories = getters.getCurKinks.categories;

  if (debug) {
    console.log({ getCurKinksAsList: curKinkCategories });
  }

  const transformTranslations = (prefix, o) => (
    // https://stackoverflow.com/questions/62402443/map-on-javascript-object-get-the-object-keys
    Object.fromEntries(
      Object
        .entries(o)
        .map(
          ([key, value]) => [`${prefix}-${key}`, value],
        ),
    )
  );

  const transformMessages = (prefix, o) => (
    // https://stackoverflow.com/questions/62402443/map-on-javascript-object-get-the-object-keys
    Object.fromEntries(
      Object
        .entries(o)
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

  const parseRole = (prefix, o, p) => {
    const h = {
      ...p,
      role: o.name,
      preferenceLevel: o.preference || '',
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
      category: p.category,
      subcategory: p.subcategory
        ? p.subcategory
        : '',
      kink: p.kink,
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
      category: p.category,
      subcategory: p.subcategory
        ? p.subcategory
        : '',
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
      category: p.category,
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

  const parseCategory = (o) => {
    const h = {
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
