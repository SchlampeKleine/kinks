/* eslint-disable import/prefer-default-export */

/*
 * @TODO add Preferences and roles
 */
import Role from './classes/Role';
// import Preferences from './classes/Preferences';
import Profile from './classes/Profile';
import Variant from './classes/Variant';
import Kink from './classes/Kink';
import Subcategory from './classes/Subcategory';
import Category from './classes/Category';

import './classes';

// Helpers

const getIdProfile = (state, { username }) => {
  const idProfile = state.userKinks.findIndex(
    (el) => (el.username === username),
  );

  if (!(idProfile > -1)) {
    throw new Error('did not find user');
  }
  return idProfile;
};

const getIdCategory = (state, {
  idProfile,
  categoryName,
}) => {
  const idCategory = state.userKinks[idProfile]
    .kinks
    .categories
    .map(
      (el) => new Category(el),
    )
    .findIndex(
      (el) => (
        el.name === categoryName
        || el.category === categoryName
      ),
    );
  if (!(idCategory > -1)) {
    throw new Error('did not find category');
  }
  return idCategory;
};

const getIdSubCategory = (state, {
  idProfile,
  idCategory,
  subcategoryName,
}) => {
  const idSubCategory = state.userKinks[idProfile]
    .kinks
    .categories[idCategory]
    .subcategories
    .map(
      (o) => new Subcategory(o),
    )
    .findIndex(
      (el) => (
        el.name === subcategoryName
        || el.subcategory === subcategoryName
      ),
    );
  if (!(idSubCategory > -1)) {
    throw new Error('did not find subcategory');
  }
  return idSubCategory;
};

const getIdKink = (state, {
  idProfile,
  idCategory,
  idSubCategory,
  kinkName,
}) => {
  if (!kinkName) {
    throw new Error('can not find kink without name');
  }
  if (idSubCategory) {
    const idKink = state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .subcategories[idSubCategory]
      .kinks
      .findIndex(
        (el) => (el.name === kinkName),
      );
    if (!(idKink > -1)) {
      throw new Error('did not find kink');
    }
    return idKink;
  }

  const idKink = state.userKinks[idProfile]
    .kinks
    .categories[idCategory]
    .kinks
    .findIndex(
      (el) => (
        el.name === kinkName
        || el.kink === kinkName
      ),
    );
  if (!(idKink > -1)) {
    throw new Error(JSON.stringify({
      msg: 'did not find kink',
      idProfile,
      idCategory,
      idSubCategory,
      kinkName,
    }));
  }
  return idKink;
};

const getIdVariant = (state, {
  idProfile,
  idCategory,
  idSubCategory,
  idKink,
  variantName,
}) => {
  if (!variantName) {
    throw new Error('can not find variant without name');
  }
  const idVariant = idSubCategory
    ? state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .subcategories[idSubCategory]
      .kinks[idKink]
      .variants
      .map(
        (el) => (el instanceof Variant ? el : new Variant(el)),
      )
      .findIndex(
        (el) => (
          el.name === variantName
          || el.variant === variantName
        ),
      )
    : state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .kinks[idKink]
      .variants
      .map(
        (el) => (el instanceof Variant ? el : new Variant(el)),
      )
      .findIndex(
        (el) => (el.name === variantName || el.variant === variantName),
      );
  if (!(idVariant > -1)) {
    throw new Error(JSON.stringify({
      msg: 'did not find variant',
      idProfile,
      idCategory,
      idSubCategory,
      idKink,
      variantName,
    }));
  }
  return idVariant;
};

const getIdRole = (state, {
  idProfile,
  idCategory,
  idSubCategory,
  idKink,
  idVariant,
  roleName,
}) => {
  if (!roleName) {
    throw new Error('can not find role without name');
  }
  if (idVariant) {
    const idRole = idSubCategory
      ? state.userKinks[idProfile]
        .kinks
        .categories[idCategory]
        .subcategories[idSubCategory]
        .kinks[idKink]
        .variants[idVariant]
        .preferences
        .roles
        .map(
          (el) => (el instanceof Role ? el : new Role(el)),
        )
        .findIndex(
          (el) => (
            el.name === roleName
          || el.role === roleName
          ),
        )
      : state.userKinks[idProfile]
        .kinks
        .categories[idCategory]
        .kinks[idKink]
        .variants[idVariant]
        .preferences
        .roles
        .map(
          (el) => (el instanceof Role ? el : new Role(el)),
        )
        .findIndex(
          (el) => (el.name === roleName || el.role === roleName),
        );
    if (!(idRole > -1)) {
      throw new Error(JSON.stringify({
        msg: 'did not find role',
        idProfile,
        idCategory,
        idSubCategory,
        idKink,
        idRole,
        roleName,
      }));
    }
    return idRole;
  }

  const idRole = idSubCategory
    ? state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .subcategories[idSubCategory]
      .kinks[idKink]
      .preferences
      .roles
      .map(
        (el) => (el instanceof Role ? el : new Role(el)),
      )
      .findIndex(
        (el) => (
          el.name === roleName
          || el.role === roleName
        ),
      )
    : state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .kinks[idKink]
      .preferences
      .roles
      .map(
        (el) => (el instanceof Role ? el : new Role(el)),
      )
      .findIndex(
        (el) => (el.name === roleName || el.role === roleName),
      );
  if (!(idRole > -1)) {
    throw new Error(JSON.stringify({
      msg: 'did not find role',
      idProfile,
      idCategory,
      idSubCategory,
      idKink,
      idRole,
      roleName,
    }));
  }
  return idRole;
};

/**
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.categoryName
 * @param {string} params.subcategoryName
 * @param {string} params.kinkName
 * @param {string} params.variantName
 * @param {string} params.roleName
 * @param {Role} params.role
 */
export const updateRoleForUser = (state, {
  username,
  categoryName,
  subcategoryName,
  kinkName,
  variantName,
  roleName,
  role,
}) => {
  const idProfile = getIdProfile(state, {
    username,
  });
  const idCategory = getIdCategory(state, {
    idProfile,
    categoryName,
  });

  if (subcategoryName) {
    const idSubCategory = getIdSubCategory(state, {
      idProfile,
      idCategory,
      subcategoryName,
    });

    const idKink = getIdKink(state, {
      idProfile,
      idCategory,
      idSubCategory,
      kinkName,
    });

    if (variantName) {
      const idVariant = getIdVariant(state, {
        idProfile,
        idCategory,
        idSubCategory,
        idKink,
        variantName,
      });
      const idRole = getIdRole(state, {
        idProfile,
        idCategory,
        idSubCategory,
        idKink,
        idVariant,
        roleName,
      });

      state.userKinks[idProfile]
        .kinks
        .categories[idCategory]
        .subcategories[idSubCategory]
        .kinks[idKink]
        .variants[idVariant]
        .preferences
        .roles[idRole] = new Role(role);
    } else {
      const idRole = getIdRole(state, {
        idProfile,
        idCategory,
        idSubCategory,
        idKink,
        roleName,
      });

      state.userKinks[idProfile]
        .kinks
        .categories[idCategory]
        .subcategories[idSubCategory]
        .kinks[idKink]
        .preferences
        .roles[idRole] = new Role(role);
    }
  } else {
    const idKink = getIdKink(state, {
      idProfile,
      idCategory,
      kinkName,
    });

    if (variantName) {
      const idVariant = getIdVariant(state, {
        idProfile,
        idCategory,
        idKink,
        variantName,
      });
      const idRole = getIdRole(state, {
        idProfile,
        idCategory,
        idKink,
        idVariant,
        roleName,
      });

      state.userKinks[idProfile]
        .kinks
        .categories[idCategory]
        .kinks[idKink]
        .variants[idVariant]
        .preferences
        .roles[idRole] = new Role(role);
    } else {
      const idRole = getIdRole(state, {
        idProfile,
        idCategory,
        idKink,
        roleName,
      });

      state.userKinks[idProfile]
        .kinks
        .categories[idCategory]
        .kinks[idKink]
        .preferences
        .roles[idRole] = new Role(role);
    }
  }
  state.userKinks[idProfile].lastUpdated = new Date();
};

export const updateUserKinks = (state, { userKinks }) => {
  state.userKinks = [userKinks.map(
    (el) => new Profile(el),
  )];
};

export const updateUserKinkFormat = (state) => {
  state.userKinks = [
    ...state.userKinks.map(
      (el) => (el instanceof Profile ? el : new Profile(el)),
    ),
  ];
};

/**
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.categoryName
 * @param {string} params.subcategoryName
 * @param {string} params.kinkName
 * @param {string} params.variantName
 * @param {Variant} params.variant
 */
export const updateVariantForUser = (state, {
  username,
  categoryName,
  subcategoryName,
  kinkName,
  variantName,
  variant,
}) => {
  const idProfile = getIdProfile(state, {
    username,
  });
  const idCategory = getIdCategory(state, {
    idProfile,
    categoryName,
  });

  if (subcategoryName) {
    const idSubCategory = getIdSubCategory(state, {
      idProfile,
      idCategory,
      subcategoryName,
    });

    const idKink = getIdKink(state, {
      idProfile,
      idCategory,
      idSubCategory,
      kinkName,
    });

    const idVariant = getIdVariant(state, {
      idProfile,
      idCategory,
      idSubCategory,
      idKink,
      variantName,
    });

    state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .subcategories[idSubCategory]
      .kinks[idKink]
      .variants[idVariant] = new Variant(variant);
  } else {
    const idKink = getIdKink(state, {
      idProfile,
      idCategory,
      kinkName,
    });

    const idVariant = getIdVariant(state, {
      idProfile,
      idCategory,
      idKink,
      variantName,
    });

    state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .kinks[idKink]
      .variants[idVariant] = new Variant(variant);
  }
  state.userKinks[idProfile].lastUpdated = new Date();
};

/**
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.categoryName
 * @param {string} params.subcategoryName
 * @param {string} params.kinkName
 * @param {Kink} params.kink
 */
export const updateKinkForUser = (state, {
  username,
  categoryName,
  subcategoryName,
  kinkName,
  kink,
}) => {
  const idProfile = getIdProfile(state, {
    username,
  });

  const idCategory = getIdCategory(state, {
    idProfile,
    categoryName,
  });

  if (subcategoryName) {
    const idSubCategory = getIdSubCategory(state, {
      idProfile,
      idCategory,
      subcategoryName,
    });

    const idKink = getIdKink(state, {
      idProfile,
      idCategory,
      idSubCategory,
      kinkName,
    });

    state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .subcategories[idSubCategory]
      .kinks[idKink] = new Kink(kink);
  } else {
    const idKink = getIdKink(state, {
      idProfile,
      idCategory,
      kinkName,
    });

    state.userKinks[idProfile]
      .kinks
      .categories[idCategory]
      .kinks[idKink] = new Kink(kink);
  }

  state.userKinks[idProfile].lastUpdated = new Date();
};

/**
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.categoryName
 * @param {string} params.subcategoryName
 * @param {Category} params.subcategory
 */
export const updateSubCategoryForUser = (state, {
  username,
  categoryName,
  subcategoryName,
  subcategory,
}) => {
  const idProfile = getIdProfile(state, {
    username,
  });

  const idCategory = getIdCategory(state, {
    idProfile,
    categoryName,
  });

  const idSubCategory = getIdSubCategory(state, {
    idProfile,
    idCategory,
    subcategoryName,
  });

  state.userKinks[idProfile]
    .kinks
    .categories[idCategory]
    .subcategories[idSubCategory] = new Subcategory(subcategory);
  state.userKinks[idProfile].lastUpdated = new Date();
};

/**
 * @param {Object} params
 * @param {string} params.username
 * @param {string} params.categoryName
 * @param {Category} params.category
 */

export const updateCategoryForUser = (state, {
  username,
  categoryName,
  category,
}) => {
  const idProfile = getIdProfile(state, {
    username,
  });

  const idCategory = getIdCategory(state, {
    idProfile,
    categoryName,
  });

  state.userKinks[idProfile]
    .kinks
    .categories[idCategory] = new Category(category);
  state.userKinks[idProfile].lastUpdated = new Date();
};

/**
 * @param {Object} params
 * @param {string} params.username
 * @param {Object[]} params.kinks
 */
export const updateKinksForUser = (state, {
  username,
  kinks,
}) => {
  const idProfile = getIdProfile(state, {
    username,
  });

  state.userKinks[idProfile].kinks = { ...kinks };
  state.userKinks[idProfile].lastUpdated = new Date();
};
