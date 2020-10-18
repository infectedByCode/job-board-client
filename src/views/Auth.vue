<template>
  <main>
    <!-- TODO: Add keywords -->
    <form>
      <!-- TODO: extract radio set -->
      <fieldset :class="$style.accountType">
        <label for="jobseeker">Jobseeker</label>
        <input id="jobseeker" type="radio" value="jobseekers" v-model="accountType" />
        <label for="jobseeker">Company</label>
        <input id="company" type="radio" value="companies" v-model="accountType" />
      </fieldset>
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'jobseekers'"
        v-model="forename"
        name="forename"
        size="max"
        label="Forename"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'jobseekers'"
        v-model="surname"
        name="surname"
        size="max"
        label="Surname"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'companies'"
        v-model="companyName"
        name="companyName"
        size="max"
        label="Company Name"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'companies'"
        v-model="companyAddress"
        name="companyAddress"
        size="max"
        label="Company Address"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'companies'"
        v-model="companyPhone"
        name="companyPhone"
        size="max"
        label="Company Phone"
        align="left"
      />
      <TextInput v-model="email" name="email" size="max" label="Email" align="left" />
      <TextInput
        v-model="password"
        name="password"
        size="max"
        label="Password"
        align="left"
        type="password"
      />
      <TextInput
        v-if="currentPath === '/signup'"
        v-model="confirmpw"
        name="confirmpw"
        size="max"
        label="Confirm password"
        align="left"
        type="password"
      />
      <button @click.prevent="handleSubmit">Click</button>
    </form>
    <router-link v-if="currentPath === '/signup'" to="/login">Already registered? Click here.</router-link>
    <router-link v-if="currentPath === '/login'" to="/signup">Not registered? Click here.</router-link>
  </main>
</template>

<script>
import axios from "axios";
import TextInput from "../components/TextInput";

export default {
  name: "auth",
  components: {
    TextInput
  },
  data() {
    return {
      accountType: null,
      email: null,
      password: null,
      confirmpw: null,
      forename: null,
      surname: null,
      companyName: null,
      companyAddress: null,
      companyPhone: null
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    }
  },
  methods: {
    handleSubmit() {
      const userId = "6778f925-d847-498a-89d6-1702fb3abbf7";
      const route =
        this.currentPath === `/login` ? "auth/login" : this.accountType;
      const data = {
        password: this.password,
        jobseekerForename: this.forename,
        jobseekerSurname: this.surname,
        companyName: this.companyName,
        companyAddress: this.companyAddress,
        companyPhone: this.companyPhone,
        role: this.accountType === "jobseekers" ? "jobseeker" : "company"
      };
      data[
        this.accountType === "jobseekers" ? "jobseekerEmail" : "companyEmail"
      ] = this.email;
      axios
        .post(`http://localhost:3000/${route}`, { ...data })
        .then(response => {
          if (response.status === 200 && response.data) {
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style module>
fieldset {
  border: none;
}

.accountType {
  display: flex;
  padding: 1% 0;
}

.accountType > label,
.accountType > input {
  width: 50%;
}
</style>
