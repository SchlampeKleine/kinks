<template>
  <div
  class="
    column
    card
    "
    >
  <div class="block description has-text-justified">
    <p>
    <slot></slot>
    </p>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Description',
};
</script>
