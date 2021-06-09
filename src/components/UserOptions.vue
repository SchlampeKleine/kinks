<template>
  <div
  class="user-field"
  >
  <input
    placeholder="Name"
    v-model="localUser"
    @update="localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))"
  />
  <button v-on:click="saveMyKinks(user)" :disabled="canSaveKinks(user)">
  {{ $t('button_save') }}
  </button>
  <button v-on:click="loadMyKinks(user)" :disabled="canLoadKinks(user)"
  >
  {{ $t('button_dump') }}
  </button>
  <button v-on:click="resetMyKinks(user)">
  {{ $t('button_dump') }}
  </button>
  <button v-on:click="dumpMyKinks">
  {{ $t('button_dump') }}
  </button>
  </div>
</template>

<i18n lang="yaml">

de:
  button_dump: "Kinks dumpen"
  button_reset: "Standard wiederherstellen"
  button_load: "Kinks laden"
  button_save: "Kinks speichern"
en:
  button_dump: "Dump my kinks"
  button_reset: "Reset my kinks"
  button_load: "Load my kinks"
  button_save: "Save my kinks"

</i18n>

<script>

// import defaultKinks from '@/assets/kinks.yaml';
import defaultKinks from '@/assets/kinks_reduced.yaml';

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
  mounted() {
    this.localMyKinks = this.getKinksForUser(this.user);
  },
  methods: {

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
