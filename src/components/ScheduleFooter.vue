<template>
  <div class="d-none d-print-block">
    <b-row>
      <b-col>
        <strong>
          Print out current as of	{{ now | dateFormat('M/D h:mm a') }}<br />
          <span v-if="shortUrl">
            To sign-up or make changes, go to {{ shortUrl }}<br />
            or scan the QR Code with your phone's camera
          </span>
        </strong>
      </b-col>
      <b-col>
        <qrcode-vue
          v-if="shortUrl"
          :value="shortUrl"
          :size="150"
          level="L"
          class="float-right"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import QrcodeVue from 'qrcode.vue'

@Component({
  components: { 
    QrcodeVue
  }
})
export default class ScheduleFooter extends Vue {
  now = new Date();

  @Prop() shortUrl!: string;

  mounted (): void {
    this.updateTime();
  }

  private updateTime(): void {
    setTimeout(() => {
      this.now = new Date();
      this.updateTime();         
    }, 15000);
  }
}
</script>