<template>
  <section class="section">
    <h1 class="title">{{ t('profiles_title') }}</h1>
  <ProfilesSaveMenu />
  <ProfilesLoadMenu />
  <ProfilesResetMenu :defaultKinks="defaultKinks" />
  <ProfilesPatchMenu />
  <ProfilesPatchCurrentMenu />
  <ProfilesDebugMenu
      v-if="isDebug"
      />
  <ProfilesShareMenu />
  <ProfilesDownloadMenu />
  <ProfilesUploadMenu />
  </section>

</template>

<i18n lang="yaml" global>

de:
  profiles_title: "Profile"
  button_kinkmanagement: "Kinks verwalten"
  button_edit_mode: "Aendern aktivieren"
en:
  profiles_title: "Profiles"
  button_kinkmanagement: "Manage kinks"
  button_edit_mode: "Toggle edit mode"

</i18n>

<script>
import defaultKinks from '@/assets/kinks.yaml';
// import defaultKinks from '@/assets/kinks_reduced.yaml';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from 'vue';

import ProfilesSaveMenu from '@/components/ProfilesSaveMenu.vue';
import ProfilesLoadMenu from '@/components/ProfilesLoadMenu.vue';
import ProfilesResetMenu from '@/components/ProfilesResetMenu.vue';
import ProfilesPatchMenu from '@/components/ProfilesPatchMenu.vue';
import ProfilesPatchCurrentMenu from '@/components/ProfilesPatchCurrentMenu.vue';
import ProfilesDebugMenu from '@/components/ProfilesDebugMenu.vue';
import ProfilesDownloadMenu from '@/components/ProfilesDownloadMenu.vue';
import ProfilesShareMenu from '@/components/ProfilesShareMenu.vue';
import ProfilesUploadMenu from '@/components/ProfilesUploadMenu.vue';

export default {
  name: 'Profiles',
  data() {
    return {
      defaultKinks,
      isDebug: false,
    };
  },
  setup() {
    const { t } = useI18n({
    });
    const store = useStore();

    return {
      t,
      curKinks: computed(() => store.state.CurKinks.curKinks),
      allKinks: computed(() => store.state.AllKinks.userKinks),
      user: computed(() => store.state.User.currentUsername),
    };
  },
  components: {
    ProfilesSaveMenu,
    ProfilesLoadMenu,
    ProfilesResetMenu,
    ProfilesPatchMenu,
    ProfilesPatchCurrentMenu,
    ProfilesDebugMenu,
    ProfilesShareMenu,
    ProfilesDownloadMenu,
    ProfilesUploadMenu,
  },
  methods: {

  },
  computed: {

    localUser: {
      get() {
        return this.user;
      },
      set(newVal) {
        this.$emit('update:user', newVal);
      },
    },

    localAllKinks: {
      get() {
        return this.allKinks;
      },
      set(newVal) {
        this.$emit('update:allKinks', newVal);
      },
    },
  },
};
</script>
