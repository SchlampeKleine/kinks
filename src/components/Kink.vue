<template>
  <div class="column
              box"
       >
    <div class="box name">
      <h4
        class="title has-text-primary has-text-centered"
        >{{ t('name',kink.name) }}</h4>
    </div>
    <p
        class="block kink description"
        v-if="te('description')"
        >
    {{ t('description') }}
    </p>
    <div
      class=" columns
              is-align-items-stretch
              is-desktop"
      >
      <template
        v-if="localKink.variants"
        >
        <KinkVariant
          v-for="variant in localVariants"
          :id="id+'-'+variant.name"
          :key="id+'-'+variant.name"
          :variant=variant
          @update:variant="updateVariant"
          />
      </template>
        <template
          v-else
          >
          <KinkPreference
            :id="id+'-'+'preferences'"
            :key="id+'-'+'preferences'"
            v-model:object="localKink"
            v-model:preferences="localPreferences"
            />
        </template>
    </div>
  </div>
</template>

<script>
import { toRefs, ref, toRef } from 'vue';
import KinkVariant from '@/components/KinkVariant.vue';
import KinkPreference from '@/components/KinkPreference.vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'Kink',
  props: {

    id: {
      type: String,
      required: true,
    },

    kink: {
      type: Object,
      required: true,
      // TODO Move to full object, eg an variants key in here
      variants: {
        type: Array,
      },
    },

    variants: {
      type: Array,
      default() {
        return [];
      },
    },

  },

  data() {
    return {
      debug: false,
    };
  },

  emits:
  [
    'update:kink',
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

  watch: {

    /*
    localKink: {
      immediate: true,
      deep: true,
      handler() {
        if (this.debug) {
          console.log({ 'Kink watcher localKink emits update:kink': this.localKink });
        }
        this.$emit('update:kink', this.localKink);
      },
    },

    localPreferences: {
      immediate: true,
      deep: true,
      handler() {
        if (this.debug) {
          console.log({ 'Kink watcher localPreferences emits update:kink': this.localKink });
        }
        this.$emit('update:kink', this.localKink);
      },
    },

    localVariants: {
      immediate: true,
      deep: true,
      handler() {
        if (this.debug) {
          console.log({ 'Kink watcher localVariants emits update:kink': this.localVariants });
        }
        this.$emit('update:kink', this.localKink);
      },
    },
  */
  },
  methods: {

    updateKink(newVal) {
      if (this.debug) {
        console.log({ 'Kink UpdateKink': newVal });
      }
      this.$emit('update:kink', { ...this.newVal });
    },

    updatePreferences(newVal) {
      console.log({ 'Kink updatePreferences': newVal });
      this.localKink = { preferences: newVal, ...this.localKink };
      this.$emit('update:kink', this.localKink);
    },

    updateVariant(newVal) {
      this.localVariants[
        this.localVariants.findIndex(
          (element) => element.name === newVal.name,
        )
      ] = newVal;
      this.localKink.variants = this.localVariants;
      this.$emit('update:kink', this.localKink);
    },

  },
  computed: {

    localPreferences: {
      get() {
        return this.kink.preferences || {};
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'Kink localPreferences set': newVal });
        }
        this.localKink = { ...this.kink, preferences: newVal };
        this.$emit('update:kink', { ...this.localKink, preferences: newVal });
      },

    },

    localKink: {
      get() {
        return { preferences: {}, ...this.kink };
      },
      set(newVal) {
        if (this.debug) { console.log({ 'Kink emit update:kink': newVal }); }
        this.$emit('update:kink', { ...newVal });
      },
    },

    localVariants: {
      debug: true,
      get() { return this.variants; },
      set(newVal) {
        if (this.debug) { console.log({ 'Kink emit update:variants': newVal }); }
        this.localKink = { ...this.localKink, variants: newVal };
        this.$emit('update:variants', this.localVariants);
      },
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
