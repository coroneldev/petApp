// src/store/index.ts
import { createStore } from 'vuex';

interface State {
  codigo: string;
}

const store = createStore<State>({
  state: {
    codigo: '',
  },
  mutations: {
    setCodigo(state, codigo: string) {
      state.codigo = codigo;
    },
  },
  actions: {
    updateCodigo({ commit }, codigo: string) {
      commit('setCodigo', codigo);
    },
  },
  getters: {
    getCodigo(state) {
      return state.codigo;
    },
  },
});

export default store;
