<template>
  <div :class="[$style.alert, $style[`alert${variant}`]]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    variant: {
      type: String,
      required: false,
      default: 'Info',
    },
  },
};
</script>

<style module>
.alert {
  padding: 10px;
  margin: 5px;
}

.alertInfo {
  border-left: 1px solid #555;
}

.alertSuccess {
  border-left: 1px solid #15c257;
}

.alertError {
  border-left: 1px solid #c21515;
}
</style>
