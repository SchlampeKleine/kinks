<template>
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
@change="$emit('update:preference',$event.target.value)"
/>
<label
for="preferencelevel"
>{{ preferencelevel }}</label>
</template>
</div>

</template>

<script>
export default {
  name: 'PreferenceScale',
  emits: [
    'update:preference'
    ],
  data() {
    return {
      localpreference: '',
      preferences: [
        "hardlimit",
        "softlimit",
        "dontcare",
        "curious",
        "loveit"
        ],
    };

  },
  props: {
    preference: null,
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
