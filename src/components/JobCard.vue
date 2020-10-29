<template>
  <li>
    <h2>{{ jobDetails.jobTitle }}</h2>
    <p>{{jobDetails.jobLocation || 'Manchester'}}</p>
    <p>${{ jobDetails.salary }}</p>
    <p>{{ jobDetails.companyName }}</p>
    <p>Posted: {{ jobDetails.added }}</p>
    <p>{{jobDetails.summary}}</p>
    <Button @click="() => handleClick(jobDetails)">Learn More</Button>
  </li>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  components: {
    Button
  },
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