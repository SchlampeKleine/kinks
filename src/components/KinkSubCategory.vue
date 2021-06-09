<template>
  <h4>{{ name }}</h4>
  <Kink
    v-for="kink in kinds"
    :key="kink.name"
    :name="kink.name"
    :variants="kink.variants"
    @update:kink="updateKink"
  />
</template>

<script>
import Kink from '@/components/Kink.vue';

export default {
  name: 'KinkSubCategory',
  props: {
    key: {
      type: String,
    },
    subcategory: {
      type: Object,
    },
    name: {
      type: String,
      required: true,
    },
    kinds: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {

    updateKink(newVal) {
      this.localSubCategory.kinds[
        this.localSubCategory.kinds.findIndex(
          (element) => element.name === newVal.name,
        )
      ] = newVal;
      // console.log({"KinkSubCategory: updated Kink":newVal})
      // this.$emit("update:subcategory",this.localSubCategory);
    },
  },
  components: {
    Kink,
  },
  computed: {
    localSubCategory: {
      get() { return this.subcategory ? this.subcategory : {}; },
      set(newVal) {
        this.$emit('update:subcategory', newVal);
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
