<template>
<select v-model="locale">
  <option value="en">en</option>
  <option value="de">de</option>
</select>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'LocaleSwitcher',
  setup() {
    const { locale } = useI18n({ useScope: 'global' });
    return {
      locale,
    };
  },
};
</script>
