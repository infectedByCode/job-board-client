<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <li v-for="job in jobs" :key="job.jobId">
        {{ job.jobId }}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      jobs: null,
    };
  },
  created() {
    axios.get('http://localhost:3000/jobs').then((response) => {
      if (response.status === 200 && response.data) {
        this.jobs = response.data.jobs;
      }
    });
  },
};
</script>
