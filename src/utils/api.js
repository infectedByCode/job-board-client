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

export const fetchUserInformation = (role, jobseekerId, token) => {
  const route = role === 'company' ? 'companies' : 'jobseekers';
  return axios
    .get(`${VUE_APP_API_URL}/${route}/${jobseekerId}?token=${token}`)
    .then((result) => result.data)
    .catch((err) => err);
};

export const updateUserById = (role, id, token, data) => {
  const route = role === 'company' ? 'companies' : 'jobseekers';
  return axios
    .patch(`${VUE_APP_API_URL}/${route}/${id}?token=${token}`, data)
    .then((result) => result.data)
    .catch((err) => err);
};

export const deleteUserById = (role, id, token) => {
  const route = role === 'company' ? 'companies' : 'jobseekers';
  return axios
    .delete(`${VUE_APP_API_URL}/${route}/${id}?token=${token}`)
    .then((result) => result)
    .catch((err) => err);
};

export const fetchApplicationsById = (role, id, token) => {
  return axios
    .get(`${VUE_APP_API_URL}/applications/${role}/${id}?token=${token}`)
    .then((result) => result.data)
    .catch((err) => err);
};

export const handleUserAuth = (url, data) => {
  return axios
    .post(url, { ...data })
    .then((response) => response)
    .catch((err) => err);
};
