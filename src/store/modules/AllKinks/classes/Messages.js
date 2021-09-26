// Hints on destructuring params from https://skovy.dev/named-parameters-in-javascript/
/**
 * Creates a messages dictionary
 * @class
 */
export default class Messages {
  messages;

  debug = false;

  /**
   * @constructs Messages
   * @parameters {Object} messages
   */
  constructor(
    messages,
    prefix,
    seperator,
  ) {
    if (!messages) {
      throw new Error('trying to creates empty messages');
    }
    if (prefix) {
      this.messages = this.prefixMessages({
        messages: { ...messages },
        prefix,
        seperator,
      });
    } else {
      this.messages = { ...messages };
    }
  }

  // Method
  /**
   * Patch a messages dict
   * @param {Object} p - Object to use as patch
   */
  patch = (p) => {
    if (!p) {
      throw new Error('patch called without patch object');
    } else if (this.debug) {
      console.log({
        msg: 'patching',
        cur: { ...this },
        patch: p,
      });
    }
  }

  /**
   * Prefix translations with a given string + '-' as a seperator
   * @static
   * @param {Object} params
   * @param {string} params.prefix
   * @param {Object[]} params.translations
   * @param {string} params.seperator
   */
  static prefixTranslations({
    prefix,
    translations,
    seperator = '-',
  }) {
    // https://stackoverflow.com/questions/62402443/map-on-javascript-object-get-the-object-keys
    return Object.fromEntries(
      Object
        .entries(translations)
        .map(
          ([key, value]) => [`${prefix}${seperator}${key}`, value],
        ),
    );
  }

  /**
   * prefixMessages
   * @static
   * @param {Object} params
   * @param {string} params.prefix
   * @param {Object[]} params.translations
   * @param {string} params.seperator
   * @return {Object}
   */
  static prefixMessages({
    prefix,
    messages,
    seperator = '-',
  }) {
    // https://stackoverflow.com/questions/62402443/map-on-javascript-object-get-the-object-keys
    return Object.fromEntries(
      Object
        .entries(messages)
        .map(
          ([key, translations]) => [
            key,
            this.prefixTranslations({
              prefix,
              translations,
              seperator,
            }),
          ],
        ),
    );
  }
}
