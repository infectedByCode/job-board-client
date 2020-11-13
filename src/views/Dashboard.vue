<template>
  <div>
    <Loader :loading="loading" />
    <h1>WELCOME TO YOUR DASHBOARD</h1>
    <main :class="$style.dashboard">
      <section :class="$style.sidebar">
        <img src alt="profile image" />
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
        <div v-if="keywords">
          <form @submit.stop>
            <TextInput
              v-model="keywordInput"
              name="keywordInput"
              size="max"
              label="Add new keyword"
              align="left"
              :disabled="keywords.length > 5"
            />
            <Button @click="handleKeywordUpdate">Add Keyword</Button>
          </form>
          <ul :class="$style.keywords">
            <li
              v-for="(keyword, index) in keywords"
              :key="index"
              @click="() => handleDeleteKeyword(index)"
            >{{ keyword }}</li>
          </ul>
        </div>
      </section>
      <section :class="$style.applications">
        <h3>Application History</h3>
        <ul v-if="applications.length">
          <li v-for="(application, index) in applications" :key="index"></li>
        </ul>
        <p v-else>
          {{ currentUser.role === "company"
          ? "You have no job applications received."
          : "You have not applied to any roles yet. Search for your perfect job here!"
          }}
        </p>
      </section>
    </main>
  </div>
</template>

<script>
import {
  fetchUserInformation,
  fetchApplicationsById,
  updateUserById,
  deleteUserById
} from "../utils/api";
import Button from "../components/Button";
import Loader from "../components/Loader";
import TextInput from "../components/TextInput";

import { mapActions } from "vuex";

export default {
  components: {
    Button,
    Loader,
    TextInput
  },
  data() {
    return {
      loading: true,
      info: {
        isError: false,
        msg: ""
      },
      edit: false,
      keywordInput: null,
      userDetails: {},
      applications: []
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    keywords() {
      return this.currentUser.role === "jobseeker" &&
        this.userDetails.jobKeywords.length > 1
        ? this.userDetails.jobKeywords.split(",")
        : [];
    }
  },
  created() {
    this.loading = true;
    // Fetch user information
    const { id, token, role } = this.$store.state.user;
    fetchUserInformation(role, id, token)
      .then(data => {
        const { jobseeker, company } = data;
        if (data instanceof Error) {
          const msg = "We're experiencing a problem getting your information.";
          this.setInfo(msg, true);
        }
        if (jobseeker) {
          this.userDetails = jobseeker;
          const {
            jobseekerId,
            jobseekerForename,
            jobseekerSurname,
            jobKeywords,
            accountCreated
          } = jobseeker;
        }
        if (company) {
          this.userDetails = company;
        }
        this.loading = false;
      })
      .catch(err => {
        if (err) {
          const msg = "We're experiencing a problem getting your information.";
          this.setInfo(msg, true);
          this.loading = false;
        }
      });
    // Fetch applications
    fetchApplicationsById(role, id, token)
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
      setTimeout(() => (this.info.msg = null), 5000);
    },
    handleUpdate(forceUpdate = false) {
      if (this.edit || forceUpdate) {
        this.loading = true;
        const { id, token, role } = this.currentUser;
        updateUserById(role, id, token, this.userDetails)
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
      this.edit = false;
      this.loading = false;
    },
    handleDelete() {
      const { id, token, role } = this.currentUser;
      deleteUserById(role, id, token)
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
    },
    handleKeywordUpdate() {
      this.userDetails.jobKeywords.length === 0
        ? (this.userDetails.jobKeywords = this.keywordInput)
        : (this.userDetails.jobKeywords += `,${this.keywordInput}`);
      this.handleUpdate(true);
      this.keywordInput = "";
    },
    handleDeleteKeyword(index) {
      const newKeywords = [...this.keywords];
      newKeywords.splice(index, 1);
      this.userDetails.jobKeywords = newKeywords.join(",");
      this.handleUpdate(true);
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

.sidebar > form,
.sidebar > div > form {
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

.keywords {
  display: grid;
  grid-template-columns: auto auto;
  width: 80%;
  margin: 2.5% auto;
}

.keywords > li {
  list-style: none;
  background: #fff;
  margin: 2.5%;
  padding: 2.5%;
  border-radius: 5px;
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