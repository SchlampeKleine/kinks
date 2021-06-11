<template>
  <PreferenceScale
    v-for="role in localRoles"
    :key="key+'-'+role.name"
    :role=role
    @update:role="updateLocalRole"
    />
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
      // console.log({ 'updateLocalRole in PreferenceScales': newRole });
      this.localRoles[
        this.localRoles.findIndex(
          (element) => element.name === newRole.name,
        ) || -1
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
</style>
