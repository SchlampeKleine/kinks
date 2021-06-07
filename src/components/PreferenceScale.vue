<template>
<div
class="preference-role-identifier"
>
{{ localRole.name }}
</div>
<div>
<template
v-for="preferencelevel in getPreferenceLevels()"
v-bind:key="key+'-'+preferencelevel"
  >
<input
type="radio"
label="preferencelevel"
v-model="localPreference"
:value="preferencelevel"
/>
<label
for="preferencelevel"
>{{ preferencelevel }}</label>
</template>
</div>

</template>

<script>
import { preferenceLevels } from '@/assets/kinks.yaml'; // is used in v-for

export default {
  name: 'PreferenceScale',
  emits: [
  //  'update:preference',
    'update:role'
    ],
  data(){
    return {
      'localPreference': null,
    };

  },

  methods: {
    getPreferenceLevels(){
      return preferenceLevels;
    },

  },

  props: {
    key: {
      type: String,
    },
    role: {
      type: Object,
      required: true,
      default(){
        return {
          "preference": null,
          };
      }
    },

  },
  watch: {

    role: {
      deep: true,
      immediate: true,
      handler(newVal) {
        // console.log({"PreferenceScale: role changed": newVal});
        this.localRole=newVal;
      },
    },

    localRole: {
      handler(newVal) {
        // console.log({"PreferenceScale: localRole changed": newVal })
        this.localPreference=newVal.preference;
        this.$emit('update:role', newVal);
      },
      deep: true,
      immediate: true,
    },

    localPreference: {
      handler(newVal){
        this.localRole.preference=newVal
      },
      immediate: true,
    },
  },
  computed: {

    localRole: {
      get() {
        return this.role
      },
      set(newVal) {
        this.$emit('update:role', newVal);
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
