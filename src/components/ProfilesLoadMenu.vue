<template>
  <div class="box">
    <!-- Load Menu -->

    <div class="block">
    <div class="field has-addons">

      <div class="control">
        <div class="select">
          <select v-model="loadUser">
            <option disabled value="">
            {{ t('loadUser_choice') }}
            </option>
            <option
              v-for="user in getUsers"
              :key="user"
              >
              {{ user }}
            </option>
          </select>
          <div class="help">
            {{ t('help_field_loadUser') }}
          </div>
        </div>
      </div>
      <div class="control">
        <button
          class="button"
          v-on:click="loadMyKinks(loadUser)"
          :disabled="canLoadKinks(loadUser)"
          >
          {{ t('button_load') }}
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>
de:
  loadUser_choice: >
    Bitte waehle den Nutzer aus,
    dessen Praeferenzen du laden moechtest.
  help_field_loadUser: Kennzeichnug der Praeferenzen, die geladen werden sollen
  button_load: "Kinks laden"
en:
  loadUser_choice: >
    Please select the user
    to load the preferences for
  help_field_loadUser: Identifier of the saved preferences to load
  button_load: "Load my kinks"

</i18n>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'ProfilesLoadMenu',
  data() {
    return {
      loadUser: null,
    };
  },
  props: {

    defaultKinks: {
      type: Object,
      required: true,
    },

    allKinks: {
      type: Object,
      required: true,
    },

  },
  setup() {
    const { t } = useI18n({
    });
    return {
      t,
    };
  },
  methods: {

    canLoadKinks(user) {
      const users = this.getUsers();
      return !(users.includes(user));
    },

    loadMyKinks(user) {
      this.localMyKinks = this.getKinksForUser(user);
    },

    getKinksForUser(user) {
      let localUser = user;
      if (user === '') localUser = 'default';
      const kinks = this.allKinks[localUser];
      if (kinks) {
        if (this.debug) {
          console.log({ 'UserOptions: Found kinks for user': kinks });
        }
        return kinks;
      }
      if (this.debug) {
        console.log({ 'UserOptions: Return defaultKinks': this.defaultKinks });
      }
      return this.defaultKinks;
    },

    getUsers() {
      if (this.allKinks) {
        const users = Object.keys(this.allKinks);
        return users;
      }
      return [];
    },

  },

};

</script>
