<template>
  <Title :headerLevel=5>
    <slot name="title"><!--TITLE--></slot>
  </Title>
  <Description>
  <slot name="description"><!--DESCRIPTION--></slot>
  </Description>
  <div class="column card">
    <div class="buttons is-right">
      <slot name="menu"><!--MENU--></slot>
    </div>
  </div>
  <slot name="preferences"><!--PREFERENCES--></slot>
</template>

<script>
import Description from '@/components/Description.vue';
import Title from '@/components/Title.vue';

export default {
  name: 'Representation',
  components: {
    Title,
    Description,
  },
};
</script>
