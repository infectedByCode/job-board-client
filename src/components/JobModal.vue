<template>
  <div @click="handleClick">
    <slot />
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$emit("closeModal");
    }
  }
};
</script>

<style module>
</style>