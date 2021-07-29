<template>
  <div class="box">
    <!-- Patch Menu -->

    <div class="field has-addons">
      <ProfileChooser v-model="selectedProfile" />
      <div class="control">
        <button
          class="button"
          v-on:click="patchProfileForUser(selectedProfile)"
          :disabled="canPatchProfile(selectedProfile)"
          >
          {{ t('button_patch') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>

de:
  button_patch: "Kink-Schema aktualisieren"
en:
  button_patch: "Update kink-scheme"

</i18n>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from 'vue';

import ProfileChooser from '@/components/ProfileChooser.vue';

export default {
  name: 'ProfilesPatchMenu',
  data() {
    return {
      selectedProfile: "",
    };
  },
  setup() {
    const { t } = useI18n({
    });
    const store = useStore();

    return {
      t,
      getUsers: computed(() => store.getters['AllKinks/getAvailableUsers']),
      patchProfileForUser: (username) => store.dispatch(
        'AllKinks/patchProfileForUser',
        {username}
      ),
    };
  },

  methods: {

    canPatchProfile(user) {
      const users = this.getUsers;
      return !(users.includes(user));
    },

  },
  components: {
    ProfileChooser,
  },
};
</script>
