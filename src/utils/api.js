import axios from 'axios';
const { VUE_APP_API_URL } = process.env;

export const fetchJobsBySearch = (searchTerm) => {
  return axios
    .get(`${VUE_APP_API_URL}/jobs/search/${searchTerm}`)
    .then((response) => {
      if (response.status === 200 && response.data) {
        const jobs = response.data.jobs;
        return jobs;
      }
    })
    .catch((err) => err);
};

export const fetchJobs = () => {
  return axios.get(`${process.env.VUE_APP_API_URL}/jobs`).then((response) => {
    if (response.status === 200 && response.data) {
      const jobs = response.data.jobs;
      return jobs;
    }
  });
};

export const fetchJobseekerInformation = (jobseekerId, token) => {
  return axios
    .get(`${VUE_APP_API_URL}/jobseekers/${jobseekerId}?token=${token}`)
    .then((result) => result.data)
    .catch((err) => err);
};

export const handleUserAuth = (url, data) => {
  return axios
    .post(url, { ...data })
    .then((response) => response)
    .catch((err) => err);
};
