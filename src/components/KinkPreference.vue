<template>
<PreferenceScales
:roles="preferences.roles"
@update:roles="updateRoles"
/>
<PreferenceComment
:comment="preferences.comment"
@update:comment="updateComment"
/>
</template>

<script>
import PreferenceScales from '@/components/PreferenceScales.vue'
import PreferenceComment from '@/components/PreferenceComment.vue'
import { defaultRoles } from '@/assets/template_limits.yaml';

export default {
  name: 'KinkPreference',
  props: {
    preferences: {
      type: Object,
      default() {
        return {
          comment: "",
          roles: defaultRoles,
        };
      },
    },
  },

  computed: {
    localPreferences: {
      get() { return this.preferences; },
      set(newVal) {
        this.$emit('update:preferences', newVal);
      },
    },
    localComment: {
      get() { return this.comment },
      set(localComment) { this.$emit('update:comment', localComment); },
    },
    localRoles: {
      get() { return this.preference.roles ? this.preference.roles : defaultRoles; },
      set(localRoles) {
        this.$emit('update:roles', localRoles);
        },
      },
  },
  emits: [
    'update:preferences'
  ],
  components: {
    PreferenceScales,
    PreferenceComment,
  },
  methods: {
    updateComment(newVal) {
      this.localPreferences.comment=newVal;
      this.$emit('update:preferences',this.localPreferences);
    },
    updateRoles(newRoles){
      this.localPreferences.roles=newRoles;
      this.$emit("update:preferences",this.localPreferences);
    },
    updatePreference(preference){
      this.$emit("update:kink","preference",preference);
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
