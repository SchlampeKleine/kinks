<template>
  <h1 class="title">ListView</h1>
  <table class="table">
    <tbody>
  <template
      v-for="(entry, idx) in curKinksList"
      :key="idx">
    <tr>
      <td>
        {{ entry.category }}
      </td>
      <td>
        {{ entry.subcategory }}
      </td>
      <td>
        {{ entry.kink }}
      </td>
      <td>
        {{ entry.variant }}
      </td>
      <td>
        {{ entry.comment }}
      </td>
      <td>
        {{ entry.role }}
      </td>
      <td>
        {{ entry.preferenceLevel }}
      </td>
    </tr>
  </template>
    </tbody>
  </table>

  {{ curKinksList }}
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'ListView',
  setup() {
    const store = useStore();

    const curKinksList = computed(() => store.getters['CurKinks/getCurKinksAsList']);
    console.log({ 'setup curKinksList': curKinksList });

    return {
      curKinksList,
    };
  },
};

</script>
