<template>
<li>{{ variant.name }}
<PreferenceScale :preference="variant.preference" @update:preference="updatePreference"/>
</li>
</template>

<script>
import PreferenceScale from '@/components/PreferenceScale.vue'
export default {
  name: 'KinkVariant',
  emits: ['update:variant'],
  props: {
    variant: Object,
  },
  components: {
    PreferenceScale,
  },
  methods: {
    updatePreference(preference){
      console.log("Updated preference to " + preference);
      this.$emit("update:variant","preference",preference);
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
