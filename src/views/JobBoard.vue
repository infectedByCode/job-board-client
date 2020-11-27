<template>
  <div :class="$style.jobBoard">
    <JobModal v-if="showModal && selectedJob" :class="$style.modal" @closeModal="showModal = false">
      <span>
        <h1>{{ selectedJob.jobTitle }}</h1>
        <h2>{{ selectedJob.companyName }}</h2>
        <p>{{ selectedJob.jobText}}</p>
        <Button @click="transferToJob">Apply</Button>
      </span>
    </JobModal>
    <ul>
      <JobCard
        v-for="job in jobs"
        :key="job.jobId"
        :class="$style.jobCard"
        :job-details="job"
        @loadJob="(payload) => loadJobDetails(payload)"
      />
    </ul>
  </div>
</template>
<script>
import { differenceInCalendarDays } from "date-fns";
import { fetchJobs, fetchJobsBySearch } from "../utils/api";
import Button from "../components/Button";
import JobCard from "../components/JobCard";
import JobModal from "../components/JobModal";

export default {
  name: "Jobs",
  components: {
    Button,
    JobCard,
    JobModal
  },
  props: {
    searchTerm: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      jobs: null,
      selectedJob: null,
      showModal: false
    };
  },
  created() {
    if (this.searchTerm !== null) {
      fetchJobsBySearch(this.searchTerm).then(result => {
        if (result instanceof Error) {
          // TODO: Add error handler
        }
        result.map(job => {
          job.added = this.formatDate(job.createdAt);
          job.summary = this.formatRole(job.jobText);
          return job;
        });
        this.jobs = result;
      });
    } else {
      fetchJobs().then(result => {
        if (result instanceof Error) {
          // TODO: Add error handler
        }
        result.map(job => {
          job.added = this.formatDate(job.createdAt);
          job.summary = this.formatRole(job.jobText);
          return job;
        });
        this.jobs = result;
      });
    }
  },
  methods: {
    formatDate(date) {
      const numOfDays = differenceInCalendarDays(new Date(), new Date(date));
      this.formatRole("t");
      return `${numOfDays} day${numOfDays > 1 ? "s" : ""} ago`;
    },
    formatRole(text) {
      if (text.length < 70) return text;
      return `${text.slice(0, 67)}...`;
    },
    loadJobDetails(payload) {
      this.selectedJob = payload.job;
      this.showModal = true;
    },
    transferToJob() {
      this.$router.push({
        name: "Job Advert",
        params: {
          id: this.selectedJob.jobId.slice(0, 8),
          jobDetails: this.selectedJob
        }
      });
    }
  }
};
</script>
<style module>
.jobBoard {
  background-color: #f2f2f2;
  overflow-y: scroll;
}

.jobBoard ul {
  padding: 0;
}

.modal {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: rgb(155, 155, 155);
  background-color: rgba(155, 155, 155, 0.7);
  width: 100%;
  height: 100%;
}

.modal > span {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: rgb(248, 248, 248);
  width: 80%;
  height: 80%;
  margin: 0 auto;
  padding: 5%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.jobCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  background-color: #fff;
  box-shadow: #dddddd 2px 2px 5px;
  margin: 10px auto;
  padding: 7.5%;
  height: 200px;
  width: 80%;
  border-radius: 6px;
  list-style: none;
}

.jobCard > button {
  margin: 0 auto;
}

.jobCard > h2,
.jobCard > p {
  margin: 0 0 5px 0;
}

@media (min-width: 1023px) {
  .jobBoard {
    width: 60%;
    margin: 0 auto;
  }
}
</style>
