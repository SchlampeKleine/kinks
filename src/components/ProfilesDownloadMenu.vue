<template>
  <div class="box">
        <!-- Download Menu -->

    <div class="field has-addons">
      <ProfileChooser v-model="selectedProfile" />
      <div class="control">
        <button
          class="button"
          v-on:click="downloadCurKinks(encodedKinks, user)"
          :disabled="!isUsernameValid(selectedProfile)"
          >
          {{ t('button_download') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>
de:
  button_download: "Profil herunterladen"
en:
  button_download: "Download profile"
</i18n>
<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from 'vue';

import ProfileChooser from '@/components/ProfileChooser.vue';

export default {
  name: 'ProfilesDownloadMenu',
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
      isUsernameValid: store.getters['AllKinks/existsUsersname'],
      encodedKinks: computed(() => store.getters['CurKinks/getCurKinksAsYAML']),
      user: computed(() => store.state.User.currentUsername),
    };
  },
  methods: {

    downloadCurKinks(encodedKinks, user) {
      function download(filename, text) {
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }

      /* TODO
       *   Add Prompt for which user to use them
       *   Add User to export
       */
      // Start file download.
      const filenname = `${user || 'kinks'}.yaml`;
      download(filenname, encodedKinks);
    },

  },
  components: {
    ProfileChooser,
  },
};
</script>
