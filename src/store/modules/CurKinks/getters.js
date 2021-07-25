/* eslint-disable import/prefer-default-export */
import defaultKinks from '@/assets/kinks.yaml';

import yaml from 'js-yaml';

export const getCurKinks = (state) => (Object.keys(state.curKinks) === 0
  ? defaultKinks
  : state.curKinks);

export const getCurKinksAsYAML = (getters) => yaml.dump(
  { categories: getters.getCurKinks.categories },
);

export const getCurKinksAsURI = (state, getters) => encodeURI(getters.getCurKinksAsYAML);

export const getCurKinksAsList = (state, getters) => {
  const debug = true;
  const curKinks = getters.getCurKinks.categories;

  if (debug) {
    console.log({ getCurKinksAsList: curKinks });
  }

  const parseVariant = (prefix, o, p) => {
    const h = {
      category: p.category,
      subcategory: p.subcategory
        ? p.subcategory
        : '',
      kink: p.kink,
      variant: o.name,
    };

    return h;
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
      : [h];
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

  const tmp = curKinks
    .map(
      (o) => {
        const tmpCategory = parseCategory(o);
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
