<template>
<PreferenceScale
v-for="role in localRoles"
:key="role.name"
:role=role
@update:role="updateLocalRole"
/>
</template>

<script>
import PreferenceScale from '@/components/PreferenceScale.vue'
import { defaultRoles } from '@/assets/template_limits.yaml'

export default {
  name: 'PreferenceScales',
  emits: [
    'update:roles'
    ],
  props: {
    roles: {
      type: Array,
    },
  },
  methods: {
    updateLocalRole(newRole) {
      this.localRoles[this.localRoles.findIndex(element => element.name === newRole.name)]=newRole;
      this.$emit('update:roles',this.localRoles);
    },

  },
  components: {
    PreferenceScale
  },
  computed: {
    localRoles: {
      get() { return this.roles? this.roles : defaultRoles;},
      set(localRoles) {
        this.$emit('update:roles', localRoles);
      },
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
