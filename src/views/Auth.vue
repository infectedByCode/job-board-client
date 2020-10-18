<template>
  <main>
    <!-- TODO: Add keywords -->
    <form>
      <!-- TODO: extract radio set -->
      <fieldset v-if="currentPath === '/signup'" :class="$style.accountType">
        <label for="jobseeker">Jobseeker</label>
        <input id="jobseeker" type="radio" value="jobseeker" v-model="accountType" />
        <label for="jobseeker">Company</label>
        <input id="company" type="radio" value="company" v-model="accountType" />
      </fieldset>
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'jobseeker'"
        v-model="forename"
        name="forename"
        size="max"
        label="Forename"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'jobseeker'"
        v-model="surname"
        name="surname"
        size="max"
        label="Surname"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'company'"
        v-model="companyName"
        name="companyName"
        size="max"
        label="Company Name"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'company'"
        v-model="companyAddress"
        name="companyAddress"
        size="max"
        label="Company Address"
        align="left"
      />
      <TextInput
        v-if="currentPath === '/signup' && accountType === 'company'"
        v-model="companyPhone"
        name="companyPhone"
        size="max"
        label="Company Phone"
        align="left"
      />
      <TextInput v-model="email" name="email" size="max" label="Email" align="left" />
      <TextInput v-model="password" name="password" size="max" label="Password" align="left" />
      <TextInput
        v-if="currentPath === '/signup'"
        v-model="confirmpw"
        name="confirmpw"
        size="max"
        label="Confirm password"
        align="left"
      />
    </form>
    <router-link v-if="currentPath === '/signup'" to="/login">Already registered? Click here.</router-link>
    <router-link v-if="currentPath === '/login'" to="/signup">Not registered? Click here.</router-link>
  </main>
</template>

<script>
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
