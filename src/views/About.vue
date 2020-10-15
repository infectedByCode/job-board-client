<template>
  <div>
    <h1>Jobs</h1>
    <ul>
      <li v-for="job in jobs" :key="job.jobId" :class="$style.jobCard">
        <h2>{{ job.jobTitle }}</h2>
        <p>{{ job.companyName }}</p>
        <span>
          <p>
            {{ job.salary }}
          </p>
          <p>
            {{ job.added }}
          </p>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';

export default {
  name: 'Jobs',
  data() {
    return {
      jobs: null,
    };
  },
  created() {
    axios.get('http://localhost:3000/jobs').then((response) => {
      if (response.status === 200 && response.data) {
        this.jobs = response.data.jobs;
        this.jobs.map((job) => {
          job.added = this.formatDate(job.createdAt);
          return job;
        });
      }
    });
  },
  methods: {
    formatDate(date) {
      const numOfDays = differenceInCalendarDays(new Date(), new Date(date));
      return `${numOfDays} day${numOfDays > 1 ? 's' : ''} ago`;
    },
  },
};
</script>
<style module>
ul {
  padding: 0;
}

.jobCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  padding: 2.5% 7.5%;
  height: 150px;
  width: 60%;
  background: hotpink;
  list-style: none;
}

.jobCard > h2,
.jobCard > p {
  margin: 0;
  line-height: 36px;
}

.jobCard > span {
  display: flex;
  justify-content: space-between;
}
</style>
