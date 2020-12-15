<template>
  <main :class="$style.advertContainer">
    <section :class="$style.jobContainer">
      <h1>{{ jobDetails.jobTitle }}</h1>
      <div>
        <p>Location: {{ jobDetails.jobLocation }}</p>
        <p>Salary: £{{ jobDetails.salary }}</p>
        <p>Posted {{ jobDetails.added }}</p>
      </div>
      <ul>
        <li v-for="(tag, i) in jobDetails.tags.split(',')" :key="i" :class="$style.tag">{{ tag }}</li>
      </ul>

      <p>{{ jobDetails.jobText }}</p>
    </section>
    <section :class="$style.companyContainer">
      <p>{{ jobDetails.companyName }}</p>
      <Button size="small">Email</Button>
      <Button size="small">Call</Button>
    </section>
    <form @submit.prevent="handleApplication" title="job-application-form">
      <label for="cv-upload">Select resume:</label>
      <input id="cv-upload" type="file" />
      <label for="letter-upload">Select cover letter:</label>
      <input id="letter-upload" type="file" />
      <button>Apply</button>
    </form>
  </main>
</template>

<script>
import Button from "../components/Button";
export default {
  components: {
    Button
  },
  props: {
    jobDetails: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleApplication(e) {
      console.log(e);
    }
  }
};
</script>

<style module>
.tag {
  display: inline-block;
  list-style: none;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: cadetblue;
}

.jobContainer,
.companyContainer {
  margin: 30px 0 0 0;
}

.companyContainer > button {
  display: inline-block;
  margin: 10px;
}
</style>
