import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import CellView from '../cell.vue';
import { Grid } from '@/types';
import { initialiseGrid } from '@/helpers/grid';

const localVue = createLocalVue()
localVue.use(Vuex);

function createStore (overrides?: any) {
  const defaults = {
    state: { grid: initialiseGrid() }
  }
  const store = new Vuex.Store({...defaults, ...overrides});
  return store;
}

function createWrapper (overrides?: any) {
  const defaults = {
    store: createStore()
  }
  return shallowMount(CellView, {
    ...{ ...defaults, ...overrides },
    localVue,
    propsData: {
      column: 12,
      row: 12
    }
  });
}

describe('Cell.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = createWrapper();
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('should make sure input exists', () => {
    expect(wrapper.findAll('input').length).toEqual(1);
  })

  afterEach(() => wrapper.destroy())
})