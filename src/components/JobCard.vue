<template>
  <li>
    <h2>{{ jobDetails.jobTitle }}</h2>
    <p>{{jobDetails.jobLocation || 'Manchester'}}</p>
    <p>${{ jobDetails.salary }}</p>
    <p>{{ jobDetails.companyName }}</p>
    <p>Posted: {{ jobDetails.added }}</p>
    <p>{{jobDetails.summary}}</p>
    <button @click.prevent="() => handleClick(jobDetails)">See</button>
  </li>
</template>

<script>
export default {
  props: {
    jobDetails: {
      type: Object,
      required: true,
      default: null
    }
  },
  methods: {
    handleClick(job) {
      this.$emit("loadJob", { job });
    }
  }
};
</script>

<style module>
</style>