<template>
  <div class="box">
    <!-- Reset Menu -->

    <div class="field has-addons">
      <ProfileChooser v-model="selectedProfile" />
      <div class="control">
        <button
          class="button"
          v-on:click="resetProfileForUser(selectedProfile)"
          :disabled="canResetProfile(selectedProfile)"
          >
          {{ t('button_reset') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>

de:
  button_reset: "Zuruecksetzen"
en:
  button_reset: "Reset"

</i18n>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from 'vue';

import ProfileChooser from '@/components/ProfileChooser.vue';

import defaultKinks from '@/assets/kinks.yaml';

export default {
  name: 'ProfilesDeleteMenu',
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
      getUsers: computed(() => store.getters['AllKinks/getAvailableUsers']),
      resetProfileForUser: (username) => store.dispatch(
        'AllKinks/resetKinksForUser',
        { username },
      ),
    };
  },

  methods: {

    canResetProfile(user) {
      const users = this.getUsers;
      return !(users.includes(user));
    },

  },
  components: {
    ProfileChooser,
  },
};
</script>
