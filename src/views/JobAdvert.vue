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
