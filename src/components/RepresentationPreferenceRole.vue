<template>
  <div
    class="
           field
           preference-role-identifier
           "
    >
    <slot name="title"><!--TITLE--></slot>
    <slot name="description"><!--DESCRIPTION--></slot>
    <slot name="preferencelevel"><!--PREFERENCELEVEL--></slot>
  </div>
</template>

<script>

export default {
  name: 'RepresentationPreferenceRole',
};
</script>
