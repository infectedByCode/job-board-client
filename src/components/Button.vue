<template>
  <button :class="$style.customButton" @click.prevent="handleClick">
    <slot />
  </button>
</template>

<script>
export default {
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
</style>