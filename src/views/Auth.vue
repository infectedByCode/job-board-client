<template>
  <main>
    <Loader :loading="loading" />
    <!-- TODO: Add keywords -->
    <form :class="$style.authForm" @submit.stop>
      <div :class="$style.messageWrapper">
        <p
          v-if="error"
          :class="$style.error"
        >We're having a problem with your {{ currentPath === "/login" ? 'login' : 'registration'}}.</p>
        <p
          v-else-if="success"
          :class="$style.success"
        >{{ currentPath === "/login" ? 'Logged in' : 'Registered'}} successfully.</p>
        <p v-else :class="$style.message">Please complete the form.</p>
      </div>
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
        :input="forename"
        name="forename"
        size="max"
        label="Forename"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'jobseekers'"
        v-model="surname"
        :input="surname"
        name="surname"
        size="max"
        label="Surname"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'companies'"
        v-model="companyName"
        :input="companyName"
        name="companyName"
        size="max"
        label="Company Name"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'companies'"
        v-model="companyAddress"
        :input="companyAddress"
        name="companyAddress"
        size="max"
        label="Company Address"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'companies'"
        v-model="companyPhone"
        :input="companyPhone"
        name="companyPhone"
        size="max"
        label="Company Phone"
        align="left"
      />
      <TextInput v-model="email" :input="email" name="email" size="max" label="Email" align="left" />
      <TextInput
        v-model="password"
        :input="password"
        name="password"
        size="max"
        label="Password"
        align="left"
        type="password"
      />
      <TextInput
        v-if="currentPath === '/signup'"
        v-model="confirmpw"
        :input="confirmpw"
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
import { handleUserAuth } from "../utils/api";
import Loader from "../components/Loader";
import TextInput from "../components/TextInput";

import { mapActions } from "vuex";

export default {
  name: "auth",
  components: {
    Loader,
    TextInput
  },
  data() {
    return {
      loading: false,
      error: false,
      success: false,
      accountType: null,
      email: "",
      password: "",
      confirmpw: "",
      forename: "",
      surname: "",
      companyName: "",
      companyAddress: "",
      companyPhone: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    currentPath() {
      return this.$route.path;
    }
  },
  methods: {
    ...mapActions({ updateUser: "updateUser" }),
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
      this.error = false;
      this.success = false;
      this.loading = true;

      const route =
        this.currentPath === `/login` ? "auth/login" : this.accountType;
      const role = this.accountType === "jobseekers" ? "jobseeker" : "company";
      const data = {
        password: this.password,
        jobseekerForename: this.forename,
        jobseekerSurname: this.surname,
        companyName: this.companyName,
        companyAddress: this.companyAddress,
        companyPhone: this.companyPhone,
        role,
        userId: this.currentUser.userId,
        email: this.email
      };
      const url = `${process.env.VUE_APP_API_URL}/${route}`;
      handleUserAuth(url, data).then(response => {
        if (response instanceof Error) {
          this.error = true;
        }
        try {
          if (response.status === 201 && response.data) {
            this.updateUser({ fields: ["id"], values: [response.data.ref] });
          }
          if (response.status === 200 && response.data) {
            const { userId, token } = response.data;
            this.updateUser({
              fields: ["id", "token", "role"],
              values: [userId, token, role]
            });
          }
          if (this.currentUser.id) {
            this.loading = false;
            this.success = true;
            this.$router.push({ name: "Dashboard" });
          }
        } finally {
          this.resetForm();
          this.loading = false;
        }
      });
    }
  },
  watch: {
    currentPath(value, oldValue) {
      if (value !== oldValue) {
        this.error = false;
      }
    }
  }
};
</script>

<style module>
fieldset {
  border: none;
}

.authForm {
  height: 100%;
  width: 80%;
  margin: 0 auto;
  padding: 30% 0;
}

.authForm button {
  background-color: #dd5800;
  display: block;
  width: 100%;
  height: 30px;
  margin: 15% auto;
  padding: 1%;
  border-radius: 6px;
}

.messageWrapper {
  min-height: 20px;
  margin: 10px 0;
}

.message {
  padding: 5px;
}

.error {
  background-color: hotpink;
  padding: 5px;
  border-radius: 5px;
}

.success {
  background-color: lawngreen;
  padding: 5px;
  border-radius: 5px;
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
