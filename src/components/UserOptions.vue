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
          <RouterLink :to="{ name: 'home' }">
          Home
          </RouterLink>
        </div>
      <div class="navbar-item">
        <RouterLink :to="{ name: 'credits' }">
        Credits
        </RouterLink>
      </div>
      <div class="navbar-item">
        <RouterLink :to="{ name: 'privacy' }">
        Privacy
        </RouterLink>
      </div>
      <div class="navbar-item">
        <RouterLink :to="{ name: 'profiles' }">
        Profiles
        </RouterLink>
      </div>
      <div class="navbar-item">
        <RouterLink :to="{ name: 'list' }">
        List
        </RouterLink>
      </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <button
            @click="toggleEditMode"
            class="button"
            >
            {{ t('button_edit_mode') }}
          </button>
        </div>
        <div class="navbar-item">
          <LocaleSwitcher />
        </div>
      </div>
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
  button_edit_mode: "Aendern aktivieren"
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
  button_edit_mode: "Toggle edit mode"

</i18n>

<script>
import { useRouter, RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Base64 } from 'js-base64';
import { useStore } from 'vuex';
import { computed } from 'vue';

import yaml from 'js-yaml';

import LocaleSwitcher from '@/components/LocaleSwitcher.vue';
import defaultKinks from '@/assets/kinks.yaml';
// import defaultKinks from '@/assets/kinks_reduced.yaml';
import useEditMode from '@/plugins/EditMode';

export default {
  name: 'UserOptions',
  emits: [
    'update:user',
    'update:myKinks',
    'update:allKinks',
  ],
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const { toggleEditMode } = useEditMode();

    const store = useStore();

    return {
      t,
      createShareLink: (myKinks) => router
        .replace({ params: { objectString: encodeURI(JSON.stringify(myKinks)) } })
        .catch(() => {}),
      toggleEditMode: () => {
        toggleEditMode();
        store.dispatch('EditMode/toggleEditMode');
      },

      myKinks: computed(() => store.state.CurKinks.curKinks),

      getKinksForUser: store.getters['AllKinks/getKinksForUser'],
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
  },

};

</script>
