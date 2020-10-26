<template>
  <div class="d-none d-print-block">
    <b-row>
      <b-col>
        <strong>
          Print out current as of	{{ now | dateFormat('M/D h:mm a') }}<br />
          To sign-up or make changes, go to http://bit.ly/scc-210-resv<br />
          or scan the QR Code with your phone's camera
        </strong>
      </b-col>
      <b-col>
        <img src="@/assets/scc-210-resv.png" class="float-right" />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ScheduleFooter extends Vue {
  now = new Date()

  mounted (): void {
    this.updateTime()
  }

  private updateTime(): void {
    setTimeout(() => {
      this.now = new Date();
      this.updateTime();         
    }, 15000);
  }
}
</script>