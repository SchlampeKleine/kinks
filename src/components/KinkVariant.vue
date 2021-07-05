<template>
  <div class="
              column
              is-full-mobile
              is-half-tablet
              is-one-quarter-desktop
              box
              "
       >
       <Representation>
       <template v-slot:title>
         {{ t('name',variant.name) }}
       </template>
       <template v-slot:menu v-if="getEditMode">
          <LocaleEditor v-model:messages="localVariant.messages"/>
          <ModalButtonYamlEdit v-model:dataObject="localVariant" />
       </template>

       <template v-slot:description v-if="te('description')">
    {{ t('description') }}
    </template>

    <template v-slot:preferences>
    <KinkPreference
      :id="id+'-'+'preferences'"
      :key="id+'-'+'preferences'"
      v-bind:object="localVariant"
      v-model:preferences="localPreferences"
      />
    </template>
       </Representation>
  </div>
</template>

<script>
import KinkPreference from '@/components/KinkPreference.vue';
import { useI18n } from 'vue-i18n';
import LocaleEditor from '@/components/LocaleModifier.vue';
import ModalButtonYamlEdit from '@/components/ModalButtonYamlEdit.vue';
import Representation from '@/components/Representation.vue';
import useEditMode from '@/plugins/EditMode';

export default {
  name: 'KinkVariant',

  emits: [
    'update:variant',
  ],

  props: {

    id: {
      type: String,
      required: true,
    },

    variant: {
      type: Object,
      required: true,
    },

  },

  data() {
    return {
      debug: false,
    };
  },

  setup(props) {
    const { t, te } = useI18n({
      messages: props.variant.messages || { en: { name: props.variant.name } },
    });
    const { getEditMode } = useEditMode();
    return {
      t,
      te,
      getEditMode,
    };
  },

  components: {
    ModalButtonYamlEdit,
    KinkPreference,
    LocaleEditor,
    Representation,
  },

  computed: {

    localVariant: {
      get() {
        return { preferences: {}, ...this.variant };
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'KinkVariant: Update Variant': newVal });
        }
        this.$emit('update:variant', { ...newVal });
      },
    },

    localPreferences: {
      get() {
        return this.variant.preferences || {};
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'KinkVariant localPreferences set': newVal });
        }
        this.localVariant = { ...this.variant, preferences: newVal };
        this.$emit('update:variant', { ...this.localVariant, preferences: newVal });
      },
    },

  },

  methods: {

    updateVariant(newVal) {
      if (this.debug) {
        console.log({ 'KinkVariant updateVariant': newVal });
      }
      this.$emit('update:variant', { ...newVal });
    },

    updatePreferences(newVal) {
      this.localVariant.preferences = newVal;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
