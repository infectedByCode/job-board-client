<template>
  <div :class="$style.loginForm">
    <form>
      <TextInput
        v-model="jobType"
        :input="jobType"
        name="jobType"
        size="max"
        label="What"
        align="left"
      />
      <TextInput
        v-model="location"
        :input="location"
        name="location"
        size="large"
        label="Where"
        align="left"
      />
      <select>
        <option
          v-for="distance in distanceOptions"
          :key="distance.text"
          :value="distance.value"
        >{{distance.text}}</option>
      </select>
      <button @click.prevent="handleSubmit">Search</button>
    </form>
  </div>
</template>

<script>
import TextInput from "../components/TextInput";

export default {
  name: "Home",
  components: {
    TextInput
  },
  data() {
    return {
      jobType: null,
      location: null
    };
  },
  computed: {
    distanceOptions() {
      const options = [0, 10, 20, 30];
      return options.map(option => ({ value: 0, text: `${option} miles` }));
    }
  },
  methods: {
    handleSubmit() {
      this.$router.push({
        name: "Job Board",
        params: { searchTerm: this.jobType }
      });
    }
  }
};
</script>

<style module>
.loginForm {
  height: 100%;
  width: 80%;
  margin: 0 auto;
  padding: 30% 0;
}

.loginForm select {
  width: 20%;
  float: right;
}

.loginForm button {
  background-color: #dd5800;
  display: block;
  width: 100%;
  height: 30px;
  margin: 15% auto;
  padding: 1%;
  border-radius: 6px;
}
</style>