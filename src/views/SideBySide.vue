<template>
  <h1 class="title">ListView</h1>

  <!-- Load Menu -->
  <div class="box">
    <div class="block">
    <div class="field has-addons">

      <div class="control">
        <div class="select">
          <select v-model="usernameA">
            <option disabled value="">
            {{ t('loadUser_choice') }}
            </option>
            <option
              v-for="user in getUsers"
              :key="user"
              >
              {{ user }}
            </option>
          </select>
          <div class="help">
            {{ t('help_field_loadUser') }}
          </div>
        </div>
      </div>
      <div class="control">
        <button
          class="button"
          v-on:click="loadKinksForUser(loadUser)"
          :disabled="canLoadKinks(loadUser)"
          >
          {{ t('button_load') }}
        </button>
      </div>
    </div>
    </div>
  </div>

  <div class="box">
    <div class="block">
    <div class="field has-addons">

      <div class="control">
        <div class="select">
          <select v-model="usernameB">
            <option disabled value="">
            {{ t('loadUser_choice') }}
            </option>
            <option
              v-for="user in getUsers"
              :key="user"
              >
              {{ user }}
            </option>
          </select>
          <div class="help">
            {{ t('help_field_loadUser') }}
          </div>
        </div>
      </div>
      <div class="control">
        <button
          class="button"
          v-on:click="loadKinksForUser(loadUser)"
          :disabled="canLoadKinks(loadUser)"
          >
          {{ t('button_load') }}
        </button>
      </div>
    </div>
    </div>
  </div>

  <div class="table-container">
  <table class="table">
    <thead>
      <tr>
      <template
          v-for="k in rows"
          :key="'head-' + k.name"
          >
          <th>
            <span class="icon-text">
              <button
                  :v-if="k.show"
                  class="button is-small"
                  @click="toggleSort(k)"
                >
              <span>
                <abbr :title="t(k.name,k.name)">{{ k.name }}</abbr>
              </span>
              <span class="icon">
                <i :class="sortIcon(k)"></i>
              </span>
              </button>
              <template
                  :v-if="false">
              <button
                    class="button is-small"
                    @click="toggleColumnVisibility(k)"
                    >
              <span class="icon">
                <i
                    :class="showIcon(k)"
                  ></i>
              </span>
              </button>
              </template>
            </span>
          </th>
      </template>
      </tr>
    </thead>

    <tbody>
  <template
      v-for="(entry, idx) in sortedKinkList"
      :key="idx">
    <tr :style="rowStyle(entry)">
      <template
          v-for="k in rows"
          :key="'body-' + idx + '-' + k.name"
          >
          <td>
            <span :v-if="k.show">
            {{ entry[k.name] }}
            </span>
          </td>
      </template>
    </tr>
  </template>
    </tbody>
  </table>
  </div>

</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Color from 'color-js';

export default {
  name: 'ListView',
  setup() {
    const store = useStore();

    const { t } = useI18n();

    return {
      getUsers: computed(() => store.getters['AllKinks/getAvailableUsers']),
      t,
      getKinksSideBySide: (usernameA, usernameB) => (
        store.getters['AllKinks/getKinksSideBySide'](
          usernameA,
          usernameB,
        )
      ),
    };
  },
  data() {
    return {
      usernameA: '',
      usernameB: '',
      rows: [
        { name: 'category', show: true, sortMode: '' },
        { name: 'subcategory', show: true, sortMode: '' },
        { name: 'kink', show: true, sortMode: '' },
        { name: 'variant', show: true, sortMode: '' },
        { name: 'commentA', show: true, sortMode: '' },
        { name: 'preferenceLevelA', show: true, sortMode: '' },
        { name: 'roleA', show: true, sortMode: '' },
        { name: 'roleB', show: true, sortMode: '' },
        { name: 'commentB', show: true, sortMode: '' },
        { name: 'preferenceLevelB', show: true, sortMode: '' },
      ],
      sortKey: '',
    };
  },
  methods: {

    canLoadKinks(user) {
      const users = this.getUsers;
      return !(users.includes(user));
    },

    toggleSort(k) {
      if (k.sortMode === '') {
        this.rows[
          this.rows.findIndex((element) => element.name === k.name)
        ].sortMode = 'up';
      }
      if (k.sortMode === 'up') {
        this.rows[
          this.rows.findIndex((element) => element.name === k.name)
        ].sortMode = 'down';
      }
      if (k.sortMode === 'down') {
        this.rows[
          this.rows.findIndex((element) => element.name === k.name)
        ].sortMode = '';
      }
      this.sortKey = k.name;
    },

    toggleColumnVisibility(k) {
      this.rows[
        this.rows.findIndex((element) => element.name === k.name)
      ].show = !k.show;
    },

    showIcon(k) {
      return k.show
        ? ['fas', 'fa-eye'].join(' ')
        : ['fas', 'fa-eye-slash'].join(' ');
    },

    sortIcon(k) {
      if (k.mode === 'up') {
        return ['fas', 'fa-sort-up'].join(' ');
      }
      if (k.mode === 'down') {
        return ['fas', 'fa-sort-down'].join(' ');
      }
      return ['fas', 'fa-sort'].join(' ');
    },

    /*
     * Source
     * https://bulma.io/documentation/overview/functions/
     */
    findColorInvert(color) {
      if (Color(color).getLuminance() > 0.55) {
        return 'rgba(0,0,0,0.7)';
      }
      return '#fff';
    },

    rowStyle(rowEntry) {
      if (rowEntry.color) {
        return {
          'background-color': rowEntry.color,
          color: this.findColorInvert(rowEntry.color),
        };
      }
      return {};
    },

  },
  computed: {

    curKinksList: {
      get() {
        return this.getKinksSideBySide(this.usernameA, this.usernameB);
      },

    },
    sortedKinkList: {
      get() {
        const tmpList = this.curKinksList;
        if (this.sortKey === '') {
          return tmpList;
        } if (this.sortKey === 'preferenceLevel') {
          return tmpList.sort((a, b) => (a.sortKey < b.sortKey));
        }
        return tmpList.sort((a, b) => (a[this.sortKey] < b[this.sortKey]));
      },

    },

  },
};

</script>
