<template>
  <div class="column box is-align-items-stretch">
    <div class="box name">
      <h4
        class="title"
        >{{ t('name',kink.name) }}</h4>
    </div>
    <p class="block kink description" v-if="te('description')">
    {{ t('description') }}
    </p>
    <div
      class="columns is-align-items-stretch is-variable is-full-mobile is-half-tablet
             is-one-quarter-desktop is-multiline"
      >
      <template
        v-if="localKink.variants"
        >
        <KinkVariant
          v-for="variant in localKink.variants"
          :key="key+'-'+variant.name"
          :variant=variant
          @update:variant="updateVariant"
          />
      </template>
        <template
          v-else
          >
          <KinkPreference
            v-model:preferences="localKink.preferences"
            />
        </template>
    </div>
  </div>
</template>

<script>
import KinkVariant from '@/components/KinkVariant.vue';
import KinkPreference from '@/components/KinkPreference.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Kink',
  props: {
    key: {
      type: String,
    },
    kink: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: false,
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
      default: '',
    },
  },

  emits:
  [
    'update:kink',
    'update:roles',
  ],
  setup(props) {
    const { t, te } = useI18n({
      messages: props.kink.messages || { en: { name: props.kink.name } },
    });
    return {
      t,
      te,
    };
  },
  components: {
    KinkVariant,
    KinkPreference,
  },
  methods: {
    updatePreferences(newVal) {
      this.localKink.preferences = newVal;
    },
    updateRoles(newRoles) {
      this.localRoles = newRoles;
    },
    updateVariant(newVal) {
      this.localVariants[
        this.localVariants.findIndex(
          (element) => element.name === newVal.name,
        )
      ] = newVal;
    },
  },
  computed: {
    localKink: {
      get() {
        return this.kink ? this.kink : {
          roles: this.roles ? this.roles : null,
          variants: this.variants ? this.variants : null,
          name: this.name,
          comment: this.comment ? this.comment : null,
        };
      },
      set(newVal) {
        this.$emit('update:kink', newVal);
      },

    },
    localVariants: {
      get() { return this.variants; },
      set(localVariants) {
        this.$emit('update:variants', localVariants);
      },
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
