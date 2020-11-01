<template>
  <button :class="[$style.customButton,$style[`${type}`]]" @click.prevent="handleClick">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "primary"
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
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
</style>