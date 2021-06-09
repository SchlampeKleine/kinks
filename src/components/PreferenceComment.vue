<template>
<input
placeholder="Comment"
@change="updateComment"
/>
</template>

<script>
import { defaultRoles } from '@/assets/kinks.yaml';

export default {
  name: 'PreferenceComment',
  emits: [
    'update:comment',
  ],
  props: {
    roles: {
      type: Array,
      default() {
        return defaultRoles;
      },
      comment: {
        type: String,
        required: true,
      },
    },
  },
  methods: {
    updateComment(newVal) {
      this.$emit('update:comment', newVal.target.value);
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
