<template>
  <div class="column
              is-full-mobile
              box
              "
       :class="{
               'is-full': hasVariants,
               'is-narrow': !hasVariants,
               'is-half-tablet': !hasVariants,
               'is-one-quarter-desktop': !hasVariants,
               }"
       >
       <template v-if="localKink.variants">
    <div class="box name is-expanded">
      <h4
        class="title block has-text-primary has-text-centered"
        >{{ t('name',kink.name) }}</h4>
        <div v-if="getEditMode" class="block">
        <div class="buttons is-right">
          <LocaleEditor v-model:messages="localKink.messages"/>
          <ModalButtonYamlEdit v-model:dataObject="localKink" />
        </div>
        </div>
    </div>
    <Description v-if="te('description')">
    {{ t('description') }}
    </Description>

    <div
      class=" columns
              is-multiline
              is-gapless
              is-align-items-stretch
              "
      >
        <KinkVariant
          v-for="variantName in variantNames"
          :id="id+'-'+variantName"
          :key="id+'-'+variantName"
          :variantName=variantName
          :kinkName="kinkName"
          :categoryName="categoryName"
          :selectedProfile="selectedProfile"
          :subcategoryName="subcategoryName"
          />
    </div>
      </template>
        <template
          v-else
          >
          <Representation>
          <template v-slot:title>
        {{ t('name',kink.name) }}
          </template>

          <template v-slot:menu
          v-if="getEditMode">
          <LocaleEditor v-model:messages="localKink.messages"/>
          <ModalButtonYamlEdit v-model:dataObject="localKink" />
          </template>

          <template v-slot:description v-if="te('description')">
            {{ t('description') }}
          </template>

          <template v-slot:preferences>
          <KinkPreference
            :id="id+'-'+'preferences'"
            :key="id+'-'+'preferences'"
            v-model:object="localKink"
            v-model:preferences="localPreferences"
            />
        </template>
          </Representation>
        </template>
    </div>
</template>

<script>
import { defineAsyncComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import LoaderBar from '@/components/LoaderBar.vue';
import LocaleEditor from '@/components/LocaleModifier.vue';
import ModalButtonYamlEdit from '@/components/ModalButtonYamlEdit.vue';
import Representation from '@/components/Representation.vue';
import Description from '@/components/Description.vue';
import useEditMode from '@/plugins/EditMode';

export default {
  name: 'Kink',
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
    id: {
      type: String,
    },

  },

  data() {
    return {
      debug: false,
    };
  },

  emits: {
    'update:kink': (newVal) => {
      const debug = true;
      if (debug) {
        console.log({ 'Kink emit update:kink': newVal });
      }
      return true;
    },
  },
  setup(props) {
    const store = useStore();

    const kink = computed(
      () => store.getters[
        'AllKinks/getKinkForUser']({
        username: props.selectedProfile,
        categoryName: props.categoryName,
        subcategoryName: props.subcategoryName,
        kinkName: props.kinkName,
      }),
    );
    const variantNames = computed(() => kink.value.variantNames);

    const updateKink = (val) => store.dispatch('AllKinks/updateKinkForUser',
      {
        username: props.selectedProfile,
        categoryName: props.categoryName,
        subcategoryName: props.subcategoryName,
        changedKink: val,
      });

    const debug = false;
    if (debug) {
      console.log({
        msg: 'Kink.vue',
        kink,
        variantNames,
      });
    }
    const { t, te } = useI18n({
      messages: kink.value.messages || { en: { name: kink.value.name } },
    });
    const { getEditMode } = useEditMode();

    return {
      t,
      te,
      getEditMode,
      kink,
      variantNames,
      updateKink,
    };
  },

  components: {
    Representation,
    Description,
    ModalButtonYamlEdit,
    KinkVariant: defineAsyncComponent({
      loader: () => import('@/components/KinkVariant.vue'),
      loadingComponent: LoaderBar,
      delay: 40,
    }),
    KinkPreference: defineAsyncComponent({
      loader: () => import('@/components/KinkPreference.vue'),
      loadingComponent: LoaderBar,
      delay: 20,
    }),
    LocaleEditor,
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

    /* updateKink(newVal) {
      if (this.debug) {
        console.log({ 'Kink UpdateKink': newVal });
      }
      this.$emit('update:kink', { ...newVal });
    },
    */

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

    hasVariants: {
      get() {
        return this.localKink.variants
          && this.localKink.variants.length
          && this.localKink.variants.length > 0;
      },
    },

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
        // this.$emit('update:kink', { ...newVal });
        this.updateKink(newVal);
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
