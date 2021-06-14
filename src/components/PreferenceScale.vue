<template>
  <div
    class=" field
            preference-role-identifier"
    >
    <div class="field-label">
      <label class="label">
        {{ t(localRole.name,localRole.name) }}
      </label>
    </div>
    <div
      class=" field-body control
              reference
              buttons"
      >
      <template
        v-for="preferencelevel in getPreferenceLevels()"
        v-bind:key="key+'-'+preferencelevel"
        >
        <div
          class=" control
                  is-expanded
                  is-justify-content-space-between"
          :style="labelStyle(preferencelevel)"
          >
          <label
            class="radio"
            :style="labelStyle"
            >
            <input
              type="radio"
              label="preferencelevel.name"
              v-model="localPreference"
              :value="preferencelevel.name"
              />
            <PreferenceScaleButtonLabel
              :preferenceLevel="preferencelevel"
              />
          </label>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { preferenceLevels } from '@/assets/levels.yaml'; // is used in v-for
import PreferenceScaleButtonLabel from '@/components/PreferenceScaleButtonLabel.vue';

export default {
  name: 'PreferenceScale',
  emits: [
    //  'update:preference',
    'update:role',
  ],
  data() {
    return {
      localPreference: null,
    };
  },
  setup(props) {
    const { t } = useI18n({
      useScope: 'global',
      messages: props.role.messages,
    });
    return {
      t,
    };
  },

  methods: {
    getPreferenceLevels() {
      return preferenceLevels;
    },

    labelStyle(preferenceLevel) {
      return {
        'background-color': preferenceLevel.color,
      };
    },
  },

  props: {
    key: {
      type: String,
    },
    role: {
      type: Object,
      required: true,
      /*
      default() {
        return {
          preference: null,
        };
      },
      */
    },

  },
  watch: {

    role: {
      deep: true,
      immediate: true,
      handler(newVal) {
        // console.log({ 'PreferenceScale: role changed': newVal});
        this.localRole = newVal;
      },
    },

    localRole: {
      handler(newVal) {
        // console.log({ 'PreferenceScale: localRole changed': newVal });
        this.localPreference = newVal.preference;
        this.$emit('update:role', newVal);
      },
      deep: true,
      immediate: true,
    },

    localPreference: {
      handler(newVal) {
        this.localRole.preference = newVal;
      },
      immediate: true,
    },
  },
  components: {
    PreferenceScaleButtonLabel,
  },
  computed: {

    localRole: {
      get() {
        return this.role;
      },
      set(newVal) {
        this.$emit('update:role', newVal);
      },
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.field-body {
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
}
</style>
