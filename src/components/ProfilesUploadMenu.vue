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
            @change="uploadKinks"
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
import { useStore } from 'vuex';

import yaml from 'js-yaml';

export default {
  name: 'ProfilesUploadMenu',
  data() {
    return {
      debug: false,
      upload: null,

    };
  },
  setup() {
    const { t } = useI18n({
    });
    const store = useStore();

    return {
      t,
      loadKinks: (upload) => store.dispatch('AllKinks/saveKinksForUser', {
        username: `${upload.name}@${upload.lastModified}`,
        kinks: upload.content,
      }),
      /*
       * TODO
       * Remove this when loading Kinks from AllKinks works
       */
      loadKinksAsCurKinks: (upload) => store.dispatch('CurKinks/updateCurKinks', upload.content),
    };
  },
  methods: {

    parseUploadedKinks() {
      this.loadKinks(this.upload);
      this.loadKinksAsCurKinks(this.upload);
      /* TODO
       *   Add Prompt for which user to use them
       *   Add User to export
       */
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
      const { files } = event.target;
      console.log(event.target.files);
      const filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        if (this.debug) {
          console.log({ 'fileReader read': fileReader.result });
        }
        this.upload = {
          content: yaml.load(fileReader.result),
          name: filename,
          lastModified: files[0].lastModified,
        };
      });
      fileReader.readAsText(files[0]);

      /* eslint-disable-next-line */
      // this.upload = event.target.files[0];
    },

  },
};
</script>
