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
    <div class="navbar-menu"
        v-bind:class="{'is-active': isOpen}"
      >
      <div class="navbar-start"
        >
        <div class="control">
          <div
            class="field"
            >
            <input
              placeholder="Name"
              v-model="localUser"
              @update="localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))"
              type="text"
              class="input is-expanded"
              />
          </div>
          <div class="buttons has-addons">
            <button class="button" v-on:click="saveMyKinks(user)" :disabled="canSaveKinks(user)">
              {{ t('button_save') }}
            </button>
            <button class="button" v-on:click="loadMyKinks(user)" :disabled="canLoadKinks(user)"
                    >
                    {{ t('button_load') }}
            </button>
              <button class="button" v-on:click="resetMyKinks(user)">
                {{ t('button_reset') }}
              </button>
              <button class="button" v-on:click="dumpMyKinks">
                {{ t('button_dump') }}
              </button>
              <button class="button" v-on:click="shareMyKinks(getKinksForUser(user))">
                {{ t('button_share') }}
              </button>
              <button class="button" v-on:click="downloadMyKinks(myKinks)">
                {{ t('button_download') }}
              </button>
          </div>
        </div>
        <div class="navbar-end">
          <LocaleSwitcher />
        </div>
      </div>
      <div>
      </div>
    </div>
  </nav>
</template>

<i18n lang="yaml" global>

de:
  button_dump: "Kinks dumpen"
  button_reset: "Standard wiederherstellen"
  button_load: "Kinks laden"
  button_save: "Kinks speichern"
  button_share: "Kinks teilen"
  button_download: "Kinks runterladen"
en:
  button_dump: "Dump my kinks"
  button_reset: "Reset my kinks"
  button_load: "Load my kinks"
  button_save: "Save my kinks"
  button_share: "Share my kinks"
  button_download: "Download my kinks"

</i18n>

<script>

import defaultKinks from '@/assets/kinks.yaml';
import { useRouter } from 'vue-router';
// import defaultKinks from '@/assets/kinks_reduced.yaml';
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
  },
  mounted() {
    this.localMyKinks = this.getKinksForUser(this.user);
  },
  data() {
    return {
      isOpen: null,
    };
  },
  methods: {

    downloadMyKinks(kinks) {
      function download(filename, text) {
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }

      const encodedKinks = yaml.dump(kinks);
      // Start file download.
      download('kinks.txt', encodedKinks);
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
