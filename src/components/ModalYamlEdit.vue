<template>
  <transition>
  <div class="modal" :class="{ 'is-active': modalShow}">
    <div class="modal-background"></div>
    <div
      class="modal-content"
      :style="{ 'max-height': '100%' }"
      >
      <div>
        <div class="box">
          <div class="block">
            <textarea
              v-if="dataObject"
              v-model="tmpDataObject"
              class="textarea has-fixed-size"
              :rows="Math.min(tmpDataObjectRowCount,10)"
              ></textarea>
          </div>
      <div class="block">
        <div class="buttons is-right">
          <button
            class="button is-small"
            @click="localDataObject=yaml_parse(tmpDataObject)"
            > {{ t('button_modal_save') }} </Button>
            <button
              class="button is-small"
              @click="tmpDataObject=yaml_dump(localDataObject)"
              > {{ t('button_modal_reset') }} </Button>
              <button
                class="button is-small"
                @click="closeModal"
                > {{ t('button_modal_close') }} </Button>
        </div>
      </div>
        </div>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @keyup.esc="closeModal"
      @click="closeModal"
      ></button>
  </div>
  </transition>
</template>

<i18n lang="yaml">
de:
  button_modal_save: Speichern
  button_modal_reset: Zuruecksetzen
  button_modal_close: Schliessen
en:
  button_modal_save: Save
  button_modal_reset: Reset
  button_modal_close: Close
</i18n>

<script>
import { useI18n } from 'vue-i18n';

const yaml = require('js-yaml');

export default {
  name: 'ModalYamlEdit',
  inheritAttrs: false,
  props: {
    dataObject: {
      type: Object,
      required: true,
    },
    /**
     * Whether to show the modal or not
     */
    modalShow: {
      type: Boolean,
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
  data() {
    return {
      tmpDataObject: '',
    };
  },
  mounted() {
    this.tmpDataObject = yaml.dump(this.dataObject);
  },
  emits: [
    'update:dataObject',
  ],
  methods: {
  // TODO methods yaml_dump yaml_parse
    /**
     * Dumps an object as a yaml string
     * @param {Object} o
     * @value String
     */
    yaml_dump(o) {
      return yaml.dump(o);
    },
    /**
     * Creates an object from a yaml string
     * @param {String} s
     * @value Object
     */
    yaml_parse(s) {
      return yaml.load(s);
    },
    closeModal() {
      this.$emit('update:modalShow', false);
    },
  },
  computed: {
    localDataObject: {

      get() {
        return yaml.dump(this.dataObject);
      },
      set(newVal) {
        this.$emit('update:dataObject', yaml.load(newVal));
      },
    },

    tmpDataObjectRowCount: {
      get() {
        console.log({ tmpDataObject: this.tmpDataObject.split('\n') });
        return 30;
      },

    },
  },
};
</script>
