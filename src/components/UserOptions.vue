<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    >
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="@/assets/logo.png">
      </a>
    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      v-on:click="isOpen = !isOpen"
      v-bind:class="{'is-active': isOpen}"
      >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    </div>
    <div
      class="navbar-menu"
      v-bind:class="{'is-active': isOpen}"
      >
      <div
        class="navbar-start"
        >
      <div class="navbar-item">
        <RouterLink :to="{ name: 'home', }">
          Home
        </RouterLink>
      </div>
      <div class="navbar-item">
        <RouterLink :to="{ name: 'credits', }">
          Credits
        </RouterLink>
      </div>
      <div class="navbar-item">
        <RouterLink :to="{ name: 'privacy', }">
          Privacy
        </RouterLink>
      </div>
        <div class="navbar-item has-dropdown"
             v-bind:class="{ 'is-active': isKinksOpen }">
          <a class="navbar-link"
             v-on:click="isKinksOpen = !isKinksOpen">
            {{ t('button_kinkmanagement') }}
          </a>
        <div class="navbar-dropdown">
          <!-- Save Menu -->
          <div class="navbar-item">
            <div
              class="field has-addons"
              >
              <label class="label">
                Name
              </label>
              <div class="control">
                <input
                  placeholder="Name"
                  v-model="localUser"
                  @update="localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))"
                  type="text"
                  class="input is-expanded"
                  />
                <p class="help">
                {{ t('help_field_localUser') }}
                </p>
              </div>
            </div>
            <div class="control">
              <button
                class="button"
                v-on:click="saveMyKinks(user)"
                :disabled="canSaveKinks(user)"
                >
                {{ t('button_save') }}
              </button>
            </div>
          </div>
          <!-- Load Menu -->

          <div class="navbar-item">
            <div class="field has-addons">

              <div class="control is-expanded">
                <div class="select">
                  <select v-model="loadUser">
                    <option disabled value="">
                    {{ t('loadUser_choice') }}
                    </option>
                    <option
                      v-for="user in getUsers"
                      v-bind:key="user"
                      >
                      {{ user }}
                    </option>
                  </select>
                  <div class="help">
                    {{ t('help_field_loadUser') }}
                  </div>
                </div>
              </div>
              <div class="control">
                <button
                  class="button"
                  v-on:click="loadMyKinks(user)"
                  :disabled="canLoadKinks(user)"
                  >
                  {{ t('button_load') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Reset Menu -->

          <div class="navbar-item">
            <div class="field">
              <div class="control">
                <button
                  class="button"
                  v-on:click="resetMyKinks(user)"
                  >
                  {{ t('button_reset') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Debug Menu  -->

          <div
            class="navbar-item"
            v-if="isDebug"
            >
            <div class="field">
              <div class="control"
                   >
                   <button
                     class="button"
                     v-on:click="dumpMyKinks"
                     >
                     {{ t('button_dump') }}
                   </button>
              </div>
            </div>
          </div>

          <!-- Share Menu -->

          <div class="navbar-item">
            <div class="field">
              <div class="control">
                <button
                  class="button"
                  v-on:click="shareMyKinks(getKinksForUser(user))"
                  >
                  {{ t('button_share') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Download Menu -->

          <div class="navbar-item">
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

          <!-- Upload Menu -->

          <div class="navbar-item">
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
        </div>
      </div>
      </div>
    </div>
    <div class="navbar-end">
      <LocaleSwitcher />
    </div>
  </nav>
</template>

<i18n lang="yaml" global>

de:
  uploadKinks_field: "Datei auswaehlen"
  help_field_localUser: >
    Ein Name oder eine Rolle,
    um diese Praeferenzen
    auf dem lokalen Rechner
    oder beim Teilen zuordnen zukoennen
  loadUser_choice: >
    Bitte waehle den Nutzer aus,
    dessen Praeferenzen du laden moechtest.
  help_field_loadUser: Kennzeichnug der Praeferenzen, die geladen werden sollen
  button_upload: "Kinks hochladen"
  button_kinkmanagement: "Kinks verwalten"
  button_dump: "Kinks dumpen"
  button_reset: "Standard wiederherstellen"
  button_load: "Kinks laden"
  button_save: "Kinks speichern"
  button_share: "Kinks teilen"
  button_download: "Kinks runterladen"
en:
  uploadKinks_field: Choose File
  help_field_localUser: >
    A name or role to identify
    these preferences
    on the local computer
    or when sharing them
  loadUser_choice: >
    Please select the user
    to load the preferences for
  help_field_loadUser: Identifier of the saved preferences to load
  button_upload: "Upload kinks"
  button_kinkmanagement: "Manage kinks"
  button_dump: "Dump my kinks"
  button_reset: "Reset my kinks"
  button_load: "Load my kinks"
  button_save: "Save my kinks"
  button_share: "Share my kinks"
  button_download: "Download my kinks"

</i18n>

<script>
import defaultKinks from '@/assets/kinks.yaml';
// import defaultKinks from '@/assets/kinks_reduced.yaml';
import { useRouter, RouterLink } from 'vue-router';
import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
import { useI18n } from 'vue-i18n';
import { Base64 } from 'js-base64';

import yaml from 'js-yaml';

export default {
  name: 'UserOptions',
  props: {
    allKinks: {
      type: Object,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    myKinks: {
      type: Object,
      required: true,
    },
  },
  emits: [
    'update:user',
    'update:myKinks',
    'update:allKinks',
  ],
  setup() {
    const { t } = useI18n();
    const router = useRouter();

    return {
      t,
      createShareLink: (myKinks) => router
        .replace({ params: { objectString: JSON.stringify(myKinks) } })
        .catch(() => {}),
    };
  },
  components: {
    LocaleSwitcher,
    RouterLink,
  },
  mounted() {
    this.localMyKinks = this.getKinksForUser(this.user);
  },
  data() {
    return {
      isOpen: null,
      isDebug: null,
      isKinksOpen: null,
      loadUser: null,
      upload: null,
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

    b64Encode(val) {
      return Base64.encodeURI(val);
    },

    canLoadKinks(user) {
      const users = this.getUsers();
      return !(users.includes(user));
    },

    getUsers() {
      const users = Object.keys(this.allKinks);
      return users;
    },

    canSaveKinks(user) {
      return user.length === 0;
    },

    getKinksForUser(user) {
      let localUser = user;
      if (user === '') localUser = 'default';
      const kinks = this.allKinks[localUser];
      if (kinks) {
        // console.log({"UserOptions: Found kinks for user":kinks})
        return kinks;
      }
      // console.log({"UserOptions: Return defaultKinks": defaultKinks})
      return defaultKinks;
    },

    loadMyKinks(user) {
      this.localMyKinks = this.getKinksForUser(user);
    },

    dumpMyKinks() {
      console.log(this.myKinks);
    },

    saveMyKinks(user) {
      console.log({ 'Saving for user': user });
      this.localAllKinks[user] = this.myKinks;
    },

    resetMyKinks() {
      this.localMyKinks = defaultKinks;
    },

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
    localMyKinks: {
      get() {
        return this.myKinks;
      },
      set(newVal) {
        // console.log({"UserOptions: Setting new myKinks":newVal})
        this.$emit('update:myKinks', newVal);
      },
    },
  },

};

</script>
