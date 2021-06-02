<template>
<p>{{ kink.name }}</p>
<PreferenceScale
:preference="kink.preference"
@update:preference="updatePreference"
/>
<ul
v-if="kink.variants"

>
<KinkVariant
v-for="variant in kink.variants"
:key="variant.name"
:variant="variant"
@update:preference="updatePreference"
/>
</ul>
</template>

<script>
import KinkVariant from '@/components/KinkVariant.vue'
import PreferenceScale from '@/components/PreferenceScale.vue'
export default {
  name: 'Kink',
  props: {
    kink: Object,
  },
  emits: ['update:kink'],
  components: {
    KinkVariant,
    PreferenceScale,
  },
  methods: {
    updatePreference(preference){
      console.log("Updated preference to " + preference);
      this.$emit("update:kink","preference",preference);
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
