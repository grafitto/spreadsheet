<template>
  <div id="app">
    <table cellspacing="0">
      <tr>
        <th v-for="single in ['', ...alphabets]" :key="single">{{ single }}</th>
      </tr>
      <tr v-for="(row, rindex) in grid" :key="rindex">
        <td style="background: #999; color: white">{{ rindex + 1 }}</td>
        <td v-for="(column, cindex) in columns(rindex)" :key="cindex">
            <CellView :column="cindex" :row="rindex" :class="'cell-' + cindex + '-' + rindex"></CellView>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Cell } from './types';
import CellView from '@/components/cell.vue';
import { alphabets } from './helpers/grid';

@Component({
  computed: {
    ...mapState(['grid'])
  },
  components: { CellView }
})
export default class App extends Vue {
  
  get alphabets () {
    return alphabets;
  }

  columns(row: number): Array<Cell> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.grid[row];
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
td {
  border: #ccc 1px solid;
  padding: none;
  margin: none;
}
th {
  background: #999;
  color: white;
  padding-top: 3px;
  padding-bottom: 3px;
}
</style>
