<template>
  <div v-if="instanceId">
    <router-view />
    <b-toast
      v-model="updateExists"
      no-auto-hide
      title="App Update"
      @click="refreshApp"
    >
      There is an app update. Click the button to apply it.<br />
      <b-button @click="refreshApp">Refresh</b-button>
    </b-toast>
  </div>
  <p v-else>
    Please use the link in the invite to join your board.
  </p>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import db from './firebase';
import UpdateApp from '@/mixins/appUpdate.vue'

@Component
export default class Home extends Mixins(UpdateApp) {

  get instanceId(): string {
    console.log(this.$root.$instanceId)
    return this.$root.$instanceId.length >= 10 ? this.$root.$instanceId : '';
  }

  async created (): Promise<void> {
    this.$root.$instanceId = this.$route.path.replaceAll('/', '');
    
    if (this.$root.$instanceId.length >= 10) {
      const docRef = db.collection('instance').doc(this.$root.$instanceId);
      const doc = await docRef.get()
      if (!doc.exists) {
        const data = {
          data: [
            { room: '0', timeSlot: '1-2pm'},
            { room: '1', timeSlot: '1-2pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '2', timeSlot: '1-2pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '3', timeSlot: '1-2pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '4', timeSlot: '1-2pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '5', timeSlot: '1-2pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '6', timeSlot: '1-2pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '7', timeSlot: '1-2pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '8', timeSlot: '1-2pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '0', timeSlot: '2-3pm'},
            { room: '1', timeSlot: '2-3pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '2', timeSlot: '2-3pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '3', timeSlot: '2-3pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '4', timeSlot: '2-3pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '5', timeSlot: '2-3pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '6', timeSlot: '2-3pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '7', timeSlot: '2-3pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '8', timeSlot: '2-3pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '0', timeSlot: '3-4pm'},
            { room: '1', timeSlot: '3-4pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '2', timeSlot: '3-4pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '3', timeSlot: '3-4pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '4', timeSlot: '3-4pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '5', timeSlot: '3-4pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '6', timeSlot: '3-4pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '7', timeSlot: '3-4pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' },
            { room: '8', timeSlot: '3-4pm', '26-Oct': '', '2-Nov': '', '9-Nov': '', '16-Nov': '', '23-Nov': '', '30-Nov': '', '1-Dec': '', '7-Dec': '' }
          ]
        }
        await docRef.set(data)
        console.log("Set new db")
      } else {
        console.log("Already Exists")
      }
    }
  } 
}
</script>