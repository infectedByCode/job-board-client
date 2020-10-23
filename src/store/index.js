import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: null,
      token: null,
    },
  },
  mutations: {
    setUser(state, { fields, values }) {
      fields.forEach((field, index) => {
        state.user[field] = values[index];
      });
    },
    unsetUser(state) {
      for (const field in { user }) {
        user[field] = null;
      }
    },
  },
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
