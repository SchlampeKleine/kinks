<template>
  <div v-if="dataObject">
    <button class="button is-small" @click="modalShow=true" >
      show modal
    </button>

        <!--
          source
          https://stackoverflow.com/questions/55515479/passing-data-to-props-after-asynchronous-call-in-vue
        -->
        <teleport to="body">
        <div v-if="modalShow">
            <ModalYamlEdit v-model:dataObject="localDataObject" v-model:modalShow="modalShow"/>
        </div>
        </teleport>
  </div>

</template>

<script>
import { defineAsyncComponent } from 'vue';
import LoaderBar from '@/components/LoaderBar.vue';

export default {
  name: 'ModalButtonYamlEdit',
  inheritAttrs: true,
  props: {
    dataObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      /**
       * whether to show the modal or not
       */
      modalShow: false,
    };
  },
  components: {
    ModalYamlEdit: defineAsyncComponent({
      loader: () => import('@/components/ModalYamlEdit.vue'),
      loadingComponent: LoaderBar,
    }),
  },
  emits: [
    'update:dataObject',
  ],
  computed: {
    localDataObject: {
      get() {
        return this.dataObject;
      },
      set(newVal) {
        this.$emit('update:dataObject', newVal);
      },
    },
  },
};
</script>
