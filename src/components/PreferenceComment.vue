<template>
  <div class=" comment">
    <input
      :key="id+'-'+'input'"
      :placeholder="t('placeholder-comment')"
      class="input is-rounded"
      v-model.lazy="computedComment"
      />
  </div>
</template>

<i18n lang="yaml">
en:
  placeholder-comment: Comment
de:
  placeholder-comment: Kommentar
</i18n>

<script>
import { useI18n } from 'vue-i18n';

export default {
  name: 'PreferenceComment',
  emits: [
    'update:comment',
  ],
  props: {

    id: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
      default: '',
    },
  },

  setup() {
    const { t } = useI18n({
      useScope: global,
    });

    return {
      t,
    };
  },

  methods: {

    updateComment(newVal) {
      this.$emit('update:comment', newVal);
    },

  },
  computed: {

    computedComment: {
      get() {
        return this.comment;
      },
      set(newVal) {
        this.updateComment(newVal);
      },
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
