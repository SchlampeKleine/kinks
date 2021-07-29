<template>
  <div class="box">
    <!-- Import Menu -->

    <div class="block">
    <div class="field">

      <div class="control">
        <button
          class="button"
          v-on:click="importCurKinks"
          :disabled="canImportKinks"
          >
          {{ t('button_import') }}
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>
de:
  button_import: "Importieren"
en:
  button_import: "Import"

</i18n>

<script>
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'ProfilesImportMenu',
  data() {
    return {
      loadUser: '',
    };
  },
  setup() {
    const { t } = useI18n({
    });
    const store = useStore();

    return {
      t,
      curKinks: computed(() => store.state.CurKinks.curKinks),
      curKinksAreEqal: computed(
        () => curKinksStore === curKinks,
      ),
      importCurKinks: () => store.dispatch('AllKinks/importCurKinks'),
      curKinksStore: computed(
        () => store.getters['AllKinks/getCurKinks'],
      ),
      canImportKinks: computed(
        () => store.getters['CurKinks/getImportStatus'],
      ),

    };
  },

};

</script>
