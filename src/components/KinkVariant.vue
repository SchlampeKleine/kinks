<template>
<li>
<div class="variant">
<div class="variant name" >{{ t('name') }}</div>
<div class="variant description" v-if="te('description')" >
{{ t('description') }}
</div>
<KinkPreference
v-model:preferences="localVariant.preferences"
:key="key"
@update:preferences="updatePreferences"
/>
</div>
</li>
</template>

<script>
import KinkPreference from '@/components/KinkPreference.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'KinkVariant',
  emits: [
    'update:variant',
  ],
  props: {
    key: {
      type: String,
    },
    variant: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { t, te } = useI18n({
      messages: props.variant.messages || { en: { name: props.variant.name } },
    });
    return {
      t,
      te,
    };
  },
  components: {
    KinkPreference,
  },

  watch: {
    localVariant: {
      deep: true,
      immediate: true,
      handler(newVal) {
        // console.log({"KinkVariant: change localVariant": newVal.name})
        this.localVariant = newVal;
      },
    },

  },
  computed: {
    localVariant: {
      get() { return this.variant; },
      set(newVal) {
        // console.log({"KinkVariant: Update Variant":newVal})
        this.$emit('update:variant', newVal);
      },
    },
  },
  methods: {
    updatePreferences(newVal) {
      this.localVariant.preferences = newVal;
      this.$emit('update:variant', this.localVariant);
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
