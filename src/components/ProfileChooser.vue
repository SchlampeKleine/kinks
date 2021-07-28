<template>
    <div class="control">
      <div class="select">
        <select v-model="value">
          <option disabled value="">
          {{ t('profile_select_choice') }}
          </option>
          <option
              v-for="user in getUsers"
              :key="user"
              >
              {{ user }}
          </option>
        </select>
        <div class="help">
          {{ t('profile_select_help') }}
        </div>
      </div>
  </div>
</template>

<i18n lang="yaml" global>
de:
  profile_select_choice: >
    Bitte waehle ein Profil
  profile_select_help: Vorhandene Profile
en:
  profile_select_choice: >
    Please select a profile
  profile_select_help: Available profiles

</i18n>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'ProfileChooser',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n();

    const store = useStore();

    return {
      getUsers: computed(() => store.getters['AllKinks/getAvailableUsers']),
      t,
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  emits: ['update:modelValue'],
};

</script>
