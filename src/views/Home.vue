<template>
  <div :class="$style.searchForm">
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
      <Button @click="handleSubmit">Search</Button>
    </form>
  </div>
</template>

<script>
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

export default {
  name: "Home",
  components: {
    Button,
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
.searchForm {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 20% 0;
  background-image: url("../assets/developer.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.searchForm > form {
  width: 90%;
  margin: 0 auto;
  padding: 2.5% 5%;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 0.5);
}

.searchForm input {
  min-height: 30px;
}

.searchForm select {
  width: 20%;
  float: right;
  background: #fff;
  line-height: 30px;
  height: 30px;
}

.searchForm select option {
  position: relative;
}

@media (min-width: 1023px) {
  .searchForm > form > button {
    height: auto;
    margin: 5% auto;
  }

  .searchForm input {
    max-height: 40px;
  }

  .searchForm > form > select {
    min-height: 40px;
  }
}

@media (min-width: 1399px) {
  .searchForm {
    padding: 10% 0;
    width: 100%;
  }
}
</style>