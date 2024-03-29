<template>
  <h1 class="title">ListView</h1>

  <!-- Selection Menu -->
  <div class="columns">
    <div class="column">
      <div class="box">
        <div class="field is-horizontal">
          <label
            class="field-label is-normal"
            >{{ t('profile_a_label') }}</label>
          <div class="field-body">
            <div class="field">
              <ProfileChooser
                  v-model="usernameA"
                  />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="box">
        <div class="field is-horizontal">
          <label
            class="field-label is-normal"
            >{{ t('profile_b_label') }}</label>
          <div class="field-body">
            <div class="field">
              <ProfileChooser
                  v-model="usernameB"
                  />
            </div>
          </div>
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
          <tr>
            <template
                v-for="k in rows"
                :key="'body-' + idx + '-' + k.name"
                >
                <td :style="cellStyle(entry, k.name)">
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

<i18n lang="yaml" global>
de:
  profile_a_label: Profil A
  profile_b_label: Profil B
en:
  profile_a_label: Profile A
  profile_b_label: Profile B

</i18n>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import Color from 'color-js';

import ProfileChooser from '@/components/ProfileChooser.vue';

export default {
  name: 'ListView',
  setup() {
    const usernameA = ref('CURRENT');
    const usernameB = ref('CURRENT');

    const store = useStore();

    const { t } = useI18n();

    return {
      usernameA,
      usernameB,
      getUsers: computed(() => store.getters['AllKinks/getAvailableUsers']),
      t,
      curKinksList: computed(() => (
        store.getters['AllKinks/getKinksSideBySide'](
          usernameA.value,
          usernameB.value,
        )
      )),
    };
  },
  components: {
    ProfileChooser,
  },
  data() {
    return {
      rows: [
        {
          name: 'category', show: true, sortMode: '',
        },
        {
          name: 'subcategory', show: true, sortMode: '',
        },
        {
          name: 'kink', show: true, sortMode: '',
        },
        {
          name: 'variant', show: true, sortMode: '',
        },
        {
          name: 'roleA', show: true, sortMode: '',
        },
        {
          name: 'commentA', show: true, sortMode: '',
        },
        {
          name: 'preferenceLevelA', show: true, sortMode: '',
        },
        {
          name: 'roleB', show: true, sortMode: '',
        },
        {
          name: 'commentB', show: true, sortMode: '',
        },
        {
          name: 'preferenceLevelB', show: true, sortMode: '',
        },
      ],
      sortKey: '',
    };
  },
  methods: {

    /**
     * gets the style for a cell
     * @param {Object} entry
     * @param {string} column
     * @return {Object} - Style object
     */
    cellStyle(entry, column) {
      const lastLetter = column.slice(-1);

      if ((['A', 'B']).includes(lastLetter)) {
        const color = entry[
          `color${lastLetter}`
        ];
        if (color) {
          return {
            'background-color': color,
            color: this.findColorInvert(color),
          };
        }
      }
      return {};
    },

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

  },
  computed: {

    sortedKinkList: {
      get() {
        const tmpList = this.curKinksList;
        if (this.sortKey === '') {
          return tmpList;
        }
        if (this.sortKey === 'preferenceLevelA') {
          return tmpList.sort((a, b) => (a.sortKeyA < b.sortKeyA));
        }
        if (this.sortKey === 'preferenceLevelB') {
          return tmpList.sort((a, b) => (a.sortKeyB < b.sortKeyB));
        }
        return tmpList.sort((a, b) => (a[this.sortKey] < b[this.sortKey]));
      },

    },

  },
};

</script>
