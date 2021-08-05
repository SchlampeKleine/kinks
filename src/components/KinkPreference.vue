<template>
  <div
  class="
         column
         card
         preference
         "
  >
    <div class="field">
      <PreferenceScales
        :id="id+'-'+'roles'"
        :key="id+'-'+'roles'"
        v-model:roles="localRoles"
        />
      <PreferenceComment
        :id="id+'-'+'comment'"
        :key="id+'-'+'comment'"
        v-model:comment="localComment"
        />
    </div>
  </div>
</template>

<script>
import PreferenceScales from '@/components/PreferenceScales.vue';
import PreferenceComment from '@/components/PreferenceComment.vue';

export default {
  name: 'KinkPreference',
  props: {
    id: {
      type: String,
      required: true,
    },
    object: {
      name: {
        type: String,
        required: true,
      },
      preferences: {
        type: Object,
        default() {
          return {};
        },
      },
      required: false,
    },
    preferences: {
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      debug: false,
    };
  },
  computed: {

    localRoles: {
      get() {
        return this.localPreferences.roles;
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'KinkPreference localRoles set': newVal });
        }
        this.$emit('update:preferences', { ...this.preferences, roles: newVal });
      },
    },

    localComment: {
      get() {
        return this.localPreferences.comment;
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'KinkPreference localComment set': newVal });
        }
        this.$emit('update:preferences', { ...this.preferences, comment: newVal });
      },

    },

    localObject: {
      get() { return this.object; },
      set(newVal) {
        if (this.debug) {
          console.log({ 'KinkPreference update localObject': newVal });
        }
        this.$emits('update:object', { ...this.object });
      },

    },

    localPreferences: {
      get() { return this.object.preferences; },
      set(newVal) {
        if (this.debug) {
          console.log({ 'KinkPreference: Emit update:preferences': newVal });
        }
        this.localObject = { ...this.object, preferences: newVal };
        // this.$emit('update:preferences', this.localPreferences);
      },
    },

  },
  emits: {
    'update:object': null,
    'update:preferences':
    (newVal) => {
      const debug = true;
      if (debug) {
        console.log({ 'KinkPreference emit update:preferences': newVal });
      }
      return true;
    },
  },
  components: {
    PreferenceScales,
    PreferenceComment,
  },
  methods: {

    updateComment(newVal) {
      this.localPreferences.comment = newVal;
      this.$emit('update:preferences', this.localPreferences);
    },

    updateRoles(newVal) {
      this.localPreferences.roles = newVal;
      this.$emit('update:preferences', this.localPreferences);
    },

  },
};
</script>
