<template>
<p>{{ localKink.name }}</p>
<template
v-if="localVariants.length>0"
>
<ul
class="kink-variants"
>
<KinkVariant
v-for="variant in localVariants"
:key="variant.name"
:variant=variant
v-model:name="variant.name"
v-model:roles="variant.roles"
@update:variant="updateVariant"
/>
</ul>
</template>
<template
v-else
>
<KinkPreference
:preferences="localPreferences"
@update:preferences="updatePreferences"
/>
</template>
</template>

<script>
import KinkVariant from '@/components/KinkVariant.vue'
import KinkPreference from '@/components/KinkPreference.vue'

export default {
  name: 'Kink',
  props: {
    kink: {
      type: Object,
    },
    name: {
      type: String,
      required: true,
    },
    variants: {
      type: Array,
      default() {
        return [];
      },
    },
    roles: {
      type: Array,
    },
    comment: {
      type: String,
      default: "",
    },
  },
  emits: ['update:kink','update:roles'],
  components: {
    KinkVariant,
    KinkPreference,
  },
  methods: {
    updatePreferences(newVal) {
      this.localKink.preferences=newVal;
      this.$emit("update:kink",this.localKink);
    },
    updateRoles(newRoles){
      this.localRoles=newRoles;
      this.$emit("update:roles",this.localRoles);
    },
    updateVariant(newVal){
      this.localVariants[this.localVariants.findIndex(element => element.name === newVal.name)]=newVal;
    },
  },
  computed: {
    localKink: {
      get(){
        return this.kink ? this.kink : {
          "roles": this.roles ? this.roles : null,
          "variants": this.variants ? this.variants : null,
          "name": this.name ? this.name : "",
          "comment": this.comment ? this.comment : null
          };
        },
      set(newVal) {
        this.$emit('update:kink',newVal);
      },

    },
    localPreferences: {
      get() { return { "comment": this.localComment, "roles": this.localRoles};},
      set(newVal) {
        this.localKink.roles=newVal.roles;
        this.localKink.comment=newVal.comment;
        this.$emit('update:kink',this.localKink);

      },
    },
    localComment: {
      get() { return this.comment },
      set(localComment) { this.$emit('update:comment', localComment); },
    },
    localVariants: {
      get(){return this.variants;},
      set(localVariants){
        this.$emit('update:variants',localVariants);
      },
    },
    localRoles: {
      get() { return this.roles; },
      set(localRoles) { this.$emit('update:roles', localRoles); },
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
