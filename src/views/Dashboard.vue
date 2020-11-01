<template>
  <div>
    <h1>WELCOME TO YOUR DASHBOARD</h1>
    <main :class="$style.dashboard">
      <section :class="$style.sidebar">
        <img src="../assets/logo.png" alt="profile image" />
        <form @submit.stop>
          <p v-if="info.msg" :class="info.isError ? $style.error : $style.success">{{info.msg}}</p>
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
          <Button @click="handleUpdate">{{edit ? "Save Changes" : "Edit Details"}}</Button>
          <Button type="danger" @click="handleDelete">Delete Account</Button>
        </form>
      </section>
      <section :class="$style.applications">
        <h3>Application History</h3>
        <ul v-if="applications.length">
          <li v-for="(application, index) in applications" :key="index"></li>
        </ul>
        <p v-else>You have not applied to any roles yet. Search for your perfect job here!</p>
      </section>
    </main>
  </div>
</template>

<script>
import {
  fetchJobseekerInformation,
  fetchApplicationsById,
  updateUserById,
  deleteUserById
} from "../utils/api";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

import { mapActions } from "vuex";

export default {
  components: {
    Button,
    TextInput
  },
  data() {
    return {
      info: {
        isError: false,
        msg: ""
      },
      edit: false,
      userDetails: {},
      applications: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  },
  created() {
    // TODO: make more dynamic to work with companies too
    // Fetch user information
    const { id, token } = this.$store.state.user;
    fetchJobseekerInformation(id, token)
      .then(data => {
        const { jobseeker, company } = data;
        if (data instanceof Error) {
          const msg = "We're experiencing a problem getting your information.";
          this.setInfo(msg, true);
        }

        if (jobseeker) {
          this.userDetails = jobseeker;
        }
      })
      .catch(err => {
        if (err) {
          const msg = "We're experiencing a problem getting your information.";
          this.setInfo(msg, true);
        }
      });
    // Fetch applications
    fetchApplicationsById(id, token)
      .then(data => {
        if (data instanceof Error) {
          const msg = "We're experiencing a problem getting your information.";
          this.setInfo(msg, true);
        }
        if (data.applications) {
          this.applications = data.applications;
        }
      })
      .catch(err => {
        if (err) {
          const msg = "We're experiencing a problem getting your information.";
          this.setInfo(msg, true);
        }
      });
  },
  methods: {
    ...mapActions({ updateUser: "updateUser" }),
    setInfo(msg, error = false) {
      this.info.msg = msg;
      this.info.isError = error;
      // reset information after given time
      const self = this;
      setTimeout(() => (self.info.msg = null), 5000);
    },
    handleUpdate() {
      if (this.edit) {
        const { id, token } = this.currentUser;
        updateUserById(id, token, this.userDetails)
          .then(response => {
            if (response.status !== 200) {
              const msg =
                "We're unable to update your information at this time";
              this.setInfo(msg, true);
            } else {
              this.setInfo("Information updated successfully");
            }
          })
          .catch(err => {
            if (err) {
              const msg =
                "We're unable to update your information at this time";
              this.setInfo(msg, true);
            }
          });
      }
      this.edit = !this.edit;
    },
    handleDelete() {
      const { id, token } = this.currentUser;
      deleteUserById(id, token)
        .then(response => {
          if (response.status !== 204) {
            const msg = "Please contact us to delete your account.";
            this.setInfo(msg, true);
          } else {
            this.updateUser({ fields: [], values: [] });
            this.$router.push({ name: "Home" });
          }
        })
        .catch(err => {
          if (err) {
            const msg = "Please contact us to delete your account.";
            this.setInfo(msg, true);
          }
        });
    }
  }
};
</script>

<style module>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.error {
  background-color: hotpink;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}

.success {
  background-color: lawngreen;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
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
  margin: 10px auto;
}

.sidebar button:first-of-type {
  margin-top: 50px;
}

.applications ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.applications ul > li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  margin: 20px;
  background-color: hotpink;
  border-radius: 6px;
}
</style>