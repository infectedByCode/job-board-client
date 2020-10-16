<template>
  <div>
    <form>
      <label for="jobType">What</label>
      <input v-model="jobType" type="text" name="jobType" />
      <label for="location">Where</label>
      <input v-model="location" type="text" name="location" />
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
export default {
  name: "Home",
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

label {
  display: block;
  text-align: left;
  width: 100%;
  margin: 0 auto;
}

input {
  box-sizing: border-box;
  width: 100%;
  padding: 1%;
}

input:last-of-type {
  width: 80%;
  float: left;
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