<template>
  {{ t(preferenceLevel.name, preferenceLevel.name) }}
</template>

<script>
import { useI18n } from 'vue-i18n';
import { languages } from '@/i18n';

export default {

  name: 'PreferenceScaleButtonLabel',

  props: {
    preferenceLevel: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { t } = useI18n({
      useScope: global,
      messages: props.preferenceLevel.messages,
    });

    return {
      t,
    };
  },

};
</script>
