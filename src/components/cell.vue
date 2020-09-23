<template>
  <input @blur="cellChanged" :value="displayValue" @focus="updateDisplayValue" v-bind:style="{ border: computedColor }">
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { SET_CELL } from '@/store';
import { mapState } from 'vuex';
import { Parser } from '@/compiler/parser';
import { ProgramExpression } from '@/compiler/expressions';

@Component({
  computed: {
    ...mapState(['grid'])
  }
})
export default class CellView extends Vue {
  private color = 'none';
  // @ts-ignore
  @Prop({ default: 0 }) column;
  // @ts-ignore
  @Prop({ default: 0 }) row;

  private displayValue = '';

  get computedColor () {
    return this.color;
  }

  mounted () {
    this.updateDisplayValue(); 
  }

  cellChanged(e: Event) {
    const final: { formula: string; value: number|string } = {
      formula: '', value: ''
    }
    // @ts-ignore
    const value = e.target.value;
    if(value[0] === '=') {
      // its a function
      const formula = value.substring(1);
      final.formula = value;

      try {
        const evaluated = this.runCode(formula);
        this.displayValue = evaluated.toString();
        final.value = evaluated;
        this.setCell(final);
      } catch (e) {
        this.color = '1px solid red';
        alert(e);
      }
    } else if (value !== '') {
        // @ts-ignore
        const parsed = parseFloat(e.target.value);
        if(!isNaN(parsed)) {
          final.value = parsed;
        } else {
          // @ts-ignore
          final.value = e.target.value;
        }
        this.setCell(final);
    }
  }

  runCode(code: string): number {
    const program: ProgramExpression = (new Parser(code)).parse();
    // @ts-ignore
    const evaluated = program.evaluate(this.grid) as number;
    return evaluated;
  }

  updateDisplayValue () {
    // @ts-ignore
    const compoudValue = this.grid[this.row][this.column];
    if (compoudValue.formula !== '') {
      this.displayValue = compoudValue.formula;
    } else {
      this.displayValue = compoudValue.value;
    }
  }

  setCell (value: { formula: string; value: number|string }) {
    this.$store.dispatch(SET_CELL, { cell: {
        column: this.column,
        row: this.row
      },
      value
    })
    this.color = 'none';
  }
}
</script>

<style>
input {
  border: none;
  padding: 8px 5px 8px 5px;
  font-size: 11px
}
</style>