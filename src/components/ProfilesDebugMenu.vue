<template>
  <div class="box" >
       <!-- Debug Menu  -->

    <div class="field">
      <div class="control"
           >
           <button
             class="button"
             v-on:click="dumpMyKinks"
             >
             {{ t('button_dump') }}
           </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>
de:
  button_dump: "Kinks dumpen"
en:
  button_dump: "Dump my kinks"
</i18n>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'ProfilesDebugMenu',
  setup() {
    const { t } = useI18n({
    });
    return {
      t,
    };
  },
  methods: {
    dumpMyKinks() {
      console.log(this.myKinks);
    },
  },

};
</script>
