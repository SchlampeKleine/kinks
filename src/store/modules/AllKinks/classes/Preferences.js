import { defaultRoles } from '@/assets/roles.yaml';
import Role from './Role';

/**
 * Creates a new preferences óbject
 * @class
 */
export default class Preferences {
  comment='';

  roles = [...defaultRoles.map(
    (o) => new Role(o),
  )];

  /* messages = {
    en:{},
  }; */

  debug = false;

  /**
   * @constructs preferences
   * @param {Object} param
   * @param {string} param.comment
   * @param {role[]} param.roles
   * @param {Object} param.messages
   */
  constructor({
    comment = '',
    roles = defaultRoles,
  }) {
    if (this.debug) {
      console.log({
        comment,
        roles,
        cur: { ...this },
        defaultRoles,
      });
    }
    if (comment) {
      this.comment = comment;
    }
    if (roles) {
      this.roles = roles
        .map(
          (o) => new Role({
            preference: o.preference,
            role: o.name
              ? o.name
              : o.role,
            messages: o.messages,
          }),
        );
    }
    // this.messages = messages;
    // console.log({ comment, roles, messages, });
  }

  // Getter

  /**
   * @return {Object[]}
   */
  get asList() {
    return this.roles
      .map(
        (o) => new Role(o)
      )
      .map(
        (o) => ({
          ...o.asListObject,
          comment: this.comment,
        }),
      )
    .flat();
  }

  // Method
  /**
   * Patch a preference object
   * @param {Object} p - Object to use as patch
   */
  patch = (p) => {
    if (!p) {
      console.warn('patch called without patch object');
    } else {
      if (!p.roles) {
        console.warn('patch has no roles');
      }
      if (this.debug) {
        console.log({
          msg: 'patching',
          cur: { ...this },
          patch: p,
        });
      }
      if (p.replacePreferences) {
        this.roles = p.roles
          .map(
            (o) => new Role({
              role: o.name || o.role,
              messages: o.messages,
            }),
          );
      } else {
        this.roles
          .map(
            (o) => o.patch(
              p.roles.find(
                (el) => (
                  el.name === o.role
                  || el.replaces === o.role
                ),
              ),
            ),
          );
      }
      // special handling for user provided values
      this.comment = this.comment.length > 0
        ? this.comment
        : p.comment;
    }
  };

  /**
   * update
   * @param {Preferences} preferences
   */
  update(preferences) {
    if (preferences.roles) {
      this.roles = this.roles
        .map(
          (o) => o.update(
            preferences.roles
              .find(
                (el) => el.name === o.name,
              ),
          ),
        );
    }

    if (preferences.comment) {
      this.comment = preferences.comment;
    }
  }
}


export const defaultPreferences = new Preferences({
  roles: defaultRoles,
  comment: '',
})
