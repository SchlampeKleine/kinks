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
import { defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';
import KinkPreference from '@/components/KinkPreference.vue';
import { useI18n } from 'vue-i18n';
import LocaleEditor from '@/components/LocaleModifier.vue';
import ModalButtonYamlEdit from '@/components/ModalButtonYamlEdit.vue';
import Representation from '@/components/Representation.vue';
import useEditMode from '@/plugins/EditMode';

export default {
  name: 'KinkVariant',

  props: {

    selectedProfile: {
      type: String,
      required: true,
    },
    kinkName: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    subcategoryName: {
      type: String,
    },
    variantName: {
      type: String,
      required: true,
    },

    id: {
      type: String,
    },

  },

  data() {
    return {
      debug: true,
    };
  },

  setup(props) {
    const store = useStore();
    const variant = computed(() => store.getters[
      'AllKinks/getVariantForUser'
    ]({
      username: props.selectedProfile,
      categoryName: props.categoryName,
      subcategoryName: props.subcategoryName,
      kinkName: props.kinkName,
      variantName: props.variantName,
    }));

    const { t, te } = useI18n({
      messages: variant.value.messages || { en: { name: variant.value.name } },
    });
    const updateVariant = (val) => store.dispatch('AllKinks/updateVariantForUser',
      {
        username: props.selectedProfile,
        kinkName: props.kinkName,
        categoryName: props.categoryName,
        subcategoryName: props.subcategoryName,
        changedVariant: val,
        debug: true,
      });

    const { getEditMode } = useEditMode();
    return {
      t,
      te,
      getEditMode,
      variant,
      updateVariant,
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
        // this.$emit('update:variant', { ...newVal });
        this.updateVariant(newVal);
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
        // this.$emit('update:variant', { ...this.localVariant, preferences: newVal });

        this.updateVariant({ ...this.localVariant, preferences: newVal });
      },
    },

  },

  methods: {

    updateVariantOld(newVal) {
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
