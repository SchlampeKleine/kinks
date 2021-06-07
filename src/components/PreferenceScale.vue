<template>
<div
class="preference-role-identifier"
>
{{ localRole.name }}
</div>
<div>
<template
v-for="preferencelevel in preferences"
v-bind:key="preferencelevel"
  >
<input
type="radio"
label="preferencelevel"
v-model="localpreference"
:value="preferencelevel"
/>
<label
for="preferencelevel"
>{{ preferencelevel }}</label>
</template>
</div>

</template>

<script>
import { preferenceLevels } from '@/assets/kinks.yaml';
export default {
  name: 'PreferenceScale',
  emits: [
    'update:preference',
    'update:role'
    ],
  data() {
    return {
      preferences: preferenceLevels,
      localpreference: '',
      };
  },
  props: {
    role: {
      type: Object,
    },
    preference: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
  },
  watch: {
    localpreference: {
      handler(newPreference) {
        this.localPreference=newPreference;

      },

    },
    localRole: {
      handler(localRole) {
        this.$emit('update:role', localRole);
      },
      deep: true,
    },
  },
  computed: {

    localRole: {
      get() {
        var tmpRole = this.role ? this.role : {};
        if( tmpRole.preference) return tmpRole;
        tmpRole.preference = '';
        return tmpRole;
      },
      set(localRole) {
        this.$emit('update:role', localRole);
      },
    },
    localPreference: {

      get() { return this.localRole.preference ? this.localRole.preference : '';},
      set(localPreference) {
        this.localRole.preference=localPreference;
        this.$emit('update:role', this.localRole);
      },


    },

  }
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
