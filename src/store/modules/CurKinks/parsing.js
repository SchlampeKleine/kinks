const transformTranslations = (prefix, translations, debug = false) => (
  // https://stackoverflow.com/questions/62402443/map-on-javascript-object-get-the-object-keys
  Object.fromEntries(
    Object
      .entries(translations)
      .map(
        ([key, value]) => [`${prefix}-${key}`, value],
      ),
  )
);

const transformMessages = (prefix, messages, debug = false) => (
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

const parseRole = (prefix, o, p, debug = false) => {
  const h = {
    ...p,
    role: o.name,
    preferenceLevel: o.preference || '',
    sortKey: o.sortKey || getSortKeyFromPreferenceLevel(o.preference),
    color: o.color || getColorFromPreferenceLevel(o.preference),
  };
  return h;
};

const parsePreferences = (prefix, o = {}, p, debug = false) => {
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

const parseVariant = (prefix, o, p, debug = false) => {
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

const parseSubCategory = (prefix, o, p, debug = false) => {
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

function parseCategory(o, debug = false) {
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
}

export default {
  transformTranslations,
  transformMessages,
  parseRole,
  parsePreferences,
  parseVariant,
  parseKink,
  parseSubCategory,
  parseCategory,
  defaultEntry,
  getColorFromPreferenceLevel,
  getSortKeyFromPreferenceLevel,
};
