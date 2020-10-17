<template>
  <div>
    <form>
      <UserInput v-model="jobType" name="jobType" size="max" label="What" align="left" />
      <UserInput v-model="location" name="location" size="large" label="Where" align="left" />
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
import UserInput from "../components/UserInput";

export default {
  name: "Home",
  components: {
    UserInput
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
form {
  height: 100%;
  width: 80%;
  margin: 0 auto;
  padding: 30% 0;
}

select {
  width: 20%;
  float: right;
}

button {
  background-color: #dd5800;
  display: block;
  width: 100%;
  height: 30px;
  margin: 15% auto;
  padding: 1%;
  border-radius: 6px;
}
</style>