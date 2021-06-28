<template>
  <section class="section">
  <h1 class="title">Profiles</h1>
  <ProfilesSaveMenu :defaultKinks="defaultKinks" v-model:user="localUser" />
  <ProfilesLoadMenu :defaultKinks="defaultKinks" v-model:allKinks="localAllKinks"/>
  <ProfilesResetMenu :defaultKinks="defaultKinks" />
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
import ProfilesSaveMenu from '@/components/ProfilesSaveMenu.vue';
import ProfilesLoadMenu from '@/components/ProfilesLoadMenu.vue';
import ProfilesResetMenu from '@/components/ProfilesResetMenu.vue';
import ProfilesDebugMenu from '@/components/ProfilesDebugMenu.vue';
import ProfilesDownloadMenu from '@/components/ProfilesDownloadMenu.vue';
import ProfilesShareMenu from '@/components/ProfilesShareMenu.vue';
import ProfilesUploadMenu from '@/components/ProfilesUploadMenu.vue';

export default {
  name: 'Profiles',
  props: {
    user: {
      type: String,
      required: true,
      default: '',
    },
    allKinks: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      defaultKinks,
      isDebug: false,
    };
  },
  setup() {
    const { t } = useI18n({
    });
    return {
      t,
    };
  },
  components: {
    ProfilesSaveMenu,
    ProfilesLoadMenu,
    ProfilesResetMenu,
    ProfilesDebugMenu,
    ProfilesShareMenu,
    ProfilesDownloadMenu,
    ProfilesUploadMenu,
  },
  emits: [
    'update:user',
    'update:myKinks',
    'update:allKinks',
  ],
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
