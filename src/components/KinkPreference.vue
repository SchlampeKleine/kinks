<template>
<div class="preference">
<PreferenceScales
v-model:roles="localPreferences.roles"
:key="key+'-'+'preference-scales'"
/>
<PreferenceComment
v-model:comment="localPreferences.comment"
:key="key+'-'+'preference-comment'"
/>
</div>
</template>

<script>
import PreferenceScales from '@/components/PreferenceScales.vue';
import PreferenceComment from '@/components/PreferenceComment.vue';

export default {
  name: 'KinkPreference',
  props: {
    key: {
      type: String,
    },
    preferences: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },

  computed: {

    localPreferences: {
      get() { return this.preferences; },
      set(newVal) {
        // console.log({"KinkPreference: Emit Update preferences":newVal})
        this.$emit('update:preferences', newVal);
      },
    },

  },
  emits: [
    'update:preferences',
  ],
  components: {
    PreferenceScales,
    PreferenceComment,
  },
  methods: {
    updateComment(newVal) {
      this.localPreferences.comment = newVal;
    },

    updateRoles(newVal) {
      this.localPreferences.roles = newVal;
    },

  },
};
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
