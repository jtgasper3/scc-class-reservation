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
          v-if="data.item.room === '0'"
          class="text-nowrap"
          style="border: 2px solid black;"
        >  
          {{ data.item.timeSlot }}
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
          v-if="data.item.room === '0'"
          class="text-nowrap"
        >
        &nbsp;
        </div>
        <div
          v-else-if="data.value !== ''"
          class="text-nowrap"
          style="border: 2px solid black;"
          @click="updateData(data.field.key, data.item.room, data.item.timeSlot)"
        >
          {{data.value}}
        </div>
        <div
          v-else
          @click="updateData(data.field.key, data.item.room, data.item.timeSlot)"
          class="p-3"
          style="border: 2px solid black;"
        >
          &nbsp;
        </div>
      </template>
    </b-table>
    <b-modal v-model="showModal"
      @ok = "saveCellData"
    >
      <schedule-change
        :data="activeData"
        v-model="cellData"
      />
    </b-modal>
  </b-col>
</b-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BvModalEvent } from 'bootstrap-vue';
import ScheduleChange from '@/components/ScheduleChange.vue'

import db from '@/firebase'

declare type UnsubscribeHandler = () => void;

const reduction = 80

@Component({
  components: {
    ScheduleChange
  }
})
export default class ScheduleGrid extends Vue {
  windowHeight = window.innerHeight-reduction;
  unsubscribeHandler!: UnsubscribeHandler;

  showModal = false
  activeData = { 'date': '', 'room': '', 'timeSlot': '' };
  cellData = ""

  fields = [
    { key: 'room', label: '', stickyColumn: true, isRowHeader: true },
    { key: '26-Oct', label: '26-Oct', variant: 'success' },
    { key: '2-Nov', label: '2-Nov' },
    { key: '9-Nov', label: '9-Nov', variant: 'warning' },
    { key: '16-Nov', label: '16-Nov' },
    { key: '23-Nov', label: '23-Nov', variant: 'primary' },
    { key: '30-Nov', label: '30-Nov' },
    { key: '1-Dec', label: '1-Dec', variant: 'info' },
    { key: '7-Dec', label: '7-Dec' }
  ]

  items: Record<string,unknown>[]=[];
  
  @Prop() private msg!: string;

  get winHeight(): string {
    return this.windowHeight + 'px';
  }

  mounted(): void {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    
    this.loadData()
  }

  beforeDestroy(): void { 
    this.unsubscribeHandler()
    window.removeEventListener('resize', this.onResize); 
  }

  private onResize(): void {
      this.windowHeight = window.innerHeight-reduction;
  }

  private loadData(): void {
    const docRef = db.collection('dates').doc('test2');
    this.unsubscribeHandler = docRef.onSnapshot(doc => {
      this.items = doc.data()?.data;
    })
  }

  private updateData(field: string, room: string, timeSlot: string): void {
    const slot = { 'date': field, 'room': room, 'timeSlot': timeSlot }
    this.activeData = slot
    this.cellData = ""
    this.showModal = true
  }

  private async saveCellData(bvModalEvt: BvModalEvent): Promise<void> {
    // TODO Convert to Batch Transaction
    let docRef = db.collection('dates').doc(this.activeData.date)
        .collection('rooms').doc(this.activeData.room)
        .collection('timeSlot').doc(this.activeData.timeSlot);

    await docRef.set({initials: this.cellData});

    const foundIndex = this.items.findIndex(x => x.room == this.activeData.room && x.timeSlot == this.activeData.timeSlot);
    this.items[foundIndex][this.activeData.date] = this.cellData;
    docRef = db.collection('dates').doc('test2');
    await docRef.set({data: this.items})
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