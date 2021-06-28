<template>
  <div class="box">
    <!-- Upload Menu -->

    <div class="field has-addons">
      <div class="file has-name is-right">
        <label class="file-label">
          <input
            class="file-input"
            type="file"
            name="resume"
            @change="onFilePicked"
            >
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                {{ t('uploadKinks_field') }}
              </span>
            </span>
        </label>
      </div>
      <div class="control">
        <button
          class="button"
          v-on:click="parseUploadedKinks()"
          :disabled="!upload"
          >
          {{ t('button_upload') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>
de:
  uploadKinks_field: "Datei auswaehlen"
  button_upload: "Kinks hochladen"
en:
  uploadKinks_field: Choose File
  button_upload: "Upload kinks"
</i18n>

<script>
import { useI18n } from 'vue-i18n';

import yaml from 'js-yaml';

export default {
  name: 'ProfilesUploadMenu',
  data() {
    return {
      upload: null,

    };
  },
  setup() {
    const { t } = useI18n({
    });
    return {
      t,
    };
  },
  methods: {

    parseUploadedKinks() {
      const parsedKinks = yaml.load(this.upload);
      /* TODO
       *   Add Prompt for which user to use them
       *   Add User to export
       */
      this.localMyKinks = parsedKinks;
    },

    uploadKinks(event) {
      /* Source
       * https://renatello.com/vue-js-file-upload/
       */

      /*
       * const files = event.target.files;
       * let filename = files[0].name;
       * const fileReader = new FileReader;
       * fileReader.addEventListener('load', () => {
       *  this.imageUrl = fileReader.result
       * })
       * fileReader.readAsDataURL(files[0]);
       * this.image = files[0]
       */
      /* TODO Fix THIS */
      /* eslint-disable-next-line */
      this.upload = event.target.files[0];
    },

  },
};
</script>
