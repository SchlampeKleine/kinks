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
        :key="id+'-'+preferencelevel"
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
              :name="id"
              :key="id+'-'+preferencelevel.name"
              label="preferencelevel.name"
              v-model="computedPreference"
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
    id: {
      type: String,
      required: true,
    },
    preference: {
      type: String,
      default: '',
    },
    role: {
      type: Object,
      required: true,
    },

  },

  components: {
    PreferenceScaleButtonLabel,
  },

  computed: {

    computedPreference: {
      get() {
        return this.role.preference;
      },
      set(newVal) {
        if (this.debug) {
          console.log({ 'PreferenceScale computedPreference set': newVal });
        }
        this.$emit('update:role', { ...this.role, preference: newVal });
      },

    },

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
