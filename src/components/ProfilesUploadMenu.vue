<template>
  <div class="box">
    <!-- Upload Menu -->

    <div class="field has-addons">
      <div class="control is-expanded">
      <div
        class="file has-name is-fullwidth"
        >
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
            <span
                class="file-name"
                >
                {{ filename }}
            </span>
        </label>
      </div>
      </div>
      <div class="control">
        <button
          class="button"
          v-on:click="parseUploadedKinks()"
          :disabled="!canImport"
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
  button_upload: "Profil importieren"
  filename_placeholder: "Keine Datei ausgewaehlt"
en:
  uploadKinks_field: Choose File
  button_upload: "Import Profile"
  filename_placeholder: "No File selected"
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
      upload: {
        name: '',
        content: null,
        lastModified: null,
        type: '',
        warnings: [],
      },
      filename: this.t('filename_placeholder'),
      validTypes: [
        'application/x-yaml',
      ],
    };
  },
  setup() {
    const { t } = useI18n({
    });
    const store = useStore();

    return {
      t,
      loadKinks: (upload) => store.dispatch('AllKinks/saveOrCreateKinksForUser', {
        username: `${upload.name}@${upload.lastModified}`,
        kinks: upload.content,
      }),
    };
  },
  computed: {
    /**
     * Checks whether the selected file can be imported
     * @return {bool}
     */
    canImport() {
      console.log(this.upload);
      return this.validTypes.includes(this.upload.type);
    },

  },
  methods: {

    parseUploadedKinks() {
      this.loadKinks(this.upload);
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
      this.filename = files[0].name;
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        if (this.debug) {
          console.log({ 'fileReader read': fileReader.result });
        }
        this.upload = {
          ...this.upload,
          content: yaml.load(
            fileReader.result,
            // filename
            files[0].name,
            // onWarning
            (e) => this.upload.push(e),
          ),
          name: this.filename,
          lastModified: files[0].lastModified,
          type: files[0].type,
        };
      });
      fileReader.readAsText(files[0]);

      /* eslint-disable-next-line */
      // this.upload = event.target.files[0];
    },

  },
};
</script>
