<template>
  <div class="box">
    <!-- Patch Menu -->

    <div class="field">
      <div class="control">
        <button
          class="button"
          v-on:click="patchProfile"
          >
          {{ t('button_patch') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>

de:
  button_patch: "Kink-Schema aktualisieren"
en:
  button_patch: "Update kink-scheme"

</i18n>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';

export default {
  name: 'ProfilesPatchCurrentMenu',
  setup() {
    const { t } = useI18n({
    });
    const store = useStore();

    return {
      t,
      patchProfile: () => store.commit('AllKinks/updateUserKinkFormat'),
    };
  },
};
</script>
