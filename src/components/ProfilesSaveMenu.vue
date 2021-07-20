<template>
  <div class="box">
    <!-- Save Menu -->
    <div
      class="field has-addons"
      >
      <label class="label">
        Name
      </label>
      <div class="control">
        <input
          placeholder="Name"
          v-model="localUser"
          @update="localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))"
          type="text"
          class="input is-expanded"
          />
        <p class="help">
        {{ t('help_field_localUser') }}
        </p>
      </div>
      <div class="control">
        <button
          class="button"
          v-on:click="saveKinksForUser(user,curKinks)"
          :disabled="!canSaveKinks(user)"
          >
          {{ t('button_save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>

de:
  help_field_localUser: >
    Ein Name oder eine Rolle,
    um diese Praeferenzen
    auf dem lokalen Rechner
    oder beim Teilen zuordnen zukoennen
  button_save: "Kinks speichern"
en:
  help_field_localUser: >
    A name or role to identify
    these preferences
    on the local computer
    or when sharing them
  button_save: "Save my kinks"

</i18n>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'ProfilesSaveMenu',

  setup() {
    const { t } = useI18n({
    });

    const store = useStore();

    return {
      t,
      saveKinksForUser: (username, kinks) => store.dispatch('AllKinks/saveKinksForUser',
        { username, kinks }),
      updateCurrentUsername: (newVal) => store.dispatch('User/updateCurrentUsername', newVal),
      user: computed(() => store.state.User.currentUsername),
      curKinks: computed(() => store.state.CurKinks.curKinks),
    };
  },

  methods: {

    canSaveKinks(user) {
      if (user && user.length > 0) {
        return true;
      }
      return false;
    },
  },

  computed: {

    localUser: {
      get() {
        return this.user;
      },
      set(newVal) {
        this.updateCurrentUsername(newVal);
      },
    },

  },

};
</script>
