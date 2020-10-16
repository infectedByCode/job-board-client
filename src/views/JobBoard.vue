<template>
  <div>
    <!-- TODO: move to modal  -->
    <div v-if="showModal && selectedJob" :class="$style.modal" @click.prevent="showModal = false">
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
    </div>
    <ul>
      <li v-for="job in jobs" :key="job.jobId" :class="$style.jobCard">
        <h2>{{ job.jobTitle }}</h2>
        <p>{{job.jobLocation || 'Manchester'}}</p>
        <p>${{ job.salary }}</p>
        <p>{{ job.companyName }}</p>
        <p>Posted: {{ job.added }}</p>
        <p>{{job.summary}}</p>
        <button @click.prevent="loadJobDetails(job)">See</button>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

export default {
  name: "Jobs",
  data() {
    return {
      jobs: null,
      selectedJob: null,
      showModal: false
    };
  },
  created() {
    axios.get("http://localhost:3000/jobs").then(response => {
      if (response.status === 200 && response.data) {
        this.jobs = response.data.jobs.map(job => {
          job.added = this.formatDate(job.createdAt);
          job.summary = this.formatRole(job.jobText);
          return job;
        });
      }
    });
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
    loadJobDetails(jobDetails) {
      this.selectedJob = jobDetails;
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
  justify-content: start;
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
