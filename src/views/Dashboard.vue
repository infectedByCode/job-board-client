<template>
  <div>
    <h1>WELCOME TO YOUR DASHBOARD</h1>
    <main :class="$style.dashboard">
      <section :class="$style.sidebar">
        <img src="../assets/logo.png" alt="profile image" />
        <p v-if="info.msg" :class="info.isError ? $style.error : $style.success">{{info.msg}}</p>
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
          <button @click.prevent="handleUpdate">{{edit ? "Save Changes" : "Edit Details"}}</button>
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
  updateUserById
} from "../utils/api";
import TextInput from "../components/TextInput";

export default {
  components: {
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
    setInfo(msg, error = false) {
      this.info.msg = msg;
      this.info.isError = error;
    },
    handleUpdate() {
      if (this.edit) {
        this.updateUser();
      }
      this.edit = !this.edit;
    },
    updateUser() {
      const { id, token } = this.currentUser;
      updateUserById(id, token, this.userDetails)
        .then(data => {
          if (data.status !== 200) {
            const msg = "We're unable to update your information at this time";
            this.setInfo(msg, true);
          } else {
            this.setInfo("Information updated successfully");
          }
        })
        .catch(err => {
          if (err) {
            const msg = "We're unable to update your information at this time";
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
  border-radius: 5px;
}

.success {
  background-color: lawngreen;
  padding: 5px;
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
  background-color: #dd5800;
  display: block;
  width: 100%;
  height: 30px;
  margin: 15% auto;
  padding: 1%;
  border-radius: 6px;
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