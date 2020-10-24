<template>
<b-row>
  <b-col>
  <b-table
      :sticky-header="winHeight"
      :no-border-collapse="true"
      responsive="md"
      :items="items"
      :fields="fields"
    >
      <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling -->
      <template #head(room)="">
        <div class="text-nowrap"></div>
      </template>
      <template #head()="scope">
        <div class="text-center text-nowrap">
          {{ scope.label }}
        </div>
      </template>
      <template #cell(room)="data">
        <div
          v-if="data.item.a == undefined"
          class="text-nowrap"
          style="border: 2px solid black;"
        >  
          {{ data.item.time }}
        </div>
        <div
          v-else
          class="text-nowrap"
        >
          Rm{{ data.value }}
        </div>
      </template>
      <template #cell()="data">
        <div
          v-if="data.item.a == undefined"
          class="text-nowrap"
        >
        &nbsp;
        </div>
        <div
          v-else-if="data.value !== ''"
          class="text-nowrap"
          style="border: 2px solid black;"
        >
          <!--<b-form-input v-model="data.value" />-->
          {{data.value}}
        </div>
        <div
          v-else
          class="p-3"
          style="border: 2px solid black;"
        >
          &nbsp;
        </div>
      </template>
    </b-table>
  </b-col>
</b-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const reduction = 80

@Component
export default class ScheduleGrid extends Vue {

  windowHeight = window.innerHeight-reduction;

  fields = [
    { key: 'room', label: '', stickyColumn: true, isRowHeader: true },
    { key: 'a', label: '26-Oct', variant: 'success' },
    { key: 'b', label: '2-Nov' },
    { key: 'c', label: '9-Nov', variant: 'warning' },
    { key: 'd', label: '16-Nov' },
    { key: 'e', label: '23-Nov', variant: 'primary' },
    { key: 'f', label: '30-Nov' },
    { key: 'g', label: '1-Dec', variant: 'info' },
    { key: 'h', label: '7-Dec' }
  ]

  items = [
    { room: 0, time: '1-2pm' },
    { room: 1, time: '1-2pm', a: 'Nancy Gasper', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 2, time: '1-2pm', a: '', b: 'Nancy Gasper', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 3, time: '1-2pm', a: '', b: '', c: '', d: 'JGasper', e: '', f: '', g: '', h: '' },
    { room: 4, time: '1-2pm', a: '', b: '', c: '', d: '', e: 'JG', f: 'JGasper', g: '', h: '' },
    { room: 5, time: '1-2pm', a: '', b: '', c: 'JohnG', d: '', e: '', f: '', g: '', h: 'JohnG' },
    { room: 6, time: '1-2pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 7, time: '1-2pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 8, time: '1-2pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 0, time: '2-3pm' },
    { room: 1, time: '2-3pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 2, time: '2-3pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 3, time: '2-3pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 4, time: '2-3pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 5, time: '2-3pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 6, time: '2-3pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 7, time: '2-3pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 8, time: '2-3pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 0, time: '3-4pm' },
    { room: 1, time: '3-4pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 2, time: '3-4pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 3, time: '3-4pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 4, time: '3-4pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 5, time: '3-4pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 6, time: '3-4pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 7, time: '3-4pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' },
    { room: 8, time: '3-4pm', a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '' }
  ]
  
  @Prop() private msg!: string;

  get winHeight(): string {
    return this.windowHeight + 'px';
  }

  mounted(): void {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  }

  beforeDestroy(): void { 
    window.removeEventListener('resize', this.onResize); 
  }

  private onResize(): void {
      this.windowHeight = window.innerHeight-reduction;
    }
}
</script>

<style>
@media print {
    * {
        color: inherit !important;
        background: inherit !important;
    }
}
</style>