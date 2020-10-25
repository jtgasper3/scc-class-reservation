<template>
  <router-view/>
</template>

<script lang="ts">
import Vue from 'vue'
import db from './firebase';

export default Vue.extend({
  async created (): Promise<void> {
    const docRef = db.collection('dates').doc('test2');
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
  
})
</script>