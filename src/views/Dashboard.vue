<template>
  <div>
    <h1>WELCOME TO YOUR DASHBOARD</h1>
    <main :class="$style.dashboard">
      <section :class="$style.sidebar">
        <img src="../assets/logo.png" alt="profile image" />
        <form @submit.stop>
          <TextInput
            v-for="(value, key) in userDetails"
            :key="key"
            v-model="userDetails[key]"
            :input="value"
            :name="key"
            size="max"
            :label="key"
            :disabled="!edit"
            align="left"
          />
          <button @click.prevent="edit = !edit">{{edit ? "Save Changes" : "Edit Details"}}</button>
        </form>
      </section>
      <section></section>
    </main>
  </div>
</template>

<script>
import { fetchJobseekerInformation } from "../utils/api";
import TextInput from "../components/TextInput";

export default {
  components: {
    TextInput
  },
  data() {
    return {
      error: null,
      edit: false,
      userDetails: {
        forename: "tester",
        surname: "tested",
        keywords: "developer,backend",
        joined: "2020-10-14 19:42:02"
      }
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  },
  created() {
    const { userId, token } = this.currentUser;
    fetchJobseekerInformation(userId, token)
      .then(data => {
        data instanceof Error ? (this.error = true) : (this.userDetails = data);
      })
      .catch(err => {
        if (err) {
          this.error = true;
        }
      });
  }
};
</script>

<style module>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar {
  background-color: #bbb;
}

.sidebar > form {
  height: auto;
  width: 80%;
  margin: 0 auto;
}

.sidebar button {
  background-color: #dd5800;
  display: block;
  width: 100%;
  height: 30px;
  margin: 15% auto;
  padding: 1%;
  border-radius: 6px;
}
</style>