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
        <li
          v-for="(tag, i) in jobDetails.tags.split(',')"
          :key="i"
          :class="$style.tag"
        >
          {{ tag }}
        </li>
      </ul>

      <p>{{ jobDetails.jobText }}</p>
    </section>
    <section :class="$style.companyContainer">
      <p>{{ jobDetails.companyName }}</p>
      <Button size="small">Email</Button>
      <Button size="small">Call</Button>
    </section>
    <form
      :class="$style.applicationForm"
      @submit.prevent="handleApplication"
      title="job-application-form"
    >
      <label for="cv-upload">Select resume:</label>
      <input id="cv-upload" type="file" />
      <label for="letter-upload">Select cover letter:</label>
      <input id="letter-upload" type="file" />
      <Button @click="handleApplication">Apply</Button>
    </form>
  </main>
</template>

<script>
import Button from '../components/Button';
export default {
  components: {
    Button,
  },
  props: {
    jobDetails: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleApplication(e) {
      const cv = document.querySelector('#cv-upload').files[0];
      const coverLetter = document.querySelector('#letter-upload').files[0];
      const formData = new FormData();
      formData.append('cv', cv);
      formData.append('cover letter', coverLetter);
      // TODO: extract to API utils
      fetch(`${process.env.VUE_APP_API_URL}/applications`, {
        method: 'POST',
        body: formData,
      });
    },
  },
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

.applicationForm {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto;
}
</style>
