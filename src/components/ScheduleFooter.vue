<template>
  <div class="d-none d-print-block">
    <b-row>
      <b-col>
        <strong>
          Print out current as of	{{ now }}<br />
          To sign-up or make changes, go to http://bit.ly/scc-room-210<br />
          or scan the QR Code with your phone's camera
        </strong>
      </b-col>
      <b-col>
        <img src="@/assets/scc-room-210.png" class="float-right" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ScheduleFooter extends Vue {
  now = Date.now();
}
</script>