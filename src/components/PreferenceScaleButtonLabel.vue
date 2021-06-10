<template>
<label class="radio"
for="preferenceLevel.name"
>{{ preferenceName }}</label>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'PreferenceScaleButtonLabel',
  emits: [
  ],
  props: {
    localPreference: {
      type: String,
      required: false,
    },
    preferenceLevel: {
      type: Object,
      required: true,
    },

  },
  setup(props) {
    const { t } = useI18n({
      messages: props.preferenceLevel.messages || { en: { name: props.preferenceLevel.name } },
    });
    const preferenceName = t('name');
    return {
      preferenceName,
    };
  },
};
</script>
