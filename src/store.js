import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    moodText: '',
    moodEmoji: '',
  },
  getters: {},
  mutations: {
    setMoodText(state, mood) {
      state.moodText = mood;
    },
    setMoodEmoji(state, mood) {
      state.moodEmoji = mood;
    },
  },
  actions: {},
});
