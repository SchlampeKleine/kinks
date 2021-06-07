<template>
  <div
  class="user-field"
  >
  <input
    placeholder="Name"
    v-model="localUser"
    @update="localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))"
  />
  <button v-on:click="saveMyKinks(user)" :disabled="canSaveKinks(user)">Save my kinks</button>
  <button v-on:click="loadMyKinks(user)" :disabled="canLoadKinks(user)"
  >Load my kinks</button>
  <button v-on:click="resetMyKinks(user)">Reset my kinks</button>
  <button v-on:click="dumpMyKinks">Dump my kinks</button>
  </div>
</template>

<script>

import defaultKinks from '@/assets/kinks.yaml';
// import defaultKinks from '@/assets/kinks_reduced.yaml';

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

     var users=this.getUsers()
     return !(users.includes(user));
   },

   getUsers() {
    var users = Object.keys(this.allKinks)
    return users;
   },

   canSaveKinks(user) {
    return user.length==0;
   },

   getKinksForUser(user) {
     if(user===''){
        user = 'default' ;
        console.log({"UserOptions: Fallback to default user": user})
      }
     try {
       var kinks = this.allKinks[user]
         if(kinks) {
          // console.log({"UserOptions: Found kinks for user":kinks})
          return kinks;
          }
      // console.log({"UserOptions: Return defaultKinks": defaultKinks})
       return defaultKinks;
     } catch(e) {
       console.log(e)
     }
   },

   loadMyKinks(user) {
    this.localMyKinks=this.getKinksForUser(user);
   },

   dumpMyKinks() {
     console.log(this.myKinks);
   },

   saveMyKinks(user) {
    console.log({"Saving for user": user});
     this.localAllKinks[user]=this.myKinks;
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
        this.$emit('update:user',newVal);
      },
    },
    localAllKinks: {
      get() {
        return this.allKinks;
      },
      set(newVal) {
        this.$emit('update:allKinks',newVal);
      },
    },
    localMyKinks: {
      get() {
        return this.myKinks;
      },
      set(newVal) {
        // console.log({"UserOptions: Setting new myKinks":newVal})
        this.$emit('update:myKinks',newVal);
      },
    },
  },

}


</script>
