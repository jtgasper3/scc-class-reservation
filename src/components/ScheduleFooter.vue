<template>
  <div class="d-none d-print-block">
    <b-row>
      <b-col>
        <strong>Print out current as of	{{ now }}</strong>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <strong>To sign-up or make changes, go to http://bit.ly/scc-room-210</strong>
      </b-col>
    </b-row>
   <b-row>
      <b-col>
        <strong>or scan the QR Code with your phone's camera</strong>
      </b-col>
    </b-row>	
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ScheduleGrid extends Vue {
  now = Date.now()
}
</script>