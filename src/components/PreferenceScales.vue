<template>
<div class="columns">
<PreferenceScale
v-for="role in localRoles"
:key="key+'-'+role.name"
:role=role
@update:role="updateLocalRole"
/>
</div>
</template>

<script>
import PreferenceScale from '@/components/PreferenceScale.vue';
import { defaultRoles } from '@/assets/roles.yaml';

export default {
  name: 'PreferenceScales',
  emits: [
    'update:roles',
  ],
  props: {
    key: {
      type: String,
    },
    roles: {
      type: Array,
      default() {
        return defaultRoles;
      },
    },
  },
  methods: {

    updateLocalRole(newRole) {
      this.localRoles[
        this.localRoles.findIndex(
          (element) => element.name === newRole.name,
        )
      ] = newRole;
      this.$emit('update:roles', this.localRoles);
    },

  },
  components: {
    PreferenceScale,
  },
  watch: {
    roles: {
      deep: true,
      immediate: false,
      handler(newVal) {
        console.log({ 'PreferenceScales: roles changed': newVal });
      },
    },
    localRoles: {
      deep: true,
      immediate: false,
      handler(newVal) {
        console.log({ 'PreferenceScales: localRoles changed': newVal });
      },
    },

  },
  computed: {
    localRoles: {
      get() { return this.roles ? this.roles : defaultRoles; },
      set(localRoles) {
        this.$emit('update:roles', localRoles);
      },
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
