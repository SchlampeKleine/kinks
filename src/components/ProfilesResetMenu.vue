<template>
  <div class="box">
    <!-- Reset Menu -->

    <div class="field">
      <div class="control">
        <button
          class="button"
          v-on:click="resetMyKinks(user)"
          >
          {{ t('button_reset') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>

de:
  button_reset: "Standard wiederherstellen"
en:
  button_reset: "Reset my kinks"

</i18n>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'ProfilesResetMenu',
  props: {
    defaultKinks: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n({
    });
    return {
      t,
    };
  },
  methods: {

    resetMyKinks() {
      this.localMyKinks = this.defaultKinks;
    },

  },
  computed: {

    localMyKinks: {
      get() {
        return this.myKinks;
      },
      set(newVal) {
        // console.log({"UserOptions: Setting new myKinks":newVal})
        this.$emit('update:myKinks', newVal);
      },
    },

  },
};
</script>
