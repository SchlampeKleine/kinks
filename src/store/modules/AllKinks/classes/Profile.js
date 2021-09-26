import Category from './Category';

export default class Profile {
  username;

  lastUpdated;

  kinks = {
    SCHEME_VERSION: '',
    categories: [],
  };

  constructor({
    username,
    kinks,
  }) {
    this.username = username;
    if (!kinks) {
      throw new Error('no kinks');
    }
    if (!kinks.categories) {
      throw new Error(JSON.stringify({
        msg: 'no categories',
        kinks,
        username,
      }));
    }
    this.kinks.SCHEME_VERSION = kinks.SCHEME_VERSION;
    this.kinks.categories = kinks.categories
      .map(
        (el) => (new Category(el)),
      );
    this.lastUpdated = new Date();
  }
}
