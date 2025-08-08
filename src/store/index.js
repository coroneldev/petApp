// store/index.js (o index.ts si usas TypeScript)
import { createStore } from 'vuex';

const store = createStore({
  state: {
    codigo: '',  // Código de ingreso
  },
  mutations: {
    setCodigo(state, codigo) {
      state.codigo = codigo;
    },
  },
  actions: {
    updateCodigo({ commit }, codigo) {
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
