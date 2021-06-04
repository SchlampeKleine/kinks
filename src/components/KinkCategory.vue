<template>
  <h3>{{ category.name }}</h3>
  <KinkSubCategory
    v-for="subcategory in localCategory.subcategories"
    v-bind:key="subcategory.name"
    :subcategory="subcategory"
    :name="subcategory.name"
    :kinds="subcategory.kinds"
    @update:subcategory="updateSubcategory"
  />
  <Kink
    v-for="kink in localCategory.kinds"
    v-bind:key="kink.name"
    :kink="kink"
    :name="kink.name"
    :variants="kink.variants"
    @update:kink="updateKink"
  />
</template>

<script>
import Kink from '@/components/Kink.vue'
import KinkSubCategory from '@/components/KinkSubCategory.vue'
export default {
  name: 'KinkCategory',
  props: {
    category: {
      type: Object,
      required: true,
    },
    subcategories: {
      kind: Array,
      default() {
        return [];
      },
    },
    kinds: {
      kind: Array,
      default() {
        return [];
      },
    },
    name: {
      type: String,
      required: true,

    },
  },
  emits: ['update:category'],
  computed: {
    localCategory: {
      get() {
        var tmpCategory = this.category ? this.category : {};
        if(!(tmpCategory.subcategories) ) tmpCategory.subcategories=[];
        if(!(tmpCategory.kinds) ) tmpCategory.kinds=[];
        return tmpCategory;
      },
      set(newVal) {
        this.localCategory=newVal;
        this.$emit("update:category",this.localCategory);
        },
      },

  },
  methods: {
    updateSubcategory(newVal) {
      this.localCategory.subcategories[this.localCategory.subcategories.findIndex(element => element.name === newVal.name)]=newVal;
      this.$emit("update:category",this.localCategory);
    },
    updateKink(newVal) {
      console.log({"updateKink":newVal});
      this.localCategory.kinds[this.localCategory.kinds.findIndex(element => element.name === newVal.name)]=newVal;
      this.$emit("update:category",this.localCategory);
    },
  },
  components: {
    Kink,
    KinkSubCategory,
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
