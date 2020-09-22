import { initialiseGrid } from '@/helpers/grid';
import { AppState, Payload } from '@/types';
import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

export const SET_CELL = 'setCell';

Vue.use(Vuex);

const state: AppState = {
  grid: initialiseGrid()
}

const mutations = {
  [SET_CELL] (state: AppState, payload: Payload) {
    const grid = state.grid;
    grid[payload.cell.row][payload.cell.column] = payload.value;
    state.grid = grid;
  },
}

const actions = {
  [SET_CELL] (context: ActionContext<AppState, AppState>, payload: Payload) {
    context.commit(SET_CELL, payload);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
