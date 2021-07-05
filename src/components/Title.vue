<template>
  <div
  class="
    column
    card
    "
    >
    <div class="block name">
  <h1
    v-if="headerLevel===1"
    class="title block variant has-text-primary has-text-centered"
    >
  <slot></slot>
  </h1>
  <h2
    v-if="headerLevel===2"
           class="title block variant has-text-primary has-text-centered"
    >
  <slot></slot>
  </h2>
  <h3
    v-if="headerLevel===3"
           class="title block variant has-text-primary has-text-centered"
    >
  <slot></slot>
  </h3>
  <h4
    v-if="headerLevel===4"
           class="title block variant has-text-primary has-text-centered"
    >
  <slot></slot>
  </h4>
  <h5
    v-if="headerLevel===5"
           class="title block variant has-text-primary has-text-centered"
    >
  <slot></slot>
  </h5>
  <h6
    v-if="headerLevel===6"
           class="title block variant has-text-primary has-text-centered"
    >
  <slot></slot>
  </h6>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    /**
     * headerLevel to use
     * @values 1,2,3,4,5,6
     */
    headerLevel: {
      type: Number,
      required: true,
    },
  },
};
</script>
