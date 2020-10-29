import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const mutations = {
  setUser(state, { fields, values }) {
    fields.forEach((field, index) => {
      state.user[field] = values[index];
    });
  },
  unsetUser(state) {
    const obj = state.user;
    for (const field in obj) {
      obj[field] = null;
    }
  },
};

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      token: null,
    },
  },
  mutations,
  actions: {
    updateUser(context, { fields, values }) {
      if (fields.length && values.length) {
        context.commit('setUser', { fields, values });
      }
      if (!fields.length && !values.length) {
        context.commit('unsetUser');
      }
    },
  },
  modules: {},
});
