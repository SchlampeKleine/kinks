<template>
  <div
    class="columns
           is-multiline
           is-mobile
    "
    >
    <PreferenceScale
      v-for="role in localRoles"
      :id="id+'-'+role.name"
      :key="id+'-'+role.name"
      :role=role
      :preference="role.preference"
      @update:role="updateLocalRole"
      />
  </div>
</template>

<script>
import PreferenceScale from '@/components/PreferenceScale.vue';
import { defaultRoles } from '@/assets/roles.yaml';

export default {
  name: 'PreferenceScales',
  emits: {
    'update:roles': (newVal) => {
      const debug = true;
      if (debug) {
        console.log({ 'PreferenceScales emit update:roles': newVal });
      }
      return true;
    },
  },

  data() {
    return {
      debug: false,
    };
  },
  props: {

    id: {
      type: String,
      required: true,
    },

    roles: {
      type: Array,
      default() {
        // This forces a real copy of the default roles to be created
        return Array.from(defaultRoles, (o) => ({ ...o }));
      },
    },

  },

  methods: {

    updateLocalRole(newRole) {
      if (this.debug) {
        console.log({ 'PreferenceScales updateLocalRole': newRole });
      }
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

  computed: {

    localRoles: {
      get() { return this.roles; },
      set(newVal) {
        if (this.debug) {
          console.log({ 'PreferenceScales localRoles set': newVal });
        }
        this.$emit('update:roles', { ...newVal });
      },
    },

  },
};
</script>
