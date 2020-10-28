<template>
  <div>
    <JobModal v-if="showModal && selectedJob" :class="$style.modal" @closeModal="showModal = false">
      <span>
        <h1>{{ selectedJob.jobTitle }}</h1>
        <p>
          Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora
          quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.
          Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat
          cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos
          flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum
          cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.
        </p>
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
import JobCard from "../components/JobCard";
import JobModal from "../components/JobModal";

export default {
  name: "Jobs",
  components: {
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
    }
  }
};
</script>
<style module>
body {
  background-color: #f2f2f2;
}
ul {
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
  justify-content: fl;
  text-align: left;
  background-color: #fff;
  box-shadow: #dddddd 2px 2px 5px;
  margin: 10px auto;
  padding: 2.5% 7.5%;
  height: 300px;
  width: 80%;
  border-radius: 6px;
  list-style: none;
}

.jobCard > button {
  background-color: #ddd;
}

.jobCard > h2,
.jobCard > p {
  margin: 0;
}
</style>
