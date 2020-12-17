<template>
  <button
    :class="[
      $style.customButton,
      $style[`${type}`],
      size ? $style[`${size}`] : null,
    ]"
    :type="buttonType"
    @click.prevent="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: '',
    },
    buttonType: {
      type: String,
      default: 'button',
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style module>
.customButton {
  background-color: #dd5800;
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 15% auto;
  border-radius: 6px;
}

.primary {
  background-color: #3cbf0a;
  color: #fff;
}

.danger {
  background-color: #f00;
  color: #fff;
}

.small {
  width: 25%;
}

.medium {
  width: 50%;
}

.large {
  width: 75%;
}
</style>
