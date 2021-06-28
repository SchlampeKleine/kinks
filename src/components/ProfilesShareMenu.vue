<template>
  <div class="box">
<!-- Share Menu -->

    <div class="field">
      <div class="control">
        <button
          class="button"
          v-on:click="shareMyKinks(getKinksForUser(user))"
          >
          {{ t('button_share') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n lang="yaml" global>
de:
  button_share: "Kinks teilen"
en:
  button_share: "Share my kinks"

</i18n>
<script>
import { useI18n } from 'vue-i18n';
import { Base64 } from 'js-base64';

export default {
  name: 'ProfilesShareMenu',
  setup() {
    const { t } = useI18n({
    });
    return {
      t,
    };
  },
  methods: {

    b64Encode(val) {
      return Base64.encodeURI(val);
    },

  },
};
</script>
