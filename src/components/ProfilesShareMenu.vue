<template>
  <div class="box">
<!-- Share Menu -->

    <div class="field has-addons">
      <div class="control">
        <input class="input" type="text" :value="shareLink" readonly>
      </div>
      <div class="control">
        <button
          class="button"
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
/**
* Sources
* - https://axelhodler.medium.com/web-share-api-in-vue-js-f5b65db80f28
* - https://stackoverflow.com/questions/63401547/how-to-get-baseurl-inside-vuejs-method-using-vue-router
* */
import { useRouter } from 'vue-router';

import { useI18n } from 'vue-i18n';
import { Base64 } from 'js-base64';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ProfilesShareMenu',

  setup() {
    const { t } = useI18n({
    });
    const router = useRouter();
    const store = useStore();

    return {
      t,
      shareLink: computed(
        () => {
          const objectString = store.getters['CurKinks/getCurKinksAsURI'];
          return `${window.location.origin}/load/${encodeURIComponent(objectString)}`;
        },
      )
      ,
    };
  },

  methods: {

    shareViaWebShare() {
      navigator.share({
        title: 'Title to be shared',
        text: 'Text to be shared',
        url: shareLink,
      });
    },

  },

  computed: {

    webShareApiSupported() {
      return navigator.share;
    },

  },
};
</script>
