<template>
  <div>
    <h1>WELCOME TO YOUR DASHBOARD</h1>
  </div>
</template>

<script>
import { fetchJobseekerInformation } from "../utils/api";
export default {
  data() {
    return {
      userDetails: null
    };
  },
  created() {
    fetchJobseekerInformation("1234").then(data => (this.userDetails = data));
  }
};
</script>

<style module>
</style>