<template>
  <div class="box">
    <!-- Load Menu -->

    <div class="block">
    <div class="field has-addons">

      <ProfileChooser v-model="loadUser" />
      <div class="control">
        <button
          class="button"
          v-on:click="loadKinksForUser(loadUser)"
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
import { useStore } from 'vuex';
import { computed } from 'vue';

import ProfileChooser from '@/components/ProfileChooser.vue';

export default {
  name: 'ProfilesLoadMenu',
  data() {
    return {
      loadUser: "",
    };
  },
  setup() {
    const { t } = useI18n({
    });
    const store = useStore();

    return {
      t,
      getUsers: computed(() => store.getters['AllKinks/getAvailableUsers']),
      loadKinksForUser: (user) => store.dispatch('AllKinks/loadKinksForUser', {
        username:
        user,
      }),
    };
  },
  methods: {

    canLoadKinks(user) {
      const users = this.getUsers;
      return !(users.includes(user));
    },

  },
  components: {
    ProfileChooser,
  },

};

</script>
