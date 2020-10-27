<template>
  <b-container fluid="lg">
    <b-row class="mb-3">
      <b-col md="12" lg="5" class="text-center text-nowrap" >
        <strong>LAB SIGNUP SHEET FOR ALL STUDENTS</strong>
      </b-col>
      <b-col md="12" lg="5" class="text-center text-nowrap">
        <strong>ONE HOUR PER STUDENT PER DAY</strong>
      </b-col>
      <b-col md="12" lg="2" class="text-center">
        <strong>USE INITIALS</strong>
      </b-col>
    </b-row>

    <schedule-grid :items="items" />
    <schedule-footer :shortUrl="shortUrl" />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScheduleFooter from '@/components/ScheduleFooter.vue';
import ScheduleGrid from '@/components/ScheduleGrid.vue';

import db from '@/firebase'

declare type UnsubscribeHandler = () => void;

@Component({
  components: {
    ScheduleFooter,
    ScheduleGrid
  }
})
export default class Home extends Vue {
  items: Record<string,unknown>[]=[];
  shortUrl = '';
  unsubscribeHandler!: UnsubscribeHandler;

  mounted(): void {
    this.loadData();
  }

  beforeDestroy(): void { 
    this.unsubscribeHandler();
  }

  private loadData(): void {
    const docRef = db.collection('instance').doc(this.$root.$instanceId);
    this.unsubscribeHandler = docRef.onSnapshot({ includeMetadataChanges: true }, doc => {
      // this.online = doc.metadata.fromCache === false;
      this.items = doc.data()?.data;
      this.shortUrl = doc.data()?.shortUrl;
    })
  }
}
</script>

<style>
@page {
  margin: 0.25in;
}
</style>
