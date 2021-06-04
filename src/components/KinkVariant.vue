<template>
<li>{{ variant.name }}
<KinkPreference
v-model:preferences="localPreferences"
@update:preferences="updatePreferences"
/>
</li>
</template>

<script>
import KinkPreference from '@/components/KinkPreference.vue'

export default {
  name: 'KinkVariant',
  emits: [
  'update:variant'
  ],
  props: {
    variant: {
      type: Object,
      },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    roles: {
      type: Array,
    },
  },
  components: {
    KinkPreference,
  },
  computed: {
    localVariant: {
      get() { return this.variant;},
      set(newVal) {
        this.$emit("update:variant",newVal);
        },
    },
    localPreferences: {
      get() { return { "comment": this.localComment, "roles": this.localRoles}; },
      set(newVal) {
        this.localVariant.roles=newVal.roles;
        this.localVariant.comment=newVal.comment;
        this.$emit('update:variant',this.localVariant);
      },
    },
    localRoles: {
      get() { return this.roles; },
      set(localRoles) {
        this.$emit('update:roles', localRoles);
        },
      },
    localComment: {
      get() { return this.comment; },
      set(localComment) { this.$emit('update:comment', localComment); },
    },
  },
  methods: {
    updatePreferences(newVal) {
      this.localVariant.preferences=newVal;
      this.$emit("update:variant",this.localVariant);
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
