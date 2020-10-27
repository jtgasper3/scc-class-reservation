<template>
<b-row>
  <b-col>
  <b-alert variant="warning" :show="!online">You appear to be offline. Please try refreshing the page.</b-alert>
  <b-table
      :sticky-header="winHeight"
      :no-border-collapse="true"
      :tbody-tr-class="rowClass"
      responsive
      :items="items"
      :fields="fields"
      small
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
        >
        &nbsp;
        </div>
        <div
          v-else-if="data.value !== ''"
          @click="updateData(data.field.key, data.item.room, data.item.timeSlot)"
        >
          {{data.value}}
        </div>
        <div
          v-else
          @click="updateData(data.field.key, data.item.room, data.item.timeSlot)"
          class="p-3"
        >
          &nbsp;
        </div>
      </template>
    </b-table>
    <b-modal
      v-model="showModal"
      title="Reserve Slot"
      :ok-disabled="!online"
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
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { BvModalEvent } from 'bootstrap-vue';
import ScheduleChange from '@/components/ScheduleChange.vue'

import db from '@/firebase'

const reduction = 80

@Component({
  components: {
    ScheduleChange
  }
})
export default class ScheduleGrid extends Vue {
  windowHeight = window.innerHeight-reduction;

  showModal = false;
  activeData = { 'date': '', 'room': '', 'timeSlot': '' };
  cellData = "";

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
  ];

  online = navigator.onLine;
  showBackOnline = false;

  @Prop() items!: Record<string,unknown>[];

  get instanceId(): string {
    console.log(this.$root.$instanceId);
    return this.$root.$instanceId.length >= 10 ? this.$root.$instanceId : '';
  }

  get winHeight(): string {
    return this.windowHeight + 'px';
  }

  @Watch('online')
  onlineChange(v: boolean) {
    if (v) {
      this.showBackOnline = true;
      setTimeout(() => {
          this.showBackOnline = false;
      }, 1000);
    }
  }

  mounted(): void {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      window.addEventListener('online', this.updateOnlineStatus);
      window.addEventListener('offline', this.updateOnlineStatus);
    })
  }

  beforeDestroy(): void { 
    window.removeEventListener('resize', this.onResize); 
    window.removeEventListener('online', this.updateOnlineStatus);
    window.removeEventListener('offline', this.updateOnlineStatus);
  }

  private rowClass(item: Record<string,unknown>, type: unknown) {
        if (!item || type !== 'row') return 'header-divider'
        if (item.room === '0') return 'timeslot-divider'
        return 'cell'
  }

  private onResize(): void {
      this.windowHeight = window.innerHeight-reduction;
  }

  private updateOnlineStatus(e: Event): void {
      const { type } = e;
      this.online = type === 'online';
  }

  private updateData(field: string, room: string, timeSlot: string): void {
    if (this.online) {
      this.activeData = { 'date': field, 'room': room, 'timeSlot': timeSlot };
      this.cellData = "";
      this.showModal = true;
    } else {
      this.$bvToast.toast('Your network connection seems to be having problems. Please try again.', {
        title: 'Offline',
        toaster: 'b-toaster-top-full',
        solid: true,
        variant: 'danger',
        appendToast: false
      });
    }
  }

  private async saveCellData(bvModalEvt: BvModalEvent): Promise<void> {
    const batch = db.batch();

    let docRef = db.collection('instance').doc(this.$root.$instanceId)
        .collection('dates').doc(this.activeData.date)
        .collection('rooms').doc(this.activeData.room)
        .collection('timeSlot').doc(this.activeData.timeSlot);

    batch.set(docRef, {initials: this.cellData});

    const foundIndex = this.items.findIndex(x => x.room == this.activeData.room && x.timeSlot == this.activeData.timeSlot);
    const itemCopy = [...this.items]
    itemCopy[foundIndex][this.activeData.date] = this.cellData;
    docRef = db.collection('instance').doc(this.$root.$instanceId);
    batch.set(docRef, {data: itemCopy});

    try {
      await batch.commit();

      this.$bvToast.toast('Reservation saved', {
        variant: 'info',
        isStatus: true
      });
    } catch(err) {
      this.$bvToast.toast('There was a problem saving the request. Please try again, or try again in a few minutes.', {
        title: 'Problem Saving',
        toaster: 'b-toaster-top-full',
        solid: true,
        variant: 'danger'
      });
      console.log(err);
      bvModalEvt.preventDefault();
    }
  }
}
</script>

<style>
  table thead tr th {
    border: white solid 2px !important;
  }
  .timeslot-divider th {
    border: black solid 2px !important;
  }
  .timeslot-divider td {
    border-top: black solid 1px !important;
    border-bottom: black solid 1px !important;
  }
  .cell td {
    border-top: black solid 1px !important;
    border: black solid 1px !important;
  }
  
@media print {
  td div {
    min-width: 40px;
    max-width: 100px;
    white-space: normal
  }
}

@media screen {
  td div {
    white-space: nowrap !important;
    cursor: pointer;
  }
}
</style>