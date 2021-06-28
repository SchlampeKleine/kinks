<template>
  <div class="box">
        <!-- Download Menu -->

    <div class="field">
      <div class="control">
        <button
          class="button"
          v-on:click="downloadMyKinks(myKinks,user)"
          >
          {{ t('button_download') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>
de:
  button_download: "Kinks runterladen"
en:
  button_download: "Download my kinks"
</i18n>
<script>
import { useI18n } from 'vue-i18n';

import yaml from 'js-yaml';

export default {
  name: 'ProfilesDownloadMenu',
  setup() {
    const { t } = useI18n({
    });
    return {
      t,
    };
  },
  methods: {

    downloadMyKinks(kinks, user) {
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
      const encodedKinks = yaml.dump(kinks);
      // Start file download.
      const filenname = `${user || 'kinks'}.yaml`;
      download(filenname, encodedKinks);
    },

  },
};
</script>
