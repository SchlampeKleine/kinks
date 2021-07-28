<template>
  <section class="section">
  <h1 class="title">Profiles</h1>
  <ProfilesSaveMenu :defaultKinks="defaultKinks" v-model:user="localUser" />
  <ProfilesLoadMenu :defaultKinks="defaultKinks" v-model:allKinks="localAllKinks"/>
  <ProfilesResetMenu :defaultKinks="defaultKinks" />
  <ProfilesPatchMenu />
  <ProfilesDebugMenu
      v-if="isDebug"
      />
  <ProfilesShareMenu :curKinks="curKinks" />
  <ProfilesDownloadMenu :curKinks="curKinks" />
  <ProfilesUploadMenu v-model:curKinks="curKinks" />
  </section>

</template>

<i18n lang="yaml" global>

de:
  button_kinkmanagement: "Kinks verwalten"
  button_edit_mode: "Aendern aktivieren"
en:
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
import ProfilesDebugMenu from '@/components/ProfilesDebugMenu.vue';
import ProfilesDownloadMenu from '@/components/ProfilesDownloadMenu.vue';
import ProfilesShareMenu from '@/components/ProfilesShareMenu.vue';
import ProfilesUploadMenu from '@/components/ProfilesUploadMenu.vue';

import { saveObjectToLocalStorage, getJSONFromLocalStorage } from '@/plugins/LocalStorage';

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
