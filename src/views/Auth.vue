<template>
  <main>
    <!-- TODO: Add keywords -->
    <form>
      <div style="min-height: 20px">{{ error ? error : null }}</div>
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
      error: null,
      accountType: null,
      email: null,
      password: null,
      confirmpw: null,
      forename: null,
      surname: null,
      companyName: null,
      companyAddress: null,
      companyPhone: null,
      user: {
        id: null,
        token: null
      }
    };
  },
  computed: {
    currentPath() {
      return this.$route.path;
    }
  },
  methods: {
    resetForm() {
      this.accountType = null;
      this.email = null;
      this.password = null;
      this.confirmpw = null;
      this.forename = null;
      this.surname = null;
      this.companyName = null;
      this.companyAddress = null;
      this.companyPhone = null;
    },
    handleSubmit() {
      this.error = null;
      const userId = this.user.id;
      const route =
        this.currentPath === `/login` ? "auth/login" : this.accountType;
      const data = {
        password: this.password,
        jobseekerForename: this.forename,
        jobseekerSurname: this.surname,
        companyName: this.companyName,
        companyAddress: this.companyAddress,
        companyPhone: this.companyPhone,
        role: this.accountType === "jobseekers" ? "jobseeker" : "company",
        userId,
        email: this.email
      };
      try {
        axios
          .post(`http://localhost:3000/${route}`, { ...data })
          .then(response => {
            console.log(response);
            if (response.status === 200 && response.data) {
              this.user.id = response.data.userId;
              this.user.token = response.data.token;
            }
          })
          .catch(err => {
            console.log(err);
            // TODO: handle err
            this.error = err;
          });
      } finally {
        this.resetForm();
      }
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
