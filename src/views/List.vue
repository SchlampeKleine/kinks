<template>
  <h1 class="title">ListView</h1>
  <table class="table">
    <thead>
      <tr>
      <template
          v-for="k in rows"
          :key="'head-' + k"
          >
          <th><abbr :title="t(k,k)">{{ k }}</abbr></th>
      </template>
      </tr>
    </thead>

    <tbody>
  <template
      v-for="(entry, idx) in curKinksList"
      :key="idx">
    <tr>
      <template
          v-for="k in rows"
          :key="'body-' + idx + '-' + k"
          >
          <td>
            {{ entry[k] }}
          </td>
      </template>
    </tr>
  </template>
    </tbody>
  </table>

  {{ curKinksList }}
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  name: 'ListView',
  setup() {
    const store = useStore();

    const curKinksList = computed(() => store.getters['CurKinks/getCurKinksAsList']);
    console.log({ 'setup curKinksList': curKinksList });

    const { t } = useI18n();
    return {
      curKinksList,
      t,
    };
  },
  data() {
    return {
      rows: [
        'category',
        'subcategory',
        'kink',
        'variant',
        'comment',
        'role',
        'preferenceLevel',
        ],
    };
  },
};

</script>
