<template>
  <div class="
              card
              column
              is-half-mobile
              "
       >

       <RepresentationPreferenceRole>

       <template v-slot:title>
         <div class="field-label block">
           <label
             class="label block"
             >{{ t(localRole.name,localRole.name) }}</label>
         </div>
       </template>

       <template v-slot:description>
         <Description v-if="te('description')" >
           {{ t('description') }}
         </Description>
       </template>

       <template v-slot:preferencelevel>
    <div
      class="
             card
             field-body
             preference
             level
             block
             buttons
             "
      >
      <template
        v-for="preferencelevel in getPreferenceLevels()"
        :key="id+'-'+preferencelevel"
        >
        <div
          class="
                 control
                 is-expanded
                 expanded-radio
                 level-item
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
       </template>
    </RepresentationPreferenceRole>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
import { preferenceLevels } from '@/assets/levels.yaml'; // is used in v-for
import PreferenceScaleButtonLabel from '@/components/PreferenceScaleButtonLabel.vue';
import Description from '@/components/Description.vue';
import RepresentationPreferenceRole from '@/components/RepresentationPreferenceRole.vue';
import Color from 'color-js';

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
    const { t, te } = useI18n({
      messages: props.role.messages,
    });
    return {
      t,
      te,
    };
  },

  methods: {

    getPreferenceLevels() {
      return preferenceLevels;
    },

    /*
     * Source
     * https://bulma.io/documentation/overview/functions/
     */
    findColorInvert(color) {
      if (Color(color).getLuminance() > 0.55) {
        return 'rgba(0,0,0,0.7)';
      }
      return '#fff';
    },

    labelStyle(preferenceLevel) {
      return {
        'background-color': preferenceLevel.color,
        color: this.findColorInvert(preferenceLevel.color),
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
    RepresentationPreferenceRole,
    PreferenceScaleButtonLabel,
    Description,
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
  /*
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  */
}
/*
 * Source
 * https://stackoverflow.com/questions/26275982/putting-moz-available-and-webkit-fill-available-in-one-width-css-property
 */
.expanded-radio {
  width: -moz-available;          /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
  width: stretch;
}
</style>
