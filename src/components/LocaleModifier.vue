<template>
  <button @click="modalOpen = true" class="button is-small">
    {{ t('edit-button') }}
  </button>

  <teleport to="body">
  <transition name="modal">
  <div v-if="modalOpen" class="modal" :class="{'is-active': modalOpen}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box" v-if="debug">
        {{ localMessages }}
      </div>
      <div
        v-for="(localizedMessages,lang) in messages"
        :key="lang"
        class="box"
        >
        {{ lang }}
        <div v-for="(translationKey) in ['name','description']"
             :key="lang+'-'+translationKey">
          <div class="field">
            <div class="field-label is-normal">
              <label class="label">{{ t('label-'+ translationKey) }}</label>
              {{ translationKey }}:
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                <input
                  v-bind:value="localMessages[lang][translationKey]"
                  @change="(event) =>
                           { localMessages[lang][translationKey] = event.target.value;}"
                  :placeholder="t('placeholder-'+translationKey)" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="true" class="box">
        TODO: FIX THIS
        <div class="field">
          <div class="field-label is-normal">
            <label class="label">{{ t('label-locale') }}</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
              <input
                v-model="newLocale"
                :placeholder="t('placeholder-addLocale')" />
              </p>
            </div>
          </div>
          <button
            @click="$emit('update:messages',
                        { [newLocale]: {name:'',description:''} ,
                        ...localMessages }),
                        localMessages={
                        [newLocale]: {name: '', description: '', }
                        , ...messages,
                        }"
            >
            {{ t('button-addLocale') }}
          </button>
        </div>
      </div>
    </div>
    <button
      class="button"
      @click="$emit('update:messages',{ ...localMessages }), modalOpen = false"
      >
      Save
    </button>
      <button
        class="button"
        @click="modalOpen = false, loadMessages"
        >
        Cancel
      </button>
        <button
          @click="modalOpen = false"
          class="modal-close"
          :class="{'is-active': modalOpen}"
          >
          Close
        </button>
  </div>
  </transition>
  </teleport>

</template>

<i18n lang="yaml" global>
de:
  edit-button: "Editieren"
  button-addLocale: "Sprache hinzufuegen"
  label-locale: "Sprachenkuerzel"
  placeholder-addLocale: "z.B. de oder de-AT"
  placeholder-name: "Bennenung"
  label-name: Name
  placeholder-description: "Beschreibung des Objekts"
  label-description: "Beschreibung"
en:
  edit-button: "Edit"
  button-addLocale: "Add locale"
  label-locale: "Locale Code"
  placeholder-addLocale: "e.g. en or en-GB"
  placeholder-name: "Name"
  label-name: Name
  placeholder-description: "Description of the object"
  label-description: "Description"
</i18n>

<script>
import { useI18n } from 'vue-i18n';
import { reactive } from 'vue';

export default {
  name: 'LocaleEditor',
  props: {
    messages: {
      type: Object,
      required: true,
      default() {
        return {
          en: {
            name: '',
            description: '',
          },
        };
      },
    },
  },
  emits: {
    'update:messages': null,
  },
  data() {
    return {
      modalOpen: false,
      debug: true,
      newLocale: null,
    };
  },
  methods: {
    loadMessages() {
      if (this.debug) {
        console.log({ ...this.messages });
      }
      this.localMessages = { ...this.messages };
    },

  },
  setup(props) {
    const { t } = useI18n({
      // scope: 'global',
    });
    const localMessages = reactive(props.messages);
    return {
      t,
      localMessages,
    };
  },
};
</script>

<style lang="scss">
// https://v3.vuejs.org/examples/modal.html
/*
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}
*/
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
/*
// https://v3.vuejs.org/guide/teleport.html#using-with-vue-components
.modal {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}
*/
  </style>
