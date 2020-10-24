<template>
  <b-container fluid="lg" class="bg-gradient-success">
    <b-row class="mb-3">
      <b-col cols="5" class="text-center text-nowrap" >
        <strong>LAB SIGNUP SHEET FOR ALL STUDENTS</strong>
      </b-col>
      <b-col class="text-center  text-nowrap">
        <strong>ONE HOUR PER STUDENT PER DAY</strong>
      </b-col>
      <b-col class="text-center">
        <strong>USE INITIALS</strong>
      </b-col>
    </b-row>

    <schedule-grid />
    <schedule-footer />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ScheduleFooter from '@/components/ScheduleFooter.vue';
import ScheduleGrid from '@/components/ScheduleGrid.vue';

@Component({
  components: {
    ScheduleFooter,
    ScheduleGrid,
  },
})
export default class Home extends Vue {}
</script>
