import axios from 'axios';
const { VUE_APP_API_URL } = process.env;

export const fetchJobseekerInformation = (userId, token) => {
  return axios
    .get(`${VUE_APP_API_URL}/jobseekers/${userId}`)
    .then((result) => result.data)
    .catch((err) => err);
};
