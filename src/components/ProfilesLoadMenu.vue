<template>
  <div class="box">
    <!-- Load Menu -->

    <div class="block">
    <div class="field has-addons">

      <ProfileChooser v-model="selectedProfile">
      <template
          v-if="alreadyLoaded"
          v-slot:help
          >
          <div class="help">
            {{ t('warn_already_loaded') }}
          </div>
      </template>
      </ProfileChooser>
      <div class="control">
        <button
          class="button"
          v-on:click="loadKinksForUser(selectedProfile
          )"
          :disabled="!canLoadProfile(
                      selectedProfile
          )"
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
  warn_already_loaded: >
    Dieses Profil ist bereits geladen
  loadUser_choice: >
    Bitte waehle den Nutzer aus,
    dessen Praeferenzen du laden moechtest.
  help_field_loadUser: Kennzeichnug der Praeferenzen, die geladen werden sollen
  button_load: "Kinks laden"
en:
  warn_already_loaded: >
    This profile is already loaded
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
      selectedProfile: 'CURRENT',
    };
  },
  setup() {
    const { t } = useI18n({
    });
    const store = useStore();

    return {
      t,
      curKinks: computed(
        () => store.getters['AllKinks/getCurKinks']
        ),
      existsUsersname: store.getters['AllKinks/existsUsersname'],
      getKinksForUser: store.getters['AllKinks/getKinksForUser'],
      loadKinksForUser: (user) => store.dispatch('AllKinks/loadKinksForUser', {
        username: user,
      }),
    };
  },
  methods: {

    canLoadProfile(profile) {
      return (
        this.existsUsersname(profile)
        &&
        !this.alreadyLoaded
      );
    },

  },
  components: {
    ProfileChooser,
  },
  computed: {

    userKinks() {
      return this.getKinksForUser(this.selectedProfile);
    },

    stringifiedUserProfile() {
      return JSON.stringify(this.userKinks);
    },

    stringifiedCurrent() {
      return JSON.stringify(this.curKinks);
    },

    /**
     * Is the CURRENT profile the same as the selected profile
     * @return {bool}
     */
    alreadyLoaded(){
      return (
        this.stringifiedUserProfile
        ===
        this.stringifiedCurrent
      );
    },
  },

};

</script>
